import { Schema, model } from "mongoose";

const expenseModel = Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  name: { type: String, require: true },
  amount: { type: Number, require: true },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  category: { type: String, require: true },
  subCategory: { type: String, require: true },
  paidVia: { type: String, require: true },
});

const Expense = model("Expense", expenseModel);
export default Expense;
