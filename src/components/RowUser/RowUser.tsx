import React, { useState } from "react";
import { IUser } from "@/interface/IUsers";
import { deleteUser } from "@/Services/userService copy";
import ItemInfo from "../ItemInfo/ItemInfo";
import AvatarUser from "../images/AvatarUser/AvatarUser";
import ButtonActions from "../buttons/ButtonActions/ButtonActions";
import EditUserModal from "../Modals/ModalUser/ModalUser";

interface RowUserProps {
  user: IUser;
}

const RowUser: React.FC<RowUserProps> = ({ user }) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);

  const handleDeleteUser = async () => {
    try {
      await deleteUser(user.id);
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

  if (isDeleted) return null; //

  return (
    <>
      <ItemInfo key={user.id} className="relative flex">
        <div className="flex items-center">
          <AvatarUser name={user.name} className="mr-2" />
          <p>
            {user.name} {user.lastName}
          </p>
        </div>
        <div>
          <p>{user.email}</p>
        </div>

        <div className="flex">
          <ButtonActions
            type="button"
            onClick={() => handleEditUser(user.id)}
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
