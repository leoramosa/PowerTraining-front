const API_URL = process.env.NEXT_PUBLIC_API_URL;
import { IRegisterProps, IUser, IUserFilters } from "../interface/users";

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

export async function getAllUsers(
  limit: number = 5,
  page: number = 1,
  filtersBy: IUserFilters = {}
): Promise<{ data: IUser[]; totalPages: number }> {
  let url = `${API_URL}/users?limit=${limit}&page=${page}`;

  if (filtersBy) {
    const queryParams = new URLSearchParams();
    Object.entries(filtersBy).forEach(([key, value]) => {
      if (value) queryParams.append(key, encodeURIComponent(value));
    });
    url += `&${queryParams.toString()}`;
  }

  console.log("Fetching users from:", url);

  const response = await fetch(url, { cache: "no-cache" });

  if (!response.ok) {
    throw new Error(`Error fetching users: ${response.statusText}`);
  }

  const result = await response.json();
  return {
    data: result.data || [],
    totalPages: result.totalPages || 1, // Asegúrate de que la API devuelva el total de páginas
  };
}

export const getUserById = async (id: string) => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Error al obtener el usuario");
  }

  return response.json();
};

export const updateUserById = async (
  id: string,
  updatedUser: Partial<IUser>
) => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    cache: "no-cache",
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedUser),
  });

  if (!response.ok) {
    throw new Error("Failed to update user");
  }

  const updatedUserData = await response.json();
  console.log("Updated user data received:", updatedUserData);
  return updatedUserData;
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
