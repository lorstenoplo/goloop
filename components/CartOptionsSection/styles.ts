import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.down("md")]: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
    },
    padding: "17px 0px",
  },
  btnCont: {
    [theme.breakpoints.down("md")]: {
      justifyContent: "flex-start",
    },
  },
}));
export default useStyles;
