import { Box, Button, CircularProgress, Container } from "@material-ui/core";
import { Form, Formik } from "formik";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import InputField from "../components/InputField";
import { useRegisterMutation } from "../src/generated/graphql";
import { toErrorMap } from "../src/utils/toErrorMap";
import { withUrqlClient } from "next-urql";
import { CreateUrqlClient } from "../utils/createUrqlClient";

interface Values {
  email: string;
  password: string;
}

interface registerProps {}

const Register: React.FC<registerProps> = () => {
  const router = useRouter();
  const [, register] = useRegisterMutation();

  return (
    <Container maxWidth="xs">
      <Head>
        <title>Register | Start Purchasing</title>
      </Head>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register(values);
          const user = response.data?.register.user;
          const token = response.data?.register.token;
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
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
            >
              <InputField
                onChange={handleChange}
                name="username"
                label="Username"
                value={values.username}
              />
              <InputField
                onChange={handleChange}
                type="password"
                name="password"
                label="Password"
                value={values.password}
              />
              <Box margin={1}>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  type="submit"
                  fullWidth
                >
                  Register
                  {isSubmitting && (
                    <CircularProgress size={15} color="primary" />
                  )}
                </Button>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default withUrqlClient(CreateUrqlClient, { ssr: false })(Register);
