import { RecoilRoot } from "recoil";
import { QueryClientProvider } from "./providers";
import { queryClient } from "./providers";

import { Anton } from "next/font/google";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";

const anton = Anton({ subsets: ["latin"], weight: ["400"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <div className={anton.className}>
          <Component {...pageProps} />
        </div>
      </RecoilRoot>
    </QueryClientProvider>
  );
}
