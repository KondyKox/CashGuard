import express from "express";
import User from "../models/User";
import Expense from "../models/Expense";
import { authMiddleware } from "../middleware/authMiddleware";

const userRouter = express.Router();

// Get user details
userRouter.get("/api/user", authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).send("User not found");
  res.json({ username: user.username, email: user.email, budget: user.budget });
});

// Get total expenses
userRouter.get("/api/expenses/total", authMiddleware, async (req, res) => {
  const total = await Expense.aggregate([
    { $match: { addedBy: req.user.id } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  const monthly = await Expense.aggregate([
    {
      $match: {
        addedBy: req.user.id,
        date: {
          $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        },
      },
    },
    { $group: { _id: null, monthly: { $sum: "$amount" } } },
  ]);

  res.json({
    total: total.length > 0 ? total[0].total : 0,
    monthly: monthly.length > 0 ? monthly[0].monthly : 0,
  });
});

export default userRouter;
