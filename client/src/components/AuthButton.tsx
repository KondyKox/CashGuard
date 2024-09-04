// src/components/AuthButton.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

interface AuthButtonProps {
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

const AuthButton: React.FC<AuthButtonProps> = ({
  isLoggedIn,
  // onLogin,
  onLogout,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (isLoggedIn) {
      onLogout();
      navigate("/");
    } else navigate("/login");
  };

  return (
    <Button onClick={handleClick}>
      <img
        src={isLoggedIn ? "/logout.png" : "/login.png"}
        alt={isLoggedIn ? "Logout" : "Login"}
        className="filter invert w-12 h-12"
      />
    </Button>
  );
};

export default AuthButton;
