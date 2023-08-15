import NextAuth, { User } from "next-auth";

declare module "next-auth/jwt" {
  interface JWT {
    _id: ObjectId;
    name: string;
    role: string;
    username: string;
    email: string;
    tenantId: ObjectId;
  }
}

declare module "next-auth" {
  interface Session {
      user:{_id: ObjectId;
      name: string;
      role: string;
      username: string;
      email: string;
      tenantId: ObjectId 
    
    };
  }
  interface User {
    _id: ObjectId;
    name: string;
    role: string;
    username: string;
    email: string;
    tenantId: ObjectId;

  
  }
}
