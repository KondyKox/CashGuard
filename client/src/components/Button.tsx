import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <button
      className={`rounded hover:text-red-600 hover:scale-125 transition-all duration-300 ease-in-out ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
