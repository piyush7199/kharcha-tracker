import { Schema, model } from "mongoose";

const incomeModel = Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  name: { type: String, require: true },
  amount: { type: Number, require: true },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  category: { type: String, require: true },
});

incomeModel.pre("save", function (next) {
  if (this.createdOn instanceof Date === false) {
    this.createdOn = new Date(this.createdOn);
  }
  next();
});

const Income = model("Income", incomeModel);
export default Income;
