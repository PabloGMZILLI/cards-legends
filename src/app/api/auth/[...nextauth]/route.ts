import { authOptions } from '@/lib/authOptions';
import { CustomUser } from '@/types';
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: CustomUser;
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
