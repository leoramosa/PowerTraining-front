"use client";
import React from "react";
import RowUser from "../RowUser/RowUser";
import { IUser } from "@/interface/IUsers";

interface ListUserProps {
  users: IUser[];
}

const ListUser: React.FC<ListUserProps> = ({ users = [] }) => {
  console.log("Users received in ListUser:", users);
  return (
    <div className="grid grid-cols-1 gap-4">
      {users.length > 0 ? (
        users.map((user) => <RowUser key={user.id} user={user} />)
      ) : (
        <p>No hay usuarios para mostrar.</p>
      )}
    </div>
  );
};

export default ListUser;
