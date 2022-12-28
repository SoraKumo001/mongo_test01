import type { NextApiRequest, NextApiResponse } from 'next';
import { ApolloServer, HeaderMap } from '@apollo/server';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { InMemoryLRUCache } from '@apollo/utils.keyvaluecache';
import { verify } from 'jsonwebtoken';
import schema from './schema';

import mongoose from 'mongoose';
import formidable from 'formidable';

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

const createRequest = (fields: formidable.Fields, file: formidable.Files) => {
  if ('operations' in fields && 'map' in fields) {
    if (typeof fields.operations !== 'string' || typeof fields.map !== 'string') {
      throw 'Upload type error';
    }
    const request = JSON.parse(fields.operations);
    const map: { [key: string]: [string] } = JSON.parse(fields.map);
    Object.entries(map).forEach(([key, [value]]) => {
      value.split('.').reduce((a, b, index, array) => {
        if (array.length - 1 === index) a[b] = file[key];
        else return a[b];
      }, request);
    });
    return request;
  }
  return fields;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await startServer;
  const headers = new HeaderMap();
  Object.entries(req.headers).forEach(([key, value]) => {
    headers.set(key, Array.isArray(value) ? value[0] : value);
  });
  const form = formidable();
  await new Promise<void>((resolve) => {
    form.parse(req, async (_, fields, file) => {
      const user = getAuth(req);
      const request = createRequest(fields, file);
      const result = await apolloServer.executeOperation(request, {
        contextValue: { req, res, user },
      });
      if (result.body.kind === 'single') {
        result.http.headers.forEach((value, key) => {
          res.setHeader(key, value);
        });
        res.json(result.body.singleResult);
      }
      resolve();
    });
  });
};

export default handler;
export const config = {
  api: {
    bodyParser: false,
  },
};
