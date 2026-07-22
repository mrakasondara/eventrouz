import { EventsAPI } from "@/lib/services/api/events-api";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Laravel Auth Sanctum",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const { email, password } = credentials;

        if (!email || !password) return null;

        const user = {
          email,
          password,
        };

        const response = await EventsAPI.login(user);

        if (response.success) {
          return {
            id: response.data.id,
            name: response.data.id,
            email: response.data.email,
            role: response.data.role,
            accessToken: response.data.token,
          };
        }

        return null;
      },
    }),
  ],
  secret: process.env.NEXT_AUTHSECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.role = user.role;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken as string;
        session.role = token.role as string;
        session.user?.email = token.email;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
  },
};

console.log("NEXTAUTH_SECRET:", process.env.NEXT_AUTHSECRET);

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
