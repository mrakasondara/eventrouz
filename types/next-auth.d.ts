import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    accessToken?: string;
    role?: string;
  }
  interface Session {
    accessToken?: string;
    role?: string;
  }
}
