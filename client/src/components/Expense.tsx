import React from "react";
import { ExpenseProps } from "../types/ExpenseProps";

const Expense: React.FC<ExpenseProps> = ({
  amount,
  description,
  addedBy,
  date = new Date(),
  dueDate,
  isPaid = false,
}) => {
  return (
    <div className="rounded border border-slate-500 p-4 m-4 w-2/3 hover:bg-slate-500 cursor-pointer transition-all duration-500 hover:shadow-lg">
      <div className="flex justify-between items-center font-bold text-2xl text-red-600">
        <span>{addedBy}</span>
        <span>{amount}zł</span>
      </div>
      <div className="w-full py-4 text-base">{description}</div>
      <footer className="flex flex-col">
        <span className="flex justify-between items-center text-sm pt-4">
          Dodano: {new Date(date).toLocaleDateString()}
          <span>
            {dueDate && (
              <span>Termin: {new Date(dueDate).toLocaleDateString()}</span>
            )}
          </span>
        </span>
        <span
          className={`text-xl py-4 font-bold ${
            isPaid ? "text-green-500" : "text-red-600"
          }`}
        >
          {isPaid ? "Opłacono" : "Nie opłacono"}
        </span>
      </footer>
    </div>
  );
};

export default Expense;
