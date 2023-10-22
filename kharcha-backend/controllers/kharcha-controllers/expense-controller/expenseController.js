import asyncHandler from "express-async-handler";
import {
  getErrorResponse,
  getErrorResponseForUnprovidedFields,
} from "../../../utilities/responses/responses.js";
import User from "../../../models/userModel.js";
import Expense from "../../../models/expenseModel.js";
import {
  getDefaulDate,
  getFormatedDate,
  getMaxStartDate,
} from "../../../utilities/utility.js";

export const addExpense = asyncHandler(async (req, res) => {
  const { name, amount, date, category, paidVia, subCategory } = req.body;

  if (!name) {
    return res.status(400).json(getErrorResponseForUnprovidedFields("name"));
  }

  if (!amount) {
    return res.status(400).json(getErrorResponseForUnprovidedFields("amount"));
  }

  if (typeof amount !== "number" || isNaN(amount) || amount <= 0) {
    return res
      .status(400)
      .json(getErrorResponse("Amount must be a valid positive number."));
  }

  if (!date) {
    return res.status(400).json(getErrorResponseForUnprovidedFields("date"));
  }

  if (!category) {
    return res
      .status(400)
      .json(getErrorResponseForUnprovidedFields("category"));
  }

  if (!subCategory) {
    return res
      .status(400)
      .json(getErrorResponseForUnprovidedFields("subCategory"));
  }

  if (!paidVia) {
    return res.status(400).json(getErrorResponseForUnprovidedFields("paidVia"));
  }

  const dateComponents = date.split("-");
  if (dateComponents.length !== 3) {
    return res
      .status(400)
      .json(getErrorResponse("Date must be in YYYY-MM-DD format."));
  }

  const year = parseInt(dateComponents[0]);
  const month = parseInt(dateComponents[1]) - 1;
  const day = parseInt(dateComponents[2]);

  const parsedDate = new Date(year, month, day, 0, 0, 0, 0);
  if (isNaN(parsedDate.getTime())) {
    return res.status(400).json(getErrorResponse("Date must be a valid date."));
  }

  const currentTime = new Date();
  if (parsedDate > currentTime) {
    return res
      .status(400)
      .json(getErrorResponse("Date cannot be greater than the current time."));
  }

  try {
    const user = await User.findOne({ _id: req.userId });

    if (!user) {
      return res.status(400).json(getErrorResponse("User does not exists."));
    }

    const expenseModelData = {
      userId: req.userId,
      name: name,
      amount: amount,
      createdOn: parsedDate,
      category: category,
      subCategory: subCategory,
      paidVia: paidVia,
    };

    const expense = await Expense.create(expenseModelData);

    return res.status(201).json({
      expense: {
        name: expense.name,
        amount: expense.amount,
        createdOn: getFormatedDate(expense.createdOn),
        category: expense.category,
        subCategory: expense.subCategory,
        paidVia: expense.paidVia,
      },
      status: "success",
    });
  } catch (error) {
    console.log(`Error while creating expense - ${error.message}`);
  }
  return res
    .status(500)
    .json(getErrorResponse(errorMessage.INTERNAL_SERVER_ERROR));
});

export const updateExpense = asyncHandler(async (req, res) => {
  const { id, name, amount, date, category, paidVia, subCategory } = req.body;

  if (!id) {
    return res.status(400).json(getErrorResponseForUnprovidedFields("id"));
  }

  try {
    const user = await User.findOne({ _id: req.userId });

    if (!user) {
      return res.status(400).json(getErrorResponse("User does not exists."));
    }

    const existingExpense = await Expense.findById(id);

    if (!existingExpense) {
      return res.status(400).json(getErrorResponse("Expense id not exists."));
    }

    if (name) {
      existingExpense.name = name;
    }

    if (amount) {
      if (typeof amount !== "number" || isNaN(amount) || amount <= 0) {
        return res
          .status(400)
          .json(getErrorResponse("Amount must be a valid positive number."));
      }
      existingExpense.amount = amount;
    }

    if (date) {
      const dateComponents = date.split("-");
      if (dateComponents.length !== 3) {
        return res
          .status(400)
          .json(getErrorResponse("Date must be in YYYY-MM-DD format."));
      }

      const year = parseInt(dateComponents[0]);
      const month = parseInt(dateComponents[1]) - 1;
      const day = parseInt(dateComponents[2]);

      const parsedDate = new Date(year, month, day, 0, 0, 0, 0);

      if (isNaN(parsedDate.getTime())) {
        return res
          .status(400)
          .json(getErrorResponse("Date must be a valid date."));
      }

      const currentTime = new Date();
      if (parsedDate > currentTime) {
        return res
          .status(400)
          .json(
            getErrorResponse("Date cannot be greater than the current time.")
          );
      }

      existingExpense.createdOn = parsedDate;
    }

    if (category) {
      existingExpense.category = category;
    }

    if (subCategory) {
      existingExpense.subCategory = subCategory;
    }

    if (paidVia) {
      existingExpense.paidVia = paidVia;
    }

    const updatedExpense = await existingExpense.save();

    return res.status(201).json({
      Expense: {
        name: updatedExpense.name,
        amount: updatedExpense.amount,
        createdOn: getFormatedDate(updatedExpense.createdOn),
        category: updatedExpense.category,
        subCategory: updatedExpense.subCategory,
        paidVia: updatedExpense.paidVia,
      },
      status: "success",
    });
  } catch (error) {
    console.log(`Error while updating expense - ${error.message}`);
  }
  return res
    .status(500)
    .json(getErrorResponse(errorMessage.INTERNAL_SERVER_ERROR));
});

export const deleteExpense = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json(getErrorResponseForUnprovidedFields("id"));
  }

  try {
    const user = await User.findOne({ _id: req.userId });

    if (!user) {
      return res.status(400).json(getErrorResponse("User does not exists."));
    }

    const deletedExpense = await Expense.findByIdAndDelete(id);

    if (!deletedExpense) {
      console.log(`Expense record not found for ${id}.`);
    }

    return res.status(204).send();
  } catch (error) {
    console.log(`Error while deleting expense - ${error.message}`);
  }
  return res
    .status(500)
    .json(getErrorResponse(errorMessage.INTERNAL_SERVER_ERROR));
});

export const getExpense = asyncHandler(async (req, res) => {
  const startDateParam = req.query.startDate;
  const endDateParam = req.query.endDate;
  const categoryParam = req.query.category
    ? req.query.category.split(",")
    : null;

  const subCategoryParam = req.query.subCategory
    ? req.query.subCategory.split(",")
    : null;

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

    if (categoryParam) {
      query.category = { $in: categoryParam };
    }

    if (subCategoryParam) {
      query.subCategory = { $in: subCategoryParam };
    }

    const expenseData = await Expense.find(query).sort({ createdOn: -1 });

    const formattedExpenseData = expenseData.map((item) => ({
      id: item._id,
      name: item.name,
      amount: item.amount,
      category: item.category,
      subCategory: item.subCategory,
      paidVia: item.paidVia,
      date: getFormatedDate(item.createdOn),
    }));

    const totalExpense = expenseData.reduce(
      (total, item) => total + item.amount,
      0
    );

    return res.status(200).json({
      expenseData: formattedExpenseData,
      totalExpense: totalExpense,
      status: "success",
    });
  } catch (error) {
    console.log(`Error while gettting expense - ${error.message}`);
  }
  return res
    .status(500)
    .json(getErrorResponse(errorMessage.INTERNAL_SERVER_ERROR));
});
