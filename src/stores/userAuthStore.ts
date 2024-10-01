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
      localStorage.setItem("authUser", JSON.stringify(user));
      localStorage.setItem("authToken", token);
      set({ user, token });
    }
  },
  logout: () => {
    localStorage.removeItem("authUser");
    localStorage.removeItem("authToken");
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
