import { NextResponse } from 'next/server';
import { deleteNacionality } from '@/services/nacionalityService';

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'ID não fornecido.' }, { status: 400 });
  }

  await deleteNacionality(id);
  return NextResponse.json({ success: true });
}
