import Expense from "../models/Expense";

// Backend expense props
interface ExpenseProps {
  amount: number;
  description: string;
  addedBy: string;
  date: Date;
  dueDate?: Date;
  isPaid?: boolean;
}

export const getExpenses = async (): Promise<ExpenseProps[]> => {
  try {
    const expenses = await Expense.find();
    return expenses;
  } catch (error) {
    throw new Error("Failed to retrieve expenses from database.");
  }
};
