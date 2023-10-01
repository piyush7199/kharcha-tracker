import { Schema, model } from "mongoose";

const investmentModel = Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  name: { type: String, require: true },
  amount: { type: Number, require: true },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  category: { type: String, require: true },
});

const Investment = model("Investment", investmentModel);
export default Investment;
