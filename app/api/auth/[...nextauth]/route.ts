import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "../../../utils/mongodb";
import UserModel from "../../models/user";

export const authOptions: AuthOptions = {
  providers: [
    // Google Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),

    // Credentials Provider
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        await dbConnect();

        // Check if the user exists
        const user = await UserModel.findOne({ email: credentials.email });
        if (!user) {
          throw new Error("User not found");
        }

        // Compare the plain password (for testing only)
        if (credentials.password !== user.passwordHash) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, account, profile, user }) {
      // If the user is signing in with Google
      if (account?.provider === "google") {
        await dbConnect();

        // Check if user exists in the database
        const existingUser = await UserModel.findOne({ email: profile?.email });

        if (!existingUser) {
          // Create a new user in the database
          const newUser = new UserModel({
            name: profile?.name,
            email: profile?.email,
            passwordHash: "", // No password for Google sign-in
            createdAt: new Date(),
          });

          await newUser.save();
        }

        token.id = user?.id || existingUser?._id.toString();
        token.email = profile?.email;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          email: token.email,
          name: session.user.name,
        };
      }
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
