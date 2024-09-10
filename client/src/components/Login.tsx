import React from "react";
import { LoginProps } from "../types/AuthProps";
import AuthForm from "./AuthForm";
import { Link, useNavigate } from "react-router-dom";
import { handleLogin } from "../utils/auth";

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center">
      <AuthForm
        title="Logowanie"
        onSubmit={async (formData) => {
          const { email, password } = formData;
          handleLogin({ email, password }, onLogin, navigate);
        }}
        fields={[
          { name: "email", type: "email", placeholder: "Email" },
          { name: "password", type: "password", placeholder: "Hasło" },
        ]}
      />
      <p>
        Nie masz konta?{" "}
        <Link to={"/register"} className="text-red hover:text-green transition">
          {" "}
          Zarejestruj się tutaj!
        </Link>
      </p>
    </div>
  );
};

export default Login;
