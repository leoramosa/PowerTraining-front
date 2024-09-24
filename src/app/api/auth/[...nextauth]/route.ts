import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        const response = await axios.post(
          "http://localhost:3003/auth/signin-provider",
          {
            provider: account.provider,
            providerId: account.id || profile.sub,
            email: profile.email,
            name: profile.name,
          }
        );

        const { token } = response.data; // Recibe el token del backend

        if (typeof window !== "undefined") {
          // Asegúrate de que el código se ejecute en el lado del cliente
          localStorage.setItem("authToken", token);
        }

        return true; // Permite el inicio de sesión
      } catch (error) {
        console.error("Error sending data to backend:", error);
        return false; // Cancela el inicio de sesión si hay un error
      }
    },
    async session({ session, token }) {
      // Incluye el token en la sesión
      session.accessToken = token;
      return session;
    },
  },
  events: {
    async signIn(message) {
      console.log("User signed in:", message);
    },
    async signOut(message) {
      console.log("User signed out:", message);
    },
  },
});

export { handler as GET, handler as POST };
