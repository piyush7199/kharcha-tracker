import React, { useContext, useEffect, useState } from "react";
import { LiaCoinsSolid } from "react-icons/lia";

import KharchaPage from "./KharchaPage";
import { DataContext } from "../Context/DataProvider";
import {
  PAGENAMES,
  contactErrorToast,
  getStartDate,
  getToast,
} from "../../Constants/constants";
import { API } from "../../Services/apis";
import { useToast } from "@chakra-ui/react";

const columnDetails = [
  {
    label: "Invested In",
    accessor: "investedIn",
  },
];

const investedInOptions = [
  "Stocks",
  "Mutual Funds",
  "Cryptocurrency",
  "Real State",
  "Commodity",
  "Bond",
];

const Investment = () => {
  const { load } = useContext(DataContext);
  const [data, setData] = useState([]);
  const [totalInvestment, setTotalInvestment] = useState("");
  const toast = useToast();

  useEffect(() => {
    const getDate = async () => {
      try {
        const res = await API.getInvestment({ startDate: getStartDate() });
        if (res.isSuccess) {
          setData(res.data.investmentData);
          setTotalInvestment(res.data.totalInvestment);
        } else {
          toast(
            getToast(
              `Error while getting ${PAGENAMES.INVESTMENT}`,
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
    { title: "Total Investment", stat: totalInvestment, icon: LiaCoinsSolid },
  ];
  return (
    <KharchaPage
      investedInOptions={investedInOptions}
      elements={elements}
      data={data}
      pageName={PAGENAMES.INVESTMENT}
      columnDetails={columnDetails}
    />
  );
};

export default Investment;
