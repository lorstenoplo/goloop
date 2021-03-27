import React, { useState } from "react";
import Cards from "react-credit-cards";
import { withUrqlClient } from "next-urql";
import { CreateUrqlClient } from "../utils/createUrqlClient";
import { motion } from "framer-motion";
import "react-credit-cards/es/styles-compiled.css";
import { Layout } from "../components";
import Head from "next/head";
import {
  formatCreditCardNumber,
  formatExpirationDate,
  formatCVC,
} from "../utils/cardDataValidaters";
import { TextField, Box, Button, CircularProgress } from "@material-ui/core";
import useStyles from "../mui-styles/Payment_Styles";

type cardStateType = {
  cvc: React.ReactText;
  expiry: React.ReactText;
  focus?: "number" | "cvc" | "expiry" | "name";
  name: string;
  number: React.ReactText;
  issuer: string;
};

const payment = () => {
  const [cardState, setCardState] = useState<cardStateType>({
    cvc: "",
    expiry: "",
    name: "",
    number: "",
    issuer: "",
  });

  const classes = useStyles();

  const handleCallback = ({ issuer }: { issuer: string }, isValid: boolean) => {
    if (isValid) {
      setCardState((ps) => {
        return { ...ps, issuer };
      });
    }
  };

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setCardState((ps) => {
      return { ...ps, focus: (e.target as any).name };
    });
  };

  const handleInputChange = (e: any) => {
    let { name, value } = e.target;

    if (name === "number") {
      value = formatCreditCardNumber(value);
    } else if (name === "expiry") {
      value = formatExpirationDate(value);
    } else if (name === "cvc") {
      value = formatCVC(value);
    }

    setCardState((ps) => {
      return { ...ps, [name]: value };
    });
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit={{ opacity: 0 }}
      id="PaymentForm"
    >
      <Head>
        <title>Payment | Add a payment method to get started</title>
      </Head>
      <Layout className={classes.page}>
        <Cards
          cvc={cardState.cvc}
          expiry={cardState.expiry}
          focused={cardState.focus}
          name={cardState.name}
          number={cardState.number}
          callback={handleCallback}
        />
        <Box
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          paddingY="5px"
          display="flex"
          className={classes.inputsCont}
          mt={3}
        >
          <TextField
            className={classes.inputField}
            variant="outlined"
            type="tel"
            name="number"
            label="Card Number"
            onInput={handleInputChange}
            onFocus={handleInputFocus}
            value={cardState.number}
          />
          <TextField
            className={classes.inputField}
            variant="outlined"
            type="text"
            name="name"
            label="Enter your Name"
            onFocus={handleInputFocus}
            onInput={handleInputChange}
            value={cardState.name}
          />
          <TextField
            className={classes.inputField}
            variant="outlined"
            type="tel"
            name="cvc"
            label="CVC"
            onFocus={handleInputFocus}
            value={cardState.cvc}
            onInput={handleInputChange}
          />
          <TextField
            className={classes.inputField}
            variant="outlined"
            type="tel"
            name="expiry"
            label="Expiry"
            onFocus={handleInputFocus}
            value={cardState.expiry}
            onInput={handleInputChange}
          />
          <Box className={classes.inputField}>
            <Button
              variant="contained"
              color="primary"
              // disabled={isSubmitting}
              type="submit"
              fullWidth
            >
              Add Card
              {/* {isSubmitting && (
                      <CircularProgress
                        style={{ marginLeft: 10 }}
                        size={15}
                        color="primary"
                      />
                    )} */}
            </Button>
          </Box>
        </Box>
      </Layout>
    </motion.div>
  );
};

export default withUrqlClient(CreateUrqlClient, { ssr: true })(payment);
