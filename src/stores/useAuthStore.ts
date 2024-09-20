import { create } from "zustand";
import { IUser, IAuthState } from "@/interface/users";
import { updateUserById } from "@/Services/userService";

export const useAuthStore = create<IAuthState>((set) => ({
  user: null,
  login: (user: IUser) => set({ user }),
  logout: () => set({ user: null }),
}));

interface IUserState {
  users: IUser[];
  setUsers: (users: IUser[]) => void;
  updateUser: (id: string, updatedUser: Partial<IUser>) => Promise<void>;
}

export const useUserStore = create<IUserState>((set) => ({
  users: [],
  setUsers: (users) => {
    console.log("Setting users in store:", users);
    set({ users });
  },
  updateUser: async (id, updatedUser) => {
    try {
      const updatedUserData = await updateUserById(id, updatedUser);
      console.log("Updated user data received:", updatedUserData);

      set((state) => {
        const updatedUsers = state.users.map((user) =>
          user.id === id ? { ...user, ...updatedUserData } : user
        );
        console.log("Updated users state:", updatedUsers);
        return { users: updatedUsers };
      });
    } catch (error) {
      console.error("Error updating user:", error);
    }
  },
}));
