import { useState } from "react";
import Navbar from "./components/Navbar";
import { UserProps } from "./types/UserProps";
import Expenses from "./pages/Expenses";

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
    <div className="min-h-screen bg-gray-800 text-white">
      <Navbar {...userProps} />
      <Expenses />
    </div>
  );
}

export default App;
