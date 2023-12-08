import type { AppProps } from "next/app";
import "../styles/globals.css";
import PageHeader from "../components/PageHeader";
import PageFooter from "../components/pageFooter";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <div>
      <PageHeader />
      <Component className="mt-12" {...pageProps} />
      <PageFooter />
    </div>
  );
};

export default App;
