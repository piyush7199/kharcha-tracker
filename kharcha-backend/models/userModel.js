import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { generateOTP } from "../otp-service/generateOtp.js";

const userModel = mongoose.Schema(
  {
    name: { type: String, require: true },
    username: { type: String, require: true, unique: true },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: { type: String, require: true },
    otp: String,
    otpExpiry: Date,
    isVerified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

userModel.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(2);
  this.password = await bcrypt.hash(this.password, salt);
  this.otp = generateOTP();
  this.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
});

userModel.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const User = mongoose.model("User", userModel);
