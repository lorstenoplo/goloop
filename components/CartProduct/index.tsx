import React from "react";
import { Product } from "../../src/generated/graphql";
import styles from "../../styles/Cart.module.css";
import { motion } from "framer-motion";
import { Box, Tooltip, Zoom, IconButton } from "@material-ui/core";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import { useStateValue } from "../../context/StateProvider";
import { fadeInUp } from "../../utils/staggerAnimationHelper";

const CartProduct: React.FC<Product> = ({ id, imageURL, title, price }) => {
  const { dispatch } = useStateValue();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={styles.cartProduct}
      variants={fadeInUp}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        width="100%"
      >
        <img className={styles.image} src={imageURL} alt={title} />

        <Tooltip TransitionComponent={Zoom} title={`Remove ${title} from cart`}>
          <IconButton
            onClick={() =>
              dispatch({
                type: "REMOVE_FROM_BASKET",
                value: id,
              })
            }
          >
            <CloseRoundedIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Box
        flexDirection="row"
        alignItems="center"
        display="flex"
        justifyContent="space-between"
        width="100%"
      >
        <b>{title}</b>
        <p> ${price} </p>
      </Box>
    </motion.div>
  );
};

export default CartProduct;
