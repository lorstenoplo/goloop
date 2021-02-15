import React from "react";
import styles from "../../styles/Home.module.css";
import { ProductProps } from "./types";
import { motion } from "framer-motion";

const Product: React.FC<ProductProps> = ({
  id,
  imageURL,
  price,
  title,
  rating,
}) => {
  function truncate(str: string | undefined, n: number) {
    if (str) {
      return str.length > n ? str.substr(0, n - 1) + "..." : str;
    }
  }

  let easing = [0.6, -0.05, 0.01, 0.99];

  const fadeInUp = {
    initial: {
      y: 60,
      opacity: 0,
      transition: { duration: 0.6, ease: easing },
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: easing,
      },
    },
  };
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
        <h3>{truncate(title, 30)}</h3>
        <p className={styles.price}>${price}</p>
      </div>
    </motion.div>
  );
};

export default Product;
