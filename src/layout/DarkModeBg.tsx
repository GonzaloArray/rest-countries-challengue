import React from "react";
import { useDarkMode } from "../context/DarkModeProvider";
import './DarkModeBg.css'

export const DarkModeBg = ({ children }: { children: React.ReactNode }) => {
  const { darkMode } = useDarkMode();

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className={`flex flex-col`}>
        {children}
      </div>
    </div>
  );
};
