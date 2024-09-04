import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import Expense from "../models/Expense";

const router = express.Router();

router.get("/secure-expenses", authMiddleware, async (req, res) => {
  if (req.user) {
    const expenses = await Expense.find({ user: req.user.id });
    res.json(expenses);
  } else {
    res.status(401).json({ message: "Authorization failed, no user found." });
  }
});

export default router;
