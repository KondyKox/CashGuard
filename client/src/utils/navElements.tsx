import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";

// Nav links
const navLinks = [
  { label: "Wydatki", path: "/" },
  {
    label: "Dodaj wydatek",
    path: "/add-expense",
  },
];

// Render auth button
export const renderAuthButton = (isLoggedIn: boolean) => {
  const navigate = useNavigate();

  const handleAuthClick = () => {
    isLoggedIn ? navigate(`/user`) : navigate("/login");
  };
  return (
    <Button onClick={handleAuthClick}>
      <img src="/user.png" alt="User" className="filter invert w-12 h-12" />
    </Button>
  );
};

// Render links
export const renderNavElements = (isMobile: boolean) => {
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

// Mobile navbar
export const renderMobileMenu = (
  isMobile: boolean,
  isLoggedIn: boolean,
  menuOpen: boolean
) => {
  return (
    <div
      className={`absolute top-0 left-0 w-full h-full bg-primary ${
        menuOpen ? "flex flex-col justify-center items-center" : "hidden"
      }`}
      style={{ zIndex: 10 }}
    >
      <div className="p-4 m-4">
        <h1 className="font-bold text-xl ">CashGuard</h1>
      </div>
      <div className="flex">{renderNavElements(isMobile)}</div>
      <div className="p-4 mt-10 border-t">{renderAuthButton(isLoggedIn)}</div>
    </div>
  );
};
