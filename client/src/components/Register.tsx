import React from "react";
import AuthForm from "./AuthForm";
import { Link, useNavigate } from "react-router-dom";
import { handleLogin } from "../utils/auth";

const Register: React.FC = () => {
  const navigate = useNavigate();

  const handleRegister = async (formData: { [key: string]: string }) => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Registration error");

      // Auto login after registration
      await handleLogin(
        { email: formData.email, password: formData.password },
        () => {},
        navigate
      );
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <AuthForm
        title="Rejestracja"
        onSubmit={handleRegister}
        fields={[
          { name: "username", type: "text", placeholder: "Nazwa użytkownika" },
          { name: "email", type: "email", placeholder: "Email" },
          { name: "password", type: "password", placeholder: "Hasło" },
        ]}
      />
      <p>
        Masz już konto?{" "}
        <Link to={"/login"} className="text-red hover:text-green transition">
          {" "}
          Zaloguj się tutaj!
        </Link>
      </p>
    </div>
  );
};

export default Register;
