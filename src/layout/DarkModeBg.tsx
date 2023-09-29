import React, { useEffect } from "react";
import { useDarkMode } from "../context/DarkModeProvider";

export const DarkModeBg = ({ children }: { children: React.ReactNode }) => {
  const { darkMode } = useDarkMode();

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
      
    }

    return () => {
      document.body.classList.remove('dark');
    };
  }, [darkMode]);

  return (
    <>
      <div className={`flex flex-col`}>
        {children}
      </div>
    </>
  );
};
