export const fetchCurrentUser = async (token: string) => {
    const response = await fetch("http://localhost:3000/users", {
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
  
    return data.find(user => user.id === userId);
  };
  