import React from "react";
import { CartOptionsSectionPropsType } from "./types";
import CartOption from "../CartOption";
import { Box } from "@material-ui/core";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import AlternateEmailRoundedIcon from "@material-ui/icons/AlternateEmailRounded";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import useGetUser from "../../utils/useGetUser";
import PersonPinCircleOutlinedIcon from "@material-ui/icons/PersonPinCircleOutlined";
import PhoneOutlinedIcon from "@material-ui/icons/PhoneOutlined";

const CartOptionsSection: React.FC<CartOptionsSectionPropsType> = () => {
  const [user] = useGetUser();
  return (
    <Box>
      <CartOption>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <CartOption.Title>Guest Checkout</CartOption.Title>
          <EditRoundedIcon />
        </Box>
        <CartOption.Info>
          <Box color="purple" mr={1}>
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
          <EditRoundedIcon />
          <CartOption.Info>
            <Box color="purple" mr={1}>
              <AccountCircleOutlinedIcon fontSize="small" />
            </Box>
            <CartOption.SubTitle>{user?.username}</CartOption.SubTitle>
            <Box color="purple" mr={1}>
              <PersonPinCircleOutlinedIcon fontSize="small" />
            </Box>
            <CartOption.SubTitle>
              React lane, 123# cross, Mumbai
            </CartOption.SubTitle>
            <Box color="purple" mr={1}>
              <PhoneOutlinedIcon fontSize="small" />
            </Box>
            <CartOption.SubTitle>403-4343-332-222</CartOption.SubTitle>
          </CartOption.Info>
        </Box>
      </CartOption>
    </Box>
  );
};

export default CartOptionsSection;
