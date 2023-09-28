import { useEffect, useState } from "react";
import { Countries } from "../Interface.type";
import { Link } from "react-router-dom";
import { useDarkMode } from "../context/DarkModeProvider";

interface CountrieNearby {
  border: string;
}

export const BorderCountries = ({ border }: CountrieNearby) => {
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState<Countries | null>(null);
  const { darkMode } = useDarkMode();

  useEffect(() => {
    const getDataResultCountriesNearby = async () => {
      const url = "/public/data.json";
      try {
        setLoading(true);
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();

          const result = data.find(
            (country: Countries) => country.alpha3Code === border
          );
          setCountry(result);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    return () => {
      getDataResultCountriesNearby();
    };
  }, [border]);

  return (
    <Link
      to={`/detail/${country?.cioc}`}
      className={`bg-gray-200 text-sm py-1 px-3 rounded-sm shadow-md ${darkMode ? 'text-black' : ''}`}
    >
      {loading && "Cargando..."}
      {country?.name}
    </Link>
  );
};
