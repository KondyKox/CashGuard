import React, { useEffect, useState } from "react";
import Button from "./Button";
import { UserProps } from "../types/UserProps";
import {
  renderAuthButtons,
  renderNavLinks,
} from "../utilities/renderNavElements";

const Navbar: React.FC<UserProps> = ({ isLoggedIn, onLogin, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMobile, setMobile] = useState(false);

  // Resize window
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    windowWidth <= 786 ? setMobile(true) : setMobile(false);
  });

  // Toggle mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Mobile navbar
  const renderMobileMenu = () => {
    return (
      <div
        className={`absolute top-0 left-0 w-full h-full bg-primary ${
          menuOpen ? "flex flex-col justify-center items-center" : "hidden"
        }`}
        style={{ zIndex: 10 }}
      >
        <div className="p-4 m-4">
          <h1 className="font-bold text-xl ">Kalkulator Wydatków</h1>
        </div>
        <div>{renderNavLinks(isMobile)}</div>
        <div>
          {renderAuthButtons({ isLoggedIn, onLogin, onLogout }, isMobile)}
        </div>
      </div>
    );
  };

  return (
    <nav className="flex justify-between items-center p-4 border-b border-slate-900">
      <div className="font-bold text-xl">Kalkulator Wydatków</div>

      {isMobile ? (
        <>
          <Button onClick={toggleMenu} style={{ zIndex: 20 }}>
            <img
              src="/mobile_navbar.png"
              alt="Mobile Menu"
              className="w-7 h-7"
            />
          </Button>
          {renderMobileMenu()}
        </>
      ) : (
        <>
          <div>{renderNavLinks(isMobile)}</div>
          <div>
            {renderAuthButtons({ isLoggedIn, onLogin, onLogout }, isMobile)}
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
