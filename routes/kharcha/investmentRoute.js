import { Router } from "express";
import { protect } from "../../middleware/authMiddleware.js";
import {
  addInvestment,
  deleteInvestment,
  getInvestment,
  updateInvestment,
} from "../../controllers/kharcha-controllers/investment-controller/investmentController.js";

const router = Router();

router.post("/", protect, addInvestment);
router.put("/", protect, updateInvestment);
router.get("/", protect, getInvestment);
router.delete("/", protect, deleteInvestment);

export default router;
