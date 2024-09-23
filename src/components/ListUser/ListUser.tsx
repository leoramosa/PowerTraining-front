"use client";
import React from "react";
import RowUser from "../RowUser/RowUser";
import { IUser } from "@/interface/users";

interface ListUserProps {
  users: IUser[];
}

const ListUser: React.FC<ListUserProps> = ({ users }) => {
  return (
    <>
      {users.map((user) => (
        <RowUser key={user.id} {...user} />
      ))}
    </>
  );
};

export default ListUser;
