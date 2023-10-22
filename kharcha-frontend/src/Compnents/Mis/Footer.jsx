import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";

import { COLORS } from "../../Constants/constants";

const Footer = () => {
  const footerStyle = {
    minHeight: "6vh",
    backgroundColor: useColorModeValue(
      COLORS.LIGHT_COLOR,
      COLORS.DARK_BLACK_COLOR
    ),
  };

  const footerTextStyle = {
    fontSize: "0.95em",
    textAlign: "center",
    marginTop: "4",
    color: "grey",
    "@media (max-width: 850px)": {
      fontSize: "0.85em",
    },
  };

  return (
    <Box sx={footerStyle}>
      <footer>
        <hr
          style={{
            width: "65%",
            margin: "auto",
            backgroundColor: COLORS.MAIN_COLOR,
            marginBottom: "1rem",
          }}
        />
        <Text sx={footerTextStyle}>
          &copy; Copyright {new Date().getFullYear()} Kharcha Tracker
        </Text>
      </footer>
    </Box>
  );
};

export default Footer;
