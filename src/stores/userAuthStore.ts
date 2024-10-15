const API_URL = process.env.NEXT_PUBLIC_API_URL;

import { create } from "zustand";
import { IUser } from "@/interface/IUsers";

export interface IAuthState {
  user: IUser | null;
  token: string | null;
  login: (user: IUser, token: string) => void;
  logout: () => void;
  setUser: (user: IUser) => void;
  loadAuth: () => void; // Nueva función para cargar autenticación
  updateUser: (updatedUser: IUser) => Promise<void>; // Nueva función para actualizar usuario
}

export const useAuthStore = create<IAuthState>((set) => ({
  user: null,
  token: null,
  login: (user, token) => {
    if (user && token) {
      document.cookie = `authToken=${token}; path=/`; // Guardar token en cookie
      localStorage.setItem("authUser", JSON.stringify(user)); // Almacenar usuario en localStorage
      set({ user, token });
    }
  },
  logout: () => {
    document.cookie = 'authToken=; Max-Age=0; path=/'; // Eliminar cookie del token
    localStorage.removeItem("authUser"); // Eliminar usuario de localStorage
    set({ user: null, token: null });
  },
  setUser: (user) => set({ user }),
  loadAuth: () => {
    const storedUser = localStorage.getItem("authUser");
    const storedToken = localStorage.getItem("authToken");
    if (storedUser && storedToken) {
      set({ user: JSON.parse(storedUser), token: storedToken });
    }
  },
  updateUser: async (updatedUser) => {
    try {
      // Supongamos que tienes un endpoint para actualizar el usuario
      await fetch(`${API_URL}/users/${updatedUser.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(updatedUser),
      });

      // Actualizar estado y local storage
      set({ user: updatedUser });
      localStorage.setItem("authUser", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Error updating user:", error);
    }
  },
}));