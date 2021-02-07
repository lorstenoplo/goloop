import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Fab from "@material-ui/core/Fab";
import Toolbar from "@material-ui/core/Toolbar";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import { Navbar, ScrollToTopButton, LoadingScreen } from "../components";
import styles from "../styles/Home.module.css";
import { CreateUrqlClient } from "../utils/createUrqlClient";
import { useProductsQuery } from "../src/generated/graphql";

const Index = () => {
  const [{ data, fetching }] = useProductsQuery();
  if (fetching) {
    return <LoadingScreen />;
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>GoLoop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CssBaseline />
      <Navbar />
      <Toolbar id="back-to-top-anchor" />
      <Container className={styles.body}>
        <Box my={2}>
          {[...new Array(102)]
            .map(
              () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
            )
            .join("\n")}
        </Box>
      </Container>
      <ScrollToTopButton>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollToTopButton>
    </div>
  );
};

export default withUrqlClient(CreateUrqlClient)(Index);
