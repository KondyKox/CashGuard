import { useContext, useEffect, useState } from "react";
import Expense from "../components/Expense";
import { ExpenseProps } from "../types/ExpenseProps";
import { MobileContext } from "../context/MobileContext";

const selectedCategoryKey = "ExpenseCalculator__SelectedCategory"; // Local Storage Key

type Category = "My Expenses" | "All Expenses"; // Expenses category

const Expenses = () => {
  const context = useContext(MobileContext);
  const isMobile = context ? context.isMobile : false;

  const [selectedCategory, setSelectedCategory] = useState<Category>(() => {
    const savedCategory = localStorage.getItem(selectedCategoryKey);
    return (savedCategory as Category) || "My Expenses";
  });
  const [expenses, setExpenses] = useState<ExpenseProps[]>([]);

  // Change category
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value as Category;
    setSelectedCategory(newCategory);
    localStorage.setItem(selectedCategoryKey, newCategory);
  };

  // Get expenses from database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/expenses");
        if (!response.ok) throw new Error("Network response was not ok.");

        const data: ExpenseProps[] = await response.json();
        setExpenses(data);
      } catch (error) {
        console.error("Failed to fetch expenses:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center p-4">
      <div
        className={`rounded bg-secondary px-2 py-1 flex justify-center items-center ${
          isMobile ? "w-2/3" : "w-1/2"
        }`}
      >
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
      <div className="w-full flex flex-col items-center mt-4">
        {expenses.map((expense, index) => (
          <Expense key={index} {...expense} />
        ))}
      </div>
    </div>
  );
};

export default Expenses;
