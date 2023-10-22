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

      req.userId = decoded.id;
      if (!req.userId) {
        return res.status(403).json(getErrorResponse("Invalid Token"));
      }
      next();
    } catch (error) {
      return res
        .status(500)
        .json(getErrorResponse("Error while authorizating token"));
    }
  } else {
    return res
      .status(401)
      .json(
        getErrorResponse(
          "Authentication required. Please provide valid credentials."
        )
      );
  }
});
