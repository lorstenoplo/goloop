import "../styles/globals.css";
import { Provider, createClient } from "urql";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "../utils/MuiTheme";

const client = createClient({
  url: "http://localhost:5000/graphql",
  fetchOptions: {
    credentials: "include",
  },
});
function MyApp({ Component, pageProps }: any) {
  return (
    <Provider value={client}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
