import type { NextApiRequest, NextApiResponse } from 'next';
import { ApolloServer, HeaderMap } from '@apollo/server';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { InMemoryLRUCache } from '@apollo/utils.keyvaluecache';
import { verify } from 'jsonwebtoken';
import { parse } from 'url';
import getRawBody from 'raw-body';

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

type ApolloContext = { req: NextApiRequest; res: NextApiResponse; user?: string };

const apolloServer = new ApolloServer<ApolloContext>({
  schema,
  cache: new InMemoryLRUCache(),
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
});

const startServer = apolloServer.start();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await startServer;
  const headers = new HeaderMap();
  Object.entries(req.headers).forEach(([key, value]) => {
    headers.set(key, Array.isArray(value) ? value[0] : value);
  });
  const body = JSON.parse((await getRawBody(req)).toString());
  const result = await apolloServer.executeHTTPGraphQLRequest({
    httpGraphQLRequest: {
      method: req.method.toUpperCase(),
      headers: headers,
      body,
      search: parse(req.url).search ?? '',
    },
    context: async () => {
      const user = getAuth(req);
      return { req, res, user };
    },
  });
  if (result.body.kind === 'complete') {
    res.end(result.body.string);
  } else {
    for await (const chunk of result.body.asyncIterator) {
      res.write(chunk);
      if (typeof (res as any).flush === 'function') {
        (res as any).flush();
      }
    }
    res.end();
  }
};

export default handler;
export const config = {
  api: {
    bodyParser: false,
  },
};
