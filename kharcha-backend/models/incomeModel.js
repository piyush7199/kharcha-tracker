import { Schema, model } from "mongoose";

const incomeModel = Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: { type: String, require: true },
  amount: { type: Number, require: true },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  category: { type: String, require: true },
});

const Income = model("Income", incomeModel);
export default Income;
