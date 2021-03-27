import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import InputField from "../components/InputField";
import { useLoginMutation } from "../src/generated/graphql";
import { toErrorMap } from "../src/utils/toErrorMap";
import { withUrqlClient } from "next-urql";
import { CreateUrqlClient } from "../utils/createUrqlClient";
import Link from "next/link";
import { motion } from "framer-motion";

interface Values {
  email: string;
  password: string;
}

interface loginProps {}

const Login: React.FC<loginProps> = () => {
  const router = useRouter();
  const [, login] = useLoginMutation();

  return (
    <motion.div initial="initial" animate="animate" exit={{ opacity: 0 }}>
      <Container maxWidth="xs">
        <Head>
          <title>Login | Welcome back</title>
        </Head>
        <Formik
          initialValues={{
            emailOrUsername: "",
            password: "",
          }}
          onSubmit={async (values, { setErrors }) => {
            const response = await login(values);
            const user = response.data?.login.user;
            const token = response.data?.login.token;
            if (response.data?.login.errors) {
              setErrors(toErrorMap(response.data.login.errors));
            } else if (user && token) {
              localStorage.setItem("qid", token);
              router.replace("/");
            }
          }}
        >
          {({ isSubmitting, handleChange, values }) => (
            <Form>
              <Box
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                paddingY="30px"
                display="flex"
                minHeight="100vh"
              >
                <Link href="/">
                  <a>
                    <Typography align="center" variant="h3">
                      Go Loop
                    </Typography>
                  </a>
                </Link>
                <InputField
                  onChange={handleChange}
                  name="emailOrUsername"
                  label="Email or Username"
                  value={values.emailOrUsername}
                />
                <InputField
                  onChange={handleChange}
                  name="password"
                  value={values.password}
                  password
                />
                <Box my={2} width="100%">
                  <Typography variant="body2">
                    New to the store{" "}
                    <Link href="/register">
                      <a style={{ color: "#00b6f1" }}>register first</a>
                    </Link>
                  </Typography>
                </Box>
                <Box width="100%" margin={1}>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    type="submit"
                    fullWidth
                  >
                    Login
                    {isSubmitting && (
                      <CircularProgress
                        style={{ marginLeft: 10 }}
                        size={15}
                        color="primary"
                      />
                    )}
                  </Button>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </Container>
    </motion.div>
  );
};

export default withUrqlClient(CreateUrqlClient, { ssr: false })(Login);
