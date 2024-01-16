import type { AppProps } from "next/app";
import { ThemeProvider } from "@material-tailwind/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "../styles/globals.css";
import PageHeader from "../components/pageHeader";

// 인스턴스 생성
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      retry: false,
      staleTime: Infinity,
      cacheTime: Infinity
    }
  }
});
const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      <ThemeProvider>
        <PageHeader />
        <Component {...pageProps} />
        {/* <PageFooter /> */}
      </ThemeProvider>
      {/* visitor analytics */}
      <Analytics />
      {/* speed insight */}
      <SpeedInsights />
    </QueryClientProvider>
  );
};

export default App;
