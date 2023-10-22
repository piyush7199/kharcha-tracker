import React from "react";
import {
  Box,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
import { BiRupee } from "react-icons/bi";

import { COLORS } from "../../Constants/constants";
import ExpenseCharts from "../Charts/ExpenseCharts";
import OverviewChart from "../Charts/OverviewChart";
import LastTtransaction from "../Charts/LastTtransaction";
import OutlinedPieChart from "../Charts/OutlinedPieChart";
// import ExpenseCharts from "../Charts/ExpenseCharts";

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
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}

const Boxes = ({ data }) => {
  return (
    <Box mx={"auto"} pt={2} px={{ base: 5, sm: 12, md: 17 }}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 5, lg: 8 }}>
        <LastTtransaction />
        <OverviewChart
          income={data.totalIncome}
          expense={data.totalExpense}
          investment={data.totalInvestment}
        />
        <ExpenseCharts expenseData={data.expenseData} />
        {/* <ExpenseCharts /> */}
        <OutlinedPieChart investmentData={data.investmentData} />
      </SimpleGrid>
    </Box>
  );
};

export default Boxes;
