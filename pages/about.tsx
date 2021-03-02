import React from "react";
import { withUrqlClient } from "next-urql";
import { CreateUrqlClient } from "../utils/createUrqlClient";
import { Typography, Button, Box } from "@material-ui/core";
import { Layout } from "../components";
import { motion } from "framer-motion";
import Head from "next/head";
import styles from "../styles/About.module.css";
import { useRouter } from "next/router";

const about = () => {
  const router = useRouter();
  let easing = [0.6, -0.05, 0.01, 0.99];

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const fadeInUp = {
    initial: {
      y: 60,
      opacity: 0,
      transition: { duration: 1, ease: easing, delay: 1.5 },
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: easing,
      },
    },
  };

  return (
    <motion.div initial="initial" animate="animate" exit={{ opacity: 0 }}>
      <Head>
        <title>About</title>
      </Head>
      <Layout navColor="#fafafa" className={styles.page}>
        <motion.div className={styles.textCont} variants={stagger}>
          <motion.div variants={fadeInUp}>
            <Box my={2}>
              <Typography variant="h4">
                Start shopping at GoLoop today
              </Typography>
            </Box>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <Typography variant="body1">
              Start shopping for your party items on GoLoop today! We provide
              quality products and top notch customer service to provide you an
              amazing shopping experience. start exploring our store today.! We
              provide quality products and top notch customer service to provide
              you an amazing shopping experience, start exploring our store
              today
            </Typography>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <Box my={3}>
              <Button
                variant="contained"
                disableElevation
                color="primary"
                size="large"
                onClick={() => router.push("/register")}
              >
                Get Started
              </Button>
            </Box>
          </motion.div>
        </motion.div>
        <motion.img
          src="/customer_page.png"
          alt="shopping cart"
          className={styles.img}
          animate={{ x: 0, opacity: 1 }}
          initial={{ x: 200, opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.2 }}
        />
      </Layout>
    </motion.div>
  );
};

export default withUrqlClient(CreateUrqlClient, { ssr: true })(about);
