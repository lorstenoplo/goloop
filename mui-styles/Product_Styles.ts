import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  page: {
    height: "100vh",
    width: "100%",
    display: "flex",
    alignitems: "center",
    backgroundcolor: "#f1f3f5",
    overflowy: "hidden",
    [theme.breakpoints.down(theme.breakpoints.values.md)]: {
      flexDirection: "column",
      overflowY: "scroll",
      overflowX: "hidden",
    },
  },
  imageCont: {
    height: "100%",
    width: "50%",
    background: "#dfdfdf",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down(theme.breakpoints.values.md)]: {
      width: "100%",
    },
  },
  img: {
    height: "80%",
    maxWidth: "500px",
  },
  topCont: {
    width: "90%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.down(theme.breakpoints.values.md)]: {
      width: "100%",
    },
  },
  InfoCont: {
    height: "100%",
    width: "50%",
    display: "flex",
    alignCtems: "center",
    justifyContent: "center",
    [theme.breakpoints.down(theme.breakpoints.values.sm)]: {
      width: "100%",
    },
  },
  title: {
    [theme.breakpoints.down(theme.breakpoints.values.sm)]: {
      margin: 0,
    },
  },
  InfoContInner: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    padding: "50px 60px",
    justifyContent: "center",
    [theme.breakpoints.down(theme.breakpoints.values.xs)]: {
      padding: "25px",
    },
  },
  btnCont: {
    display: "flex",
    width: "60%",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.down(theme.breakpoints.values.sm)]: {
      width: "100%",
    },
    [theme.breakpoints.down(theme.breakpoints.values.xs)]: {
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "flex-start",
      height: "86px",
    },
  },
  productInfo: {
    width: "90%",
    [theme.breakpoints.down(theme.breakpoints.values.sm)]: {
      width: "100%",
    },
  },
}));

export default useStyles;
