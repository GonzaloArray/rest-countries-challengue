import { Region } from "../Interface.type";
import { Flags } from "./Flags";
import { Search } from "../icon/Search.icon";
import { useFilterFlag } from "../hook/useFilterFlag";

export const Content: React.FC = () => {
  const {
    maxPage,
    currentPage,
    currentItems,
    handleInputText,
    handleNextPage,
    handlePreviousPage,
    handleSelectOption,
  } = useFilterFlag();

  return (
    <div className="flex-1 flex flex-col">
      <section className="py-10 flex justify-between items-center gap-3 flex-wrap mx-2 md:mx-0">
        <div className="flex gap-3 bg-gray-200 p-4 rounded-sm w-full md:w-2/5">
          <Search />
          <input
            onChange={handleInputText}
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
