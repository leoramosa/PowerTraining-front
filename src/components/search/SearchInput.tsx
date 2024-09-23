import React, { useEffect, useState } from "react";
import ISearchInputProps from "@/interface/ISearchInputProps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchInput: React.FC<ISearchInputProps> = ({
  value,
  placeholder = "Search...",
  onClick,
  onChangeInput,
  onChangeSelect,
  options,
}) => {
  const [searchOption, setSearchOption] = useState<string>("");
  const [valueSearch, setValueSearch] = useState<string>(value ? value : "");

  useEffect(() => {
    if (value) {
      setValueSearch(value);
    }
  }, [value]);

  return (
    <div className="flex items-stretch border rounded-lg bg-white">
      {/* Dropdown para seleccionar la opción de búsqueda */}
      <select
        value={searchOption}
        onChange={(e) => {
          const newValue = e.target.value;
          setSearchOption(newValue);
          onChangeSelect(e, newValue);
        }}
        className="p-3 py-3 rounded-l-md focus:outline-none bg-gray-100 px-4"
      >
        <option key={"vacio"} value="" disabled>
          Choose filter
        </option>
        {options.length > 0 &&
          options.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            );
          })}
      </select>

      {/* Input de búsqueda */}
      <input
        type="text"
        value={valueSearch}
        onChange={(e) => {
          const newValue = e.target.value;
          setValueSearch(newValue);
          onChangeInput(e, newValue);
        }}
        placeholder={placeholder}
        className="flex-grow p-3 py-3 focus:outline-none w-80"
      />

      {/* Botón de búsqueda */}
      <button
        className={`bg-primary hover:bg-primaryLight text-white font-bold py-3 rounded-r-md px-4 transition duration-500 ${
          !searchOption ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={onClick}
        disabled={!searchOption}
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  );
};

export default SearchInput;
