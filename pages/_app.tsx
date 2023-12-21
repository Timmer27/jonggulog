import type { AppProps } from "next/app";
import { ThemeProvider } from "@material-tailwind/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "../styles/globals.css";
import PageHeader from "../components/pageHeader";

// 인스턴스 생성
const queryClient = new QueryClient();
const App = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      <ThemeProvider>
        <PageHeader />
        <Component {...pageProps} />
        {/* <PageFooter /> */}
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
