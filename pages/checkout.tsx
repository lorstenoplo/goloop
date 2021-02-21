import React from "react";
import styles from "../styles/Checkout.module.css";
import { motion } from "framer-motion";
import { withUrqlClient } from "next-urql";
import { CreateUrqlClient } from "../utils/createUrqlClient";
import { useStateValue } from "../context/StateProvider";
import { Layout } from "../components";
import Head from "next/head";
import { Box, IconButton, Tooltip, Zoom } from "@material-ui/core";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";

const Checkout: React.FC = () => {
  const { state, dispatch } = useStateValue();

  return (
    <motion.div initial="initial" animate="animate" exit={{ opacity: 0 }}>
      <Head>
        <title>Checkout | Review your items in cart</title>
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
          {state.basket.map(({ id, title, imageURL, price }) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={styles.checkoutProduct}
              key={id}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="flex-start"
                width="100%"
              >
                <img className={styles.image} src={imageURL} alt={title} />
                <Tooltip
                  TransitionComponent={Zoom}
                  title={`Remove ${title} from cart`}
                >
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
          ))}
        </Box>
      </Layout>
    </motion.div>
  );
};

export default withUrqlClient(CreateUrqlClient, { ssr: false })(Checkout);
