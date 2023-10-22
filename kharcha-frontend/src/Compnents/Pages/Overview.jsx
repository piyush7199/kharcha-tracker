import { Box, useToast } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import Cards from "../Mis/Cards";
import Boxes from "../Mis/Boxes";
import { AiOutlineWallet } from "react-icons/ai";
import { LiaCoinsSolid } from "react-icons/lia";
import { TbCurrencyRupee } from "react-icons/tb";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { DataContext } from "../Context/DataProvider";
import { API } from "../../Services/apis";
import { contactErrorToast, getToast } from "../../Constants/constants";

const initalState = {
  investmentData: [],
  totalInvestment: 0,
  incomeData: [],
  totalIncome: 0,
  expenseData: [],
  totalExpense: 0,
  balanceLeft: 0,
};

const Overview = () => {
  const { startDate, endDate } = useContext(DataContext);
  const [data, setData] = useState(initalState);
  const toast = useToast();

  useEffect(() => {
    const getDate = async () => {
      try {
        const res = await API.getOverwiew({
          startDate: startDate,
          endDate: endDate,
        });
        if (res.isSuccess) {
          setData((prev) => res.data);
        } else {
          toast(
            getToast(`Error while getting overview data`, res.message, true)
          );
        }
      } catch (error) {
        console.log(error);
        toast(contactErrorToast());
      }
    };
    getDate();
  }, [startDate, endDate]);

  const elements = [
    {
      title: "Balance left",
      stat: data.balanceLeft,
      icon: HiOutlineCurrencyRupee,
    },
    { title: "Total Income", stat: data.totalIncome, icon: TbCurrencyRupee },
    { title: "Total Expenses", stat: data.totalExpense, icon: AiOutlineWallet },
    {
      title: "Total Investment",
      stat: data.totalInvestment,
      icon: LiaCoinsSolid,
    },
  ];

  return (
    <Box>
      <Box mb={2}>
        <Cards elements={elements} />
      </Box>
      <Box mt={2}>
        <Boxes data={data} />
      </Box>
    </Box>
  );
};

export default Overview;
