import { Router, Request, Response } from "express";
import Expense from "../models/Expense";

const router = Router();

// Get all expenses
router.get("/", async (req: Request, res: Response) => {
  try {
    const expenses = await Expense.find();
    res.status(200).json(expenses);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Add expense
router.post("/add", async (req: Request, res: Response) => {
  try {
    const newExpense = new Expense(req.body);
    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Get selected expense
router.get("/:id", async (req: Request, res: Response) => {
  console.log(`Request ID: ${req.params.id}`);
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      console.log("Expense not found");
      return res.status(404).json({ message: "Expense not found." });
    }

    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update expense
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      { isPaid: req.body.isPaid },
      { new: true }
    );

    if (!updatedExpense)
      return res.status(404).json({ message: "Expense not found" });

    res.json(updatedExpense);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
