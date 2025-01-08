import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import dbConnect from "../../utils/mongodb";
import UserModel from "../models/user";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    await dbConnect();

    // Check if the user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Hash the password before saving
    const passwordHash = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new UserModel({
      name,
      email,
      passwordHash,
    });

    await newUser.save();

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Signup Error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
