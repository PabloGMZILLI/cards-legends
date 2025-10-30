import { NextRequest, NextResponse } from 'next/server';
import { deletePlayer, updatePlayer } from '@/services/playersService';

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'ID não fornecido.' }, { status: 400 });
  }

  await deletePlayer(id);
  return NextResponse.json({ success: true });
}

export async function PUT(request: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;

  if (!id) {
    return NextResponse.json({ error: 'ID do jogador não informado.' }, { status: 400 });
  }

  try {
    const body = await request.json();

    const { name, image, role, teamId, nacionalityId } = body;

    if (!name || !image || !role || !teamId || !nacionalityId) {
      return NextResponse.json({ error: 'Dados obrigatórios faltando.' }, { status: 400 });
    }

    await updatePlayer(id, {
      name,
      image,
      role,
      teamId,
      nacionalityId, 
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao atualizar jogador:', error);
    return NextResponse.json({ error: 'Erro ao atualizar jogador.' }, { status: 500 });
  }
}