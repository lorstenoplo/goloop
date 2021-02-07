import React from "react";
import { Container, CircularProgress } from "@material-ui/core";

const LoadingScreen: React.FC = () => {
  return (
    <Container
      style={{
        height: "100vh",
        width: "100%",
        display: "grid",
        placeItems: "center",
      }}
    >
      <CircularProgress color="primary" size={50} />
    </Container>
  );
};

export default LoadingScreen;
