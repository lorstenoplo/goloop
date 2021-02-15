import { ThemeProvider, CssBaseline } from "@material-ui/core";
import "../styles/globals.css";
import { theme } from "../utils/MuiTheme";
import { AnimatePresence } from "framer-motion";

function MyApp({ Component, pageProps, router }: any) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AnimatePresence exitBeforeEnter>
        <Component key={router.route} {...pageProps} />
      </AnimatePresence>
    </ThemeProvider>
  );
}

export default MyApp;
