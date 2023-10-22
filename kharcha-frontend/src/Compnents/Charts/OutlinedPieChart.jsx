import { Box, Heading, useColorModeValue } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Legend,
  Cell,
  Tooltip,
} from "recharts";
import { COLORS } from "../../Constants/constants";

const OutlinedPieChart = ({ investmentData }) => {
  const data = investmentData;

  return (
    <Box
      px={{ base: 2, md: 4 }}
      mt={9}
      py={{ base: 2, md: 4 }}
      shadow={"xl"}
      border={"1px solid"}
      borderColor={useColorModeValue("gray.800", "gray.500")}
      rounded={"lg"}
      bg={useColorModeValue("white", COLORS.DARK_BLACK_COLOR)}
    >
      <Heading color={COLORS.MAIN_COLOR} as="h2" size="lg" mb={4}>
        Investment Details
      </Heading>
      <Box
        display={{ base: "block", md: "none" }} // Show on mobile, hide on larger screens
        my={4} // Margin for mobile
      >
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              fill="#8884d8"
              dataKey="amount"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`#${((Math.random() * 0xffffff) << 0).toString(16)}`}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Box>
      <Box
        display={{ base: "none", md: "block" }} // Show on larger screens, hide on mobile
      >
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              innerRadius={130}
              outerRadius={150}
              paddingAngle={5}
              fill="#8884d8"
              dataKey="amount"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`#${((Math.random() * 0xffffff) << 0).toString(16)}`}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default OutlinedPieChart;
