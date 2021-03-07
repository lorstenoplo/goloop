import React from "react";
import { ScrollToTopButton } from "../components";
import { Fab } from "@material-ui/core";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

const ScrollToTop: React.FC = () => {
  return (
    <ScrollToTopButton>
      <Fab color="secondary" size="small" aria-label="scroll back to top">
        <KeyboardArrowUpIcon />
      </Fab>
    </ScrollToTopButton>
  );
};

export default ScrollToTop;
