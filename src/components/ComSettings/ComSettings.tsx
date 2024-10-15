"use client";
import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/userAuthStore";
import EditProfileModal from "@/components/Modals/ModalProfileUser/ModalProfileUser";

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
    <div className="p-4">
      <h1 className="text-2xl font-bold">Perfil de Usuario</h1>
      <p>
        <strong>Nombre:</strong> {user.name}
      </p>
      <p>
        <strong>Apellido:</strong> {user.lastName}
      </p>
      <p>
        <strong>Cumpleaños:</strong> {user.birthDay}
      </p>
      <button
        className="mt-4 p-2 bg-blue-500 text-white rounded"
        onClick={() => setModalOpen(true)}
      >
        Editar Perfil
      </button>
      {isModalOpen && (
        <EditProfileModal user={user} onClose={() => setModalOpen(false)} />
      )}
    </div>
  );
};

export default UserProfile;
