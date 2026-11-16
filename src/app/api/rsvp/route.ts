import { NextRequest, NextResponse } from 'next/server';
import { saveRSVP, RSVPRecord } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      fullName,
      mobileNumber,
      email,
      attendance,
      attendingEngagement,
      attendingWedding,
      guestCount,
      message,
    } = body;

    // 1. Validate Full Name
    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: 'Please provide your full name (at least 2 characters).' },
        { status: 400 }
      );
    }

    // 2. Validate Mobile Number
    const cleanedMobile = (mobileNumber || '').toString().replace(/[\s\-\(\)]/g, '');
    if (!cleanedMobile || cleanedMobile.length < 8 || !/^\+?[0-9]{8,15}$/.test(cleanedMobile)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid mobile number (8-15 digits).' },
        { status: 400 }
      );
    }

    // 3. Validate Optional Email
    if (email && typeof email === 'string' && email.trim().length > 0) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        return NextResponse.json(
          { success: false, error: 'Please enter a valid email address.' },
          { status: 400 }
        );
      }
    }

    // 4. Validate Attendance Option
    const validAttendances = ['both', 'engagement', 'wedding', 'declined'];
    if (!attendance || !validAttendances.includes(attendance)) {
      return NextResponse.json(
        { success: false, error: 'Please select whether you will attend the celebrations.' },
        { status: 400 }
      );
    }

    // 5. Determine boolean flags based on selection
    const isAttendingEngagement = attendance === 'both' || attendance === 'engagement' || Boolean(attendingEngagement);
    const isAttendingWedding = attendance === 'both' || attendance === 'wedding' || Boolean(attendingWedding);

    // 6. Validate Guest Count
    let validatedGuestCount = 0;
    if (attendance !== 'declined') {
      const parsedCount = parseInt(guestCount, 10);
      if (isNaN(parsedCount) || parsedCount < 1 || parsedCount > 50) {
        return NextResponse.json(
          { success: false, error: 'Please specify the number of guests attending (between 1 and 50).' },
          { status: 400 }
        );
      }
      validatedGuestCount = parsedCount;
    }

    // 7. Persist to Database
    const saved = saveRSVP({
      fullName: fullName.trim(),
      mobileNumber: cleanedMobile,
      email: email?.trim() || undefined,
      attendance,
      attendingEngagement: isAttendingEngagement,
      attendingWedding: isAttendingWedding,
      guestCount: validatedGuestCount,
      message: message?.trim() || undefined,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'RSVP successfully confirmed and saved.',
        rsvp: {
          id: saved.id,
          fullName: saved.fullName,
          attendance: saved.attendance,
          attendingEngagement: saved.attendingEngagement,
          attendingWedding: saved.attendingWedding,
          guestCount: saved.guestCount,
          submittedAt: saved.submittedAt,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('RSVP API submission error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to record your RSVP. Please try again.' },
      { status: 500 }
    );
  }
}
