import React from "react";
import ISearchInputProps from "@/interface/ISearchInputProps";

const SearchInput2: React.FC<ISearchInputProps> = ({
  value,
  placeholder,
  onClick,
  options,
  onChangeInput,
  onChangeSelect,
}) => {
  return (
    <div className="flex space-x-2">
      <select
        onChange={onChangeSelect}
        className="border border-gray-300 rounded-md p-2"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={value}
        onChange={onChangeInput}
        placeholder={placeholder}
        className="border border-gray-300 rounded-md p-2 flex-1"
      />
      <button
        onClick={onClick}
        className="bg-blue-500 text-white p-2 rounded-md"
      >
        Search
      </button>
    </div>
  );
};

export default SearchInput2;
