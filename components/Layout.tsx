import { Container, Toolbar } from "@material-ui/core";
import React from "react";
import Navbar from "./Navbar/Navbar";

type LayoutProps = {
  children: NonNullable<React.ReactNode>;
  className: string;
};

const Layout: React.FC<LayoutProps> = ({ children, ...restProps }) => {
  return (
    <div style={{ width: "100%" }}>
      <Navbar />
      <Toolbar id="back-to-top-anchor" />
      <Container {...restProps}>{children}</Container>
    </div>
  );
};

export default Layout;
