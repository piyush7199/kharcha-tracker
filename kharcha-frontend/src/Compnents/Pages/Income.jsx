import React, { useContext, useEffect, useState } from "react";
import { TbCurrencyRupee } from "react-icons/tb";

import KharchaPage from "./KharchaPage";
import { API } from "../../Services/apis";
import { DataContext } from "../Context/DataProvider";
import {
  PAGENAMES,
  contactErrorToast,
  getStartDate,
  getToast,
} from "../../Constants/constants";
import { useToast } from "@chakra-ui/react";

const columnDetails = [
  {
    label: "Category",
    accessor: "category",
  },
];

const categoryOptions = ["Salary", "Interest", "Caseback", "Refund", "Others"];

const Income = () => {
  const { load } = useContext(DataContext);
  const [data, setData] = useState([]);
  const [totalIncome, setTotalIncome] = useState("");
  const toast = useToast();

  useEffect(() => {
    const getDate = async () => {
      try {
        const res = await API.getIncome({ startDate: getStartDate() });
        if (res.isSuccess) {
          setData(res.data.incomeData);
          setTotalIncome(res.data.totalIncome);
        } else {
          toast(
            getToast(
              `Error while getting ${PAGENAMES.INCOME}`,
              res.message,
              true
            )
          );
        }
      } catch (error) {
        console.log(error);
        toast(contactErrorToast());
      }
    };
    getDate();
  }, [load]);

  const elements = [
    { title: "Total Income", stat: totalIncome, icon: TbCurrencyRupee },
  ];

  return (
    <KharchaPage
      categoryOptions={categoryOptions}
      elements={elements}
      data={data}
      pageName={PAGENAMES.INCOME}
      columnDetails={columnDetails}
    />
  );
};

export default Income;
