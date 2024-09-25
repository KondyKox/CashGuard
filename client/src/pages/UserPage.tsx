import React, { useEffect, useState } from "react";
import {
  getMonthlyExpenses,
  getTotalExpenses,
  getUserDetails,
} from "../utils/user";
import Button from "../components/Button";
import { logoutUser } from "../utils/auth";

const UserPage: React.FC = () => {
  const [user, setUser] = useState<{
    username: string;
    email: string;
  } | null>(null);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(0);
  const [budget, setBudget] = useState<number>(0);

  // Get user details
  useEffect(() => {
    const fetchUserData = async () => {
      const userDetails = await getUserDetails();
      setUser(userDetails);

      const total = await getTotalExpenses();
      setTotalExpenses(total);

      const monthly = await getMonthlyExpenses();
      setMonthlyExpenses(monthly);

      setBudget(500);
    };

    fetchUserData();
  }, []);

  // Handle logout
  const handleLogout = () => {
    logoutUser();
    window.location.reload();
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Profil użytkownika</h1>
      <p>Nazwa użytkownika: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Łączne wydatki: {totalExpenses} zł</p>
      <p>Wydatki w tym miesiącu: {monthlyExpenses} zł</p>
      <p>Budżet: {budget} zł</p>
      <Button onClick={handleLogout}>Wyloguj się</Button>
    </div>
  );
};

export default UserPage;
