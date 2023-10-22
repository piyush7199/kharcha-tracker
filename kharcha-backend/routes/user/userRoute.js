import { Router } from "express";

import { protect } from "../../middleware/authMiddleware.js";
import {
  changeEmail,
  changeName,
  changePassword,
  forgetPassword,
  sendForgateMailOtp,
} from "../../controllers/user-controller/userController.js";

const router = Router();

router.put("/email", protect, changeEmail);
router.put("/name", protect, changeName);
router.put("/password", protect, changePassword);
router.put("/account/password", forgetPassword);
router.put("/account/mail", sendForgateMailOtp);

export default router;
