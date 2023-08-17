import { ThemeProvider } from "@emotion/react";
import type { AppProps } from "next/app";
import { createTheme } from "@mui/material";
import DefaultLayout from "@/layout/DefaultLayout";
import { wrapper } from "@/app/store";
import "@/styles/globals.css";
import { MathJaxContext } from "better-react-mathjax";
// import ErrorBoundary from "@/components/ErrorBoundary";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "@/components/ErrorFallback";

const theme = createTheme({
  palette: {
    primary: {
      main: "#009D9D",
    },
  },
});

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary fallbackRender={ErrorFallback}>
        <DefaultLayout>
          <MathJaxContext>
            <Component {...pageProps} />
          </MathJaxContext>
        </DefaultLayout>
      </ErrorBoundary>
    </ThemeProvider>
  );
};
export default wrapper.withRedux(App);
