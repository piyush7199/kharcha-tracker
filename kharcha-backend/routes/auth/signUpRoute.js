const express = require("express");
const signupUser = require("../../controllers/authController/authController.js");

const router = express.Router();

router.post("/signUp", signupUser);

module.exports = router;
