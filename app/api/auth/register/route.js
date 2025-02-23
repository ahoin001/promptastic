import User from "@models/user";
import { hash } from "bcrypt";
import { connectToDatabase } from "@utils/database";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, username, password } = await request.json();

    const errors = {};

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = "Invalid email";
    }

    if (!username || username.length < 3) {
      errors.username = "Username must be at least 3 characters";
    }

    if (!password || password.length < 3) {
      errors.password = "Password must be at least 3 characters";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

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

    await newUser.save();

    return NextResponse.json({ message: "Account created" }, { status: 200 });
  } catch (e) {
    console.log({ e });
  }

  return NextResponse.json({ message: "Account registered successfully" });
}
