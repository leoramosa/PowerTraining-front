import { create } from "zustand";
import { IUser } from "@/interface/IUsers";
import { updateUserById } from "@/Services/userService";

export interface IAuthState {
  user: IUser | null;
  token: string | null;
  login: (user: IUser, token: string) => void;
  logout: () => void;
  updateUser: (updatedUser: Partial<IUser>) => Promise<void>;
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

  updateUser: async (updatedUser: Partial<IUser>) => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("authUser") || "{}");
      if (!currentUser || !currentUser.id) {
        throw new Error("No user is currently logged in.");
      }

      const updatedUserData = await updateUserById(currentUser.id, updatedUser);

      set((state) => {
        const newUser = { ...state.user, ...updatedUserData };
        localStorage.setItem("authUser", JSON.stringify(newUser));
        return { user: newUser };
      });
    } catch (error) {
      console.error("Error updating user:", error);
    }
  },
}));