import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkIfLoggedIn } from "../utils/auth";
import { ProtectedRouteProps } from "../types/ProtectedRouteProps";

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!checkIfLoggedIn()) navigate("/login");
  }, [navigate]);

  return <>{children}</>;
};

export default ProtectedRoute;
