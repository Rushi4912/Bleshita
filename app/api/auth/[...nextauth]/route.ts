// pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "../../../utils/mongodb";
import UserModel from "../../models/user"; // Ensure this path is correct

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        firstName: { label: "First Name", type: "text" },
        lastName: { label: "Last Name", type: "text" },
      },
      async authorize(credentials) {
        try {
          await dbConnect();

          // Check if the user exists (for login)
          const existingUser = await UserModel.findOne({ email: credentials?.email });
          if (existingUser) {
            // Compare plain text passwords (not secure, for testing purposes only)
            if (credentials?.password === existingUser.password) {
              return { id: existingUser._id, email: existingUser.email };
            } else {
              throw new Error("Invalid password.");
            }
          } else {
            // If the user doesn't exist, create a new user (sign-up)
            const newUser = new UserModel({
              firstName: credentials?.firstName,
              lastName: credentials?.lastName,
              email: credentials?.email,
              password: credentials?.password, // Store plain text password (for testing only)
            });

            await newUser.save();

            // Return user data to be saved in session
            return { id: newUser._id, email: newUser.email };
          }
        } catch (error) {
          throw new Error(error.message || "Authorization failed.");
        }
      },
    }),
  ],

  pages: {
    signIn: "/signin", // Custom sign-in page
    signUp: "/signup", // Optional: Define a custom sign-up page
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          email: token.email,
        };
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET, // Make sure this is set in your environment variables
});
