import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { UserProps } from "./types/UserProps";
import Expenses from "./pages/Expenses";
import { MobileProvider } from "./context/MobileContext";
import ExpenseDetails from "./pages/ExpenseDetails";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // For testing
  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  // User Props
  const userProps: UserProps = {
    isLoggedIn,
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
            <Route path="/add-expense" element={<h1>Dodaj wydatek</h1>} />
            <Route path="/expenses/:id" element={<ExpenseDetails />} />
            <Route path="/login" element={<h1>Logowanie</h1>} />
          </Routes>
        </main>
      </Router>
    </MobileProvider>
  );
}

export default App;
