import { Schema, model, Document } from "mongoose";

interface IExpense extends Document {
  amount: number;
  description: string;
  addedBy: string;
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
    type: String,
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
