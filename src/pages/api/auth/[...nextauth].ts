// pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { User } from "next-auth"; // Import the User type

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        user: { label: "Utente", type: "text", placeholder: "admin" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // MOCK: accettiamo solo admin/secret
        if (
          credentials?.user === "admin" &&
          credentials?.password === "admin"
        ) {
          // Return an object that matches the User type
          return { id: "1", name: "Admin Mock", email: "admin@example.com" };
        }
        // altrimenti NextAuth restituisce null → login fallito
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
});
