import { useState } from "react";
import Expense from "../components/Expense";
import { ExpenseProps } from "../types/ExpenseProps";

const selectedCategoryKey = "ExpenseCalculator__SelectedCategory"; // Local Storage Key

type Category = "My Expenses" | "All Expenses";

const Expenses = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>(() => {
    const savedCategory = localStorage.getItem(selectedCategoryKey);
    return (savedCategory as Category) || "My Expenses";
  });

  // Change category
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value as Category;
    setSelectedCategory(newCategory);
    localStorage.setItem(selectedCategoryKey, newCategory);
  };

  // Expense props
  const expenseProps: ExpenseProps = {
    amount: 10,
    description: "GÓWNO",
    addedBy: "kondy",
    date: new Date(),
    dueDate: new Date(),
    isPaid: false,
  };

  return (
    <main className="flex flex-col justify-center items-center p-4">
      <div className="rounded bg-secondary px-2 py-1 flex justify-center items-center w-1/2">
        <select
          name="select-category"
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="bg-secondary px-2 py-1 w-full outline-none"
        >
          <option value="Moje wydatki">Moje wydatki</option>
          <option value="Wszystkie wydatki">Wszystkie wydatki</option>
        </select>
      </div>
      <Expense {...expenseProps} />
    </main>
  );
};

export default Expenses;
