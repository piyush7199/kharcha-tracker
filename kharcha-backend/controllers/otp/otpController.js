import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";
import { ObjectId } from "mongoose";
import {
  getErrorResponse,
  getErrorResponseForUnprovidedFields,
} from "../../utilities/responses/responses.js";
import generateOTP from "../../otp-service/generateOtp.js";
import sendOTPEmail from "../../otp-service/emailVerification.js";

export const verifyOtp = asyncHandler(async (req, res) => {
  const { otp } = req.body;

  if (!otp) {
    return res.status(400).json(getErrorResponseForUnprovidedFields("otp"));
  }

  try {
    const user = await User.findOne({ _id: req.userId });

    if (!user) {
      return res.status(400).json(getErrorResponse("User does not exists."));
    }

    if (user.isVerified) {
      return res.status(400).json(getErrorResponse("User is already verified"));
    }

    const currentTs = new Date();
    if (currentTs > user.otpExpiry) {
      return res
        .status(400)
        .json(getErrorResponse("OTP is expired. Try resend OTP option."));
    }

    if (otp === user.otp.toString()) {
      try {
        const updatedUser = await User.findByIdAndUpdate(req.userId, {
          isVerified: true,
        });
        return res.status(200).json({
          isValid: true,
          User: {
            id: updatedUser._id,
            name: updatedUser.name,
            username: updatedUser.username,
            email: updatedUser.email,
            isVerified: true,
          },
          message: "OTP is valid. User is verified.",
          status: "success",
        });
      } catch (error) {
        console.log(error.message);
        return {
          isValid: false,
          message: "Error updating user",
          status: "error",
        };
      }
    } else {
      return res.status(400).json(getErrorResponse("OTP is incorrect."));
    }
  } catch (error) {
    console.log(`Error while verifing otp - ${error.message}`);
  }
  return res
    .status(500)
    .json(getErrorResponse(errorMessage.INTERNAL_SERVER_ERROR));
});

export const resend = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.userId });

    if (!user) {
      return res.status(400).json(getErrorResponse("User does not exists."));
    }

    if (user.isVerified) {
      return res
        .status(400)
        .json(getErrorResponse("User is already verified."));
    }

    const otp = generateOTP();
    const expiry = new Date(Date.now() + 10 * 60 * 1000);

    sendOTPEmail(user.email, otp);

    const updatedUser = await User.findByIdAndUpdate(req.userId, {
      isVerified: false,
      otp: otp,
      otpExpiry: expiry,
    });

    return res.status(200).json({
      isValid: true,
      User: {
        id: updatedUser._id,
        name: updatedUser.name,
        username: updatedUser.username,
        email: updatedUser.email,
        isVerified: updatedUser.isVerified,
      },
      message: "OTP resent.",
      status: "success",
    });
  } catch (error) {
    console.log(`Error while resending new user - ${error.message}`);
  }
  return res
    .status(500)
    .json(getErrorResponse(errorMessage.INTERNAL_SERVER_ERROR));
});
