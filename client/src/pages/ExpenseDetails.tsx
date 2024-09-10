import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../components/Button";
import { fetchExpenseById, updateExpenseById } from "../utils/api";

const ExpenseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [expense, setExpense] = useState<any>(null);
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editDescription, setEditDescription] = useState<string>("");
  const [editAmount, setEditAmount] = useState<number>(0);
  const [editDueDate, setEditDueDate] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchExpenseById(id!);
        setExpense(data);
        setIsPaid(data.isPaid);
        setEditDescription(data.description);
        setEditAmount(data.amount);
        setEditDueDate(
          data.dueDate ? new Date(data.dueDate).toISOString().split("T")[0] : ""
        );
      } catch (error) {
        console.error("Error fetching expense:", error);
      }
    };
    fetchData();
  }, [id]);

  // Change expense isPaid
  const handleCheckboxChange = async () => {
    try {
      const updatedExpense = await updateExpenseById(id!, { isPaid: !isPaid });
      setExpense(updatedExpense);
      setIsPaid(!isPaid);
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  // Save expense changes
  const handleSaveChanges = async () => {
    try {
      const updatedData = {
        description: editDescription,
        amount: editAmount,
        dueDate: editDueDate ? new Date(editDueDate).toISOString() : null,
      };
      const updatedExpense = await updateExpenseById(id!, updatedData);
      setExpense(updatedExpense);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  // Handle edit
  const handleEditClick = () => {
    setIsEditing(true);
  };

  if (!expense) return <div>Ładowanie...</div>;

  return (
    <div className="w-full p-4">
      {/* AddedBy & Amount */}
      <h2 className="flex justify-between text-2xl text-red font-bold">
        <span>{expense.addedBy}</span>
        {isEditing ? (
          <input
            type="number"
            value={editAmount}
            className="text-black bg-secondary"
            onChange={(e) => setEditAmount(Number(e.target.value))}
          />
        ) : (
          <span>{expense.amount}zł</span>
        )}
      </h2>
      {/* Description */}
      <div className="py-4 my-2 text-lg">
        {isEditing ? (
          <textarea
            value={editDescription}
            className="text-black w-full min-h-32 p-1 bg-secondary"
            onChange={(e) => setEditDescription(e.target.value)}
          ></textarea>
        ) : (
          <div>{expense.description}</div>
        )}
      </div>
      {/* IsPaid checkbox */}
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
      {/* Dates */}
      <div className="flex justify-between items-center text-sm">
        <span>Dodano: {new Date(expense.date).toLocaleDateString()}</span>
        {isEditing ? (
          <input
            type="date"
            value={editDueDate}
            className="bg-secondary text-black"
            onChange={(e) => setEditDueDate(e.target.value)}
          />
        ) : (
          expense.dueDate && (
            <span>
              Termin: {new Date(expense.dueDate).toLocaleDateString()}
            </span>
          )
        )}
      </div>
      {/* Buttons */}
      <div className="w-full flex justify-center items-center my-20">
        {isEditing ? (
          <div className="flex gap-x-10">
            <Button onClick={() => setIsEditing(false)}>
              <img
                src="/delete-button.png"
                alt="Cancel changes"
                className="w-12 h-12"
              />
            </Button>
            <Button onClick={handleSaveChanges}>
              <img
                src="/save-button.png"
                alt="Save changes"
                className="w-12 h-12 filter invert"
              />
            </Button>
          </div>
        ) : (
          <Button onClick={handleEditClick}>
            <img
              src="/edit-button.png"
              alt="Edit expense"
              className="w-12 h-12 filter invert"
            />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ExpenseDetails;
