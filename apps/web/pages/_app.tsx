import Layout from "../components/layout";

import "../styles/global.css";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { purple } from "@mui/material/colors";
import { store } from "../store";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const theme = createTheme({
  palette: {
    primary: {
      main: purple[900],
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          fontWeight: 600,
        },
      },
    },
  },
});

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  return (
    <>
      <Provider store={store}>
          <ThemeProvider theme={theme}>
            <SnackbarProvider maxSnack={3}>
              <CssBaseline />
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </SnackbarProvider>
          </ThemeProvider>
      </Provider>
    </>
  );
}
