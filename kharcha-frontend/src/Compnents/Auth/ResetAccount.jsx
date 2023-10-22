import React, { useState } from "react";
import {
  Progress,
  Box,
  Button,
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Input,
  useColorModeValue,
  Stack,
  HStack,
  Center,
  PinInput,
  PinInputField,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

import { useToast } from "@chakra-ui/react";

import { COLORS, contactErrorToast, getToast } from "../../Constants/constants";
import Footer from "../Mis/Footer";
import { API } from "../../Services/apis";
import { useNavigate } from "react-router-dom";

const Form1 = ({ usernameOrEmail, setUsernameOrEmail }) => {
  const inputStyle = {
    color: useColorModeValue(COLORS.DARK_BLACK_COLOR, COLORS.LIGHT_COLOR),
    bg: useColorModeValue("rgba(0, 0, 0, 0.1)", "rgba(255, 255, 255, 0.1)"),
    borderRadius: "5px",
    _hover: null,
    _focus: {
      bg: useColorModeValue("rgba(0, 0, 0, 0.1)", "rgba(255, 255, 255, 0.1)"),
    },
  };

  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        Change Password
      </Heading>
      <FormControl>
        <FormLabel>Email/Username</FormLabel>
        <Input
          size="lg"
          variant="filled"
          sx={inputStyle}
          name="usernameOrEmail"
          value={usernameOrEmail}
          onChange={(e) => setUsernameOrEmail(e.target.value)}
        />
      </FormControl>
    </>
  );
};

const Form2 = ({ otp, setOtp }) => {
  const handleChangeOtp = (value) => {
    setOtp(value);
  };

  return (
    <>
      <Stack
        spacing={4}
        rounded={"lg"}
        bg={useColorModeValue(COLORS.LIGHT_COLOR, COLORS.DARK_BLACK_COLOR)}
        p={{ base: 1, md: 3 }}
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
      </Stack>
    </>
  );
};

const Form3 = ({ password, setPassword }) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <>
      <FormControl>
        <FormLabel htmlFor="password" fontWeight={"normal"} mt="2%">
          Password
        </FormLabel>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
    </>
  );
};

const ResetAccount = () => {
  const containerBoxStyle = {
    minHeight: "94vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: useColorModeValue(
      "rgba(245, 247, 255, 255)",
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
    color: useColorModeValue("COLORS.LIGHT_COLOR", COLORS.DARK_BLACK_COLOR),
    size: "lg",
    borderRadius: "5px",
    _hover: {
      bg: useColorModeValue(COLORS.DARK_BLACK_COLOR, COLORS.LIGHT_COLOR),
      color: useColorModeValue(COLORS.LIGHT_COLOR, COLORS.DARK_BLACK_COLOR),
    },
  };

  const toast = useToast();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleNext = async () => {
    if (step == 1) {
      try {
        const body = {
          usernameOrEmail: usernameOrEmail,
        };
        const res = await API.forgetPasswordMail(body);
        if (res.isSuccess) {
          toast(
            getToast(
              "Please check mail.",
              "To change password enter otp",
              false
            )
          );
          setStep(step + 1);
          if (step === 3) {
            setProgress(100);
          } else {
            setProgress(progress + 33.33);
          }
        } else {
          toast(getToast("Error while seding otp", res.message, true));
          setStep(1);
          setProgress(33.33);
          setUsernameOrEmail("");
          setOtp("");
          setPassword("");
        }
      } catch (error) {
        console.log("Error while sending otp to change password", error);
        setStep(1);
        setProgress(33.33);
        setUsernameOrEmail("");
        setOtp("");
        setPassword("");
      }
    } else {
      setStep(step + 1);
      if (step === 3) {
        setProgress(100);
      } else {
        setProgress(progress + 33.33);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const body = {
        usernameOrEmail: usernameOrEmail,
        otp: otp,
        newPassword: password,
      };
      const res = await API.changePassword(body);
      console.log(res);
      if (res.isSuccess) {
        toast(
          getToast("Password Changed.", "Your password has been changes", false)
        );
        navigate("/login");
      } else {
        toast(getToast("Error while changing password", res.message, true));
      }
    } catch (error) {
      console.log(error);
      contactErrorToast();
      navigate("/login");
    }
  };

  return (
    <Flex flexDir="column">
      <Box sx={containerBoxStyle}>
        <Stack
          borderWidth="1px"
          border="solid"
          borderColor={useColorModeValue("white", "#121212")}
          spacing={4}
          rounded={"xl"}
          mx={"auto"}
          width={{ base: "100%", md: "25%" }}
          p={{ base: 3, md: 6 }}
        >
          <Box
            rounded={"lg"}
            bg={useColorModeValue(COLORS.LIGHT_COLOR, COLORS.DARK_BLACK_COLOR)}
            p={{ base: 1, md: 3 }}
          >
            <Progress
              hasStripe
              value={progress}
              mb="5%"
              mx="5%"
              isAnimated
            ></Progress>
            {step === 1 ? (
              <Form1
                usernameOrEmail={usernameOrEmail}
                setUsernameOrEmail={setUsernameOrEmail}
              />
            ) : step === 2 ? (
              <Form2 otp={otp} setOtp={setOtp} />
            ) : (
              <Form3 password={password} setPassword={setPassword} />
            )}

            <HStack mt={5}>
              <Button
                onClick={() => {
                  setStep(step - 1);
                  setProgress(progress - 33.33);
                }}
                isDisabled={step === 1}
                colorScheme="teal"
                variant="outline"
                width="full"
              >
                Back
              </Button>
              {step !== 3 ? (
                <Button
                  isDisabled={step === 3}
                  onClick={handleNext}
                  sx={buttonStyle}
                >
                  Next
                </Button>
              ) : null}

              {step === 3 ? (
                <Button
                  isDisabled={!password || password.length <= 6}
                  onClick={handleSubmit}
                  sx={buttonStyle}
                >
                  Submit
                </Button>
              ) : null}
            </HStack>
          </Box>
        </Stack>
      </Box>
      <Footer />
    </Flex>
  );
};

export default ResetAccount;
