import { NextResponse } from 'next/server';
import { getAllNacionalities, createNacionality } from '@/services/nacionalityService';

export async function GET() {
  const nacionalities = await getAllNacionalities();
  return NextResponse.json(nacionalities);
}

export async function POST(req: Request) {
  const { name, icon } = await req.json();

  if (!name || !icon) {
    return NextResponse.json({ error: 'Dados incompletos.' }, { status: 400 });
  }

  const created = await createNacionality(name, icon);
  return NextResponse.json(created);
}
