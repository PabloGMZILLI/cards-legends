import { NextResponse, NextRequest } from 'next/server';
import { getChampionships, createChampionship  } from '@/services/championshipService';

export async function GET() {
  const championships = await getChampionships();
  return NextResponse.json(championships);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { name, split, year, regionId } = body;

    if (!name || !split || !year || !regionId) {
      return NextResponse.json({ error: 'Campos obrigatórios ausentes.' }, { status: 400 });
    }

    await createChampionship({
      name,
      split,
      year: Number(year),
      regionId, 
    });

    return NextResponse.json({ message: 'Campeonato criado com sucesso!' });
  } catch (error) {
    console.error('Erro ao criar campeonato:', error);
    return NextResponse.json({ error: 'Erro ao criar campeonato.' }, { status: 500 });
  }
}