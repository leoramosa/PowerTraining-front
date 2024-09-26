const API_URL = process.env.NEXT_PUBLIC_API_URL;
import {
  IRegisterProps,
  IUser,
  IUserFilters,
  IUserData,
} from "../interface/IUsers";

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

export async function getUsersDB(
  limit: number = 5,
  page: number = 1,
  filtersBy: IUserFilters = {}
): Promise<any> {
  let url = `${API_URL}/users`;

  const queryParams = new URLSearchParams();

  if (Object.keys(filtersBy).length > 0) {
    url += "/byFilters";
    // Solo agregar parámetros de filtro
    Object.entries(filtersBy).forEach(([key, value]) => {
      if (value) queryParams.append(key, encodeURIComponent(value));
    });
  } else {
    // Agregar parámetros de paginación solo si no hay filtros
    queryParams.append("limit", limit.toString());
    queryParams.append("page", page.toString());
  }

  url += `?${queryParams.toString()}`;

  console.log("Fetching users from:", url); // Log the URL being fetched

  try {
    const res = await fetch(url, { cache: "no-cache" });
    if (!res.ok) {
      throw new Error(`Error fetching users: ${res.status} ${res.statusText}`);
    }
    const resData = await res.json();
    console.log("Fetched users data:", resData);
    return resData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error in getUsersDB:", error);
      throw new Error(`Failed to get users: ${error.message}`);
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
}
// return { data, count: data.length };
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
