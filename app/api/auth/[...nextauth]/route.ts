import bcrypt from "bcrypt";
import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "@/libs/server-helpers";
import prismadb from "@/Prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prismadb),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.username || !credentials.password) {
          throw new Error("Invalid credentials");
        }
        const { username, password } = credentials;

        await connectToDatabase();
        const user = await prismadb.user.findFirst({
          where: {
            username,
          },
        });
        if (!user) {
          throw new Error("Invalid credentials");
        }
        const match = await bcrypt.compare(password, user.hashedPassword);
        if (!match) {
          throw new Error("Invalid credentials");
        }
        await prismadb.$disconnect();
        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      await connectToDatabase();
      let authUser = null;
      try {
        authUser = await prismadb.user.findFirst({
          where: {
            username: token.username,
          },
        });
      } catch (e) {
        console.log(e);
      } finally {
        await prismadb.$disconnect();
      }

      if (authUser) {
        return {
          id: authUser.id,
          name: authUser.name,
          username: authUser.username,
          role: authUser.role,
          email: authUser.email,
          tenantId: authUser.tenantId,
        };
      }

      return token;
    },
    async session({ token, session, user }) {
      if (token) {
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.username = token.username;
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.tenantId = token.tenantId;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
