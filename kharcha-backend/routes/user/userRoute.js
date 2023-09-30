import { Router } from "express";

import { protect } from "../../middleware/authMiddleware.js";
import {
  changeEmail,
  changeName,
  changePassword,
} from "../../controllers/user-controller/userController.js";

const router = Router();

router.put("/email", protect, changeEmail);
router.put("/name", protect, changeName);
router.put("/password", protect, changePassword);

export default router;
