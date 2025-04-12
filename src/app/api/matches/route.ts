import { NextRequest, NextResponse } from 'next/server';
import { getMatches, createMatch } from '@/services/matchesService';

export async function GET() {
  try {
    const matches = await getMatches();
    return NextResponse.json(matches);
  } catch {
    return NextResponse.json({ error: 'Erro ao buscar partidas' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await createMatch(body);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Erro ao criar partida' }, { status: 500 });
  }
}
