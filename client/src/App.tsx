import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { UserProps } from "./types/UserProps";
import Expenses from "./pages/Expenses";
import { MobileProvider } from "./context/MobileContext";
import ExpenseDetails from "./pages/ExpenseDetails";
import Login from "./components/Login";
import Register from "./components/Register";
import { checkIfLoggedIn, removeToken } from "./utils/auth";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(checkIfLoggedIn());

  useEffect(() => {
    setIsLoggedIn(checkIfLoggedIn());
  }, []);

  // Handle login / register
  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => {
    removeToken();
    setIsLoggedIn(false);
  };

  // User Props
  const userProps: UserProps = {
    isLoggedIn: isLoggedIn,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return (
    <MobileProvider>
      <Router>
        <main className="min-h-screen bg-primary text-white">
          <Navbar {...userProps} />
          <Routes>
            <Route path="/" element={<Expenses />} />
            <Route
              path="/add-expense"
              element={
                <ProtectedRoute>
                  <h1>Dodaj wydatek</h1>
                </ProtectedRoute>
              }
            />
            <Route
              path="/expenses/:id"
              element={
                <ProtectedRoute>
                  <ExpenseDetails />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </Router>
    </MobileProvider>
  );
}

export default App;
