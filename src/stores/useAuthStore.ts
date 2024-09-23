import { create } from "zustand";
import { IUser } from "@/interface/IUsers";
import { updateUserById } from "@/Services/userService";

// export const useAuthStore = create<IAuthState>((set) => ({
//   user: null,
//   login: (user: IUser) => set({ user }),
//   logout: () => set({ user: null }),
// }));

interface IUserState {
  users: IUser[];
  setUsers: (users: IUser[]) => void;
  updateUser: (id: string, updatedUser: Partial<IUser>) => Promise<void>;
}

export const useUserStore = create<IUserState>((set) => ({
  users: [],
  setUsers: (users) => {
    console.log("Setting users in store:", users); // Log to verify users are being set
    set({ users });
  },
  updateUser: async (id, updatedUser) => {
    try {
      set((state) => {
        const updatedUsers = state.users.map((user) =>
          user.id === id ? { ...user, ...updatedUser } : user
        );
        return { users: updatedUsers };
      });

      const updatedUserData = await updateUserById(id, updatedUser);

      set((state) => {
        const updatedUsers = state.users.map((user) =>
          user.id === id ? { ...user, ...updatedUserData } : user
        );
        return { users: updatedUsers };
      });
    } catch (error) {
      console.error("Error updating user:", error);
    }
  },
}));
