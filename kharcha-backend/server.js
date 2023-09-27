import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

import signUpRoute from "./routes/auth/signUpRoute.js";
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

app.use("/api/user", signUpRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
