import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { Typewriter } from "react-simple-typewriter";
import { COLORS } from "../Constants/constants";

import "./styles.css";
import Footer from "./Mis/Footer";

const IndexPage = () => {
  const indexContainerStyle = {
    minHeight: "94vh",
    display: "flex",
    flexDirection: "column",
    flex: "0.9",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: useColorModeValue(
      COLORS.LIGHT_COLOR,
      COLORS.DARK_BLACK_COLOR
    ),
    color: useColorModeValue(COLORS.DARK_BLACK_COLOR, COLORS.LIGHT_COLOR),
    position: "relative",
    padding: "2rem",
  };

  const buttonStyle = {
    bg: COLORS.MAIN_COLOR,
    width: "full",
    type: "submit",
    mt: "2rem",
    color: useColorModeValue(COLORS.LIGHT_COLOR, COLORS.DARK_BLACK_COLOR),
    size: "lg",
    borderRadius: "20px",
    _hover: {
      bg: useColorModeValue(COLORS.DARK_BLACK_COLOR, COLORS.LIGHT_COLOR),
      color: useColorModeValue(COLORS.LIGHT_COLOR, COLORS.DARK_BLACK_COLOR),
    },
  };

  const handleType = (count) => {};

  const handleDone = () => {};

  return (
    <Box display="flex" flexDir="column">
      <Box sx={indexContainerStyle}>
        <Heading as="h1" size="xl" textAlign="center" marginBottom="2">
          Welcome to{" "}
          <span style={{ color: COLORS.MAIN_COLOR }}>Kharcha Tracker</span>
        </Heading>

        <Text fontSize="lg" textAlign="center" marginBottom="4">
          Effortlessly manage your <br />
          <span
            style={{
              color: COLORS.MAIN_COLOR,
              fontWeight: "bold",
              fontSize: "25px",
            }}
          >
            <Typewriter
              words={["Expenses", "Incomes", "Investments"]}
              loop={5}
              cursor
              cursorStyle=""
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
              onLoopDone={handleDone}
              onType={handleType}
            />
          </span>
          <br />
          in one place.
        </Text>
        <Text fontSize="lg" textAlign="center" marginBottom="4">
          Take control of your financial future by signing up for our web app.
        </Text>
        <Link to="/login">
          <Button sx={buttonStyle}>Get Started</Button>
        </Link>
      </Box>
      <Footer />
    </Box>
  );
};

export default IndexPage;
