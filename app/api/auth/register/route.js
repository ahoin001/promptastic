import User from "@models/user";
import { hash } from "bcrypt";
import { connectToDatabase } from "@utils/database";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, username, password } = await request.json();

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

    const hashedPassword = await hash(password, 10);

    const newUser = new User({
      email,
      username,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    return NextResponse.json({ message: "Account created" }, { status: 200 });
  } catch (e) {
    console.log({ e });
  }

  return NextResponse.json({ message: "Account registered successfully" });
}
