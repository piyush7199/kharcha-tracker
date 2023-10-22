import React, { useContext, useState } from "react";
import { Center, Heading } from "@chakra-ui/react";
import {
  Button,
  FormControl,
  Flex,
  Stack,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import { PinInput, PinInputField } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { COLORS, contactErrorToast, getToast } from "../../Constants/constants";
import { API } from "../../Services/apis";
import { DataContext } from "../Context/DataProvider";

const VerifyOtp = ({ setIsVerified }) => {
  const buttonStyle = {
    bg: COLORS.MAIN_COLOR,
    type: "submit",
    color: COLORS.DARK_BLACK_COLOR,
    size: "lg",
    _hover: {
      bg: useColorModeValue(COLORS.DARK_BLACK_COLOR, COLORS.LIGHT_COLOR),
      color: useColorModeValue(COLORS.LIGHT_COLOR, COLORS.DARK_BLACK_COLOR),
    },
  };

  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [disable, setDisable] = useState(true);
  const toast = useToast();
  const { user, setUser } = useContext(DataContext);

  const handleChangeOtp = (value) => {
    setOtp(value);
    if (value && value.length === 6) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  };

  const handleClick = async () => {
    try {
      const body = {
        otp: otp,
      };

      const res = await API.verifyOtp(body);

      console.log(res);
      if (res.isSuccess) {
        toast(
          getToast("Account Verified.", "Email verified successfully", false)
        );
        setUser(res.data.User);
        setIsVerified(res.data.User.isVerified);
        navigate("/home");
      } else {
        toast(getToast("OTP verification failed", res.message, true));
      }
    } catch (error) {
      toast(contactErrorToast());
    }
  };

  const handleResend = async () => {
    try {
      const res = await API.resendOtp();
      console.log(res);
      if (res.isSuccess) {
        toast(getToast("Opt Resend.", "Check you Email", false));
        setUser(res.data.User);
        setIsVerified(res.data.User.isVerified);
      } else {
        toast(getToast("Failed to resend OTP", res.message, true));
      }
    } catch (error) {
      toast(contactErrorToast());
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.900")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"sm"}
        bg={useColorModeValue("white", COLORS.DARK_BLACK_COLOR)}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={10}
      >
        <Center>
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
            Verify your Email
          </Heading>
        </Center>
        <Center
          fontSize={{ base: "sm", sm: "md" }}
          color={useColorModeValue("gray.800", "gray.400")}
        >
          We have sent code to your email
        </Center>
        <Center
          fontSize={{ base: "sm", sm: "md" }}
          fontWeight="bold"
          color={COLORS.MAIN_COLOR}
        >
          {user.email}
        </Center>
        <FormControl>
          <Center>
            <HStack>
              <PinInput value={otp} onChange={handleChangeOtp}>
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </HStack>
          </Center>
        </FormControl>
        <Stack spacing={6}>
          <Button isDisabled={disable} sx={buttonStyle} onClick={handleClick}>
            Verify
          </Button>
        </Stack>
        <Stack spacing={6}>
          <Button variant="outline" colorScheme="teal" onClick={handleResend}>
            Resend Otp
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default VerifyOtp;
