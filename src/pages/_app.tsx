import { ThemeProvider } from "@emotion/react";
import type { AppProps } from "next/app";
import { createTheme } from "@mui/material";
import DefaultLayout from "@/layout/DefaultLayout";
import { wrapper } from "@/app/store";
import "@/styles/globals.css";

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
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </ThemeProvider>
  );
};
export default wrapper.withRedux(App);
