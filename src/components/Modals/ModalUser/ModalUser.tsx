import React, { useState, useEffect } from "react";
import { useUserStore } from "@/stores/useAuthStore";
import ButtonApp from "@/components/buttons/ButttonApp/ButtonApp";
import { getAllUsers } from "@/Services/userService";
import InputForm from "@/components/inputs/InputForm/InputForm";

interface EditUserModalProps {
  userId: string;
  onClose: () => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ userId, onClose }) => {
  const { users, setUsers, updateUser } = useUserStore();
  const user = users.find((u) => u.id === userId);

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log(
        "Submitting updated data for user ID:",
        userId,
        "with name:",
        name,
        "and email:",
        email
      );
      await updateUser(userId, { name, email });
      const updatedUsers = await getAllUsers(); // <-- Recarga los usuarios desde la API
      setUsers(updatedUsers); // <-- Actualiza el estado con los usuarios recargados
      onClose();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  if (!user) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6">
        <form onSubmit={handleSubmit}>
          <div>
            <InputForm
              label="Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <InputForm
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex w-full">
            <ButtonApp
              className="w-1/2"
              variant="cancel"
              type="button"
              onClick={onClose}
            >
              Cancel
            </ButtonApp>
            <ButtonApp className="w-1/2" variant="success" type="submit">
              Save
            </ButtonApp>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
