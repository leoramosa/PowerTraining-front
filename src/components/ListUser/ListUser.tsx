"use client";
import React, { useEffect } from "react";
import RowUser from "../RowUser/RowUser";
import { IUser } from "@/interface/users";
import { useUserStore } from "@/stores/useAuthStore";

interface ClientUserListProps {
  users: IUser[];
}
const ClientUserList: React.FC<ClientUserListProps> = ({
  users: initialUsers,
}) => {
  const { users, setUsers } = useUserStore();

  useEffect(() => {
    setUsers(initialUsers);
  }, [initialUsers, setUsers]);
  return (
    <>
      {users.map((user) => (
        <RowUser key={user.id} {...user} />
      ))}
    </>
  );
};

export default ClientUserList;
