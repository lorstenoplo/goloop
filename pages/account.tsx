import React from "react";
import { withUrqlClient } from "next-urql";
import { CreateUrqlClient } from "../utils/createUrqlClient";
import { motion } from "framer-motion";
import useStyles from "../mui-styles/Account_Styles";
import Head from "next/head";
import useGetUser from "../utils/useGetUser";
import { Layout } from "../components";

const account = () => {
  const classes = useStyles();
  const [user] = useGetUser();

  return (
    <motion.div initial="initial" animate="animate" exit={{ opacity: 0 }}>
      <Head>
        <title>GoLoop Account | {user?.username}</title>
      </Head>
      <Layout navColor="#FAFAFA" className={classes.page}>
        hi
      </Layout>
    </motion.div>
  );
};

export default withUrqlClient(CreateUrqlClient, { ssr: false })(account);
