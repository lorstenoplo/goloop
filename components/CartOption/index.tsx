import React from "react";
import { motion } from "framer-motion";
import { Typography, Box } from "@material-ui/core";
import useStyles from "../../mui-styles/Cart_Styles";

type subComponentType = {
  Title: any;
  SubTitle: any;
  Info: any;
};

const CartOption: React.FC & subComponentType = ({ children }) => {
  const classes = useStyles();
  return (
    <motion.div className={classes.optionsContainer}>{children}</motion.div>
  );
};

CartOption.Title = function CartOptionsTitle({ children }: any) {
  return <Typography variant="h6">{children}</Typography>;
};
CartOption.SubTitle = function CartOptionsSubTitle({ children }: any) {
  return <Typography variant="subtitle1">{children}</Typography>;
};
CartOption.Info = function CartOptionsInfo({ children }: any) {
  return (
    <Box display="flex" alignItems="center">
      {children}
    </Box>
  );
};

export default CartOption;
