import { getSessionCookie } from '@/utils/cookies';

export type AuthContext = {
  token: string | undefined | null;
};

export const withAuth = async <T>(
  handler: (ctx: AuthContext) => Promise<T>,
): Promise<T> => {
  const token = await getSessionCookie();
  return handler({ token });
};
