import Box from "@material-ui/core/Box";
import { motion } from "framer-motion";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import Link from "next/link";
import { Layout, Product } from "../components";
import { useProductsQuery } from "../src/generated/graphql";
import styles from "../styles/Home.module.css";
import { CreateUrqlClient } from "../utils/createUrqlClient";
import React from "react";
import ScrollToTop from "../utils/ScrollToTop";
import useStyles from "../mui-styles/Home_Styles";
import Skeleton from "@material-ui/lab/Skeleton";
import { Snackbar, IconButton } from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Index: React.FC = () => {
  const [{ data, fetching, error }] = useProductsQuery();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

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
      className={classes.container}
    >
      <Head>
        <title>GoLoop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout className={classes.body}>
        <motion.div variants={stagger}>
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
            {fetching &&
              [1, 2, 3, 4, 5, 6].map((_, i) => (
                <Skeleton
                  variant="rect"
                  height={400}
                  width={450}
                  animation="wave"
                  style={{
                    borderRadius: "12px",
                    marginBottom: 10,
                    marginTop: 10,
                  }}
                  key={i}
                />
              ))}

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
        {error && (
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            action={
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            }
          >
            <Alert severity="error">{(error as any).message}</Alert>
          </Snackbar>
        )}
      </Layout>
      <ScrollToTop />
    </motion.div>
  );
};

export default withUrqlClient(CreateUrqlClient, { ssr: true })(Index);
