import type { AppContext, AppProps } from 'next/app';
import { Suspense } from 'react';
import { SSRProvider } from '../libs/apollo-ssr';
import { AuthApolloProvider } from '../libs/apollo-auth';
import { parse } from 'cookie';

const endpoint = '/api/graphql';
const uri =
  typeof window === 'undefined'
    ? `${
        process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'
      }${endpoint}`
    : endpoint;

const App = ({ Component, pageProps, token }: AppProps & { token: string }) => {
  return (
    <AuthApolloProvider uri={uri} token={token}>
      <SSRProvider>
        <Suspense fallback={'Loading'}>
          <Component {...pageProps} />
        </Suspense>
      </SSRProvider>
    </AuthApolloProvider>
  );
};

App.getInitialProps = (context: AppContext) => {
  const cookies = parse(context.ctx.req?.headers.cookie || '');
  return { pageProps: {}, token: cookies.token };
};

export default App;
