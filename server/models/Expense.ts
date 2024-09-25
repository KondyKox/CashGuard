import { Schema, model, Document, Types } from "mongoose";

interface IExpense extends Document {
  amount: number;
  description: string;
  addedBy: Types.ObjectId;
  date: Date;
  dueDate: Date;
  isPaid: boolean;
}

const expenseSchema = new Schema<IExpense>({
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  addedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  dueDate: {
    type: Date,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
});

export default model<IExpense>("Expense", expenseSchema);
