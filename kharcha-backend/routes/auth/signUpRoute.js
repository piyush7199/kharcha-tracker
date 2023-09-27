import { Router } from "express";
import signupUser from "../../controllers/authController/authController.js";

const router = Router();

router.post("/signUp", signupUser);

export default router;
