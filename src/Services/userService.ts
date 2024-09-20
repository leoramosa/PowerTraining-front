const API_URL = process.env.NEXT_PUBLIC_API_URL;
import { IRegisterProps, IUser } from "../interface/users";

export async function createUser(userData: IRegisterProps) {
  const response = await fetch(`${API_URL}/users`, {
    cache: "no-cache",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Error al crear usuario");
  }

  return response.json();
}

export async function getAllUsers(): Promise<IUser[]> {
  const response = await fetch(`${API_URL}/users`, {
    cache: "no-cache",
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Error al obtener usuarios");
  }

  return response.json();
}

export const getUserById = async (id: string) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Error al obtener el usuario");
  }

  return response.json();
};

export const deleteUser = async (id: string) => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error al eliminar usuario");
  }

  return response.json();
};
