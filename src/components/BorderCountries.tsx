import { Link } from "react-router-dom";
import { useDarkMode } from "../context/DarkModeProvider";
import data from "../data.json";

interface CountrieNearby {
  border: string;
}

const CountriesFlag = data;

export const BorderCountries = ({ border }: CountrieNearby) => {
  const { darkMode } = useDarkMode();

  const country = CountriesFlag.find(
    (country) => country.alpha3Code === border
  );

  return (
    <Link
      to={`/detail/${country?.cioc}`}
      className={`bg-gray-200 text-sm py-1 px-3 rounded-sm shadow-md ${
        darkMode ? "text-black" : ""
      }`}
    >
      {country?.name}
    </Link>
  );
};
