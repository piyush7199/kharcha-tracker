import asyncHandler from "express-async-handler";
import {
  getErrorResponse,
  getErrorResponseForUnprovidedFields,
} from "../../../utilities/responses/responses.js";
import User from "../../../models/userModel.js";
import Investment from "../../../models/investmentModel.js";
import {
  getDefaulDate,
  getFormatedDate,
  getMaxStartDate,
} from "../../../utilities/utility.js";

export const addInvestment = asyncHandler(async (req, res) => {
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

  const parsedDate = new Date(date);
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

    const investmentModelData = {
      userId: req.userId,
      name: name,
      amount: amount,
      createdOn: parsedDate,
      category: category,
    };

    const investment = await Investment.create(investmentModelData);

    return res.status(201).json({
      investment: {
        name: investment.name,
        amount: investment.amount,
        createdOn: getFormatedDate(investment.createdOn),
        category: investment.category,
      },
      status: "success",
    });
  } catch (error) {
    console.log(`Error while creating investment - ${error.message}`);
  }
  return res
    .status(500)
    .json(getErrorResponse(errorMessage.INTERNAL_SERVER_ERROR));
});

export const updateInvestment = asyncHandler(async (req, res) => {
  const { id, name, amount, date, category } = req.body;

  if (!id) {
    return res.status(400).json(getErrorResponseForUnprovidedFields("id"));
  }

  try {
    const user = await User.findOne({ _id: req.userId });

    if (!user) {
      return res.status(400).json(getErrorResponse("User does not exists."));
    }

    const existingInvestment = await Investment.findById(id);

    if (!existingInvestment) {
      return res
        .status(400)
        .json(getErrorResponse("Investment id not exists."));
    }

    if (name) {
      existingInvestment.name = name;
    }

    if (amount) {
      if (typeof amount !== "number" || isNaN(amount) || amount <= 0) {
        return res
          .status(400)
          .json(getErrorResponse("Amount must be a valid positive number."));
      }
      existingInvestment.amount = amount;
    }

    if (date) {
      const parsedDate = new Date(date);

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

      existingInvestment.createdOn = parsedDate;
    }

    if (category) {
      existingInvestment.category = category;
    }

    const updateedInvestment = await existingInvestment.save();

    return res.status(201).json({
      investment: {
        name: updateedInvestment.name,
        amount: updateedInvestment.amount,
        createdOn: getFormatedDate(updateedInvestment.createdOn),
        category: updateedInvestment.category,
      },
      status: "success",
    });
  } catch (error) {
    console.log(`Error while updating investment - ${error.message}`);
  }
  return res
    .status(500)
    .json(getErrorResponse(errorMessage.INTERNAL_SERVER_ERROR));
});

export const deleteInvestment = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json(getErrorResponseForUnprovidedFields("id"));
  }

  try {
    const user = await User.findOne({ _id: req.userId });

    if (!user) {
      return res.status(400).json(getErrorResponse("User does not exists."));
    }

    const deletedInvestment = await Investment.findByIdAndDelete(id);

    if (!deletedInvestment) {
      console.log(`Investment record not found for ${id}.`);
    }

    return res.status(204).send();
  } catch (error) {
    console.log(`Error while deleting investment - ${error.message}`);
  }
  return res
    .status(500)
    .json(getErrorResponse(errorMessage.INTERNAL_SERVER_ERROR));
});

export const getInvestment = asyncHandler(async (req, res) => {
  const startDateParam = req.query.startDate;
  const endDateParam = req.query.endDate;
  const categoryParam = req.query.category
    ? req.query.category.split(",")
    : null;

  const defaultEndDate = getDefaulDate(endDateParam, false);

  console.log(`End date -> ${getFormatedDate(defaultEndDate)}`);
  console.log(`End date -> ${defaultEndDate}`);

  const maxStartDate = getMaxStartDate();

  console.log(`Max start date -> ${getFormatedDate(maxStartDate)}`);
  console.log(`Max start date -> ${maxStartDate}`);

  const defaultStartDate = getDefaulDate(startDateParam, true);

  console.log(`Start date -> ${getFormatedDate(defaultStartDate)}`);
  console.log(`Start date -> ${defaultStartDate}`);

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
      date: {
        $gte: defaultStartDate,
        $lte: defaultEndDate,
      },
    };

    if (categoryParam) {
      query.category = { $in: categoryParam };
    }

    const investmentData = await Investment.find(query).sort({ createdOn: -1 });

    const formattedInvestmentData = investmentData.map((item) => ({
      id: item._id,
      name: item.name,
      amount: item.amount,
      category: item.category,
      date: getFormatedDate(item.createdOn),
    }));

    const totalInvestment = investmentData.reduce(
      (total, item) => total + item.amount,
      0
    );

    return res.status(200).json({
      investmentData: formattedInvestmentData,
      totalInvestment: totalInvestment,
      status: "success",
    });
  } catch (error) {
    console.log(`Error while gettting investment - ${error.message}`);
  }
  return res
    .status(500)
    .json(getErrorResponse(errorMessage.INTERNAL_SERVER_ERROR));
});
