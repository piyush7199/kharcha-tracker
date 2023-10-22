import { Box, Flex, Icon } from "@chakra-ui/react";
import React from "react";

import { COLORS } from "../../Constants/constants";

const NavItem = ({ icon, redirect, func, children, ...rest }) => {
  return (
    <Box
      as="a"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
      onClick={func}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: COLORS.MAIN_COLOR,
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            color={COLORS.MAIN_COLOR}
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

export default NavItem;
