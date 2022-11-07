import Layout from "../components/layout";

import {
  createTheme,
  CssBaseline,
  PaletteMode,
  ThemeProvider
} from "@mui/material";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { SnackbarProvider } from "notistack";
import { ReactElement, ReactNode, useMemo, useState } from "react";
import { Provider } from "react-redux";
import { ColorModeContext } from "../components/themeSwitch";
import store from "../store";

import "../styles/global.css";
import apptheme from "../config/theme";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [mode, setMode] = useState<PaletteMode>("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === "light" ? "dark" : "light"
        );
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme(apptheme(mode)),
    [mode]
  );

  return (
    <>
      <Provider store={store}>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <SnackbarProvider maxSnack={3}>
              <CssBaseline />
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </SnackbarProvider>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </Provider>
    </>
  );
}
