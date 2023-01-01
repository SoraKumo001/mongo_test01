import {
  ApolloCache,
  ApolloClient,
  ApolloLink,
  gql,
  InMemoryCache,
  useApolloClient,
  useQuery,
} from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { useCallback, useMemo } from 'react';

const QUERY_TOKEN = gql`
  query {
    token @client
  }
`;
const setAuthToken = <T,>(cache: ApolloCache<T>, token: string | undefined) => {
  cache.writeQuery({ query: QUERY_TOKEN, data: { token: token ?? null } });
};
const getAuthToken = <T,>(cache: ApolloCache<T>) => {
  return cache.readQuery<{ token?: string }>({ query: QUERY_TOKEN })?.token ?? undefined;
};

/**
 * 認証トークンの設定
 */
export const useAuthToken = () => {
  const client = useApolloClient();
  const dispatch = useCallback(
    (token?: string) => {
      client.clearStore().then(() => {
        setAuthToken(client.cache, token);
        client.reFetchObservableQueries();
      });
    },
    [client]
  );
  return dispatch;
};
/**
 * 認証情報の取得
 */
export const useAuthInfo = () => {
  const { data } = useQuery(QUERY_TOKEN);
  const token = data?.token;
  const info = useMemo(() => {
    try {
      if (token) {
        return jwtDecode(token) as JwtPayload & { name: string };
      }
    } catch (_) {}
    return undefined;
  }, [token]);
  return info;
};

/**
 * ApolloClient作成
 * uploadLinkとToken管理機能を追加
 */

export const createApolloClient = ({ uri, token }: { uri: string; token?: string }) => {
  const uploadLink = createUploadLink({
    uri,
    headers: { 'apollo-require-preflight': 'true' },
  }) as unknown as ApolloLink;

  const authLink = new ApolloLink((operation, forward) => {
    const token = getAuthToken(operation.getContext().cache);
    if (token) {
      operation.setContext({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return forward(operation);
  });

  const client = new ApolloClient({
    link: ApolloLink.from([authLink, uploadLink]),
    cache: new InMemoryCache(),
  });
  setAuthToken(client.cache, token);
  return client;
};
