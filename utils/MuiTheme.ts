import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";

let theme = createMuiTheme({
  palette: {
    primary: blue,
  },
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
  },
});

theme = responsiveFontSizes(theme);

export { theme };
