import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import dotenv from "dotenv";

import { getErrorResponse } from "../utilities/responses/responses.js";

dotenv.config();

export const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(`In authmiddleWare - ${decoded}`);
      req.userId = decoded.id;
      next();
    } catch (error) {
      return res
        .status(500)
        .json(getErrorResponse("Error while authorizating token"));
    }
  } else {
    return res
      .status(401)
      .json(getErrorResponse("Not Authorized, token failed"));
  }
});
