import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Anton } from 'next/font/google';

import '@/styles/globals.scss';
import type { AppProps } from 'next/app';

const anton = Anton({ subsets: ['latin'], weight: ['400'] });

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <div className={anton.className}>
          <Component {...pageProps} />
        </div>
      </RecoilRoot>
    </QueryClientProvider>
  );
};

export default App;
