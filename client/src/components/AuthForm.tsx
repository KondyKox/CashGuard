import React, { useState } from "react";
import { AuthFormProps } from "../types/AuthProps";
import Button from "./Button";

const AuthForm: React.FC<AuthFormProps> = ({ title, onSubmit, fields }) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await onSubmit(formData);
      setError(null);
    } catch (error: any) {
      alert(error.message);
      setError(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border flex flex-col justify-center items-center w-2/3 mx-auto my-5 rounded-lg p-4"
    >
      <h2 className="pb-4 font-bold text-green text-2xl uppercase">{title}</h2>
      <div className="flex flex-col justify-center items-center gap-2">
        {fields.map((field) => (
          <input
            key={field.name}
            className="px-2 py-1 rounded outline-none text-primary bg-secondary placeholder-slate-200"
            type={field.type}
            name={field.name}
            value={formData[field.name] || ""}
            onChange={handleChange}
            placeholder={field.placeholder}
            required
          />
        ))}
      </div>
      <Button className="text-lg pt-4 uppercase">{title}</Button>
      {error && <p className="text-red pt-4">{error}</p>}
    </form>
  );
};

export default AuthForm;
