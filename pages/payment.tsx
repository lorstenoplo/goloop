import React, { useState } from "react";
import Cards from "react-credit-cards";
import { withUrqlClient } from "next-urql";
import { CreateUrqlClient } from "../utils/createUrqlClient";
import { motion } from "framer-motion";
import "react-credit-cards/es/styles-compiled.css";
import { Layout } from "../components";
import Head from "next/head";

type cardStateType = {
  cvc: React.ReactText;
  expiry: React.ReactText;
  focus?: "number" | "cvc" | "expiry" | "name";
  name: string;
  number: React.ReactText;
};

const payment = () => {
  const [cardState, setCardState] = useState<cardStateType>({
    cvc: "",
    expiry: "",
    name: "",
    number: "",
  });

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setCardState((ps) => {
      return { ...ps, focus: (e.target as any).name };
    });
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

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
        />
        <form>
          <input
            type="tel"
            name="number"
            placeholder="Card Number"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <input
            type="text"
            name="name"
            placeholder="Enter your Name"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <input
            type="number"
            name="cvc"
            placeholder="CVC"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <input
            type="expiry"
            name="date"
            placeholder="Expiry"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
        </form>
      </Layout>
    </motion.div>
  );
};

export default withUrqlClient(CreateUrqlClient, { ssr: true })(payment);
