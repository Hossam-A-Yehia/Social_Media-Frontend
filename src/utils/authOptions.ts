import CredentialsProvider from "next-auth/providers/credentials";

import { AuthOptions } from "next-auth";
import { API_URL } from "@/app/actions/action";

const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        const res = await fetch(`${API_URL}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });
        const data = await res.json();
        if (res.status === 200) {
          return data;
        }
        throw new Error(data.message) || null;
      },
    } as any),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      // Persist the OAuth access_token and or the user id to the token right after signin

      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    // ↓↓↓ add
    jwt: true as any,
    // ↑↑↑ add
  },
};
export const config = {
  api: {
    bodyParser: false,
  },
};

export default authOptions;
