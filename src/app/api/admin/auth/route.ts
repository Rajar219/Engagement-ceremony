import { NextRequest, NextResponse } from 'next/server';
import { checkAdminPassword, createAdminToken, ADMIN_COOKIE_NAME } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    if (!checkAdminPassword(password)) {
      return NextResponse.json(
        { success: false, error: 'Incorrect administrator password or PIN.' },
        { status: 401 }
      );
    }

    const token = createAdminToken();

    const response = NextResponse.json(
      { success: true, message: 'Authentication successful.' },
      { status: 200 }
    );

    // Set secure HTTP-only cookie
    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Authentication failed.' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json(
    { success: true, message: 'Logged out successfully.' },
    { status: 200 }
  );

  response.cookies.delete(ADMIN_COOKIE_NAME);
  return response;
}
