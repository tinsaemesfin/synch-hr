import NextAuth, { User } from "next-auth";

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    role: string;
    username: string;
    email: string;
    tenantId: string;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: string;
      name: string;
      role: string;
      username: string;
      email: string;
      tenantId: string ;
    };
  }
}
