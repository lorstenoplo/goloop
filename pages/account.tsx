import React from "react";
import { withUrqlClient } from "next-urql";
import { CreateUrqlClient } from "../utils/createUrqlClient";
import { motion } from "framer-motion";
import useStyles from "../mui-styles/Account_Styles";
import Head from "next/head";
import useGetUser from "../utils/useGetUser";
import { Layout } from "../components";
import { Button } from "@material-ui/core";
import { useDeleteUserMutation } from "../src/generated/graphql";

const account = () => {
  const classes = useStyles();
  const [user] = useGetUser();

  const [{ data, error, fetching }, deleteUser] = useDeleteUserMutation();

  return (
    <motion.div initial="initial" animate="animate" exit={{ opacity: 0 }}>
      <Head>
        <title>GoLoop Account | {user?.username}</title>
      </Head>
      <Layout navColor="#FAFAFA" className={classes.page}>
        hi {user?.username}
        <Button
          onClick={() => deleteUser({ email: user?.email as string })}
          disabled={!user || fetching}
        >
          Delete account
        </Button>
        {error && <p>{error.message}</p>}
      </Layout>
    </motion.div>
  );
};

export default withUrqlClient(CreateUrqlClient, { ssr: false })(account);
