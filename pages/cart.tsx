import { Box } from "@material-ui/core";
import { motion } from "framer-motion";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import React from "react";
import { CartProduct, Layout, CartOptions } from "../components";
import { useStateValue } from "../context/StateProvider";
import styles from "../styles/Cart.module.css";
import { CreateUrqlClient } from "../utils/createUrqlClient";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import AlternateEmailRoundedIcon from "@material-ui/icons/AlternateEmailRounded";

const Cart: React.FC = () => {
  const { state } = useStateValue();

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div initial="initial" animate="animate" exit={{ opacity: 0 }}>
      <Head>
        <title>Cart | Review your items in cart</title>
      </Head>
      <Layout navColor="#fff" className={styles.page}>
        <motion.div className={styles.productsContainer} variants={stagger}>
          {state.basket.map(({ id, title, imageURL, price, rating }, i) => (
            <CartProduct
              key={i}
              id={id}
              title={title}
              imageURL={imageURL}
              price={price}
              rating={rating}
            />
          ))}
        </motion.div>

        <Box>
          <CartOptions>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <CartOptions.Title>Guest Checkout</CartOptions.Title>
              <EditRoundedIcon />
            </Box>
            <CartOptions.Info>
              <Box color="purple" mr={1}>
                <AlternateEmailRoundedIcon fontSize="small" />
              </Box>
              <CartOptions.SubTitle>
                {/* {state.user?.username || "Guest"} */}
                guest@adam.co
              </CartOptions.SubTitle>
            </CartOptions.Info>
          </CartOptions>
        </Box>
      </Layout>
    </motion.div>
  );
};

export default withUrqlClient(CreateUrqlClient, { ssr: false })(Cart);
