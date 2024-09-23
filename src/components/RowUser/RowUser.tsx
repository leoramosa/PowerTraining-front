"use client";

import React, { useState } from "react";
import ItemInfo from "../ItemInfo/ItemInfo";
import AvatarUser from "../images/AvatarUser/AvatarUser";
import ButtonActions from "../buttons/ButtonActions/ButtonActions";
import { deleteUser } from "@/Services/userService";
import { IUser } from "@/interface/users";
import EditUserModal from "../Modals/ModalUser/ModalUser";
import { useUserStore } from "@/stores/useAuthStore";
import TitleH1 from "../titles/TitleH1";

const RowUser: React.FC<IUser> = ({ id }) => {
  const { users } = useUserStore();
  const user = users.find((u) => u.id === id);
  const [isDeleted, setIsDeleted] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);

  const handleDeleteUser = async () => {
    try {
      await deleteUser(id);
      setIsDeleted(true);
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
    console.log(handleDeleteUser);
  };

  const handleEditUser = (id: string) => {
    console.log("Editing User ID:", id); // Verifica si esto se imprime en la consola
    setEditingUserId(id);
  };

  if (isDeleted || !user) return null; // Asegúrate de que el usuario existe

  return (
    <>
      <TitleH1>Usesdsdfrs</TitleH1>
      <ItemInfo key={id} className="relative flex">
        <div className="flex items-center">
          <AvatarUser name={user.name} className="mr-2" />
          <AvatarUser name={user.name} className="mr-2" />
          <p>
            {user.name} {user.lastName}
            {user.name} {user.lastName}
          </p>
        </div>
        <div>
          <p>{user.email}</p>
          <p>{user.email}</p>
        </div>

        <div className="flex">
          <ButtonActions
            type="button"
            onClick={() => handleEditUser(id)}
            status="edit"
            size="md"
            tooltip="Edit user"
          />

          <ButtonActions
            type="button"
            onClick={handleDeleteUser}
            status="delete"
            size="md"
            tooltip="Delete user"
          />
        </div>
      </ItemInfo>
      {editingUserId && (
        <EditUserModal
          userId={editingUserId}
          onClose={() => setEditingUserId(null)}
        />
      )}
    </>
  );
};

export default RowUser;
