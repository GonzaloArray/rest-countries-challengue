import React, { useEffect, useMemo, useState } from "react";
import { Countries, Region } from "../Interface.type";
import { Flags } from "./Flags";
import { Search } from "../icon/Search.icon";

export const Content: React.FC = () => {
  const [search, setSearch] = useState({
    text: "",
    option: "",
  });
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState<Countries[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const getDataCountries = async () => {
      const url = "data/data.json";
      try {
        setLoading(true);
        const res = await fetch(url
        ,{
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
        }
        );
        if (res.ok) {
          const data = await res.json();
          setCountries(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    return () => {
      getDataCountries();
    };
  }, []);

  const searchCountry = useMemo(() => {
    if (search.option === "" && search.text === "") {
      return countries;
    }
    if (search.option === "" && search.text !== "") {
      return countries?.filter((country) =>
        country.name.toLowerCase().includes(search.text.toLowerCase())
      );
    }
    const dataFilter = countries?.filter((country) =>
      country.name.toLowerCase().includes(search.text.toLowerCase())
    );

    return dataFilter?.filter((country) =>
      country.region.toLowerCase().includes(search.option.toLowerCase())
    );
  }, [search, countries]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchCountry?.slice(indexOfFirstItem, 1);

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
          onChange={(e) => setSearch({ ...search, option: e.target.value })}
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
      {loading && (
        <h2 className="text-center text-4xl font-bold">Cargando...</h2>
      )}
      {currentItems?.length === 0 && (
        <h2 className="text-4xl text-center font-bold">
          No se encontraron paises
        </h2>
      )}
      <section
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 mx-2 lg:mx-0 ${
          !loading ? "animate__animated animate__fadeIn" : ""
        }`}
      >
        {currentItems?.map((country) => (
          <Flags key={country.name} country={country} />
        ))}
      </section>
      <div className="flex justify-center mt-4 py-10">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="mr-2 px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md cursor-pointer"
        >
          Anterior
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === maxPage}
          className="ml-2 px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md cursor-pointer"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};
