import { NextRequest, NextResponse } from 'next/server';
import { deleteMatch } from '@/services/matchesService';

export async function DELETE(_: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;

  if (!id) {
    return NextResponse.json({ error: 'ID da partida não informado.' }, { status: 400 });
  }

  try {
    await deleteMatch(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Erro ao deletar partida' }, { status: 500 });
  }
}
