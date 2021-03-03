import React from "react";
import { Props } from "../types/HomePageProps";
import { useStyles } from "./Navbar/Navbar";
import { useScrollTrigger, Zoom } from "@material-ui/core";

const ScrollToTopButton: React.JSXElementConstructor<Props> = (
  props: Props
) => {
  const classes = useStyles(props as any);
  const { children, window } = props;

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector("#back-to-top-anchor");

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
};

export default ScrollToTopButton;
