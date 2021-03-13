import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  page: {
    backgroundColor: "#fff",
    display: "flex !important",
    paddingTop: "10px",
    paddingBottom: "10px",
    minHeight: "calc(100vh - 64px)",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
      overflowX: "hidden",
    },
  },
  productsContainer: {
    marginLeft: "auto",
    marginRight: "auto",
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
    width: "60%",
    flexWrap: "wrap",
    paddingTop: "17px",
    paddingBottom: "17px",
    [theme.breakpoints.down("sm")]: {
      alignItems: "center",
      width: "100%",
      padding: "22px",
    },
  },

  cartProduct: {
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "33%",
    marginRight: "5px",
    marginBottom: "20px",
  },
  image: {
    height: "210px",
    objectFit: "contain",
    marginBottom: "10px",
    [theme.breakpoints.down("sm")]: {
      height: "100px",
    },
  },
  optionsContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    borderRadius: "8px",
    width: "400px",
    marginBottom: "10px",
    [theme.breakpoints.down("sm")]: {
      width: "95vw",
    },
  },
}));
export default useStyles;
