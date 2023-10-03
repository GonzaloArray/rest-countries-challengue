import { getDataFlags } from "../service/getDataFlags";
import { useMemo, useState } from "react";

const CountriesFlag = getDataFlags;

export const useFilterFlag = () => {
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

  const handleInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch({ ...search, text: e.target.value })
  }

  return {
    currentPage,
    maxPage,
    currentItems,
    handleInputText,
    handleNextPage,
    handleSelectOption,
    handlePreviousPage,
  };
};
