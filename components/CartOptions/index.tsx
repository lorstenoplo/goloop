import React from "react";
import classes from "../../styles/Cart.module.css";
import { motion } from "framer-motion";
import { Card, Typography } from "@material-ui/core";

type subComponentType = {
  Title: any;
  SubTitle: any;
};

const CartOptions: React.FC & subComponentType = () => {
  return (
    <motion.div className={classes.optionsContainer}>
      hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi
    </motion.div>
  );
};

CartOptions.Title = function CartOptionsTitle({ children }: any) {
  return <Typography variant="h3">{children}</Typography>;
};
CartOptions.SubTitle = function CartOptionsSubTitle({ children }: any) {
  return <Typography variant="h5">{children}</Typography>;
};

export default CartOptions;
