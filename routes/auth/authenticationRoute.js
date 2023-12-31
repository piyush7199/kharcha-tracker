import { Router } from "express";
import {
  loginUser,
  signupUser,
} from "../../controllers/auth-controller/authController.js";

const router = Router();

router.post("/signUp", signupUser);
router.post("/login", loginUser);

export default router;
