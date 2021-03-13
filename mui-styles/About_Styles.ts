import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  page: {
    display: "flex !important",
    paddingTop: "20px",
    overflowY: "hidden",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column-reverse !important",
    },
  },

  textCont: {
    display: "flex",
    width: "50%",
    maxHeight: "100%",
    flexDirection: "column",
    justifyContent: "center",
    marginRight: "20px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginRight: 0,
    },
  },
  img: {
    flex: 0.5,
    width: "50%",
    height: "70%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      objectFit: "contain",
      flex: 1,
    },
  },
}));

export default useStyles;
