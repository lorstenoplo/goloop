import Box from "@material-ui/core/Box";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { motion } from "framer-motion";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import Link from "next/link";
import {
  Layout,
  LoadingScreen,
  Product,
  ScrollToTopButton,
} from "../components";
import { useProductsQuery } from "../src/generated/graphql";
import styles from "../styles/Home.module.css";
import { CreateUrqlClient } from "../utils/createUrqlClient";
import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  productsContainer: {
    [theme.breakpoints.down("md")]: {
      justifyContent: "center",
    },
  },
}));

const Index: React.FC = () => {
  const [{ data, fetching, error }] = useProductsQuery();

  const classes = useStyles();

  if (fetching) {
    return <LoadingScreen />;
  }
  if (error) {
    return <div style={{ color: "red" }}>{error.message}</div>;
  }

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit={{ opacity: 0 }}
      className={styles.container}
    >
      <Head>
        <title>GoLoop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout className={styles.body}>
        <motion.div className={styles.innerCont} variants={stagger}>
          <Box
            mx="auto"
            justifyContent="space-between"
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            px="auto"
            alignItems="center"
            className={classes.productsContainer}
          >
            {data &&
              data.products.map(({ id, imageURL, price, rating, title }) => (
                <Link
                  scroll={false}
                  href="/products/[productId]"
                  as={`/products/${id}`}
                >
                  <a className={styles.link}>
                    <Product
                      key={id}
                      id={id}
                      imageURL={imageURL}
                      rating={rating}
                      title={title}
                      price={price}
                    />
                  </a>
                </Link>
              ))}
          </Box>
        </motion.div>
      </Layout>
      <ScrollToTopButton>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollToTopButton>
    </motion.div>
  );
};

export default withUrqlClient(CreateUrqlClient, { ssr: true })(Index);
