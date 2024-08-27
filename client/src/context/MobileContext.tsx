import React, { createContext, useState, useEffect, ReactNode } from "react";

interface MobileContextType {
  isMobile: boolean;
}

export const MobileContext = createContext<MobileContextType | undefined>(
  undefined
);

export const MobileProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 786);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 786);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <MobileContext.Provider value={{ isMobile }}>
      {children}
    </MobileContext.Provider>
  );
};
