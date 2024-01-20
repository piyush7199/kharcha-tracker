import asyncHandler from "express-async-handler";
import { genSalt, hash, compare } from "bcrypt";

import User from "../../models/userModel.js";
import {
  getErrorResponse,
  getErrorResponseForUnprovidedFields,
} from "../../utilities/responses/responses.js";
import generateOTP from "../../otp-service/generateOtp.js";
import {
  getEmailChangeMail,
  getForgetEmail,
} from "../../constants/appConstants.js";
import sendEmail from "../../otp-service/emailVerification.js";
import {
  isValidEmail,
  isValidName,
  isValidPassword,
} from "../../utilities/utility.js";
import dotenv from "dotenv";
// import sendEmailUsingResendAPIS from "../../otp-service/emailUsingResendAPIs.js";

dotenv.config();

export const changeEmail = asyncHandler(async (req, res) => {
  const { oldEmail, newEmail } = req.body;

  if (!oldEmail) {
    return res
      .status(400)
      .json(getErrorResponseForUnprovidedFields("oldEmail"));
  }

  if (!newEmail) {
    return res
      .status(400)
      .json(getErrorResponseForUnprovidedFields("newEmail"));
  }

  if (!isValidEmail(newEmail)) {
    return res.status(400).json(getErrorResponse("Invalid email"));
  }

  try {
    const user = await User.findOne({ _id: req.userId });

    if (!user) {
      return res.status(400).json(getErrorResponse("User does not exists."));
    }

    if (user.email.toString() !== oldEmail.toString()) {
      return res
        .status(403)
        .json(
          getErrorResponse("Old email does not match the email in our records.")
        );
    }

    const isUserExists = await User.findOne({ email: newEmail });

    if (isUserExists) {
      return res
        .status(400)
        .json(
          getErrorResponse("The new email is already in use by another user.")
        );
    }

    const otp = generateOTP();
    const expiry = new Date(Date.now() + 10 * 60 * 1000);

    const resendOtpEmail = getEmailChangeMail(user.username, otp, newEmail);

    const emailRes = await sendEmail(newEmail, resendOtpEmail);
    if (!emailRes || !emailRes.status !== 200) {
      return res.send(emailRes);
    }

    const updatedUser = await User.findByIdAndUpdate(req.userId, {
      isVerified: false,
      otp: otp,
      otpExpiry: expiry,
      email: newEmail,
    });

    return res.status(200).json({
      User: {
        id: updatedUser._id,
        name: updatedUser.name,
        username: updatedUser.username,
        email: newEmail,
        isVerified: false,
      },
      message: "Email changed successfully",
      status: "success",
    });
  } catch (error) {
    console.log(`Error while updating Email - ${error.message}`);
  }
  return res
    .status(500)
    .json(getErrorResponse(errorMessage.INTERNAL_SERVER_ERROR));
});

export const changeName = asyncHandler(async (req, res) => {
  const { newName } = req.body;

  if (!newName) {
    return res.status(400).json(getErrorResponseForUnprovidedFields("newName"));
  }

  if (!isValidName(newName)) {
    return res
      .status(400)
      .json(
        getErrorResponse(
          "Invalid name. The name should contain at least 2 letters, may contain spaces, and should not contain special characters or digits."
        )
      );
  }

  try {
    const user = await User.findOne({ _id: req.userId });

    if (!user) {
      return res.status(400).json(getErrorResponse("User does not exists."));
    }

    const updatedUser = await User.findByIdAndUpdate(req.userId, {
      name: newName,
    });

    return res.status(200).json({
      User: {
        id: updatedUser._id,
        name: newName,
        username: updatedUser.username,
        email: updatedUser.email,
        isVerified: updatedUser.isVerified,
      },
      message: "Name changed successfully",
      status: "success",
    });
  } catch (error) {
    console.log(`Error while updating name - ${error.message}`);
  }
  return res
    .status(500)
    .json(getErrorResponse(errorMessage.INTERNAL_SERVER_ERROR));
});

export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword) {
    return res
      .status(400)
      .json(getErrorResponseForUnprovidedFields("currentPassword"));
  }

  if (!newPassword) {
    return res
      .status(400)
      .json(getErrorResponseForUnprovidedFields("newPassword"));
  }

  if (!isValidPassword(newPassword)) {
    return res
      .status(400)
      .json(
        getErrorResponse(
          "Invalid password. Passwords should be at least 7 characters long, contain at least one letter, one numeric character, and one special character."
        )
      );
  }

  try {
    const user = await User.findOne({ _id: req.userId });

    if (!user) {
      return res.status(400).json(getErrorResponse("User does not exists."));
    }

    const passwordMatch = await user.matchPassword(currentPassword);

    if (passwordMatch) {
      const salt = await genSalt(2);
      const password = await hash(newPassword, salt);

      const updatedUser = await User.findByIdAndUpdate(req.userId, {
        password: password,
      });

      console.log(`Old password user ${updatedUser}`);

      const newUpdatedUser = await User.findOne({ _id: req.userId });

      console.log(`New password user ${newUpdatedUser}`);

      return res.status(200).json({
        User: {
          id: updatedUser._id,
          name: updatedUser.name,
          username: updatedUser.username,
          email: updatedUser.email,
          isVerified: updatedUser.isVerified,
        },
        message: "Password changed successfully",
        status: "success",
      });
    }

    return res
      .status(401)
      .json(
        getErrorResponse(
          "Unauthorized: Current password is incorrect. Please enter your current password correctly to change it."
        )
      );
  } catch (error) {
    console.log(`Error while updating password - ${error.message}`);
  }
  return res
    .status(500)
    .json(getErrorResponse(errorMessage.INTERNAL_SERVER_ERROR));
});

export const forgetPassword = asyncHandler(async (req, res) => {
  const { usernameOrEmail, otp, newPassword } = req.body;

  if (!newPassword) {
    return res
      .status(400)
      .json(getErrorResponseForUnprovidedFields("newPassword"));
  }

  if (!usernameOrEmail) {
    return res
      .status(400)
      .json(getErrorResponseForUnprovidedFields("Email or Username"));
  }

  if (!otp) {
    return res.status(400).json(getErrorResponseForUnprovidedFields("otp"));
  }

  if (!isValidPassword(newPassword)) {
    return res
      .status(400)
      .json(
        getErrorResponse(
          "Invalid password. Passwords should be at least 7 characters long, contain at least one letter, one numeric character, and one special character."
        )
      );
  }

  try {
    const user = await User.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });

    if (!user) {
      return res.status(400).json(getErrorResponse("User does not exists."));
    }

    const currentTs = new Date();
    if (currentTs > user.otpExpiry) {
      return res
        .status(400)
        .json(getErrorResponse("OTP is expired. Try resend OTP option."));
    }

    if (otp.toString() === user.otp.toString()) {
      try {
        const salt = await genSalt(2);
        const password = await hash(newPassword, salt);

        const updatedUser = await User.findByIdAndUpdate(user._id, {
          password: password,
        });

        return res.status(200).json({
          User: {
            id: updatedUser._id,
            name: updatedUser.name,
            username: updatedUser.username,
            email: updatedUser.email,
            isVerified: true,
          },
          message: "Password has been changed successfully",
          status: "success",
        });
      } catch (error) {
        console.log(error.message);
        return {
          message: "Error changing password",
          status: "error",
        };
      }
    } else {
      return res.status(400).json(getErrorResponse("OTP is incorrect."));
    }
  } catch (error) {
    console.log(`Error while updating password - ${error.message}`);
  }
  return res
    .status(500)
    .json(getErrorResponse(errorMessage.INTERNAL_SERVER_ERROR));
});

export const sendForgateMailOtp = asyncHandler(async (req, res) => {
  const { usernameOrEmail } = req.body;

  if (!usernameOrEmail) {
    return res
      .status(400)
      .json(getErrorResponseForUnprovidedFields("Email or Username"));
  }

  try {
    const user = await User.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });

    if (!user) {
      return res.status(400).json(getErrorResponse("User does not exists."));
    }

    const otp = generateOTP();
    const expiry = new Date(Date.now() + 10 * 60 * 1000);
    const forgetPasswordMail = getForgetEmail(user.username, otp);

    const emailRes = await sendEmail(newEmail, resendOtpEmail);
    if (!emailRes || !emailRes.status !== 200) {
      return res.send(emailRes);
    }

    await User.findByIdAndUpdate(user._id, {
      otp: otp,
      otpExpiry: expiry,
    });

    return res.status(200).json({
      message: "Check Your Email",
      status: "success",
    });
  } catch (error) {
    console.log(`Error while resending new user - ${error.message}`);
  }
  return res
    .status(500)
    .json(getErrorResponse(errorMessage.INTERNAL_SERVER_ERROR));
});
