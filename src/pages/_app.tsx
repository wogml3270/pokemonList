import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';

import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import useScrollResotration from '@/hooks/useScrollRestoration';

const queryClient = new QueryClient();

const App = ({ Component, pageProps, router }: AppProps) => {
  useScrollResotration(router);

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </QueryClientProvider>
  );
};

export default App;
