import { parse } from 'url';
import { promises as fs } from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ApolloServer, GraphQLRequest, HeaderMap } from '@apollo/server';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { verify } from 'jsonwebtoken';
import formidable from 'formidable';
import { schema } from '../schema';
import type { ApolloServerContext } from '../types';

const apolloServer = new ApolloServer<ApolloServerContext>({
  schema,
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
});

apolloServer.start();

/**
 * authorizationヘッダからBearerトークンを取得する
 */
const getAuth = (req: NextApiRequest) => {
  const authorization = req.headers['authorization'];
  const token = authorization?.match(/^Bearer[ ]+([^ ]+)[ ]*$/i)?.[1];
  if (token) {
    const secret = process.env.JWT_SECRET ?? '';
    try {
      const jwt = verify(token, secret);
      if (typeof jwt === 'object' && 'sub' in jwt && typeof jwt.sub === 'string') return jwt.sub;
    } catch (e) {}
  }
  return undefined;
};

/**
 * GraphQLのリクエストをmultipart/form-data 対応にする
 *
 * Response
 * [executeHTTPGraphQLRequestに設定するbody,一時ファイル削除用ファンクション]
 */
const createGraphQLRequest = (req: NextApiRequest) => {
  const form = formidable();
  return new Promise<[GraphQLRequest, () => void]>((resolve, reject) => {
    form.parse(req, async (_, fields, files) => {
      if (!req.headers['content-type']?.match(/^multipart\/form-data/)) {
        resolve([fields, () => {}]);
      } else {
        if (
          'operations' in fields &&
          'map' in fields &&
          typeof fields.operations === 'string' &&
          typeof fields.map === 'string'
        ) {
          const request = JSON.parse(fields.operations);
          const map: { [key: string]: [string] } = JSON.parse(fields.map);
          Object.entries(map).forEach(([key, [value]]) => {
            value.split('.').reduce((a, b, index, array) => {
              if (array.length - 1 === index) a[b] = files[key];
              else return a[b];
            }, request);
          });
          const removeFiles = () => {
            Object.values(files).forEach((file) => {
              if (Array.isArray(file)) {
                file.forEach(({ filepath }) => {
                  fs.rm(filepath);
                });
              } else {
                fs.rm(file.filepath);
              }
            });
          };
          resolve([request, removeFiles]);
        } else {
          reject(Error('multipart type error'));
        }
      }
    });
  });
};

export const apolloHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const headers = new HeaderMap();
  Object.entries(req.headers).forEach(([key, value]) => {
    headers.set(key, (Array.isArray(value) ? value[0] : value) ?? '');
  });
  const [body, removeFiles] = await createGraphQLRequest(req);
  try {
    const user = getAuth(req);
    const result = await apolloServer.executeHTTPGraphQLRequest({
      httpGraphQLRequest: {
        method: req.method ?? '',
        headers,
        search: parse(req.url ?? '').search ?? '',
        body,
      },
      context: async () => ({ req, res, user }),
    });
    if (result.body.kind === 'complete') {
      res.end(result.body.string);
    } else {
      for await (const chunk of result.body.asyncIterator) {
        res.write(chunk);
      }
      res.end();
    }
  } finally {
    removeFiles();
  }
};
