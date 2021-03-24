import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  page: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    minHeight: "calc(100vh - 64px)",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  inputField: {
    marginBottom: 10,
    width: "80%",
    [theme.breakpoints.down("xs")]: {
      width: "95%",
    },
  },
  inputsCont: {
    width: "50%",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
}));

export default useStyles;
