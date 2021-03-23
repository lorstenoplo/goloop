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
      <Layout className="">
        <Cards
          cvc={cardState.cvc}
          expiry={cardState.expiry}
          focused={cardState.focus}
          name={cardState.name}
          number={cardState.number}
          callback={handleCallback}
        />
        <form>
          <input
            type="tel"
            name="number"
            placeholder="Card Number"
            onInput={handleInputChange}
            onFocus={handleInputFocus}
            pattern="[\d| ]{16,22}"
            value={cardState.number}
          />
          <input
            type="text"
            name="name"
            placeholder="Enter your Name"
            onFocus={handleInputFocus}
            onInput={handleInputChange}
            value={cardState.name}
          />
          <input
            type="tel"
            name="cvc"
            placeholder="CVC"
            onFocus={handleInputFocus}
            pattern="\d{3,4}"
            value={cardState.cvc}
            onInput={handleInputChange}
          />
          <input
            type="tel"
            name="expiry"
            placeholder="Expiry"
            onFocus={handleInputFocus}
            pattern="\d\d/\d\d"
            value={cardState.expiry}
            onInput={handleInputChange}
          />
        </form>
      </Layout>
    </motion.div>
  );
};

export default withUrqlClient(CreateUrqlClient, { ssr: true })(payment);
