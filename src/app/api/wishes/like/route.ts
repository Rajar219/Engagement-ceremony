import { NextRequest, NextResponse } from 'next/server';
import { toggleWishLike } from '@/lib/wishes-db';

export async function POST(req: NextRequest) {
  try {
    const { id, increment } = await req.json();
    if (!id) {
      return NextResponse.json({ success: false, error: 'Wish ID required' }, { status: 400 });
    }

    const updated = toggleWishLike(id, Boolean(increment));
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Wish not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, wish: updated });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Error updating like status' },
      { status: 500 }
    );
  }
}
