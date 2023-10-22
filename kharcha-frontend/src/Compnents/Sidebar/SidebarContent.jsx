import {
  Box,
  CloseButton,
  Flex,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import NavItem from "./NavItem";
import { BiSupport } from "react-icons/bi";
import { IoHomeOutline } from "react-icons/io5";
import { AiOutlineWallet } from "react-icons/ai";
import { LiaCoinsSolid } from "react-icons/lia";
import { TbCurrencyRupee } from "react-icons/tb";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";
// import { RiFeedbackLine } from "react-icons/ri";
import { MdLogout } from "react-icons/md";

import { COLORS } from "../../Constants/constants";
import { removeAccessToken } from "../../Utility/common-utils";
import { useNavigate } from "react-router-dom";

const SidebarContent = ({ onClose, ...rest }) => {
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();

  const handleLogout = () => {
    removeAccessToken();
    navigate("/login");
  };

  const handleHome = () => {
    navigate("/home");
  };

  const handleExpense = () => {
    navigate("/expenses");
  };

  const handleIncome = () => {
    navigate("/income");
  };

  const handleInvestments = () => {
    navigate("/investments");
  };

  const handleContactUs = () => {
    window.open("mailto:kharchatracker@gmail.com", "_blank");
  };

  // const handleFeedback = () => {
  //   navigate("");
  // };

  const LinkItems = [
    {
      name: "Dashboard",
      icon: IoHomeOutline,
      func: handleHome,
    },
    {
      name: "Income",
      icon: TbCurrencyRupee,
      func: handleIncome,
    },
    {
      name: "Expenses",
      icon: AiOutlineWallet,
      func: handleExpense,
    },
    {
      name: "Investments",
      icon: LiaCoinsSolid,
      func: handleInvestments,
    },
  ];

  const LastItems = [
    {
      name: "Contact Us",
      icon: BiSupport,
      func: handleContactUs,
    },
    {
      name: "Dark Mode",
      icon: colorMode === "light" ? BsToggleOff : BsToggleOn,
      func: toggleColorMode,
    },
    {
      name: "Logout",
      icon: MdLogout,
      func: handleLogout,
    },
  ];

  return (
    <Box
      bg={useColorModeValue("white", COLORS.DARK_BLACK_COLOR)}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="100vh"
      {...rest}
    >
      <Box h="60vh">
        <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
          <Text fontSize="1rem" fontWeight="bold" color={COLORS.MAIN_COLOR}>
            Kharcha Tracker
          </Text>
          <CloseButton
            display={{ base: "flex", md: "none" }}
            onClick={onClose}
          />
        </Flex>
        {LinkItems.map((link) => (
          <NavItem key={link.name} icon={link.icon} func={link.func}>
            {link.name}
          </NavItem>
        ))}
      </Box>
      <Box alignItems="center" h="40vh">
        <hr
          style={{
            width: "70%",
            margin: "auto",
            backgroundColor: COLORS.MAIN_COLOR,
            marginBottom: "1rem",
          }}
        />
        {LastItems.map((link) => (
          <NavItem key={link.name} icon={link.icon} func={link.func}>
            {link.name}
          </NavItem>
        ))}
      </Box>
    </Box>
  );
};

export default SidebarContent;
