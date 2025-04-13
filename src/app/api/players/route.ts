// src/app/api/players/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getPlayers, createPlayer } from '@/services/playersService';

export async function GET() {
  try {
    const players = await getPlayers();
    return NextResponse.json(players);
  } catch (error) {
    console.error('Erro ao buscar jogadores:', error);
    return NextResponse.json({ error: 'Erro ao buscar jogadores' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newPlayer = await createPlayer(body);

    return NextResponse.json(newPlayer, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar jogador:', error);

    return NextResponse.json({ error: 'Erro ao criar jogador' }, { status: 500 });
  }
}
