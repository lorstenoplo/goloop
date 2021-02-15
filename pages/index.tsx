import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Fab from "@material-ui/core/Fab";
import Toolbar from "@material-ui/core/Toolbar";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import {
  ScrollToTopButton,
  LoadingScreen,
  Layout,
  Navbar,
  Product,
} from "../components";
import styles from "../styles/Home.module.css";
import { CreateUrqlClient } from "../utils/createUrqlClient";
import { useProductsQuery } from "../src/generated/graphql";
import Link from "next/link";
import { motion } from "framer-motion";

const Index = () => {
  const [{ data, fetching, error }] = useProductsQuery();
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
        <motion.div variants={stagger}>
          <Box
            mx="auto"
            justifyContent="space-between"
            display="flex"
            flexDirection="row"
            my={2}
            px={8}
            flexWrap="wrap"
          >
            {data &&
              data.products.map(({ id, imageURL, price, rating, title }) => (
                <Link
                  scroll={false}
                  href="/products/[productId]"
                  as={`/products/${id}`}
                >
                  <a>
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
