import React from "react";
import { CartOptionsSectionPropsType } from "./types";
import CartOption from "../CartOption";
import { Box, Button } from "@material-ui/core";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import AlternateEmailRoundedIcon from "@material-ui/icons/AlternateEmailRounded";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import useGetUser from "../../utils/useGetUser";
import PersonPinCircleOutlinedIcon from "@material-ui/icons/PersonPinCircleOutlined";
import PhoneOutlinedIcon from "@material-ui/icons/PhoneOutlined";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import useStyles from "./styles";

const CartOptionsSection: React.FC<CartOptionsSectionPropsType> = () => {
  const [user] = useGetUser();
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <CartOption>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <CartOption.Title>Guest Checkout</CartOption.Title>
          <EditRoundedIcon fontSize="small" />
        </Box>
        <CartOption.Info>
          <Box color="rgb(117 0 245)" mr={1}>
            <AlternateEmailRoundedIcon fontSize="small" />
          </Box>
          <CartOption.SubTitle>
            {user?.username || "guest"}@gmail.com
          </CartOption.SubTitle>
        </CartOption.Info>
      </CartOption>
      <CartOption>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <CartOption.Title>Shipping Information</CartOption.Title>
          <EditRoundedIcon fontSize="small" />
        </Box>
        <CartOption.Info>
          <Box color="rgb(117 0 245)" mr={1}>
            <AccountCircleOutlinedIcon fontSize="small" />
          </Box>
          <CartOption.SubTitle>{user?.username}</CartOption.SubTitle>
        </CartOption.Info>
        <CartOption.Info>
          <Box color="rgb(117 0 245)" mr={1}>
            <PersonPinCircleOutlinedIcon fontSize="small" />
          </Box>
          <CartOption.SubTitle>
            React lane, 123# cross, Mumbai
          </CartOption.SubTitle>
        </CartOption.Info>
        <CartOption.Info>
          <Box color="rgb(117 0 245)" mr={1}>
            <PhoneOutlinedIcon fontSize="small" />
          </Box>
          <CartOption.SubTitle>403-4343-332-222</CartOption.SubTitle>
        </CartOption.Info>
      </CartOption>
      <CartOption>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <CartOption.Title>Payment</CartOption.Title>
          <EditRoundedIcon fontSize="small" />
        </Box>
        <CartOption.Info>
          <Box color="rgb(117 0 245)" mr={1}>
            <CreditCardIcon fontSize="small" />
          </Box>
          <CartOption.SubTitle>424242424242424</CartOption.SubTitle>
        </CartOption.Info>
      </CartOption>
      <Box
        mt={1}
        className={classes.btnCont}
        width="100%"
        justifyContent="flex-end"
        display="flex"
      >
        <Button
          color="primary"
          size="large"
          variant="contained"
          disableElevation
          style={{ textTransform: "none" }}
        >
          Place Your Order
        </Button>
      </Box>
    </Box>
  );
};

export default CartOptionsSection;
