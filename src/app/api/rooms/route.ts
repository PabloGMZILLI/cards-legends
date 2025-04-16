import { NextRequest } from 'next/server';
import { RequestExecutor } from '@/core/RequestExecutor';
import { withAuth } from '@/core/decorators/withAuth';
import { createRoomHandler, getAllRoomsHandler } from '@/core/handlers/roomHandler';

export async function POST(req: NextRequest) {
  const executor = new RequestExecutor()
    .use(withAuth)
    .handle(createRoomHandler);

  return executor.execute(req);
}

export async function GET(req: NextRequest) {
  const executor = new RequestExecutor()
    .use(withAuth)
    .handle(getAllRoomsHandler);

  return executor.execute(req);
}