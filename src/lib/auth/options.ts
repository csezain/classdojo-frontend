import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvier from "next-auth/providers/google";
import { session } from "@/lib/auth/session";

export const AuthOptions:NextAuthOptions = {
    providers: [
      GoogleProvier({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      }),
    ],
    session: {
      strategy: "jwt",
    },
    callbacks: {
      async signIn({ account, profile }) {
        if (!profile?.email) {
          throw new Error("Please enter your email address");
        }
  
        console.log(profile, "IN [...NEXTAUTH]");
  
        return true;
      },
      session,
      async jwt({ user, token, account, profile }) {
        console.log(user, "IN USER");
        
        token.id = user.id;
        return token;
      },
    },
  }