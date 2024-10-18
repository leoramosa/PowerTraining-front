import React, { useState, useEffect } from "react";
import { useUsersStore } from "@/stores/usersStore";
import ButtonApp from "@/components/buttons/ButtonApp/ButtonApp";
import InputFormLogin from "@/components/inputs/InputFormLogin/InputFormLogin";

interface EditUserModalProps {
  userId: string;
  onClose: () => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ userId, onClose }) => {
  const { users, setUsers, updateUser } = useUsersStore();
  const user = users.find((u) => u.id === userId);

  const [name, setName] = useState(user?.name || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.email || "");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setLastName(user.lastName);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUser(userId, { name, email, lastName });
      setUsers(
        users.map((u) =>
          u.id === userId ? { ...u, name, email, lastName } : u
        )
      );
      onClose();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  if (!user) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40">
      <div className="absolute w-1/5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#23242c] shadow-lg p-10 rounded-lg">
        <form onSubmit={handleSubmit}>
          <div className=" mr-2">
            <InputFormLogin
              inputClassName="block border border-gray-600 p-2 my-2 w-full bg-[#23242c] text-white rounded-xl"
              type="text"
              label="Name"
              labelClassName="text-md"
              required={true}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
          </div>
          <div className=" mr-2">
            <InputFormLogin
              inputClassName="block border border-gray-600 p-2 my-2 w-full bg-[#23242c] text-white rounded-xl"
              type="text"
              label="Last Name"
              labelClassName="text-md"
              required={true}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
            />
          </div>
          <div className=" mr-2">
            <InputFormLogin
              inputClassName="block border border-gray-600 p-2 my-2 w-full bg-[#23242c] text-white rounded-xl"
              type="text"
              label="Email"
              labelClassName="text-md"
              required={true}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
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
            <ButtonApp className="w-1/2" variant="login" type="submit">
              Save
            </ButtonApp>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
