import { Schema, model, Document } from "mongoose";

interface IExpense extends Document {
  amount: number;
  category: string;
  payer: string;
  date: Date;
}

const expenseSchema = new Schema<IExpense>({
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  payer: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default model<IExpense>("Expense", expenseSchema);
