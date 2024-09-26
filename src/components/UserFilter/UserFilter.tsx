"use client";

import React, { useState } from "react";
import { IUserFilters } from "@/interface/users";

interface UserFiltersProps {
  setFilters: (filters: IUserFilters) => void;
}

const UserFilters: React.FC<UserFiltersProps> = ({ setFilters }) => {
  const [filterKey, setFilterKey] = useState<string>("name");
  const [filterValue, setFilterValue] = useState<string>("");

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(e.target.value);
  };

  const handleFilterKeyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterKey(e.target.value);
  };

  const handleSubmit = () => {
    setFilters({ [filterKey]: filterValue });
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md flex items-center space-x-4">
      <select
        value={filterKey}
        onChange={handleFilterKeyChange}
        className="border border-gray-300 rounded-md p-2"
      >
        <option value="name">Nombre</option>
        <option value="email">Email</option>
        <option value="lastName">Apellido</option>
        <option value="birthday">Cumpleaños</option>
      </select>

      <input
        type="text"
        value={filterValue}
        onChange={handleFilterChange}
        placeholder={`Filtrar por ${filterKey}`}
        className="border border-gray-300 rounded-md p-2 flex-1"
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white p-2 rounded-md"
      >
        Filtrar
      </button>
    </div>
  );
};

export default UserFilters;
