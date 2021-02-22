import { Box } from "@material-ui/core";
import { motion } from "framer-motion";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import React from "react";
import { CartProduct, Layout, CartOptions } from "../components";
import { useStateValue } from "../context/StateProvider";
import styles from "../styles/Cart.module.css";
import { CreateUrqlClient } from "../utils/createUrqlClient";

const Cart: React.FC = () => {
  const { state } = useStateValue();

  return (
    <motion.div initial="initial" animate="animate" exit={{ opacity: 0 }}>
      <Head>
        <title>Cart | Review your items in cart</title>
      </Head>
      <Layout className={styles.page}>
        <Box
          mx="auto"
          justifyContent="space-between"
          display="flex"
          flexDirection="row"
          my={2}
          px={8}
          width="60%"
          flexWrap="wrap"
        >
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
        </Box>
        <Box>
          <CartOptions />
        </Box>
      </Layout>
    </motion.div>
  );
};

export default withUrqlClient(CreateUrqlClient, { ssr: false })(Cart);
