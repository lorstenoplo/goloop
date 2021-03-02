import { Container, Toolbar } from "@material-ui/core";
import React from "react";
import Navbar from "./Navbar/Navbar";

type LayoutProps = {
  children: NonNullable<React.ReactNode>;
  className: string;
  navColor?: string;
};

const Layout: React.FC<LayoutProps> = ({
  children,
  navColor,
  ...restProps
}) => {
  return (
    <div style={{ width: "100%" }}>
      <Navbar color={navColor} />
      <Toolbar id="back-to-top-anchor" />
      <Container {...restProps}>{children}</Container>
    </div>
  );
};

export default Layout;
