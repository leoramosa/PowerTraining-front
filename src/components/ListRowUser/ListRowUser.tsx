"use client";
import { getAllUsers } from "@/Services/userService";
import ListUser from "../ListUser/ListUser";
import UserPagination from "../UserPagination/UserPagination";
import UserFilters from "../UserFilter/UserFilter";
import { useState, useEffect } from "react";
import { IUser, IUserFilters } from "@/interface/users";
import { useUserStore } from "@/stores/useAuthStore"; // Asegúrate de importar el store correcto

const ListRowUser = () => {
  const { users, setUsers } = useUserStore(); // Usa el store para manejar el estado de los usuarios
  const [limit] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const [filters, setFilters] = useState<IUserFilters>({});
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data, totalPages } = await getAllUsers(limit, page, filters);
        setUsers(data); // Usa setUsers del store
        setTotalPages(totalPages);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [limit, page, filters, setUsers]);

  return (
    <>
      <UserFilters setFilters={setFilters} />
      <ListUser users={users} />
      <UserPagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </>
  );
};

export default ListRowUser;
