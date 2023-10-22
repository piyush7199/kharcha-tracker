import React from "react";
import {
  Box,
  Flex,
  Icon,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
import { BiRupee } from "react-icons/bi";

import { COLORS } from "../../Constants/constants";

function StatsCard(props) {
  const { title, stat, icon } = props;
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={"5"}
      shadow={"xl"}
      border={"1px solid"}
      borderColor={useColorModeValue("gray.800", "gray.500")}
      rounded={"lg"}
      bg={useColorModeValue("white", COLORS.DARK_BLACK_COLOR)}
      overflow="hidden"
      overflowX="auto"
    >
      <Flex justifyContent={"space-between"}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={"medium"} isTruncated>
            {title}
          </StatLabel>
          <StatNumber display="flex" fontSize={"2xl"} fontWeight={"medium"}>
            <Box mt="1">
              <BiRupee />
            </Box>
            {stat}
          </StatNumber>
        </Box>
        <Box my={"auto"} color={COLORS.MAIN_COLOR} alignContent={"center"}>
          <Icon fontSize="3rem" as={icon} />
        </Box>
      </Flex>
    </Stat>
  );
}

const Cards = ({ pageName, elements }) => {
  return (
    <Box mx={"auto"} pt={1} px={{ base: 5, sm: 12, md: 17 }}>
      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={{ base: 5, lg: 8 }}>
        {elements &&
          elements.map((element, index) => {
            return (
              <StatsCard
                key={index}
                title={element.title}
                stat={element.stat}
                icon={element.icon}
              />
            );
          })}
      </SimpleGrid>
    </Box>
  );
};

export default Cards;
