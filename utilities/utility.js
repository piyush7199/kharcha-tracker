import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

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
  const options = { month: "short", day: "2-digit", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

export const getMonthAndDate = (date) => {
  const options = { month: "short", day: "2-digit" };
  return date.toLocaleDateString("en-US", options);
};

export const getDefaulDate = (date, isStartDate) => {
  const currentDate = new Date();
  const defaultDate = date ? new Date(date) : currentDate;

  if (isStartDate) {
    defaultDate.setDate(defaultDate.getDate() - 1);
  }

  defaultDate.setHours(23, 59, 59, 999);
  return defaultDate.toISOString();
};

export const getMaxStartDate = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const previousYear = currentYear - 1;
  const maxStartDate = new Date(previousYear, 11, 31, 23, 59, 59, 999);
  maxStartDate.setHours(23, 59, 59, 999);
  return maxStartDate.toISOString();
};
