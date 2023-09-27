import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";
import sendOTPEmail from "../../otp-service/emailVerification.js";
import { isValidEmail } from "../../utilities/utility.js";

const signupUser = asyncHandler(async (req, res) => {
  const { name, username, email, password } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Please provide name" });
  }

  if (!username) {
    return res.status(400).json({ message: "Please provide username" });
  }

  if (!email) {
    return res.status(400).json({ message: "Please provide email" });
  }

  if (!password) {
    return res.status(400).json({ message: "Please provide password" });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ message: "Please provide valid email" });
  }

  let userExist = await User.findOne({ email: email });

  if (userExist) {
    return res.status(400).json({ msg: "Email already exists" });
  }

  userExist = await User.findOne({ username: username });
  if (userExist) {
    return res.status(400).json({ msg: "Username already exists" });
  }

  const user = await User.create({
    name,
    username,
    email,
    password,
  });

  if (user) {
    await sendOTPEmail(user.email, user.otp);
    return res.status(201).json({
      id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(500).json({ msg: INTERNAL_SERVER_ERROR });
  }
});

export default signupUser;

// export const loginUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;
//   if (!email) {
//     return res.status(400).json({ msg: "Please provide email" });
//   }

//   if (!password) {
//     return res.status(400).json({ msg: "Please provide password" });
//   }
//   const user = await User.findOne({ email });
//   if (user && (await user.matchPassword(password))) {
//     return res.status(200).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       pic: user.pic,
//       token: generatedToken(user._id),
//     });
//   } else {
//     res.status(401).json({ msg: "Invalid Email or Password" });
//   }
// });
