import { useDarkMode } from "../context/DarkModeProvider";
import { Moon } from "../icon/Moon.icon";

export const Header = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <header
      className={`${
        darkMode ? "text-lime-50 border-lime-50" : "shadow-sm"
      }  md:px-0 border-b-2`}
    >
      <div className="flex justify-between items-center h-20 p-5 container mx-auto">
        <h2 className="font-bold">Where in the world?</h2>
        <button onClick={toggleDarkMode} className="font-bold flex gap-2 p-3 rounded-xl hover:bg-slate-200 transition-all w-[200px] justify-center">
          <Moon />
          <span>{darkMode ? "Ligth" : "Dark"} Mode</span>
        </button>
      </div>
    </header>
  );
};
