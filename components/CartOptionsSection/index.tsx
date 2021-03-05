import React from "react";
import { CartOptionsSectionPropsType } from "./types";
import CartOption from "../CartOption";
import { Box } from "@material-ui/core";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import AlternateEmailRoundedIcon from "@material-ui/icons/AlternateEmailRounded";
import useGetUser from "../../utils/useGetUser";

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
          <CartOption.SubTitle>guest@adam.co</CartOption.SubTitle>
        </CartOption.Info>
      </CartOption>
    </Box>
  );
};

export default CartOptionsSection;
