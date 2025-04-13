import { getPlayersWithDetails } from '@/services/playersService';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const players = await getPlayersWithDetails();
    return NextResponse.json(players);
  } catch (err) {
    console.error('Erro ao buscar jogadores com detalhes:', err);
    return NextResponse.json({ error: 'Erro ao buscar jogadores' }, { status: 500 });
  }
}
