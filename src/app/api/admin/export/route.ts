import { NextRequest, NextResponse } from 'next/server';
import { isRequestAdmin } from '@/lib/auth';
import { exportRSVPsToCSV } from '@/lib/db';

export async function GET(req: NextRequest) {
  if (!isRequestAdmin(req)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized. Admin credentials required to export.' },
      { status: 401 }
    );
  }

  try {
    const csvData = exportRSVPsToCSV();
    const filename = `VP_RSVP_Responses_${new Date().toISOString().split('T')[0]}.csv`;

    return new NextResponse(csvData, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to export CSV.' },
      { status: 500 }
    );
  }
}
