import React from "react";
import Button from "./Button";
import { UserProps } from "../types/UserProps";

const Navbar: React.FC<UserProps> = ({ isLoggedIn, onLogin, onLogout }) => {
  return (
    <nav className="flex justify-between items-center p-4 border-b border-slate-900">
      <div className="font-bold text-lg">Kalkulator Wydatków</div>
      <div>
        <ul className="flex gap-x-7">
          <li>
            <Button className="bg-transparent">Moje wydatki</Button>
          </li>
          <li>
            <Button className="bg-transparent">Dodaj wydatek</Button>
          </li>
        </ul>
      </div>
      <div>
        <div>
          {isLoggedIn ? (
            <Button onClick={onLogout}>
              <img src="/logout.png" alt="Logout" className="w-12 h-12" />
            </Button>
          ) : (
            <Button onClick={onLogin}>
              <img src="/login.png" alt="Login" className="w-12 h-12" />
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
