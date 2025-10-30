import { NextResponse, NextRequest } from 'next/server';
import { getRounds, createRound  } from '@/services/roundService';

export async function GET() {
  const championships = await getRounds();
  return NextResponse.json(championships);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, roundNumber, startDate, endDate, championshipId } = body;

    if (!name || !roundNumber || !startDate || !endDate || !championshipId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await createRound({
      name,
      roundNumber,
      startDate,
      endDate,
      championshipId, 
    });

    return NextResponse.json({ message: 'Round created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error creating round:', error);
    return NextResponse.json({ error: 'Failed to create round' }, { status: 500 });
  }
}