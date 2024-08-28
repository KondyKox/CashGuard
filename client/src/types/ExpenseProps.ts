export interface ExpenseProps {
  _id: string;
  amount: number;
  description: string;
  addedBy: string;
  date: Date;
  dueDate?: Date;
  isPaid?: boolean;
}
