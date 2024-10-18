// const API_URL = process.env.NEXT_PUBLIC_API_URL;
// import { IRegisterProps, IUser, IUserFilters } from "../interface/IUsers";

// export async function createUser(userData: IRegisterProps) {
//   const response = await fetch(`${API_URL}/users`, {
//     cache: "no-cache",
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(userData),
//   });

//   if (!response.ok) {
//     throw new Error("Error al crear usuario");
//   }

//   return response.json();
// }

// export async function getAllUsers(
//   page: number = 1,
//   limit: number = 10,
//   filters: IUserFilters = {}
// ): Promise<{ data: IUser[]; count: number }> {
//   // Crear los parámetros de consulta
//   const queryParams = new URLSearchParams({
//     page: page.toString(),
//     limit: limit.toString(),
//     ...filters,
//   });

//   // Determinar la URL en función de si hay filtros
//   const hasFilters = Object.values(filters).some(
//     (value) => value !== undefined && value !== ""
//   );
//   const url = hasFilters
//     ? `${API_URL}/users/byFilters?${queryParams}`
//     : `${API_URL}/users?${queryParams}`;

//   const response = await fetch(url, {
//     cache: "no-cache",
//     method: "GET",
//   });

//   if (!response.ok) {
//     throw new Error("Error al obtener usuarios");
//   }

//   const result = await response.json();
//   console.log("Users fetched from API:", result);
//   return result;
// }

// export const getUserById = async (id: string) => {
//   const response = await fetch(`${API_URL}/users/${id}`, {
//     method: "GET",
//   });

//   if (!response.ok) {
//     throw new Error("Error al obtener el usuario");
//   }

//   return response.json();
// };

// export const updateUserById = async (
//   id: string,
//   updatedUser: Partial<IUser>
// ) => {
//   const response = await fetch(`${API_URL}/users/${id}`, {
//     cache: "no-cache",
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(updatedUser),
//   });

//   if (!response.ok) {
//     throw new Error("Failed to update user");
//   }

//   const updatedUserData = await response.json();
//   console.log("Updated user data received:", updatedUserData);
//   return updatedUserData;
// };

// export const deleteUser = async (id: string) => {
//   const response = await fetch(`${API_URL}/users/${id}`, {
//     method: "DELETE",
//   });

//   if (!response.ok) {
//     throw new Error("Error al eliminar usuario");
//   }

//   return response.json();
// };

// export async function getAllUsers(
//   limit: number = 5,
//   page: number = 1,
//   filtersBy: IUserFilters = {}
// ): Promise<IUser[]> {
//   //const res = await fetch(`${APIURL}/exercises?${ filtersBy ? "name="+filtersBy?.name+"&benefits="+filtersBy?.benefits+"&tags="+filtersBy?.tags  : null }limit=${limit}&page=${page}`,  {cache: "no-cache"})
//   let url = `${API_URL}/users?`;

//   if (filtersBy) {
//     const { name, email, isAdmin, lastName, birthday } = filtersBy;
//     const queryParams = new URLSearchParams();
//     if (name) queryParams.append("name", encodeURIComponent(name));
//     if (email) queryParams.append("email", encodeURIComponent(email));
//     if (isAdmin) queryParams.append("isAdmin", encodeURIComponent(isAdmin));
//     if (lastName) queryParams.append("lastName", encodeURIComponent(lastName));
//     if (birthday) queryParams.append("birthday", encodeURIComponent(birthday));
//     url += `&${queryParams.toString()}&limit=${limit}&page=${page}`;
//   } else {
//     url += `limit=${limit}&page=${page}`;
//   }

//   console.log(url);

//   try {
//     const res = await fetch(url, { cache: "no-cache" });
//     if (!res.ok) {
//       throw new Error(
//         `Error fetching exercises: ${res.status} ${res.statusText}`
//       );
//     }
//     const resData = await res.json();
//     return resData;
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       console.error("Error in getExercisesDB:", error);
//       throw new Error(`Failed to get exercises: ${error.message}`);
//     } else {
//       console.error("Unexpected error:", error);
//       throw new Error("An unexpected error occurred");
//     }
//   }
// }
