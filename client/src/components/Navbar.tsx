import React, { useContext, useState } from "react";
import Button from "./Button";
import { UserProps } from "../types/UserProps";
import {
  renderAuthButton,
  renderMobileMenu,
  renderNavElements,
} from "../utils/navElements";
import { MobileContext } from "../context/MobileContext";

// Optional: Define a default value for isMobile
const defaultMobileContext = { isMobile: false };

const Navbar: React.FC<UserProps> = ({ isLoggedIn }) => {
  // Use context and provide a default value if context is undefined
  const context = useContext(MobileContext);
  const isMobile = context ? context.isMobile : defaultMobileContext.isMobile;

  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="flex justify-between items-center p-4 border-b border-slate-900">
      <div className="font-bold text-xl">CashGuard</div>

      {isMobile ? (
        <>
          <Button
            className="filter invert"
            onClick={toggleMenu}
            style={{ zIndex: 20 }}
          >
            <img
              src="/mobile_navbar.png"
              alt="Mobile Menu"
              className="w-7 h-7"
            />
          </Button>
          {renderMobileMenu(isMobile, isLoggedIn, menuOpen)}
        </>
      ) : (
        <>
          <div>{renderNavElements(isMobile)}</div>
          <div>{renderAuthButton(isLoggedIn)}</div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
