import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";
import sendOTPEmail from "../../otp-service/emailVerification.js";
import {
  generatedToken,
  isValidEmail,
  isValidName,
  isValidPassword,
  isValidUserName,
} from "../../utilities/utility.js";
import {
  getErrorResponse,
  getErrorResponseForUnprovidedFields,
} from "../../utilities/responses/responses.js";
import { errorMessage } from "../../constants/appConstants.js";

export const signupUser = asyncHandler(async (req, res) => {
  const { name, username, email, password } = req.body;

  if (!name) {
    return res.status(400).json(getErrorResponseForUnprovidedFields("name"));
  }

  if (!username) {
    return res
      .status(400)
      .json(getErrorResponseForUnprovidedFields("username"));
  }

  if (!email) {
    return res
      .status(400)
      .json(getErrorResponseForUnprovidedFieldsonse("email"));
  }

  if (!password) {
    return res
      .status(400)
      .json(getErrorResponseForUnprovidedFields("password"));
  }

  if (!isValidEmail(email)) {
    return res.status(400).json(getErrorResponse("Invalid email"));
  }

  if (!isValidUserName(username)) {
    return res
      .status(400)
      .json(
        getErrorResponse(
          "Invalid username. Usernames should not contain spaces or special characters and should have a length between 4 and 9 characters."
        )
      );
  }

  if (!isValidPassword(password)) {
    return res
      .status(400)
      .json(
        getErrorResponse(
          "Invalid password. Passwords should be at least 7 characters long, contain at least one letter, one numeric character, and one special character."
        )
      );
  }

  if (!isValidName(name)) {
    return res
      .status(400)
      .json(
        getErrorResponse(
          "Invalid name. The name should contain at least 2 letters, may contain spaces, and should not contain special characters or digits."
        )
      );
  }

  let userExist = await User.findOne({ email: email });

  if (userExist) {
    return res.status(400).json(getErrorResponse("Email already exists"));
  }

  userExist = await User.findOne({ username: username });
  if (userExist) {
    return res.status(400).json(getErrorResponse("Username already exists"));
  }

  const user = await User.create({
    name,
    username,
    email,
    password,
  });

  if (user) {
    sendOTPEmail(user.email, user.otp);
    return res.status(201).json({
      User: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
      },
      status: "success",
    });
  } else {
    res.status(500).json(getErrorResponse(errorMessage.INTERNAL_SERVER_ERROR));
  }
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json(getErrorResponseForUnprovidedFields("email"));
  }

  if (!password) {
    return res
      .status(400)
      .json(getErrorResponseForUnprovidedFields("password"));
  }
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    return res.status(200).json({
      User: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        token: generatedToken(user._id),
      },
      status: "success",
    });
  } else {
    res.status(401).json(getErrorResponse("Invalid Email or Password"));
  }
});
