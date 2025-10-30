import { NextRequest, NextResponse } from 'next/server';
import { createRoom, updateRoom } from '@/services/roomService';
import { getAuthUser } from '../decorators/getAuthUser';
import { getRoomByIdService, getAllRoomsService } from '@/services/roomService';

export async function createRoomHandler(req: NextRequest) {
  const user = await getAuthUser(req);

  const body = await req.json();
  const { name, region, roundIds, maxPlayers } = body;

  if (!name || !region || !roundIds?.length || !maxPlayers) {
    return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 });
  }

  const id = await createRoom(user, {
    name,
    region,
    roundIds,
    maxPlayers,
  });

  return NextResponse.json({ id }, { status: 201 });
}

export async function getRoomByIdHandler(req: NextRequest) {
  const url = new URL(req.url);
  const roomId = url.pathname.split('/').pop();

  if (!roomId) {
    return NextResponse.json({ error: 'Room ID não informado' }, { status: 400 });
  }

  try {
    const room = await getRoomByIdService(roomId);
    if (!room) {
      return NextResponse.json({ error: 'Sala não encontrada' }, { status: 404 });
    }
    return NextResponse.json(room, { status: 200 });
  } catch (err) {
    console.error('Erro ao buscar sala:', err);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}

export async function updateRoomHandler(req: NextRequest) {
  const url = new URL(req.url);
  const roomId = url.pathname.split('/').pop();

  if (!roomId) {
    return NextResponse.json({ error: 'ID da sala não informado' }, { status: 400 });
  }

  try {
    const partial = await req.json();
    const updatedRoom = await updateRoom(roomId, partial);
    return NextResponse.json(updatedRoom, { status: 200 });
  } catch (error) {
    console.error('Erro ao atualizar sala:', error);
    return NextResponse.json({ error: 'Erro interno ao atualizar sala' }, { status: 500 });
  }
}

export async function getAllRoomsHandler() {
  try {
    const rooms = await getAllRoomsService();
    return NextResponse.json(rooms, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar salas:', error);
    return NextResponse.json({ error: 'Erro ao buscar salas' }, { status: 500 });
  }
}