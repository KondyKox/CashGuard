import { useState } from "react";
import Navbar from "./components/Navbar";
import { UserProps } from "./types/UserProps";
import Expenses from "./pages/Expenses";
import { MobileProvider } from "./context/MobileContext";

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
      <main className="min-h-screen bg-primary text-white">
        <Navbar {...userProps} />
        <Expenses />
      </main>
    </MobileProvider>
  );
}

export default App;
