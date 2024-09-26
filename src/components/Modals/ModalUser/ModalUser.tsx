import React, { useState, useEffect } from "react";
import { useUserStore } from "@/stores/useAuthStore";
import ButtonApp from "@/components/buttons/ButttonApp/ButtonApp";
import InputFormLogin from "@/components/inputs/InputFormLogin/InputFormLogin";
import { getSession } from "next-auth/react";

interface EditUserModalProps {
  userId: string;
  onClose: () => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ userId, onClose }) => {
  const { users, setUsers, updateUser, setCurrentUser } = useUserStore();
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
      // Actualiza el usuario en el servidor
      await updateUser(userId, { name, email });

      // Actualiza el estado de los usuarios en el store
      setUsers(users.map((u) => (u.id === userId ? { ...u, name, email } : u)));

      // Actualiza el usuario actual en el store
      setCurrentUser({ ...user, name, email });

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
            <InputFormLogin
              label="Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <InputFormLogin
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setName(e.target.value)}
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
