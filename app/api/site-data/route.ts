import { NextResponse } from 'next/server';
import { getSiteData } from '../../../lib/sanity';

export const dynamic = 'force-dynamic';

export async function GET() {
  const data = await getSiteData({ live: true });

  if (!data) {
    return NextResponse.json(
      { error: 'Live site data is not configured or could not be loaded.' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  return NextResponse.json(data, {
    headers: { 'Cache-Control': 'no-store, max-age=0' },
  });
}
