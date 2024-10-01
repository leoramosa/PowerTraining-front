"use client";
import React, { useEffect } from "react";
import { useUsersStore } from "@/stores/usersStore";
import { getUsersDB } from "@/Services/userService"; // Supongamos que tienes una función para obtener usuarios

const UsersInitializer: React.FC = () => {
  const setUsers = useUsersStore((state) => state.setUsers);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const userData = await getUsersDB();
        setUsers(userData.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    loadUsers();
  }, [setUsers]);

  return null; // Este componente no renderiza nada
};

export default UsersInitializer;
