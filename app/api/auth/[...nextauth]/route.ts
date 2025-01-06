// pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "../../../utils/mongodb";
import UserModel from "../../models/user"; // Assuming you have the user model

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
        await dbConnect();

        // Check if the user exists (for login)
        const existingUser = await UserModel.findOne({ email: credentials?.email });
        if (existingUser) {
          // User exists, so we compare passwords for login
          const isMatch = await bcrypt.compare(credentials?.password || "", existingUser.password);
          if (isMatch) {
            return { id: existingUser._id, email: existingUser.email };
          }
        } else {
          // User doesn't exist, create a new user (sign-up)
          const hashedPassword = await bcrypt.hash(credentials?.password || "", 12);
          const newUser = new UserModel({
            firstName: credentials?.firstName,
            lastName: credentials?.lastName,
            email: credentials?.email,
            password: hashedPassword,
          });

          await newUser.save();

          // Return user data to be saved in session
          return { id: newUser._id, email: newUser.email };
        }
        return null; // If login fails, return null
      },
    }),
  ],

  pages: {
    signIn: "/signin", // Your custom sign-in page
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
        session.user.id = token.id;
        session.user.email = token.email;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, 
});
