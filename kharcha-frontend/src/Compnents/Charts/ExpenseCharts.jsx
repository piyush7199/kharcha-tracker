import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  YAxis,
  Cell,
} from "recharts";
import {
  Box,
  useColorModeValue,
  Heading,
  useBreakpointValue,
} from "@chakra-ui/react";
import { COLORS, CustomTooltip } from "../../Constants/constants";

const ExpenseCharts = ({ expenseData }) => {
  const showYAxis = useBreakpointValue({ base: false, md: true }); // Show Y-axis on md (medium) screens and above

  const allCategories = Array.from(
    new Set(
      expenseData.reduce(
        (categories, entry) => categories.concat(Object.keys(entry)),
        []
      )
    )
  ).filter((category) => category !== "date");

  const data = expenseData.map((entry) => {
    const date = entry.date;
    const newData = { date };
    allCategories.forEach((category) => {
      newData[category] = entry[category] || 0;
    });
    return newData;
  });

  return (
    <Box
      px={{ base: 2, md: 4 }}
      mt={{ base: 2, md: 9 }}
      py={{ base: 2, md: 4 }}
      shadow={"xl"}
      border={"1px solid"}
      borderColor={useColorModeValue("gray.800", "gray.500")}
      rounded={"lg"}
      bg={useColorModeValue("white", COLORS.DARK_BLACK_COLOR)}
    >
      <Heading color={COLORS.MAIN_COLOR} as="h2" size="lg" mb={4}>
        Expense
      </Heading>
      <Box
        display={{ base: "block", md: "none" }} // Show on mobile, hide on larger screens
        my={4} // Margin for mobile
      >
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <XAxis dataKey="date" />
            {showYAxis && <YAxis />} {/* Conditional rendering of Y-axis */}
            <Tooltip content={<CustomTooltip />} />
            {allCategories.map((category) => (
              <Bar
                key={category}
                dataKey={category}
                stackId="a"
                fill={`#${((Math.random() * 0xffffff) << 0).toString(16)}`}
                stroke={COLORS.MAIN_COLOR}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </Box>
      <Box
        display={{ base: "none", md: "block" }} // Show on larger screens, hide on mobile
      >
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey="date" />
            {showYAxis && <YAxis />} {/* Conditional rendering of Y-axis */}
            <Tooltip content={<CustomTooltip />} />
            {allCategories.map((category) => (
              <Bar
                key={category}
                dataKey={category}
                stackId="a"
                fill={`#${((Math.random() * 0xffffff) << 0).toString(16)}`}
                stroke={COLORS.MAIN_COLOR}
                strokeWidth={2}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default ExpenseCharts;
