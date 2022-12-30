import { createUploadLink } from 'apollo-upload-client';
import { createContext, ReactNode, useContext, useMemo, useRef, useState } from 'react';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { SSRCache } from './apollo-ssr';

type AuthDispatch = (_: string | undefined) => void;
type AuthType = { token?: string; info?: JwtPayload & { name: string }; setToken: AuthDispatch };

const AuthContext = createContext<AuthType>(undefined as never);
export const useAuth = () => useContext(AuthContext);

export const AuthApolloProvider = ({
  uri,
  token: initToken,
  children,
}: {
  uri: string;
  token?: string;
  children: ReactNode;
}) => {
  const property = useRef<{ client?: ApolloClient<NormalizedCacheObject>; ssrCache?: SSRCache }>(
    {}
  ).current;
  const [token, setToken] = useState<string | undefined>(() => {
    return initToken;
  });
  const info = useMemo(() => {
    try {
      if (token) {
        return jwtDecode(token) as JwtPayload & { name: string };
      }
    } catch (_) {}
    return undefined;
  }, [token]);
  const refToken = useRef(token);

  if (!property.client) {
    property.ssrCache = new SSRCache();
    const uploadLink = createUploadLink({
      uri,
      headers: { 'apollo-require-preflight': 'true' },
    }) as unknown as ApolloLink;
    const authLink = new ApolloLink((operation, forward) => {
      const token = refToken.current;
      if (token) {
        operation.setContext({
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      return forward(operation);
    });

    property.client = new ApolloClient({
      link: ApolloLink.from([authLink, uploadLink]),
      cache: new InMemoryCache(),
    });
  }

  if (refToken.current !== token) {
    refToken.current = token;
    property.client.resetStore();
  }
  return (
    <AuthContext.Provider value={{ token, info, setToken }}>
      <ApolloProvider client={property.client} suspenseCache={property.ssrCache}>
        {children}
      </ApolloProvider>
    </AuthContext.Provider>
  );
};
