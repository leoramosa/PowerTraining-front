import { ILoginProps } from "@/interface/ILogin";

export async function login(userData: ILoginProps) {
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  
      if (response.ok) {
        alert("Login successful");
        
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    } catch (error: any) {
      alert(error.message);
    }
  }