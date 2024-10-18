// EditProfileModal.tsx
import { useState } from "react";
import { IUser } from "@/interface/IUsers";
import { useAuthStore } from "@/stores/userAuthStore";
import { IoIosCloseCircleOutline } from "react-icons/io";
import InputFormLogin from "@/components/inputs/InputFormLogin/InputFormLogin";

interface Props {
  user: IUser;
  onClose: () => void;
}

const ModalProfileUser: React.FC<Props> = ({ user, onClose }) => {
  const [name, setFirstName] = useState(user.name);
  const [lastName, setLastName] = useState(user.lastName);
  const [birthDay, setBirthDay] = useState(user.birthDay);
  const [email, setEmail] = useState(user.email);
  const updateUser = useAuthStore((state) => state.updateUser);

  const handleSave = async () => {
    const updatedUser = { ...user, name, lastName, birthDay, email };
    await updateUser(updatedUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center">
      <div className="bg-[#23242c] rounded-3xl text-white w-3/4 lg:w-2/5">
        <div className=" flex justify-between items-center py-5 px-5 border-b border-gray-600">
          <h2 className="text-xl font-bold">Profile </h2>
          <IoIosCloseCircleOutline
            onClick={onClose}
            className="text-3xl text-gray-600 hover:bg-slate-400 hover:text-white rounded-full cursor-pointer"
          />
        </div>
        <div className="px-5 flex pt-5">
          <div className="w-1/2 mr-2">
            <InputFormLogin
              inputClassName="block border border-gray-600 p-2 my-2 w-full bg-[#23242c] text-white rounded-xl"
              type="text"
              label="Name"
              labelClassName="text-md"
              required={true}
              value={name}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Name"
            />
          </div>
          <div className="w-1/2 ml-2">
            <InputFormLogin
              inputClassName="block border border-gray-600 p-2 my-2 w-full bg-[#23242c] text-white rounded-xl"
              type="text"
              required={true}
              label="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
            />
          </div>
        </div>
        <div className="px-5 flex pt-5">
          <div className="w-1/2 mr-2">
            <InputFormLogin
              inputClassName="block border border-gray-600 p-2 my-2 w-full bg-[#23242c] text-white rounded-xl"
              type="text"
              label="Email"
              required={true}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          <div className="w-1/2 ml-2">
            <InputFormLogin
              label="Birth day"
              required={true}
              inputClassName="block border border-gray-600 p-2 my-2 w-full bg-[#23242c] text-white rounded-xl"
              type="date"
              value={birthDay}
              onChange={(e) => setBirthDay(e.target.value)}
              placeholder="Cumpleaños"
            />
          </div>
        </div>

        <div className="text-right  px-5 pb-5">
          <button
            className="mt-4 py-2 px-6 ml-2 bg-dark text-white rounded-lg"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="mt-4 py-2 px-6 ml-2 bg-primary text-black rounded-lg"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalProfileUser;
