export interface ExpenseProps {
  amount: number;
  description: string;
  addedBy: string;
  date: Date;
  dueDate?: Date;
  isPaid?: boolean;
}
