import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id?: string;
    token?: string;
    role?: string;
  }
  interface Session {
    token?: string;
    role?: string;
    user: {
      id?: string;
      role?: string;
      token?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    token?: string;
    role?: string;
  }
}
