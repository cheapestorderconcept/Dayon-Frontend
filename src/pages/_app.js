import Head from "next/head";
import { CacheProvider } from "@emotion/react";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles/";
import { createEmotionCache } from "../utils/create-emotion-cache";
import { theme } from "../theme";
import { StoreProvider } from "src/statesManagement/store/store";
import { SnackbarProvider } from "notistack";
import { COMPANY_NAME } from "src/utils/company_name";

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SnackbarProvider anchorOrigin={{ vertical: "top", horizontal: "right" }}>
      <StoreProvider>
        <CacheProvider value={emotionCache}>
          <Head>
            <title>{COMPANY_NAME}</title>
            <meta name="viewport" content="initial-scale=1, width=device-width" />
          </Head>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {getLayout(<Component {...pageProps} />)}
            </ThemeProvider>
          </LocalizationProvider>
        </CacheProvider>
      </StoreProvider>
    </SnackbarProvider>
  );
};

export default App;
