import { getToken } from "./auth";

// Get user details
export const getUserDetails = async () => {
  const token = getToken();

  const response = await fetch("/api/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Cannot get user details!");

  return await response.json();
};

// Get user's total expenses
export const getTotalExpenses = async () => {
  const token = getToken();

  const response = await fetch("/api/expenses/total", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Cannot get user details!");

  const data = await response.json();
  return data.total;
};

// Get monthly expenses
export const getMonthlyExpenses = async () => {
  const token = getToken();

  const response = await fetch("/api/expenses/total", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Cannot get user details!");

  const data = await response.json();
  return data.monthly;
};
