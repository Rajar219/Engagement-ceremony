import { NextRequest, NextResponse } from 'next/server';
import { isRequestAdmin } from '@/lib/auth';
import { getAllRSVPs, getRSVPStats } from '@/lib/db';

export async function GET(req: NextRequest) {
  if (!isRequestAdmin(req)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized access. Please login as administrator.' },
      { status: 401 }
    );
  }

  try {
    const url = new URL(req.url);
    const search = url.searchParams.get('search')?.toLowerCase() || '';
    const filter = url.searchParams.get('filter') || 'all'; // all, engagement, wedding, both, declined

    let rsvps = getAllRSVPs();

    // Filter by search query (Name or Mobile)
    if (search) {
      rsvps = rsvps.filter(
        (r) =>
          r.fullName.toLowerCase().includes(search) ||
          r.mobileNumber.includes(search) ||
          (r.email && r.email.toLowerCase().includes(search))
      );
    }

    // Filter by attendance category
    if (filter === 'engagement') {
      rsvps = rsvps.filter((r) => r.attendingEngagement && r.attendance !== 'declined');
    } else if (filter === 'wedding') {
      rsvps = rsvps.filter((r) => r.attendingWedding && r.attendance !== 'declined');
    } else if (filter === 'both') {
      rsvps = rsvps.filter((r) => r.attendance === 'both');
    } else if (filter === 'declined') {
      rsvps = rsvps.filter((r) => r.attendance === 'declined');
    }

    const stats = getRSVPStats();

    return NextResponse.json(
      {
        success: true,
        rsvps,
        stats,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching admin RSVPs:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error fetching RSVPs.' },
      { status: 500 }
    );
  }
}
