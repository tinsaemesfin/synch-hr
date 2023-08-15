   
import bcrypt from "bcrypt";
import NextAuth from "next-auth/next";
import { NextAuthOptions, RequestInternal,  User as UserType } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/mongoDB/mongodb";
import User from "@/mongoDB/User" ;
import dbConnect from "@/mongoDB/dbConnect";
import Tenant from "@/mongoDB/Tenant";
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise) ,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials){
        if (!credentials || !credentials.username || !credentials.password) {
          throw new Error("Invalid credentials credentials");
        }
        const { username, password } = credentials;

        await dbConnect();
        const user = await User.findOne({
          username,
        }); // Use the lean() method to return a plain JavaScript object

        if (!user) {
          throw new Error("Invalid credentials user + ");
        }
        const match = await bcrypt.compare(password, user.hashedPassword);
        if (!match) {
          throw new Error("Invalid credentials match");
        }   
        // console.log(user)     
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
      
      if(user)
      {
        return{
          ...token,
          _id: user._id,
          name: user.name,
          username: user.username,
          role: user.role,
          email: user.email,
          tenantId: user.tenantId,
          
          
        }
      }
     

      return token;
    },
    async session({ token, session, user }) {
     
      if (token) {
        // console.log(token)
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.username = token.username;
        session.user._id = token._id;
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
