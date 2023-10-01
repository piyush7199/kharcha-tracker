import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import moment from "m";

dotenv.config();

export const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password) => {
  const passwordRegex = /^(?=.*[a-zA-Z].*)(?=.*\d.*)(?=.*[\W_].*).{6,20}$/;
  return passwordRegex.test(password);
};

export const isValidUserName = (userName) => {
  const validUsernameRegex = /^[a-zA-Z0-9]{4,9}$/;
  return validUsernameRegex.test(userName);
};

export const isValidName = (name) => {
  const sanitizedName = name.replace(/\s/g, ""); // Remove spaces
  const validNameRegex = /^[A-Za-z]{1,}$/;
  return validNameRegex.test(sanitizedName);
};

export const generatedToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });
};

export const encode = async (value) => {
  const salt = await bcrypt.genSalt(2);
  const encodeValue = await bcrypt.hash(value, salt);
  return encodeValue;
};

export const getFormatedDate = (date) => {
  const options = { day: "2-digit", month: "long" };
  return date.toLocaleDateString("en-US", options);
};
