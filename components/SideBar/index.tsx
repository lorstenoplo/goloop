import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import CustomList from "./List";
import { IconButton, Tooltip, Zoom } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: "black",
  },
}));

const SideBar: React.FC = ({ children }) => {
  const classes = useStyles();
  const [state, setState] = useState<boolean>(false);

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      (event.type === "keydown" &&
        (event as React.KeyboardEvent).key === "Tab") ||
      (event as React.KeyboardEvent).key === "Shift"
    ) {
      return;
    }

    setState(open);
  };

  return (
    <React.Fragment>
      <Tooltip TransitionComponent={Zoom} title="Menu">
        <IconButton
          edge="start"
          className={classes.menuButton}
          aria-label="menu"
          onClick={toggleDrawer(true)}
        >
          {children}
        </IconButton>
      </Tooltip>
      <Drawer anchor="left" open={state} onClose={toggleDrawer(false)}>
        <CustomList classes={classes} toggleDrawer={toggleDrawer} />
      </Drawer>
    </React.Fragment>
  );
};

export default SideBar;
