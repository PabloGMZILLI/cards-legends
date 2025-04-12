import { createRegion, getAllRegions } from '@/services/regionsService';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { name, icon } = await req.json();
    if (!name || !icon) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

    const docRef = await createRegion(name, icon);
    return NextResponse.json({ id: docRef.id }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const regions = await getAllRegions();
    return NextResponse.json(regions);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch regions' }, { status: 500 });
  }
}
