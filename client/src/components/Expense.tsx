import React, { useContext } from "react";
import { ExpenseProps } from "../types/ExpenseProps";
import { MobileContext } from "../context/MobileContext";
import { Link } from "react-router-dom";

const Expense: React.FC<ExpenseProps> = ({
  _id,
  amount,
  description,
  addedBy,
  date = new Date(),
  dueDate,
  isPaid = false,
}) => {
  const context = useContext(MobileContext);
  const isMobile = context ? context.isMobile : false;

  return (
    <Link
      to={`/expenses/${_id}`}
      className={`rounded border border-secondary p-4 m-2 hover:bg-secondary cursor-pointer transition-all duration-500 hover:shadow-lg h-auto ${
        isMobile ? "w-2/3" : "w-1/2"
      }`}
    >
      <div>
        <div className="flex justify-between items-center font-bold text-2xl text-red">
          <span>{addedBy}</span>
          <span>{amount}zł</span>
        </div>
        <div className="w-full py-4 text-base">{description}</div>
        <footer className="flex flex-col">
          <span
            className={`text-xl py-4 font-bold ${
              isPaid ? "text-green" : "text-red"
            }`}
          >
            {isPaid ? "Opłacono" : "Nie opłacono"}
          </span>
          <span className="flex flex-col justify-between items-end text-sm pt-4 w-full">
            Dodano: {new Date(date).toLocaleDateString()}
            {dueDate && (
              <span>Termin: {new Date(dueDate).toLocaleDateString()}</span>
            )}
          </span>
        </footer>
      </div>
    </Link>
  );
};

export default Expense;
