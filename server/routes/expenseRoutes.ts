import { Router, Request, Response } from "express";
import Expense from "../models/Expense";

const router = Router();

router.post("/add", async (req: Request, res: Response) => {
  try {
    const newExpense = new Expense(req.body);
    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
