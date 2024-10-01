import { IUser } from "@/interface/IUsers";

export const fetchCurrentUser = async (token: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error("Error en la respuesta de la API");
    }
  
    const data = await response.json();
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const userId = decodedToken.id;
  
    return data.find((user:IUser) => user.id === userId);
  };
  