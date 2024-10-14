/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// types/next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

// Extender el tipo de `Session`
declare module "next-auth" {
  interface Session {
    accessToken: string;
    authTokenProvider?: string;
    user: {
      id: any;
      name: string;
      email: string;
      image: string;
      lastName: string;
      birthDay: string;
      password: string;
      role: "Admin" | "User";

      // Aquí puedes agregar propiedades personalizadas
      backendToken?: string;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      userData?: any;
    };
  }

  interface User extends DefaultUser {
    backendToken?: string;
    userData?: any;
  }

  // Extender el tipo de `JWT`
  interface JWT {
    backendToken?: string;
    userData?: any;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    backendToken?: string;
    userData?: any;
  }
}
