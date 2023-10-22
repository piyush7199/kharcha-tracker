import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Text,
  Button,
  Input,
  useColorModeValue,
  useToast,
  Flex,
  Stack,
  HStack,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

import {
  COLORS,
  linkStyle,
  getErrorToastForInvalidData,
  contactErrorToast,
  getToast,
} from "../../Constants/constants";
import { API } from "../../Services/apis";
import { DataContext } from "../Context/DataProvider";
import { setAccessToken } from "../../Utility/common-utils";
import Footer from "../Mis/Footer";
import Banner from "../Mis/Banner";

const SignupPage = ({ isUserAuthenticated }) => {
  const signupContainerStyle = {
    minHeight: "94vh",
    display: "flex",
    flexDirection: "column",
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
    mt: "1rem",
    color: useColorModeValue(COLORS.LIGHT_COLOR, COLORS.DARK_BLACK_COLOR),
    size: "lg",
    borderRadius: "5px",
    _hover: {
      bg: useColorModeValue(COLORS.DARK_BLACK_COLOR, COLORS.LIGHT_COLOR),
      color: useColorModeValue(COLORS.LIGHT_COLOR, COLORS.DARK_BLACK_COLOR),
    },
  };

  const inputStyle = {
    color: useColorModeValue(COLORS.DARK_BLACK_COLOR, COLORS.LIGHT_COLOR),
    bg: useColorModeValue("rgba(0, 0, 0, 0.1)", "rgba(255, 255, 255, 0.1)"),
    borderRadius: "5px",
    _hover: null,
    _focus: {
      bg: useColorModeValue("rgba(0, 0, 0, 0.1)", "rgba(255, 255, 255, 0.1)"),
    },
  };

  const toast = useToast();
  const navigate = useNavigate();
  const { setUser } = useContext(DataContext);

  const signupInitailValues = {
    name: "",
    username: "",
    email: "",
    password: "",
  };

  const [signup, setSignUp] = useState(signupInitailValues);

  const handleInput = (e) => {
    setSignUp({ ...signup, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    if (!signup.name) {
      toast(getErrorToastForInvalidData("full name"));
      return;
    }

    if (!signup.username) {
      toast(getErrorToastForInvalidData("username"));
      return;
    }

    if (!signup.email) {
      toast(getErrorToastForInvalidData("email"));
      return;
    }

    if (!signup.password) {
      toast(getErrorToastForInvalidData("password"));
      return;
    }

    try {
      const res = await API.userSignup(signup);

      if (res.isSuccess) {
        toast(
          getToast(
            "Account created.",
            "We've created your account for you.",
            false
          )
        );
        setAccessToken(res.data.token);
        setUser(res.data.User);
        isUserAuthenticated(true);
        navigate("/verifyOtp");
      } else {
        toast(getToast("Sign Up Failed", res.message, true));
      }
    } catch (error) {
      toast(contactErrorToast);
    }
  };

  return (
    <Flex flexDir="column">
      <Box sx={signupContainerStyle}>
        <Stack
          borderWidth="1px"
          border="solid"
          borderColor={useColorModeValue("white", "#121212")}
          spacing={4}
          mx={"auto"}
          width={{ base: "100%", md: "25%" }}
          p={{ base: 3, md: 6 }}
        >
          <Banner message={"Create your account"} />

          <Box
            rounded={"lg"}
            bg={useColorModeValue(COLORS.LIGHT_COLOR, COLORS.DARK_BLACK_COLOR)}
            p={{ base: 1, md: 3 }}
          >
            <Stack spacing={4}>
              <HStack>
                <FormControl>
                  <FormLabel>Full Name</FormLabel>
                  <Input
                    size="lg"
                    variant="filled"
                    sx={inputStyle}
                    name="name"
                    onChange={(e) => handleInput(e)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Username</FormLabel>
                  <Input
                    size="lg"
                    variant="filled"
                    sx={inputStyle}
                    name="username"
                    onChange={(e) => handleInput(e)}
                  />
                </FormControl>
              </HStack>
              <FormControl>
                <FormLabel>Email Address</FormLabel>
                <Input
                  size="lg"
                  variant="filled"
                  sx={inputStyle}
                  name="email"
                  onChange={(e) => handleInput(e)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  size="lg"
                  variant="filled"
                  mb="1.5rem"
                  sx={inputStyle}
                  name="password"
                  onChange={(e) => handleInput(e)}
                />
              </FormControl>
            </Stack>
            <Button sx={buttonStyle} onClick={handleSignup}>
              Sign Up
            </Button>
            <Text sx={linkStyle}>
              Already have an account?{" "}
              <Link to="/login">
                <span style={{ color: COLORS.MAIN_COLOR }}>Log in</span>
              </Link>
            </Text>
          </Box>
        </Stack>
      </Box>
      <Footer />
    </Flex>
  );
};

export default SignupPage;
