import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";
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
import {
  errorMessage,
  getSignupMessage,
} from "../../constants/appConstants.js";
import sendEmail from "../../otp-service/emailVerification.js";
import dotenv from "dotenv";
import sendEmailUsingResendAPIS from "../../otp-service/emailUsingResendAPIs.js";

dotenv.config();

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

  try {
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

    const signUpEmail = getSignupMessage(user.username, user.otp);

    if (process.env.ENVIRONMENT === "PROD") {
      sendEmailUsingResendAPIS(user.email, signUpEmail);
    } else {
      sendEmail(user.email, signUpEmail);
    }
    return res.status(201).json({
      User: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        isVerified: user.isVerified,
      },
      token: generatedToken(user._id),
      status: "success",
    });
  } catch (error) {
    console.log(`Error while creating new user - ${error.message}`);
  }
  return res
    .status(500)
    .json(getErrorResponse(errorMessage.INTERNAL_SERVER_ERROR));
});

export const loginUser = asyncHandler(async (req, res) => {
  const { usernameOrEmail, password } = req.body;
  if (!usernameOrEmail) {
    return res
      .status(400)
      .json(getErrorResponseForUnprovidedFields("email or username"));
  }

  if (!password) {
    return res
      .status(400)
      .json(getErrorResponseForUnprovidedFields("password"));
  }

  try {
    const user = await User.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });

    if (!user) {
      return res.status(400).json(getErrorResponse("User does not exists"));
    }

    if (user && (await user.matchPassword(password))) {
      return res.status(200).json({
        User: {
          id: user._id,
          name: user.name,
          username: user.username,
          email: user.email,
          isVerified: user.isVerified,
        },
        token: generatedToken(user._id),
        status: "success",
      });
    } else {
      return res
        .status(401)
        .json(getErrorResponse("Invalid Email or Password"));
    }
  } catch (error) {
    console.log(`Error while login the user - ${error.message}`);
  }
  return res
    .status(500)
    .json(getErrorResponse(errorMessage.INTERNAL_SERVER_ERROR));
});
