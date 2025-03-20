import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { team_name, email, password } = body;

    const { db } = await connectToDatabase();

    const existingUser = await db.collection("users").findOne({
      $or: [{ team_name }, { email }, { username: team_name }]
    });

    if (existingUser) {
      return NextResponse.json({
        success: false,
        message: existingUser.email === email 
          ? "Email already in use" 
          : "Team name already taken"
      }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.collection("users").insertOne({
      team_name,
      email,
      username: team_name, // Add username field set to the same value as team_name
      password: hashedPassword,
      created_at: new Date()
    });

    return NextResponse.json({
      success: true,
      message: "Registration successful"
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({
      success: false,
      message: 'An unexpected error occurred'
    }, { status: 500 });
  }
}