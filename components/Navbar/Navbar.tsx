import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Menu,
  MenuItem,
  Container,
  CircularProgress,
  Tooltip,
  Zoom,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";
import NextLink from "next/link";
import { cloneElement } from "react";
import { useScrollTrigger } from "@material-ui/core";
import { Props } from "../../types/HomePageProps";
import { useMeQuery } from "../../src/generated/graphql";
import { useRouter } from "next/router";
import LoadingScreen from "../LoadingScreen";
interface NavbarProps {}

import { makeStyles, fade } from "@material-ui/core/styles";

export const useStyles = makeStyles(
  (theme) =>
    ({
      root: {
        position: "fixed",
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        flexGrow: 1,
      },
      menuButton: {
        marginRight: theme.spacing(2),
        color: "black",
      },
      title: {
        flexGrow: 1,
        display: "none",
        color: "black",
        [theme.breakpoints.up("sm")]: {
          display: "block",
        },
      },
      searchIcon: {
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1,
        color: "#5f6368",
      },
      inputRoot: {
        color: "#5f6368",
        backgroundColor: "#E8EAED",
        borderRadius: 4,
      },
      inputInput: {
        padding: theme.spacing(1.5, 1, 1.5, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
          width: "20ch",
          "&:focus": {
            width: "80ch",
            backgroundColor: "#ffffff",
            boxShadow:
              "0 1px 2px 0 rgba(60,64,67,0.3),0 1px 3px 1px rgba(60,64,67,0.15)",
            borderRadius: 4,
          },
        },
      },
      search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        "&:hover": {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        marginRight: 20,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
          marginLeft: theme.spacing(1),
          width: "auto",
        },
      },
      appBar: {
        backgroundColor: "#f1f3f5",
      },
      accountIcon: {
        color: "black",
      },
    } as const)
);

const ElevationScroll = (props: Props) => {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
};

const Navbar: React.FC<NavbarProps> = (props) => {
  const [qid, setQid] = useState<string>("");
  useEffect(() => {
    setQid(localStorage.getItem("qid") || "");
  }, []);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [{ fetching, data }] = useMeQuery({
    variables: { token: qid },
  });

  const router = useRouter();

  let userBody = <></>;
  if (fetching) {
    // data is loading
    console.log("loading");
    return <LoadingScreen />;
  } else if (!data?.me) {
    // user is logged out
    userBody = (
      <>
        <MenuItem>
          <NextLink href="/login">
            <a>Login</a>
          </NextLink>
        </MenuItem>
        <MenuItem>
          <NextLink href="/register">
            <a>Register</a>
          </NextLink>
        </MenuItem>
      </>
    );
    console.log("not logged in");
  } else {
    // user is logged in
    userBody = (
      <>
        <MenuItem>{data.me.username}</MenuItem>
        <MenuItem
          onClick={() => {
            localStorage.removeItem("qid");
            router.replace("/login");
          }}
        >
          Logout
        </MenuItem>
      </>
    );
    console.log("user is there");
  }

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const isMenuOpen = Boolean(anchorEl);

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem>My account</MenuItem>
      {userBody}
    </Menu>
  );

  // console.log("data is >>>", data);

  return (
    <ElevationScroll {...props}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Tooltip TransitionComponent={Zoom} title="Menu">
            <IconButton
              edge="start"
              className={classes.menuButton}
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          </Tooltip>
          <NextLink href="/">
            <a className={classes.title}>
              <Typography variant="h6">Go Loop Shopping</Typography>
            </a>
          </NextLink>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon color="inherit" />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            className={classes.accountIcon}
            onClick={handleProfileMenuOpen}
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
        {renderMenu}
      </AppBar>
    </ElevationScroll>
  );
};

export default Navbar;
