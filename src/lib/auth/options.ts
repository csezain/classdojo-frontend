import NextAuth, { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { session } from "@/lib/auth/session";
import connectDB from "../database/connectToDb";
import Users from "../database/models/users.model";

// Define a type for the credentials parameter
type Credentials = Record<"username" | "password", string>;

export const AuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (
        credentials: Credentials | undefined,
        req: any
      ): Promise<User | null> => {
        // Validate credentials, for example, check against your database
        if (!credentials) {
          return null;
        }

        const { username, password } = credentials;

        // Validate login credentials
        const user = await Users.findOne({ email: username, password });

        return user || null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
  },
  callbacks: {
    async signIn({ account, profile }) {
      console.log(account, "Account");

      if (!profile?.email) {
        throw new Error("Please enter your email address");
      }

      const { sub, name, email, image } = profile;

      await connectDB();

      try {
        const existingUser = await Users.findOne({ email });

        if (existingUser) {
          await Users.findOneAndUpdate(
            { email },
            { id: sub, name, image, type: "google" }
          );
        } else {
          const newUser = new Users({
            id: sub,
            name,
            image,
            email,
            type: "google",
          });
          await newUser.save();
        }

        return true;
      } catch (error) {
        console.error("Error during signIn:", error);
        throw new Error("Error during signIn");
      }
    },
    async jwt({ user, token, account, profile }) {
      // console.log(user, "IN JWT CB");

      if (user?.id) {
        token.id = user.id;
      }
      return token;
    },
    session,
  },
};
