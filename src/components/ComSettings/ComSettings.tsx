"use client";
import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/userAuthStore";
import EditProfileModal from "@/components/Modals/ModalProfileUser/ModalProfileUser";
import InputFormLogin from "../inputs/InputFormLogin/InputFormLogin";
import AvatarUser from "../images/AvatarUser/AvatarUser";

const UserProfile = () => {
  const user = useAuthStore((state) => state.user);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      console.error("Datos del usuario no disponibles");
    } else {
      console.log("Datos del usuario cargados:", user);
    }
  });

  if (!user) return <div>Loading...</div>;

  return (
    <div className=" bg-white rounded-lg h-full shadow-lg">
      <div className=" bg-gradient-to-l from-[#ffeeb5]  to-primary p-6 pl-10 rounded-t-lg">
        <h1 className="text-2xl font-bold">Profile</h1>
      </div>
      <div className="flex justify-between px-10 pt-10">
        <div className="flex items-center ">
          <AvatarUser
            name={user.name}
            backgroundColor="bg-primary"
            textColor="text-white"
            size="lg"
            className="rounded-full mr-3"
          />
          <div>
            <p className="font-semibold">
              {user.name} {user.lastName}
            </p>
            <p className="text-sm text-gray-400">{user.email}</p>
          </div>
        </div>
        <div className="">
          <button
            className="mt-4 p-2 bg-primary text-white rounded"
            onClick={() => setModalOpen(true)}
          >
            Edit Profile
          </button>
          {isModalOpen && (
            <EditProfileModal user={user} onClose={() => setModalOpen(false)} />
          )}
        </div>
      </div>
      <div className="px-10 pt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4   lg:pb-3 lg:pt-8">
        <div className="">
          <InputFormLogin
            label="Name"
            type="text"
            name="name"
            disabled={true}
            onChange={(e) => e.target.value}
            value={user.name}
            inputClassName="bg-gray-100 p-2"
          />
        </div>
        <div className="">
          <InputFormLogin
            label="Last Name"
            type="text"
            name="name"
            disabled={true}
            onChange={(e) => e.target.value}
            value={user.lastName}
            inputClassName="bg-gray-100 p-2"
          />
        </div>
        <div className="">
          <InputFormLogin
            label="Email"
            type="text"
            name="name"
            disabled={true}
            onChange={(e) => e.target.value}
            value={user.email}
            inputClassName="bg-gray-100 p-2"
          />
        </div>
        <div className="">
          <InputFormLogin
            label="Birth Day"
            type="text"
            name="name"
            disabled={true}
            onChange={(e) => e.target.value}
            value={user.birthDay}
            inputClassName="bg-gray-100 p-2"
          />
        </div>
      </div>
      <div className=" px-10">
        <p> Password</p>
        <button className="bg-gray-800 rounded-lg p-2 py-2 mt-2 block text-md text-white">
          Change password
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
