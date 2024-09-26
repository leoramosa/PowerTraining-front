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
      // Enviar datos al backend
      try {
        await axios.post("http://localhost:3002/auth/signin-provider", {
          provider: account.provider,
          providerId: profile.id,
          email: profile.email,
          name: profile.name,
        });
      } catch (error) {
        console.error("Error sending data to backend:", error);
        return false; // Cancela el inicio de sesión si hay un error
      }
      return true; // Permite el inicio de sesión
    },
  },
});

export { handler as GET, handler as POST };
