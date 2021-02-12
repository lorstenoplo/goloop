import { NextPage } from "next";
import { Layout, LoadingScreen } from "../../components";
import styles from "../../styles/Home.module.css";
import { withUrqlClient, PartialNextContext } from "next-urql";
import { CreateUrqlClient } from "../../utils/createUrqlClient";
import { useProductQuery } from "../../src/generated/graphql";
import Head from "next/head";

const ProductPage: NextPage<{ productId: string }> = ({ productId }) => {
  const [{ data, fetching, error }] = useProductQuery({
    variables: {
      productId,
    },
  });

  if (fetching) {
    return <LoadingScreen />;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return (
    <>
      <Head>
        <title>{data?.product?.title || "Loading..."}</title>
      </Head>
      <Layout className={styles.body}>{data?.product?.title || ""}</Layout>
    </>
  );
};

ProductPage.getInitialProps = ({ query }) => {
  return {
    productId: query.productId as string,
  };
};

export default withUrqlClient(CreateUrqlClient, { ssr: true })(ProductPage);
