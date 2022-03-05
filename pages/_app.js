import React from "react";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

import createEmotionCache from "../utility/createEmotionCache";
import lightTheme from "../styles/theme/lightTheme";
import "../styles/globals.css";

const clientSideEmotionCache = createEmotionCache();

const MyApp = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;
