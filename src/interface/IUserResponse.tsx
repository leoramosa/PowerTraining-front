interface IRoutine {
    id: number;
    name: string;
    description: string;
    startDate: string; // Se puede considerar Date si se convierte a objeto Date en el manejo
    endDate: string;   // Se puede considerar Date si se convierte a objeto Date en el manejo
    completed: boolean;
  }
  
  export interface IUserResponse {
    id: string;                    // UUID como string
    googleId: string | null;       // Google ID puede ser nulo
    providerId: string | null;     // ID del proveedor puede ser nulo
    provider: string | null;        // Proveedor puede ser nulo
    name: string;                  // Nombre del usuario
    lastName: string;              // Apellido del usuario
    birthDay: string;              // Fecha de nacimiento en formato 'YYYY-MM-DD'
    role: string;                  // Rol del usuario (ej. "User")
    email: string;                 // Correo electrónico
    password: string;              // Contraseña (almacenada de manera segura)
    isSubscribed: boolean;         // Estado de suscripción
    subscriptionEndDate: string;   // Fecha de finalización de la suscripción en formato 'YYYY-MM-DD'
    resetOtp: string | null;       // OTP para restablecer puede ser nulo
    otpExpiresAt: string | null;   // Fecha de expiración del OTP puede ser nulo
    lastMessageTimestamp: string | null; // Timestamp del último mensaje puede ser nulo
    routines: IRoutine[];          // Array de rutinas
  }
  