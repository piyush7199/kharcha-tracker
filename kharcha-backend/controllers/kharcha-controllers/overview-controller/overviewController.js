import asyncHandler from "express-async-handler";
import { getErrorResponse } from "../../../utilities/responses/responses.js";
import User from "../../../models/userModel.js";
import Investment from "../../../models/investmentModel.js";
import Income from "../../../models/incomeModel.js";
import Expense from "../../../models/expenseModel.js";

import {
  getDefaulDate,
  getMaxStartDate,
  getMonthAndDate,
} from "../../../utilities/utility.js";

export const getOveriewData = asyncHandler(async (req, res) => {
  const startDateParam = req.query.startDate;
  const endDateParam = req.query.endDate;

  const defaultEndDate = getDefaulDate(endDateParam, false);
  const maxStartDate = getMaxStartDate();
  const defaultStartDate = getDefaulDate(startDateParam, true);
  if (defaultStartDate > defaultEndDate) {
    return res
      .status(400)
      .json(getErrorResponse("startDate must be earlier than endDate."));
  }

  if (defaultStartDate < maxStartDate) {
    return res
      .status(400)
      .json(
        getErrorResponse(
          "startDate must be between December 31st of the previous year (23:59:59) and the current time"
        )
      );
  }

  try {
    const user = await User.findOne({ _id: req.userId });

    if (!user) {
      return res.status(400).json(getErrorResponse("User does not exists."));
    }

    let query = {
      userId: req.userId,
      createdOn: {
        $gte: defaultStartDate,
        $lte: defaultEndDate,
      },
    };

    const investmentData = await Investment.find(query).sort({ createdOn: -1 });
    const incomeData = await Income.find(query).sort({ createdOn: -1 });
    const expenseData = await Expense.find(query).sort({ createdOn: -1 });

    const formattedInvestmentData = investmentData.map((item) => ({
      amount: item.amount,
      investedIn: item.investedIn,
    }));

    const groupedInvestmentData = formattedInvestmentData.reduce(
      (result, item) => {
        const { investedIn, amount } = item;
        if (!result[investedIn]) {
          result[investedIn] = { name: investedIn, amount: amount };
        } else {
          result[investedIn]["amount"] += amount;
        }
        return result;
      },
      {}
    );

    const finalInvestmentData = Object.values(groupedInvestmentData);

    const formattedExpenseData = expenseData.map((item) => ({
      name: item.category,
      amount: item.amount,
      date: getMonthAndDate(item.createdOn),
    }));

    const groupedData = formattedExpenseData.reduce((result, item) => {
      const { name, amount, date } = item;
      if (!result[date]) {
        // If the date doesn't exist in the result, create a new entry
        result[date] = { date, [name]: amount };
      } else {
        // If the date already exists, add or update the name: amount pair
        result[date] = {
          ...result[date],
          [name]: (result[date][name] || 0) + amount,
        };
      }
      return result;
    }, {});

    // Convert the grouped data back to an array of objects
    const finalExpenseData = Object.values(groupedData);

    const formattedIncomeData = incomeData.map((item) => ({
      name: item.name,
      amount: item.amount,
      date: getMonthAndDate(item.createdOn),
    }));

    const totalIncome = incomeData.reduce(
      (total, item) => total + item.amount,
      0
    );

    const totalExpense = expenseData.reduce(
      (total, item) => total + item.amount,
      0
    );

    const totalInvestment = investmentData.reduce(
      (total, item) => total + item.amount,
      0
    );

    const balanceLeft = totalIncome - totalExpense;

    return res.status(200).json({
      investmentData: finalInvestmentData,
      totalInvestment: totalInvestment,
      incomeData: formattedIncomeData,
      totalIncome: totalIncome,
      expenseData: finalExpenseData,
      totalExpense: totalExpense,
      balanceLeft: balanceLeft,
      status: "success",
    });
  } catch (error) {
    console.log(`Error while gettting overview - ${error.message}`);
  }
  return res
    .status(500)
    .json(getErrorResponse(errorMessage.INTERNAL_SERVER_ERROR));
});

export const lastTransaction = asyncHandler(async (req, res) => {
  const lastTransactions = req.query.lastTransactions || 5;

  try {
    const user = await User.findOne({ _id: req.userId });

    if (!user) {
      return res.status(400).json(getErrorResponse("User does not exists."));
    }

    let query = {
      userId: req.userId,
    };

    const incomeData = await Income.find(query)
      .sort({ createdOn: -1 })
      .limit(lastTransactions);

    const expenseData = await Expense.find(query)
      .sort({ createdOn: -1 })
      .limit(lastTransactions);

    const formattedExpenseData = expenseData.map((item) => ({
      id: item._id,
      name: item.name,
      expense: item.amount * -1,
      createdOn: item.createdOn,
      income: 0,
    }));

    const formattedIncomeData = incomeData.map((item) => ({
      id: item._id,
      name: item.name,
      income: item.amount,
      createdOn: item.createdOn,
      expense: 0,
    }));

    const allTransactions = [...formattedIncomeData, ...formattedExpenseData];
    allTransactions.sort((a, b) => b.createdOn - a.createdOn);

    const getLastTransactions = allTransactions.slice(0, lastTransactions);

    const getFormatedLastTransactions = getLastTransactions.map((item) => ({
      id: item._id,
      name: item.name,
      Income: item.income,
      Expense: item.expense,
      date: getMonthAndDate(item.createdOn),
    }));

    return res.status(200).json({
      lastTransaction: getFormatedLastTransactions,
      status: "success",
    });
  } catch (error) {
    console.log(`Error while gettting last transations - ${error.message}`);
  }
  return res
    .status(500)
    .json(getErrorResponse(errorMessage.INTERNAL_SERVER_ERROR));
});
