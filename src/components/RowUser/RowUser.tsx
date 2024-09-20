"use client";

import React, { useState } from "react";
import ItemInfo from "../ItemInfo/ItemInfo";
import AvatarUser from "../images/AvatarUser/AvatarUser";
import ButtonActions from "../buttons/ButtonActions/ButtonActions";
import { deleteUser } from "@/Services/userService";
import { IUser } from "@/interface/users";

const RowUser: React.FC<IUser> = ({ id, name }) => {
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDeleteUser = async () => {
    try {
      await deleteUser(id);
      setIsDeleted(true); // Marca el usuario como eliminado
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
    console.log(handleDeleteUser);
  };

  if (isDeleted) return null; // No renderizar si el usuario ha sido eliminado

  return (
    <ItemInfo key={id} className="relative flex">
      <AvatarUser name={name} />
      {name}
      <div className="">
        <ButtonActions
          type="button"
          onClick={handleDeleteUser}
          status="delete"
          size="md"
          tooltip="Delete user"
        />
      </div>
    </ItemInfo>
  );
};

export default RowUser;
