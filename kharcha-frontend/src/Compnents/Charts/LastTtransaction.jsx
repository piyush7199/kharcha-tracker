import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  YAxis,
  ReferenceLine,
} from "recharts";
import { Box, useColorModeValue, Heading, useToast } from "@chakra-ui/react";

import { COLORS, CustomTooltip } from "../../Constants/constants";
import { API } from "../../Services/apis";
import { contactErrorToast, getToast } from "../../Constants/constants";

const LastTransaction = () => {
  const initalState = [
    {
      Expense: 0,
      date: "",
      name: "",
      Income: 0,
    },
  ];
  const [data, setData] = useState(initalState);
  const toast = useToast();

  useEffect(() => {
    const getDate = async () => {
      try {
        const res = await API.getLastTrans({ lastTransactions: 5 });
        if (res.isSuccess) {
          setData(res.data.lastTransaction);
        } else {
          toast(
            getToast(`Error while getting last transactions`, res.message, true)
          );
        }
      } catch (error) {
        console.log(error);
        toast(contactErrorToast());
      }
    };
    getDate();
  }, [toast]);

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
        Last 5 Transactions
      </Heading>
      <Box display={{ base: "block", md: "none" }} my={4}>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <XAxis dataKey="date" />
            <Tooltip />
            <Bar dataKey="Income" fill="#82ca9d" stackId="stack" />
            <Bar dataKey="Expense" fill="red" stackId="stack" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
      <Box display={{ base: "none", md: "block" }}>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            width={500}
            height={300}
            stackOffset="sign"
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={0} stroke="#000" />
            <Bar dataKey="Income" fill="#82ca9d" stackId="stack" />
            <Bar dataKey="Expense" fill="red" stackId="stack" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default LastTransaction;
