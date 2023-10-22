import { Router } from "express";
import { protect } from "../../middleware/authMiddleware.js";
import {
  getOveriewData,
  lastTransaction,
} from "../../controllers/kharcha-controllers/overview-controller/overviewController.js";

const router = Router();

router.get("/", protect, getOveriewData);
router.get("/expense", protect, lastTransaction);

export default router;
