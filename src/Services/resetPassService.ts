const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function requestOtp(email: string) {
  try {
    const response = await fetch(`${API_URL}/auth/request-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }), // DTO RequestOtp
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Error HTTP! status: ${response.status}, message: ${errorText}`
      );
    }

    
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return response.json(); 
    } else {
      return response.text();
    }
  } catch (error: any) {
    console.error("Error requesting OTP:", error);
    throw new Error(error.message);
  }
}

export async function resetPassword(formData: {
  email: string;
  otp: string;
  newPassword: string;
  confirmPassword: string;
}) {
  try {
    const response = await fetch(`${API_URL}/auth/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Error HTTP! status: ${response.status}, message: ${errorText}`
      );
    }

    // Verificamos el tipo de contenido para manejar texto o JSON
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return response.json(); // Si es JSON, lo parseamos
    } else {
      return response.text(); // Si es texto, lo devolvemos como texto
    }
  } catch (error: any) {
    console.error("Error resetting password:", error);
    throw new Error(error.message);
  }
}
