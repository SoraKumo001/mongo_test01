import type { NextApiRequest, NextApiResponse } from 'next';

export type ApolloServerContext = { req: NextApiRequest; res: NextApiResponse; user?: string };
