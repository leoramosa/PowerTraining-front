import { create } from "zustand";
import { IAuthState, IUser } from "@/interface/IUsers";
import { updateUserById } from "@/Services/userService";

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

interface IUserState {
  users: IUser[];
  currentUser: IUser | null;
  setCurrentUser: (user: IUser) => void;
  setUsers: (users: IUser[]) => void;
  updateUser: (id: string, updatedUser: Partial<IUser>) => Promise<void>;
}

export const useUserStore = create<IUserState>((set) => ({
  users: [],
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),
  setUsers: (users) => {
    console.log("Setting users in store:", users); // Log to verify users are being set
    set({ users });
  },
  updateUser: async (id, updatedUser) => {
    const response = await updateUserById(id, updatedUser);
    set((state) => ({
      users: state.users.map((u) =>
        u.id === id ? { ...u, ...updatedUser } : u
      ),
      currentUser:
        state.currentUser?.id === id
          ? { ...state.currentUser, ...updatedUser }
          : state.currentUser,
    }));
  },
}));
