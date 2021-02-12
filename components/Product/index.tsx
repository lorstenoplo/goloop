import React from "react";
import styles from "../../styles/Home.module.css";
import { ProductProps } from "./types";

const Product: React.FC<ProductProps> = ({
  id,
  imageURL,
  price,
  title,
  rating,
}) => {
  return (
    <div className={styles.product}>
      <img className={styles.productImg} src={imageURL} alt={title} />
    </div>
  );
};

export default Product;
