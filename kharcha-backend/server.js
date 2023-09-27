import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
// import { rateLimit } from "express-rate-limit";

import AuthenticationRoute from "./routes/auth/authenticationRoute.js";
import OtpRoute from "./routes/otp/otpRoute.js";
import connectDB from "./db-connection/dbConnection.js";

const app = express();

// Things which app will use
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

dotenv.config();
connectDB();

// ENV Variables
const port = process.env.PORT;

// const generalLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // Maximum requests per windowMs
//   message: "Too many requests, please try again later for this route.",
// });

// const otpResendLimiter = rateLimit({
//   windowMs: 10 * 60 * 1000, // 1 hour
//   max: 3, // Maximum requests per windowMs for /api/otp/resend
//   message: "Too many OTP resend requests, please try again later.",
// });

app.get("/health", (req, res) => {
  res.send({ success: true });
});

// Apply the rate limiter specifically to /api/otp/resend
// app.use("/api/otp/resend", otpResendLimiter);

app.use("/api/user", AuthenticationRoute);
app.use("/api/otp", OtpRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
