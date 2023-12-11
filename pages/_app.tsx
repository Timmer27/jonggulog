import type { AppProps } from "next/app";
import { ThemeProvider } from "@material-tailwind/react";
import "../styles/globals.css";
import PageFooter from "../components/pageFooter";
import PageHeader from "../components/pageHeader";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider>
      <PageHeader />
      <Component {...pageProps} />
      <PageFooter />
    </ThemeProvider>
  );
};

export default App;
