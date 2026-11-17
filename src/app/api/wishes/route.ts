import { NextRequest, NextResponse } from 'next/server';
import { getAllWishes, saveWish } from '@/lib/wishes-db';

export async function GET() {
  try {
    const wishes = getAllWishes();
    const approvedWishes = wishes.filter((w) => w.approved !== false);
    return NextResponse.json({ success: true, wishes: approvedWishes });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to load guest blessings' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, relation, message } = body;

    if (!name || !message) {
      return NextResponse.json(
        { success: false, error: 'Name and blessing message are required.' },
        { status: 400 }
      );
    }

    const result = saveWish({ name, relation, message });
    if (result.error) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    return NextResponse.json({ success: true, wish: result.wish }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred while saving your wish.' },
      { status: 500 }
    );
  }
}
