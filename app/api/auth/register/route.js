import User from "@models/user";
import { hash } from "bcrypt";
import { connectToDatabase } from "@utils/database";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Validate email and password
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    console.log({ email, password });
    await connectToDatabase();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // // Create a new user
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    // // Save the user to the database
    await newUser.save();
  } catch (e) {
    console.log({ e });
  }

  return NextResponse.json({ message: "success" });
}
