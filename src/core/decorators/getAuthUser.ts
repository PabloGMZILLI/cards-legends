import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { NextRequest } from 'next/server';

 
export async function getAuthUser(_req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.uid) {
    throw new Error('Unauthorized: No session or uid');
  }

  return session.user;
}
