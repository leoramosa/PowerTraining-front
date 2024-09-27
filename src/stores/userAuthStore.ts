import { create } from "zustand";
import { IAuthState } from "@/interface/IUsers";

export const useAuthStore = create<IAuthState>((set) => ({
  user: null,
  token: null,

  login: (user, token) => {
    localStorage.setItem("authUser", JSON.stringify(user));
    localStorage.setItem("authToken", token);
    set({ user, token });
  },
  logout: () => {
    localStorage.removeItem("authUser");
    localStorage.removeItem("authToken");
    set({ user: null, token: null });
  },
}));
