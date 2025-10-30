import { NextRequest, NextResponse } from 'next/server';
import { createTeam, getTeams } from '@/services/teamsService';

export async function GET() {
  try {
    const teams = await getTeams();
    return NextResponse.json(teams);
  } catch (err) {
    console.error('Erro ao buscar times:', err);
    return NextResponse.json({ error: 'Erro ao buscar times.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, logoUrl, regionId } = body;

    if (!name || !logoUrl || !regionId) {
      return NextResponse.json({ error: 'Campos obrigatórios ausentes.' }, { status: 400 });
    }

    await createTeam({
      name,
      logoUrl,
      regionId, 
    });

    return NextResponse.json({ message: 'Time criado com sucesso.' }, { status: 201 });
  } catch (err) {
    console.error('Erro ao criar time:', err);
    return NextResponse.json({ error: 'Erro ao criar time.' }, { status: 500 });
  }
}