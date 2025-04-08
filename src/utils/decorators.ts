import { withAuth } from './withAuth';

export const requireAuth = async <T>(handler: (ctx: any) => Promise<T>) => {
  return withAuth(async (ctx) => {
    if (!ctx.token) {
      throw new Error('Unauthorized');
    }
    return handler(ctx);
  });
};

export const requireGuest = async <T>(handler: (ctx: any) => Promise<T>) => {
  return withAuth(async (ctx) => {
    if (ctx.token) {
      throw new Error('Already logged in');
    }
    return handler(ctx);
  });
};
