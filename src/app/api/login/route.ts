import { NextRequest } from 'next/server';
import { RequestExecutor } from '@/core/RequestExecutor';
import { withGuestOnly } from '@/core/decorators/withGuestOnly';
import { loginHandler } from '@/core/handlers/login';


export async function POST(req: NextRequest) {
  const executor = new RequestExecutor()
    .use(withGuestOnly)
    .handle(loginHandler);

  return executor.execute(req);
}
