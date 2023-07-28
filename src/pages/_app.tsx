import { ThemeProvider } from "@emotion/react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { createTheme } from "@mui/material";
import DefaultLayout from "@/layout/DefaultLayout";
import { store } from "@/app/store";
import "@/styles/globals.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#009D9D",
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      </ThemeProvider>
    </Provider>
  );
}
