"use client";
import { useEffect, useState } from "react";
import { IUserFilters } from "@/interface/IUsers";
import { getUsersDB } from "@/Services/userService";
import { useUserStore } from "@/stores/useAuthStore"; // Ensure correct import
import ListUser from "@/components/ListUser/ListUser";
import SearchInput from "@/components/search/SearchInput";
import ButtonPrimary from "@/components/buttons/ButtonPrimary/ButtonPrimary";

const ListRowUser: React.FC = () => {
  const { users, setUsers } = useUserStore();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit] = useState<number>(5);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [filters, setFilters] = useState<IUserFilters>({});
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchSelect, setSearchSelect] = useState<string>("");

  const calculateTotalPages = (totalCount: number, limit: number) => {
    return Math.ceil(totalCount / limit);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsersDB(limit, currentPage, filters);
        console.log("Response from getUsersDB:", response); // Log the response

        if (Array.isArray(response)) {
          // Respuesta sin filtros
          setTotalPages(calculateTotalPages(response.length, limit));
          setUsers(response);
        } else if (response && Array.isArray(response.data)) {
          // Respuesta con filtros
          setTotalPages(calculateTotalPages(response.count, limit));
          setUsers(response.data);
        } else {
          console.error("Unexpected response format:", response);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [currentPage, limit, filters, setUsers]);

  // Log totalPages whenever it changes
  useEffect(() => {
    console.log("Total pages:", totalPages);
  }, [totalPages]);

  const handleInputSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSelectSearchChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSearchSelect(e.target.value);
  };

  const handleClickSearch = () => {
    if (searchSelect && searchValue) {
      setFilters({ [searchSelect]: searchValue });
    } else {
      setCurrentPage(1);
      setFilters({});
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const optionsSearch = [
    { label: "Find by name", value: "name" },
    { label: "Find by email", value: "email" },
    { label: "Find by last name", value: "lastname" },
  ];

  return (
    <main className="p-4">
      <div className="flex justify-between mb-4">
        <SearchInput
          value={searchValue}
          placeholder="Type a word here"
          onClick={handleClickSearch}
          options={optionsSearch}
          onChangeInput={handleInputSearchChange}
          onChangeSelect={handleSelectSearchChange}
        />
      </div>
      <ListUser users={users} />
      <div className="flex justify-center items-center mt-4">
        <ButtonPrimary
          type="button"
          text="Previous"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        />
        <span className="mx-2">Page {currentPage}</span>
        <ButtonPrimary
          type="button"
          text="Next"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        />
      </div>
    </main>
  );
};

export default ListRowUser;
