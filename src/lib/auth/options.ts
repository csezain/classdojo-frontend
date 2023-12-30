import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { session } from "@/lib/auth/session";
import connectDB from "../database/connectToDb";
import Users from "../database/models/users.model";
import bcrypt from "bcrypt";

type Credentials = Record<"email" | "password", string>;

export const AuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (
        credentials: Credentials | undefined
      ): Promise<User | null> => {
        if (!credentials) {
          throw new Error(`invalid credentials`);
        }
        await connectDB();
        const { email, password } = credentials;

        const user = await Users.findOne({ email });

        if (!user || !bcrypt.compareSync(password, user.password)) {
          throw new Error("password mismatch");
        }

        if (!user.verified) {
          throw new Error("not verified");
        }

        return user;
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
  pages: {
    signIn: "/auth/signin",
    // signOut: "/auth/signout",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ account, profile, email: oemail }) {
      if (account?.provider === "credentials") return true;

      if (account?.provider === "google") {
        const { sub, name, email, picture, email_verified } = profile as {
          sub: string;
          name: string;
          email: string;
          picture: string;
          email_verified: boolean;
        };

        await connectDB();

        try {
          const existingUser = await Users.findOne({ email });

          if (existingUser) {
            // Update user information if it already exists
            await Users.findOneAndUpdate(
              { email },
              { name, image: picture, verified: !!email_verified || false }
            );
          } else {
            // Create a new user if it doesn't exist
            const newUser = new Users({
              google_id: sub,
              name,
              image: picture,
              email,
              verified: !!email_verified,
              type: "google",
            });
            await newUser.save();
          }

          return true;
        } catch (error: any) {
          console.error("Error during signIn:", error);
          throw new Error("Error during signIn");
        }
      }

      return false;
    },
    async jwt({ user, token, account, profile }) {
      if (user?.id) {
        token.id = user.id;
      }
      return token;
    },
    session,
  },
};
