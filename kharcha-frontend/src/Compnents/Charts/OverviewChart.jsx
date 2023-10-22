import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { Box, useColorModeValue, Heading } from "@chakra-ui/react";
import { COLORS } from "../../Constants/constants";

const PIECOLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]; // Add your color values here

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const OverviewPieChart = ({ income, expense, investment }) => {
  const data = [
    { name: "Income", value: income },
    { name: "Expenses", value: expense },
    { name: "Investments", value: investment },
  ];

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
        Overview
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
              outerRadius={80}
              label={renderCustomizedLabel}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={PIECOLORS[index % PIECOLORS.length]}
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
              outerRadius={150}
              label={renderCustomizedLabel}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={PIECOLORS[index % PIECOLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default OverviewPieChart;
