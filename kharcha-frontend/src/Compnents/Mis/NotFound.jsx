import React, { useState } from "react";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { COLORS } from "../../Constants/constants";

export const NotFound = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const buttonStyle = {
    bg: COLORS.MAIN_COLOR,
    type: "submit",
    mt: "2rem",
    color: isDarkTheme ? COLORS.DARK_BLACK_COLOR : COLORS.DARK_BLACK_COLOR,
    size: "lg",
    _hover: {
      bg: isDarkTheme ? COLORS.LIGHT_COLOR : COLORS.DARK_BLACK_COLOR,
      color: isDarkTheme ? COLORS.DARK_BLACK_COLOR : COLORS.LIGHT_COLOR,
    },
  };

  const footerStyle = {
    minHeight: "6vh",
    // borderTop: "1px solid rgba(146, 145, 232, 255)",
    backgroundColor: isDarkTheme ? COLORS.DARK_BLACK_COLOR : COLORS.LIGHT_COLOR,
  };

  const singInLink = {
    fontSize: "0.95em",
    textAlign: "center",
    marginTop: "4",
    color: "grey",
    "@media (max-width: 850px)": {
      fontSize: "0.85em",
    },
  };

  return (
    <Box>
      <Box
        display="flex"
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        height="94vh"
        backgroundColor={
          isDarkTheme ? COLORS.DARK_BLACK_COLOR : COLORS.LIGHT_COLOR
        }
      >
        <Heading
          display="inline-block"
          as="h2"
          size="2xl"
          color={COLORS.MAIN_COLOR}
        >
          404
        </Heading>
        <Text
          color={isDarkTheme ? COLORS.LIGHT_COLOR : COLORS.DARK_BLACK_COLOR}
          fontSize="18px"
          mt={3}
          mb={2}
        >
          Page Not Found
        </Text>
        <Text sx={singInLink}>
          The page you&apos;re looking for does not seem to exist
        </Text>
        <Link to="/home">
          <Button sx={buttonStyle}>Go to Home</Button>
        </Link>
      </Box>
      <Box sx={footerStyle}>
        <footer>
          <hr
            style={{
              width: "70%",
              margin: "auto",
              backgroundColor: COLORS.MAIN_COLOR,
              marginBottom: "1rem",
            }}
          />
          <Text sx={singInLink}>
            &copy; Copyright {new Date().getFullYear()} Kharcha Tracker
          </Text>
        </footer>
      </Box>
    </Box>
  );
};
