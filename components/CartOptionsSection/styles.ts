import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.down("md")]: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
    },
  },
}));
export default useStyles;
