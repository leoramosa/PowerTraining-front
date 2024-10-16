/* eslint-disable @typescript-eslint/no-explicit-any */
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getUserRoutines(userId: string) {
  try {
    const response = await fetch(`${API_URL}/routine/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Error HTTP! status: ${response.status}, message: ${errorText}`
      );
    }

    return await response.json(); // Retorna las rutinas del usuario
  } catch (error: any) {
    console.error("Error obteniendo las rutinas del usuario:", error);
    throw new Error(error.message);
  }
}
