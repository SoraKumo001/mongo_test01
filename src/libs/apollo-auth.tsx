import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from 'apollo-upload-client';
import { createContext, ReactNode, useContext, useMemo, useRef, useState } from 'react';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  createHttpLink,
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
  const property = useRef<{ client?: ApolloClient<NormalizedCacheObject> }>({}).current;
  const [token, setToken] = useState<string>(() => {
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
    const uploadLink = createUploadLink({ uri, fetch }) as unknown as ApolloLink;
    const authLink = setContext(() => {
      const token = refToken.current;
      return (
        token && {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }).concat(uploadLink);

    property.client = new ApolloClient({
      uri,
      link: ApolloLink.from([authLink, createHttpLink({ uri })]),
      cache: new InMemoryCache(),
    });
  }

  if (refToken.current !== token) {
    refToken.current = token;
    property.client.resetStore();
  }
  return (
    <AuthContext.Provider value={{ token, info, setToken }}>
      <ApolloProvider client={property.client} suspenseCache={new SSRCache()}>
        {children}
      </ApolloProvider>
    </AuthContext.Provider>
  );
};
