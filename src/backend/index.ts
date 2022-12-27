import { ApolloServer } from 'apollo-server-micro';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { InMemoryLRUCache } from '@apollo/utils.keyvaluecache';
import { verify } from 'jsonwebtoken';

import schema from './schema';

import mongoose from 'mongoose';

const getAuth = (req: NextApiRequest) => {
  const authorization = req.headers['authorization'];
  const token = authorization?.match(/^Bearer[ ]+([^ ]+)[ ]*$/i)?.[1];
  if (token) {
    const secret = process.env.JWT_SECRET || 'test';
    try {
      const jwt = verify(token, secret);
      if (typeof jwt === 'object' && 'sub' in jwt && typeof jwt.sub === 'string') return jwt.sub;
    } catch (e) {}
  }
  return null;
};

const connect = async () => {
  mongoose.set('strictQuery', false);
  const uri = process.env.MONGO_URI ?? 'mongodb://root:password@localhost';
  const dbName = process.env.MONGO_DB ?? 'database';
  await mongoose.connect(uri, { dbName });
};
connect();

const apolloServer = new ApolloServer({
  schema,
  cache: new InMemoryLRUCache(),
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  context: ({ req, res }: { req: NextApiRequest; res: NextApiResponse }) => {
    const user = getAuth(req);
    return { req, res, user };
  },
});

const startServer = apolloServer.start();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await startServer;
  await apolloServer.createHandler({
    path: req.url,
  })(req, res);
};

export default handler;
export const config = {
  api: {
    bodyParser: false,
  },
};
