import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Text,
  Button,
  Input,
  useColorModeValue,
  useToast,
  Stack,
  Checkbox,
  Link,
  HStack,
  Flex,
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
import { setAccessToken } from "../../Utility/common-utils";
import { DataContext } from "../Context/DataProvider";
import { API } from "../../Services/apis";
import Footer from "../Mis/Footer";
import Banner from "../Mis/Banner";

const LoginPage = ({ setIsVerified, isUserAuthenticated }) => {
  const loginContainerStyle = {
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

  const loginInitailValues = {
    usernameOrEmail: "",
    password: "",
  };

  const [login, setLogin] = useState(loginInitailValues);

  const handleInput = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    if (!login.usernameOrEmail) {
      toast(getErrorToastForInvalidData("Username Or Email"));
      return;
    }

    if (!login.password) {
      toast(getErrorToastForInvalidData("password"));
      return;
    }

    try {
      const res = await API.userLogin(login);
      if (res.isSuccess) {
        toast(getToast("Login successful.", "Welcome Back!!", false));
        setAccessToken(res.data.token);
        setUser(res.data.User);
        setIsVerified(res.data.User.isVerified);
        isUserAuthenticated(true);
        navigate("/home");
      } else {
        toast(getToast("Login Failed", res.message, true));
      }
    } catch (error) {
      toast(contactErrorToast);
    }
  };

  return (
    <Flex flexDir="column">
      <Box sx={loginContainerStyle}>
        <Stack
          borderWidth="1px"
          border="solid"
          borderColor={useColorModeValue("white", "#121212")}
          spacing={4}
          mx={"auto"}
          width={{ base: "100%", md: "25%" }}
          p={{ base: 3, md: 6 }}
        >
          <Banner message={"Login to your account"} />
          <Box
            rounded={"lg"}
            bg={useColorModeValue(COLORS.LIGHT_COLOR, COLORS.DARK_BLACK_COLOR)}
            p={{ base: 1, md: 3 }}
          >
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Email/Username</FormLabel>
                <Input
                  size="lg"
                  variant="filled"
                  sx={inputStyle}
                  name="usernameOrEmail"
                  onChange={(e) => handleInput(e)}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  size="lg"
                  variant="filled"
                  mb="1.2rem"
                  sx={inputStyle}
                  name="password"
                  onChange={(e) => handleInput(e)}
                />
              </FormControl>
            </Stack>
            <Stack>
              <HStack align={"start"} justify={"space-between"}>
                <Checkbox size={{ base: "sm", md: "md" }}>Remember me</Checkbox>
                <Text
                  color={"blue.400"}
                  fontSize={{ base: "0.85rem", md: "0.95rem" }}
                >
                  <Link
                    onClick={() => {
                      navigate("/account/reset");
                    }}
                  >
                    Forgot password?
                  </Link>
                </Text>
              </HStack>
            </Stack>
            <Button onClick={handleLogin} sx={buttonStyle}>
              Login
            </Button>
            <Text sx={linkStyle}>
              Don't have an account?{" "}
              <Link
                onClick={() => {
                  navigate("/signup");
                }}
              >
                <span style={{ color: COLORS.MAIN_COLOR }}>Sign up</span>
              </Link>
            </Text>
          </Box>
        </Stack>
      </Box>
      <Footer />
    </Flex>
  );
};

export default LoginPage;
