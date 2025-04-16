import { NextRequest } from 'next/server';
import { RequestExecutor } from '@/core/RequestExecutor';
import { updateRoomHandler, getRoomByIdHandler } from '@/core/handlers/roomHandler';
import { withAuth } from '@/core/decorators/withAuth';

export async function GET(req: NextRequest) {
  const executor = new RequestExecutor()
    .use(withAuth)
    .handle(getRoomByIdHandler);

  return executor.execute(req);
}

export async function PATCH(req: NextRequest) {
  const executor = new RequestExecutor()
    .use(withAuth)
    .handle(updateRoomHandler);

  return executor.execute(req);
}