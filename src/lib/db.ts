import fs from 'fs';
import path from 'path';

export interface RSVPRecord {
  id: string;
  fullName: string;
  mobileNumber: string;
  email?: string;
  attendance: 'both' | 'engagement' | 'wedding' | 'declined';
  attendingEngagement: boolean;
  attendingWedding: boolean;
  guestCount: number;
  message?: string;
  submittedAt: string;
  updatedAt?: string;
}

export interface RSVPStats {
  totalResponses: number;
  confirmedEngagementGuests: number;
  confirmedWeddingGuests: number;
  attendingBoth: number;
  attendingEngagementOnly: number;
  attendingWeddingOnly: number;
  declined: number;
  totalSeatsExpected: number;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'rsvps.json');

// Ensure data directory and file exist
function ensureDBFile(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2), 'utf-8');
  }
}

// Read all RSVPs safely
export function getAllRSVPs(): RSVPRecord[] {
  ensureDBFile();
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const records = JSON.parse(raw);
    return Array.isArray(records) ? records : [];
  } catch (error) {
    console.error('Error reading RSVP database:', error);
    return [];
  }
}

// Write RSVPs atomically using a temporary file to avoid corrupted writes
function writeRSVPsAtomically(records: RSVPRecord[]): void {
  ensureDBFile();
  const tempFile = path.join(DATA_DIR, `rsvps_${Date.now()}_${Math.random().toString(36).substring(7)}.tmp`);
  const data = JSON.stringify(records, null, 2);
  fs.writeFileSync(tempFile, data, 'utf-8');
  fs.renameSync(tempFile, DB_FILE);
}

// Save or Update RSVP by Mobile Number
export function saveRSVP(
  input: Omit<RSVPRecord, 'id' | 'submittedAt'> & { id?: string }
): RSVPRecord {
  const records = getAllRSVPs();
  const now = new Date().toISOString();

  // Normalize mobile number for deduplication (strip spaces, dashes, leading zeroes)
  const normalizedMobile = input.mobileNumber.replace(/[\s\-\(\)]/g, '');

  const existingIndex = records.findIndex(
    (r) => r.mobileNumber.replace(/[\s\-\(\)]/g, '') === normalizedMobile
  );

  let savedRecord: RSVPRecord;

  if (existingIndex >= 0) {
    // Update existing record
    savedRecord = {
      ...records[existingIndex],
      fullName: input.fullName.trim(),
      mobileNumber: input.mobileNumber.trim(),
      email: input.email?.trim() || undefined,
      attendance: input.attendance,
      attendingEngagement: input.attendingEngagement,
      attendingWedding: input.attendingWedding,
      guestCount: input.attendance === 'declined' ? 0 : Math.max(1, input.guestCount || 1),
      message: input.message?.trim() || undefined,
      updatedAt: now,
    };
    records[existingIndex] = savedRecord;
  } else {
    // Create new record
    savedRecord = {
      id: input.id || `rsvp_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      fullName: input.fullName.trim(),
      mobileNumber: input.mobileNumber.trim(),
      email: input.email?.trim() || undefined,
      attendance: input.attendance,
      attendingEngagement: input.attendingEngagement,
      attendingWedding: input.attendingWedding,
      guestCount: input.attendance === 'declined' ? 0 : Math.max(1, input.guestCount || 1),
      message: input.message?.trim() || undefined,
      submittedAt: now,
    };
    records.unshift(savedRecord);
  }

  writeRSVPsAtomically(records);
  return savedRecord;
}

// Compute aggregate stats for the administration dashboard
export function getRSVPStats(): RSVPStats {
  const records = getAllRSVPs();

  let confirmedEngagementGuests = 0;
  let confirmedWeddingGuests = 0;
  let attendingBoth = 0;
  let attendingEngagementOnly = 0;
  let attendingWeddingOnly = 0;
  let declined = 0;
  let totalSeatsExpected = 0;

  for (const r of records) {
    if (r.attendance === 'declined') {
      declined++;
    } else {
      totalSeatsExpected += r.guestCount;

      if (r.attendance === 'both') {
        attendingBoth++;
        confirmedEngagementGuests += r.guestCount;
        confirmedWeddingGuests += r.guestCount;
      } else if (r.attendance === 'engagement') {
        attendingEngagementOnly++;
        confirmedEngagementGuests += r.guestCount;
      } else if (r.attendance === 'wedding') {
        attendingWeddingOnly++;
        confirmedWeddingGuests += r.guestCount;
      }
    }
  }

  return {
    totalResponses: records.length,
    confirmedEngagementGuests,
    confirmedWeddingGuests,
    attendingBoth,
    attendingEngagementOnly,
    attendingWeddingOnly,
    declined,
    totalSeatsExpected,
  };
}

// Export records to CSV format
export function exportRSVPsToCSV(): string {
  const records = getAllRSVPs();

  const headers = [
    'ID',
    'Full Name',
    'Mobile Number',
    'Email Address',
    'Attendance Status',
    'Attending Engagement',
    'Attending Wedding',
    'Number of Guests',
    'Message / Blessing',
    'Submitted At',
    'Last Updated',
  ];

  const escapeCSV = (val: unknown): string => {
    if (val === null || val === undefined) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = records.map((r) => [
    escapeCSV(r.id),
    escapeCSV(r.fullName),
    escapeCSV(r.mobileNumber),
    escapeCSV(r.email || ''),
    escapeCSV(r.attendance.toUpperCase()),
    escapeCSV(r.attendingEngagement ? 'YES' : 'NO'),
    escapeCSV(r.attendingWedding ? 'YES' : 'NO'),
    escapeCSV(r.guestCount),
    escapeCSV(r.message || ''),
    escapeCSV(new Date(r.submittedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })),
    escapeCSV(r.updatedAt ? new Date(r.updatedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) : ''),
  ]);

  return [headers.join(','), ...rows.map((row) => row.join(','))].join('\r\n');
}
