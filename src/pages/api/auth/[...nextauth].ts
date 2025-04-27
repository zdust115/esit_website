// pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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
          return { id: 1, name: "Admin Mock" };
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
