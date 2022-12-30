import { ApolloServer } from '@apollo/server';
import { NextApiRequest, NextApiResponse } from 'next';
import { createGraphQLRequest, createHeaders, createSearch, getAuth } from './libs/apollo';
import { connect } from './mongodb';
import { schema } from './schema';
import { ApolloServerContext } from './types';

connect();

const apolloServer = new ApolloServer<ApolloServerContext>({
  schema,
});

apolloServer.start();

/**
 * Next.js用APIRouteハンドラ
 */
const apolloHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  //NextApiRequestをGraphQL用のbody形式に変換(multipart/form-data対応)
  const [body, removeFiles] = await createGraphQLRequest(req);
  try {
    const user = getAuth(req);
    const result = await apolloServer.executeHTTPGraphQLRequest({
      httpGraphQLRequest: {
        method: req.method ?? '',
        headers: createHeaders(req),
        search: createSearch(req),
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
    // multipart/form-dataで作成された一時ファイルの削除
    removeFiles();
  }
};

export default apolloHandler;
