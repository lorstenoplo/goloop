import { motion } from "framer-motion";
import React from "react";
import styles from "../../styles/Home.module.css";
import { fadeInUp } from "../../utils/staggerAnimationHelper";
import { ProductProps } from "./types";

const Product: React.FC<ProductProps> = ({ imageURL, price, title }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      variants={fadeInUp}
      className={styles.product}
    >
      <p className={styles.proCat}>Category</p>
      <motion.img
        initial={{ x: 60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className={styles.productImg}
        src={imageURL}
        alt={title}
      />
      <div className={styles.productInfo}>
        <h3>{title}</h3>
        <p className={styles.price}>${price}</p>
      </div>
    </motion.div>
  );
};

export default Product;
