import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ExpenseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [expense, setExpense] = useState<any>(null);
  const [isPaid, setIsPaid] = useState<boolean>(false);

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const response = await fetch(`/api/expenses/${id}`);
        if (!response.ok) throw new Error("Expense not found");

        const data = await response.json();
        setExpense(data);
        setIsPaid(data.isPaid);
      } catch (error) {
        console.error("Error fetching expense:", error);
      }
    };

    fetchExpense();
  }, [id]);

  // Change expense isPaid
  const handleCheckboxChange = async () => {
    try {
      const newIsPaid = !isPaid;
      const response = await fetch(`/api/expenses/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isPaid: newIsPaid }),
      });

      if (!response.ok) throw new Error("Failed to update expense");

      const updatedExpenses = await response.json();
      setExpense(updatedExpenses);
      setIsPaid(newIsPaid);
    } catch (error) {
      console.error("Error fetching expense:", error);
    }
  };

  if (!expense) return <div>Ładowanie...</div>;

  return (
    <div className="w-full p-4">
      <h2 className="flex justify-between text-2xl text-red font-bold">
        <span>{expense.addedBy}</span>
        <span>{expense.amount}zł</span>
      </h2>
      <div className="py-4 my-2 text-lg">{expense.description}</div>
      <div className="flex items-center mb-4">
        <label className="flex items-center gap-x-2 py-4">
          <input
            type="checkbox"
            checked={isPaid}
            onChange={handleCheckboxChange}
            className="form-checkbox outline-none h-4 w-4 text-green border-secondary focus:ring-0 cursor-pointer"
          />
          <span
            className={`text-xl font-bold ${
              isPaid ? "text-green" : "text-red"
            }`}
          >
            {isPaid ? "Opłacono" : "Nie opłacono"}
          </span>
        </label>
      </div>
      <div className="flex justify-between items-center text-sm">
        <span>Dodano: {new Date(expense.date).toLocaleDateString()}</span>
        {expense.dueDate && (
          <span>Termin: {new Date(expense.dueDate).toLocaleDateString()}</span>
        )}
      </div>
    </div>
  );
};

export default ExpenseDetails;
