import Button from "../components/Button";
import { UserProps } from "../types/UserProps";

// Nav links
const navLinks = [
  { label: "Wydatki", onClick: () => console.log("Wydatki clicked") },
  {
    label: "Dodaj wydatek",
    onClick: () => console.log("Dodaj wydatek clicked"),
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
          <Button className={`bg-transparent`} onClick={link.onClick}>
            {link.label}
          </Button>
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
    <div className={isMobile ? "flex justify-center items-center mt-5 pt-5 border-t" : ""}>
      <Button onClick={isLoggedIn ? onLogout : onLogin}>
        <img
          src={isLoggedIn ? "/logout.png" : "/login.png"}
          alt={isLoggedIn ? "Logout" : "Login"}
          className={`${ isMobile ? "w-16 h-16" : "w-12 h-12"}`}
        />
      </Button>
    </div>
  );
};
