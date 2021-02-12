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

const Index = () => {
  const [{ data, fetching, error }] = useProductsQuery();
  if (fetching) {
    return <LoadingScreen />;
  }
  if (error) {
    return <div style={{ color: "red" }}>{error.message}</div>;
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>GoLoop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout className={styles.body}>
        <Box my={2}>
          {data &&
            data.products.map(({ id, imageURL, price, rating, title }) => (
              <Link href="/products/[productId]" as={`/products/${id}`}>
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
      </Layout>
      <ScrollToTopButton>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollToTopButton>
    </div>
  );
};

export default withUrqlClient(CreateUrqlClient, { ssr: true })(Index);
