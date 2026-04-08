import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "203103939049-2ste634q2uc1io9oaup8gt35tsmucru0.apps.googleusercontent.com",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "SSO",
      credentials: {
        user: { label: "User Object", type: "text" },
      },
      async authorize(credentials) {
        if (credentials?.user) {
          try {
            const user = JSON.parse(credentials.user);
            return user;
          } catch (e) {
            console.error("Failed to parse user credentials", e);
            return null;
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        try {
          // Sync with backend using Google ID Token or Email
          const baseUrlProfile = process.env.NEXT_PUBLIC_BASE_URL + "/";
          const response = await fetch(`${baseUrlProfile}auth/google-login/customer`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: user.email }),
          });

          const data = await response.json();
          // Merge backend data into the user object
          Object.assign(user, data);
          return true;
        } catch (error) {
          console.error("Backend sync failed:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.accessToken = user.token || user.access; // Support both backend token formats
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = token.user;
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
