import {
  Avatar,
  Box,
  Flex,
  HStack,
  IconButton,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import React from "react";

import { COLORS } from "../../Constants/constants";
import DatePickerModel from "../Model/DatePickerModel";
import { useLocation } from "react-router-dom";
import DateRangePicker from "../Model/DateRangePicker";

const MobileNav = ({ onOpen, ...rest }) => {
  const location = useLocation();

  return (
    <Flex
      flexDir="column"
      bg={useColorModeValue("white", COLORS.DARK_BLACK_COLOR)}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
    >
      <Flex
        ml={{ base: 0, md: 60 }}
        px={{ base: 4, md: 4 }}
        height="20"
        alignItems="center"
        justifyContent={{ base: "space-between", md: "flex-end" }}
        {...rest}
      >
        <IconButton
          display={{ base: "flex", md: "none" }}
          onClick={onOpen}
          variant="outline"
          aria-label="open menu"
          icon={<FiMenu />}
        />

        <Text
          display={{ base: "flex", md: "none" }}
          fontSize=""
          fontWeight="bold"
          color={COLORS.MAIN_COLOR}
        >
          Kharcha Tracker
        </Text>

        <HStack spacing={{ base: "0", md: "6" }}>
          <Flex alignItems={"center"}>
            {location && location.pathname === "/home" ? (
              <HStack spacing="1px" ml="2">
                <DatePickerModel />
                <Box display={{ base: "none", md: "flex" }} mr={4}>
                  <DateRangePicker />
                </Box>
              </HStack>
            ) : (
              <></>
            )}

            <Box style={{ cursor: "pointer" }}>
              <HStack>
                <Avatar
                  backgroundColor={COLORS.MAIN_COLOR}
                  alignContent="center"
                  size={"sm"}
                  name={"Piyush"}
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm" marginRight="1.5rem">
                    Piyush Lahoti
                  </Text>
                </VStack>
              </HStack>
            </Box>
          </Flex>
        </HStack>
      </Flex>
      <Box
        ml={{ base: 0, md: 60 }}
        px={{ base: 4, md: 4 }}
        display={{ base: "flex", md: "none" }}
      >
        <DateRangePicker />
      </Box>
    </Flex>
  );
};

export default MobileNav;
