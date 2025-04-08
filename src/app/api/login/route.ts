import { withGuestOnly } from '@/core/decorators/withGuestOnly';
import { loginHandler } from '@/core/handlers/login';
import { RequestExecutor } from '@/core/RequestExecutor';

import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const executor = new RequestExecutor()
    .use(withGuestOnly)
    .handle(loginHandler);

  return executor.execute(req);
}
