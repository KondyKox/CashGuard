import { Link } from "react-router-dom";
import Button from "../components/Button";
import { UserProps } from "../types/UserProps";
import AuthButton from "../components/AuthButton";

// Nav links
const navLinks = [
  { label: "Wydatki", path: "/" },
  {
    label: "Dodaj wydatek",
    path: "/add-expense",
  },
];

// Render links
export const renderNavLinks = (isMobile: boolean) => {
  return (
    <ul
      className={`flex justify-center items-center ${
        isMobile ? "gap-y-5 flex-col p-2" : "gap-x-5"
      }`}
    >
      {navLinks.map((link, index) => (
        <li key={index} className={`px-2 ${isMobile ? "text-xl" : null}`}>
          <Link to={link.path}>
            <Button className={`bg-transparent`}>{link.label}</Button>
          </Link>
        </li>
      ))}
    </ul>
  );
};

// Render auth buttons
export const renderAuthButtons = (
  { isLoggedIn, onLogin, onLogout }: UserProps,
  isMobile: boolean
) => {
  return (
    <div
      className={
        isMobile ? "flex justify-center items-center mt-5 pt-5 border-t" : ""
      }
    >
      <AuthButton
        isLoggedIn={isLoggedIn}
        onLogin={onLogin}
        onLogout={onLogout}
      />
    </div>
  );
};
