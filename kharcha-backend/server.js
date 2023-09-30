import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

import AuthenticationRoute from "./routes/auth/authenticationRoute.js";
import OtpRoute from "./routes/otp/otpRoute.js";
import UserRoute from "./routes/user/userRoute.js";

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

app.get("/health", (req, res) => {
  res.send({ success: true });
});

app.use("/api/user", AuthenticationRoute);
app.use("/api/otp", OtpRoute);
app.use("/api/user", UserRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
