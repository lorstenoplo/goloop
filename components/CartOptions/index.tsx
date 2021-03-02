import React from "react";
import classes from "../../styles/Cart.module.css";
import { motion } from "framer-motion";
import { Typography, Box } from "@material-ui/core";

type subComponentType = {
  Title: any;
  SubTitle: any;
  Info: any;
};

const CartOptions: React.FC & subComponentType = ({ children }) => {
  return (
    <motion.div className={classes.optionsContainer}>{children}</motion.div>
  );
};

CartOptions.Title = function CartOptionsTitle({ children }: any) {
  return <Typography variant="h4">{children}</Typography>;
};
CartOptions.SubTitle = function CartOptionsSubTitle({ children }: any) {
  return <Typography variant="h6">{children}</Typography>;
};
CartOptions.Info = function CartOptionsInfo({ children }: any) {
  return (
    <Box display="flex" alignItems="center">
      {children}
    </Box>
  );
};

export default CartOptions;
