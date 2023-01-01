import { ssrExchange, cacheExchange } from '@urql/core';
import { multipartFetchExchange } from '@urql/exchange-multipart-fetch';
import { parse } from 'cookie';
import { useState } from 'react';
import { createClient, Provider } from 'urql';
import { AuthProvider } from '../libs/auth-provider';
import { getSSRData, promiseExchange, SSRProvider } from '../libs/urql-ssr';
import type { AppContext, AppProps } from 'next/app';

const endpoint = '/api/graphql';
const url =
  typeof window === 'undefined'
    ? `${
        process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'
      }${endpoint}`
    : endpoint;

const isServerSide = typeof window === 'undefined';

const ssr = ssrExchange({
  isClient: !isServerSide,
  // SSRに必要な初期データの設定
  initialState: getSSRData(),
});

const App = ({ Component, pageProps, initToken }: AppProps & { initToken?: string }) => {
  const [token, setAuthToken] = useState(initToken);
  const headers: HeadersInit = { 'apollo-require-preflight': 'true' };
  if (token) headers['authorization'] = `Bearer ${token}`;
  const client = createClient({
    url,
    fetchOptions: {
      headers,
    },
    // Server側のみ'throw promise'を行う
    suspense: isServerSide,
    exchanges: [
      cacheExchange,
      ssr,
      // promiseExchangeでSSRに必要な待機作業を行う
      promiseExchange,
      multipartFetchExchange,
    ],
  });
  return (
    <Provider value={client}>
      {/* SSR用データ収集機能の追加 */}
      <SSRProvider ssr={ssr}>
        <AuthProvider value={{ token, setAuthToken }}>
          <Component {...pageProps} />
        </AuthProvider>
      </SSRProvider>
    </Provider>
  );
};

App.getInitialProps = (context: AppContext) => {
  const cookies = parse(context.ctx.req?.headers.cookie || '');
  return { pageProps: {}, initToken: cookies.token };
};

export default App;
