import { Router } from "express";

import { protect } from "../../middleware/authMiddleware.js";
import {
  resend,
  verifyOtp,
} from "../../controllers/otp-controller/otpController.js";

const router = Router();

router.post("/verify", protect, verifyOtp);
router.put("/resend", protect, resend);

export default router;
