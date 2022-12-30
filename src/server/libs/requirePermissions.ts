import { Resolver } from 'graphql-compose';

export const requirePermissions = (
  resolvers: Record<string, Resolver>
): Record<string, Resolver> => {
  Object.entries(resolvers).forEach(([key, value]) => {
    resolvers[key] = value.wrapResolve((next) => async (rp) => {
      const user: string | null = rp.context.user;
      if (!user) throw new Error('auth error');
      return next(rp);
    });
  });

  return resolvers;
};
