import { NextRequest, NextResponse } from 'next/server';
import { deleteRound } from '@/services/roundService';

export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
  try {
    const { id } = context.params;

    if (!id) {
      return NextResponse.json({ error: 'ID da rodada não informado.' }, { status: 400 });
    }
    await deleteRound(id);

    return NextResponse.json({ message: 'Rodada deletada com sucesso.' });
  } catch (error) {
    console.error('Erro ao deletar rodada:', error);
    return NextResponse.json({ error: 'Erro interno ao deletar rodada.' }, { status: 500 });
  }
}