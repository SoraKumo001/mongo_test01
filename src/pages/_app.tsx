import { ApolloProvider } from '@apollo/client';
import { parse } from 'cookie';
import { Suspense } from 'react';
import { createApolloClient } from '../libs/apollo-auth';
import { SSRCache, SSRProvider } from '../libs/apollo-ssr';
import type { AppContext, AppProps } from 'next/app';

const endpoint = '/api/graphql';
const uri =
  typeof window === 'undefined'
    ? `${
        process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'
      }${endpoint}`
    : endpoint;

const App = ({ Component, pageProps, token }: AppProps & { token: string }) => {
  const client = createApolloClient({ uri, token });
  return (
    <ApolloProvider client={client} suspenseCache={new SSRCache()}>
      <SSRProvider>
        <Suspense fallback={'Loading'}>
          <Component {...pageProps} />
        </Suspense>
      </SSRProvider>
    </ApolloProvider>
  );
};

App.getInitialProps = (context: AppContext) => {
  const cookies = parse(context.ctx.req?.headers.cookie || '');
  return { pageProps: {}, token: cookies.token };
};

export default App;
