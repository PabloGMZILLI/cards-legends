import { NextRequest, NextResponse } from 'next/server';
import { getPlayersByTeam } from '@/services/playersService';

export async function GET(_: NextRequest, context: { params: { teamId: string } }) {
  const { teamId } = context.params;

  if (!teamId) {
    return NextResponse.json({ error: 'ID do time não informado' }, { status: 400 });
  }

  try {
    const players = await getPlayersByTeam(teamId);
    return NextResponse.json(players);
  } catch (error) {
    console.error('Erro ao buscar jogadores por time:', error);
    return NextResponse.json({ error: 'Erro ao buscar jogadores' }, { status: 500 });
  }
}
