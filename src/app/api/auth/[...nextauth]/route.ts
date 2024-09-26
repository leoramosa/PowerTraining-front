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
    async signIn({ account, profile, user }) {
      if (account.provider === "google") {
        const userData = {
          provider: account.provider,
          providerId: account.id || profile.sub,
          email: profile.email,
          name: profile.name,
        };

        console.log("Datos obtenidos de Google:", userData);

        // Enviar los datos al backend
        const res = await fetch("http://localhost:3003/auth/signin-provider", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });

        const backendResponse = await res.json();

        console.log("Respuesta del backend:", backendResponse);

        // Si la respuesta es exitosa, continuar con el login
        if (res.ok && backendResponse.token) {
          // Pasar el token y userData del backend a NextAuth
          user.backendToken = backendResponse.token;
          user.userData = backendResponse.userData;
          return true;
        } else {
          return false;
        }
      }
      return false;
    },

    async jwt({ token, user }) {
      // Solo agregar el token y userData si es la primera vez que el usuario inicia sesión
      if (user) {
        token.backendToken = user.backendToken;
        token.userData = user.userData;
      }

      return token;
    },

    async session({ session, token }) {
      // Agregar los datos del backend a la sesión
      session.backendToken = token.backendToken; // El token que recibiste del backend
      session.user = {
        ...session.user,
        ...token.userData, // Agregar los datos del usuario que recibiste del backend
      };

      return session;
    },
  },
});

export { handler as GET, handler as POST };
