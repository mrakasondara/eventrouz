import { EventsAPI } from "@/lib/services/api/events-api";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { setAccessToken } from "@/lib/services/auth/auth";

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
          await setAccessToken(response.data.token);
          return {
            id: response.data.user.id,
            name: response.data.user.name,
            email: response.data.user.email,
            role: response.data.user.role,
            image: response.data.user.image_profile || "/images/profile.webp",
          };
        }

        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
      }
      return token;
    },

    async session({ session, token }) {
      if (token && session) {
        session.user = {
          ...(session.user || {}),
          role: token.role as string,
          name: token.name as string,
          email: token.email as string,
          image: token.image as string,
        };
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

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
