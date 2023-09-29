import React, { useMemo, useState } from "react";
import { Region } from "../Interface.type";
import { Flags } from "./Flags";
import { Search } from "../icon/Search.icon";

import data from "../data.json";

const CountriesFlag = data;

export const Content: React.FC = () => {
  const [search, setSearch] = useState({
    text: "",
    option: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const searchCountry = useMemo(() => {
    if (search.option === "" && search.text === "") {
      return CountriesFlag;
    }
    if (search.option === "" && search.text !== "") {
      return CountriesFlag?.filter((country) =>
        country.name.toLowerCase().includes(search.text.toLowerCase())
      );
    }
    const dataFilter = CountriesFlag?.filter((country) =>
      country.name.toLowerCase().includes(search.text.toLowerCase())
    );

    return dataFilter?.filter((country) =>
      country.region.toLowerCase().includes(search.option.toLowerCase())
    );
  }, [search]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchCountry?.slice(indexOfFirstItem, indexOfLastItem);

  const maxPage = Math.ceil((searchCountry?.length || 0) / itemsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < maxPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSelectOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearch({ ...search, option: e.target.value });
    setCurrentPage(1);
  };

  return (
    <div className="flex-1 flex flex-col">
      <section className="py-10 flex justify-between items-center gap-3 flex-wrap mx-2 md:mx-0">
        <div className="flex gap-3 bg-gray-200 p-4 rounded-sm w-full md:w-2/5">
          <Search />
          <input
            onChange={(e) => setSearch({ ...search, text: e.target.value })}
            className="bg-gray-200 w-full outline-0"
            type="text"
            placeholder="Search for a country..."
          />
        </div>
        <select
          className="bg-gray-200 p-4 rounded-xl custom-select"
          onChange={handleSelectOption}
          name=""
          id=""
        >
          <option value="" selected>
            All Region
          </option>
          {Object.values(Region).map((region) => (
            <option value={region} key={region}>
              {region}
            </option>
          ))}
        </select>
      </section>
      {currentItems?.length === 0 && (
        <h2 className="text-4xl text-center font-bold">
          No se encontraron paises
        </h2>
      )}
      <section
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 mx-2 lg:mx-0 animate__animated animate__fadeIn`}
      >
        {currentItems?.map((country) => (
          <Flags key={country.name} country={country} />
        ))}
      </section>
      <div className="flex justify-center mt-4 py-10">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`ml-2 px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-sm cursor-pointer ${
            currentPage === 1
              ? "bg-gray-100 dark:bg-gray-400"
              : "hover:scale-105 transition-all"
          }`}
        >
          Anterior
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === maxPage}
          className={`ml-2 px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-sm cursor-pointer ${
            currentPage === maxPage
              ? "bg-gray-100 dark:bg-gray-400"
              : "hover:scale-105 transition-all"
          }`}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};
