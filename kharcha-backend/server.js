const express = require("express");
const { config } = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");

const signUpRoute = require("./routes/auth/signUpRoute.js");
const connectDB = require("./db-connection/dbConnection.js");

const app = express();

// Things which app will use
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

config();
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
