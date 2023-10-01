import { Router } from "express";
import { protect } from "../../middleware/authMiddleware.js";
import {
  addIncome,
  deleteIncome,
  getIncome,
  updateIncome,
} from "../../controllers/kharcha-controllers/income-controller/incomeController.js";

const router = Router();

router.post("/", protect, addIncome);
router.put("/", protect, updateIncome);
router.get("/", protect, getIncome);
router.delete("/", protect, deleteIncome);

export default router;
