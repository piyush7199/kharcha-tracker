import React, { useContext, useEffect, useState } from "react";
import { AiOutlineWallet } from "react-icons/ai";

import KharchaPage from "./KharchaPage";
import {
  PAGENAMES,
  contactErrorToast,
  getStartDate,
  getToast,
} from "../../Constants/constants";
import { DataContext } from "../Context/DataProvider";
import { API } from "../../Services/apis";
import { useToast } from "@chakra-ui/react";

const columnDetails = [
  {
    label: "Sub-Category",
    accessor: "subCategory",
  },
  {
    label: "Category",
    accessor: "category",
  },
  {
    label: "Payment Via",
    accessor: "paidVia",
  },
];

const subCategoryOptions = {
  Necessity: ["Food", "Grocery", "Medical", "Eduction"],
  Bills: ["Ele Bill", "Recharges"],
  Luxury: ["Shopping", "Entertainment", "Travel"],
  Payments: ["Debt", "EMI", "Loan"],
  Others: ["Others"],
};

const paymentOptions = [
  "Cash",
  "UPI",
  "Credit Card",
  "Debit Card",
  "NetBanking",
];

const Expense = () => {
  const { load } = useContext(DataContext);
  const [data, setData] = useState([]);
  const [totalExpense, setTotaltotalExpense] = useState("");
  const toast = useToast();

  useEffect(() => {
    const getDate = async () => {
      try {
        const res = await API.getExpense({ startDate: getStartDate() });
        if (res.isSuccess) {
          setData(res.data.expenseData);
          setTotaltotalExpense(res.data.totalExpense);
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
    { title: "Total Expenses", stat: totalExpense, icon: AiOutlineWallet },
  ];

  return (
    <KharchaPage
      subCategoryOptions={subCategoryOptions}
      paymentOptions={paymentOptions}
      elements={elements}
      data={data}
      pageName={PAGENAMES.EXPENSE}
      columnDetails={columnDetails}
    />
  );
};

export default Expense;
