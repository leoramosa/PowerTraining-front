// userService.ts
import { useAuthStore } from "../stores/userAuthStore";
import { IUser } from "@/interface/IUsers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const updateUser = async (id: string, updatedUser: Partial<IUser>) => {
  try {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      body: JSON.stringify(updatedUser),
    });

    if (response.ok) {
      const updatedUserData: IUser = await response.json();
      console.log(
        "Datos actualizados del usuario desde la API:",
        updatedUserData
      );

      // Actualiza el estado global
      useAuthStore.getState().setUser(updatedUserData);

      // Actualiza el localStorage
      localStorage.setItem("authUser", JSON.stringify(updatedUserData));
      const authUserFromStorage = localStorage.getItem("authUser");
      console.log(
        "Datos en el localStorage después de actualizar:",
        authUserFromStorage
      );

      const updatedUserInStore = useAuthStore.getState().user;
      console.log("Datos en el store después de setUser:", updatedUserInStore);

      if (!updatedUserInStore || !updatedUserInStore.name) {
        console.error("Datos no actualizados en el store");
      }
    } else {
      console.error("Error al actualizar los datos del usuario");
    }
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
  }
};
