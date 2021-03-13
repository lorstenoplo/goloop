import { motion } from "framer-motion";
import React from "react";
import useStyles from "../../mui-styles/Home_Styles";
import { fadeInUp } from "../../utils/staggerAnimationHelper";
import { ProductProps } from "./types";

const Product: React.FC<ProductProps> = ({ imageURL, price, title }) => {
  const classes = useStyles();
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      variants={fadeInUp}
      className={classes.product}
    >
      <p className={classes.proCat}>Category</p>
      <motion.img
        initial={{ x: 60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className={classes.productImg}
        src={imageURL}
        alt={title}
      />
      <div className={classes.productInfo}>
        <h3>{title}</h3>
        <p className={classes.price}>${price}</p>
      </div>
    </motion.div>
  );
};

export default Product;
