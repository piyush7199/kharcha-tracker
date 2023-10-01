import { Router } from "express";
import { protect } from "../../middleware/authMiddleware.js";
import {
  addExpense,
  deleteExpense,
  getExpense,
  updateExpense,
} from "../../controllers/kharcha-controllers/expense-controller/expenseController.js";

const router = Router();

router.post("/", protect, addExpense);
router.put("/", protect, updateExpense);
router.get("/", protect, getExpense);
router.delete("/", protect, deleteExpense);

export default router;
