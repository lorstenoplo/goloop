import React, { useState } from "react";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  List,
  Typography,
} from "@material-ui/core";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import ShopIcon from "@material-ui/icons/Shop";
import HelpIcon from "@material-ui/icons/Help";
import InfoIcon from "@material-ui/icons/Info";
import PaymentIcon from "@material-ui/icons/Payment";
import ReportIcon from "@material-ui/icons/Report";
import { useRouter } from "next/router";
import Report from "../Report";
import useGetUser from "../../utils/useGetUser";
import LoadingScreen from "../LoadingScreen";

type listProps = {
  toggleDrawer: (
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  classes: Record<"list" | "fullList" | "menuButton", string>;
};

const CustomList: React.FC<listProps> = ({ classes }) => {
  const router = useRouter();
  const [user, fetching, error] = useGetUser();

  if (fetching) {
    return <LoadingScreen />;
  }

  if (error) {
    return <p color="red">{error.message}</p>;
  }

  return (
    <div
      className={classes.list}
      role="presentation"
      // onClick={toggleDrawer(false)}
      //onKeyDown={toggleDrawer(false)}
    >
      <List>
        <Typography variant="h4" style={{ padding: "5px 15px" }}>
          Go Loop
        </Typography>
        <Divider />
        <ListItem button onClick={() => router.push("/")}>
          <ListItemIcon>
            <HomeRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={() => router.push("/account")}>
          <ListItemIcon>
            <AccountCircleRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Account" />
        </ListItem>
        <ListItem button onClick={() => router.push("/orders")}>
          <ListItemIcon>
            <ShopIcon />
          </ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItem>
        <ListItem button onClick={() => router.push("/payment")}>
          <ListItemIcon>
            <PaymentIcon />
          </ListItemIcon>
          <ListItemText primary="Payment" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={() => router.push("/help")}>
          <ListItemIcon>
            <HelpIcon />
          </ListItemIcon>
          <ListItemText primary="Help Center" />
        </ListItem>
        <ListItem button onClick={() => router.push("/about")}>
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary="About" />
        </ListItem>
        <Report />
      </List>
    </div>
  );
};

export default CustomList;
