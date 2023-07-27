import { getUserFromToken } from "@/app/features/users/usersApi";
import { useAppDispatch } from "@/app/hooks";
import { store } from "@/app/store";
import DefaultLayout from "@/layout/DefaultLayout";
import "@/styles/globals.css";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { Provider } from "react-redux";

function WrapperApp({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("token");
      if (token) {
        await dispatch(getUserFromToken(token));
      }
    }
    fetchData();
  }, [dispatch]);

  return <>{children}</>;
}

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
        <WrapperApp>
          <DefaultLayout>
            <Component {...pageProps} />
          </DefaultLayout>
        </WrapperApp>
      </ThemeProvider>
    </Provider>
  );
}
