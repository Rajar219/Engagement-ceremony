import fs from 'fs';
import path from 'path';
import type { Wish } from '@/types';

const DATA_DIR = path.join(process.cwd(), 'data');
const WISHES_FILE = path.join(DATA_DIR, 'wishes.json');

const INITIAL_HISTORICAL_WISHES: Wish[] = [
  {
    id: 'wish_historical_1',
    name: 'Mr. V. Gnanasekar & Mrs. G. Meena',
    relation: "Groom's Parents",
    message: 'May the Divine Almighty shower Vallalarasu & Priyanka with boundless love, eternal peace, harmonious companionship, and joy throughout their sacred journey together.',
    likes: 42,
    approved: true,
    createdAt: '2026-11-10T10:00:00Z',
  },
  {
    id: 'wish_historical_2',
    name: 'Mr. S. Kabali & Mrs. K. Sumathi',
    relation: "Bride's Parents",
    message: 'Wishing our dearest daughter Priyanka and dear son-in-law Vallalarasu a blessed lifetime of shared dreams, laughter, respect, and auspicious prosperity.',
    likes: 45,
    approved: true,
    createdAt: '2026-11-10T11:30:00Z',
  },
  {
    id: 'wish_historical_3',
    name: 'Family Elders & Well-wishers',
    relation: 'Family & Friends',
    message: 'Heartiest congratulations and loving blessings to the wonderful couple! Looking forward with immense happiness to celebrate your Engagement on Sunday, December 13th, 2026.',
    likes: 29,
    approved: true,
    createdAt: '2026-11-12T09:15:00Z',
  },
];

function ensureWishesFile(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(WISHES_FILE)) {
    fs.writeFileSync(WISHES_FILE, JSON.stringify(INITIAL_HISTORICAL_WISHES, null, 2), 'utf-8');
  }
}

export function getAllWishes(): Wish[] {
  ensureWishesFile();
  try {
    const raw = fs.readFileSync(WISHES_FILE, 'utf-8');
    const records = JSON.parse(raw);
    if (!Array.isArray(records) || records.length === 0) {
      // Re-seed if empty
      fs.writeFileSync(WISHES_FILE, JSON.stringify(INITIAL_HISTORICAL_WISHES, null, 2), 'utf-8');
      return INITIAL_HISTORICAL_WISHES;
    }
    return records;
  } catch (error) {
    console.error('Error reading wishes database:', error);
    return INITIAL_HISTORICAL_WISHES;
  }
}

function writeWishesAtomically(records: Wish[]): void {
  ensureWishesFile();
  const tempFile = path.join(
    DATA_DIR,
    `wishes_${Date.now()}_${Math.random().toString(36).substring(7)}.tmp`
  );
  fs.writeFileSync(tempFile, JSON.stringify(records, null, 2), 'utf-8');
  fs.renameSync(tempFile, WISHES_FILE);
}

// Basic spam/profanity check
const SPAM_PATTERNS = [
  /\b(viagra|cialis|casino|crypto|bitcoin|forex|lottery|poker|porn|xxx)\b/i,
  /https?:\/\/[\S]+/i, // Disallow links in public blessings to prevent spam
];

export function moderateContent(text: string): { isSafe: boolean; reason?: string } {
  for (const pattern of SPAM_PATTERNS) {
    if (pattern.test(text)) {
      return { isSafe: false, reason: 'Message contains prohibited promotional content or external links.' };
    }
  }
  return { isSafe: true };
}

export function saveWish(input: {
  name: string;
  relation?: string;
  message: string;
}): { wish?: Wish; error?: string } {
  const cleanName = input.name.trim();
  const cleanMessage = input.message.trim();
  const cleanRelation = (input.relation || 'Well-wisher').trim();

  if (cleanName.length < 2 || cleanName.length > 70) {
    return { error: 'Please enter a name between 2 and 70 characters.' };
  }

  if (cleanMessage.length < 5 || cleanMessage.length > 500) {
    return { error: 'Blessing message must be between 5 and 500 characters.' };
  }

  const moderation = moderateContent(cleanMessage);
  if (!moderation.isSafe) {
    return { error: moderation.reason || 'Message failed moderation check.' };
  }

  const records = getAllWishes();

  const newWish: Wish = {
    id: `wish_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
    name: cleanName,
    relation: cleanRelation,
    message: cleanMessage,
    likes: 1,
    approved: true,
    createdAt: new Date().toISOString(),
  };

  // Place user wishes right after family pinned wishes, or at top
  records.unshift(newWish);
  writeWishesAtomically(records);

  return { wish: newWish };
}

export function toggleWishLike(id: string, increment: boolean): Wish | null {
  const records = getAllWishes();
  const index = records.findIndex((w) => w.id === id);
  if (index === -1) return null;

  records[index].likes = Math.max(0, records[index].likes + (increment ? 1 : -1));
  writeWishesAtomically(records);
  return records[index];
}
