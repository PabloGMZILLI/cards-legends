import { withGuestOnly } from '@/core/decorators/withGuestOnly';
import { signupHandler } from '@/core/handlers/signup';
import { RequestExecutor } from '@/core/RequestExecutor';

import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const executor = new RequestExecutor()
    .use(withGuestOnly)
    .handle(signupHandler);

  return executor.execute(req);
}
