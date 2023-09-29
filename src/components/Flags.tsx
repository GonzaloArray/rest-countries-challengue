import { Link } from "react-router-dom";
import { useDarkMode } from "../context/DarkModeProvider";

interface Flag {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  country: any;
}

export const Flags = ({ country }: Flag) => {

  const {darkMode} = useDarkMode()

  return (
    <Link to={`/detail/${country.cioc}`} className="flex flex-col hover:scale-105 transition-all">
      <div className="h-3/6">
        <img
          src={country.flags.png}
          alt={country.name}
          className="object-cover h-full w-full"
        />
      </div>
      <div className={`p-3 shadow-lg flex flex-col gap-6 mt-2 ${darkMode ? 'bg-gray-200':''}`}>
        <h2 className="font-bold">{country.name}</h2>
        <div className="flex flex-col gap-2">
          <p className="font-bold text-sm">
            Population:{" "}
            <span className="font-normal">
              {country.population.toLocaleString("es-ES", {
                minimumFractionDigits: 2,
              })}
            </span>
          </p>
          <p className="font-bold text-sm">
            Region: <span className="font-normal">{country.region}</span>
          </p>
          <p className="font-bold text-sm">
            Capital: <span className="font-normal">{country.capital}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};
