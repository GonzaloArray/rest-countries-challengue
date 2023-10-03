import React from "react";
import { Link, useParams } from "react-router-dom";
import { BorderCountries } from "../components/BorderCountries";
import { Arrow } from "../icon/Arrow.icon";
import { useDarkMode } from "../context/DarkModeProvider";

import data from "../data.json";

const CountriesFlag = data;

export const Details: React.FC = () => {
  const { darkMode } = useDarkMode();

  const { id } = useParams();

  const country = CountriesFlag.find((country) => country.cioc === id);

  return (
    <div className="mt-10 h-screen animate__animated animate__fadeIn px-6 md:px-0">
      <div className="inline-block">
        <Link
          to="/"
          style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
          className={`py-3 px-10 rounded-md hover:scale-105 hover:font-bold transition-all mb-20 flex gap-2 ${
            darkMode
              ? "text-lime-50 border border-spacing-2 border-lime-50"
              : ""
          }`}
        >
          <Arrow />
          <span>Back</span>
        </Link>
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="flex flex-col justify-between gap-7">
          <img src={country?.flags.png} alt={country?.name} className="w-full md:w-4/5" />
        </div>
        <div
          className={`flex flex-col gap-4 ${darkMode ? "text-lime-50" : ""}`}
        >
          <h2 className="text-2xl font-bold">{country?.name}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2 ">
            <div className="flex flex-col gap-2">
              <p className="text-sm font-bold">
                Native Name:{" "}
                <span className="font-normal">{country?.demonym}</span>
              </p>
              <p className="text-sm font-bold">
                Population:{" "}
                <span className="font-normal">
                  {country?.population.toLocaleString("es-ES", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </p>
              <p className="text-sm font-bold">
                Region: <span className="font-normal">{country?.region}</span>
              </p>
              <p className="text-sm font-bold">
                Sub Region:{" "}
                <span className="font-normal">{country?.subregion}</span>
              </p>
              <p className="text-sm font-bold">
                Capital: <span className="font-normal">{country?.capital}</span>
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-sm font-bold">
                Top Level Domain:{" "}
                <span className="font-normal">{country?.demonym}</span>
              </h2>
              <h2 className="text-sm font-bold">
                Currencies:{" "}
                <span className="font-normal">
                  {country?.currencies ? country?.currencies[0].name : ""}
                </span>
              </h2>
              <h2 className="text-sm font-bold">
                Languages:{" "}
                <span className="font-normal">
                  {country?.languages[0].name}
                </span>
              </h2>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:col-span-2 pb-10 md:pb-0">
              <h2 className="text-sm font-bold">Border Countries: </h2>
              <div className="flex flex-wrap gap-3">
                {country?.borders?.map((border) => (
                  <BorderCountries key={border} border={border} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
