import asyncHandler from "express-async-handler";
import {
  getErrorResponse,
  getErrorResponseForUnprovidedFields,
} from "../../../utilities/responses/responses.js";
import User from "../../../models/userModel.js";
import Income from "../../../models/incomeModel.js";
import {
  getDefaulDate,
  getFormatedDate,
  getMaxStartDate,
} from "../../../utilities/utility.js";

export const addIncome = asyncHandler(async (req, res) => {
  const { name, amount, date, category } = req.body;

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

    const incomeModelData = {
      userId: req.userId,
      name: name,
      amount: amount,
      createdOn: parsedDate,
      category: category,
    };

    const income = await Income.create(incomeModelData);

    return res.status(201).json({
      income: {
        name: income.name,
        amount: income.amount,
        createdOn: getFormatedDate(income.createdOn),
        category: income.category,
      },
      status: "success",
    });
  } catch (error) {
    console.log(`Error while creating income - ${error.message}`);
  }
  return res
    .status(500)
    .json(getErrorResponse(errorMessage.INTERNAL_SERVER_ERROR));
});

export const updateIncome = asyncHandler(async (req, res) => {
  const { id, name, amount, date, category } = req.body;

  if (!id) {
    return res.status(400).json(getErrorResponseForUnprovidedFields("id"));
  }

  try {
    const user = await User.findOne({ _id: req.userId });

    if (!user) {
      return res.status(400).json(getErrorResponse("User does not exists."));
    }

    const existingIncome = await Income.findById(id);

    if (!existingIncome) {
      return res.status(400).json(getErrorResponse("Income id not exists."));
    }

    if (name) {
      existingIncome.name = name;
    }

    if (amount) {
      if (typeof amount !== "number" || isNaN(amount) || amount <= 0) {
        return res
          .status(400)
          .json(getErrorResponse("Amount must be a valid positive number."));
      }
      existingIncome.amount = amount;
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

      existingIncome.createdOn = parsedDate;
    }

    if (category) {
      existingIncome.category = category;
    }

    const updateedIncome = await existingIncome.save();

    return res.status(201).json({
      income: {
        name: updateedIncome.name,
        amount: updateedIncome.amount,
        createdOn: getFormatedDate(updateedIncome.createdOn),
        category: updateedIncome.category,
      },
      status: "success",
    });
  } catch (error) {
    console.log(`Error while updating income - ${error.message}`);
  }
  return res
    .status(500)
    .json(getErrorResponse(errorMessage.INTERNAL_SERVER_ERROR));
});

export const deleteIncome = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json(getErrorResponseForUnprovidedFields("id"));
  }

  try {
    const user = await User.findOne({ _id: req.userId });

    if (!user) {
      return res.status(400).json(getErrorResponse("User does not exists."));
    }

    const deletedIncome = await Income.findByIdAndDelete(id);

    if (!deletedIncome) {
      console.log(`Income record not found for ${id}.`);
    }

    return res.status(204).send();
  } catch (error) {
    console.log(`Error while deleting income - ${error.message}`);
  }
  return res
    .status(500)
    .json(getErrorResponse(errorMessage.INTERNAL_SERVER_ERROR));
});

export const getIncome = asyncHandler(async (req, res) => {
  const startDateParam = req.query.startDate;
  const endDateParam = req.query.endDate;
  const categoryParam = req.query.category
    ? req.query.category.split(",")
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

    const incomeData = await Income.find(query).sort({ createdOn: -1 });

    const formattedIncomeData = incomeData.map((item) => ({
      id: item._id,
      name: item.name,
      amount: item.amount,
      category: item.category,
      date: getFormatedDate(item.createdOn),
    }));

    const totalIncome = incomeData.reduce(
      (total, item) => total + item.amount,
      0
    );

    return res.status(200).json({
      incomeData: formattedIncomeData,
      totalIncome: totalIncome,
      status: "success",
    });
  } catch (error) {
    console.log(`Error while gettting income - ${error.message}`);
  }
  return res
    .status(500)
    .json(getErrorResponse(errorMessage.INTERNAL_SERVER_ERROR));
});
