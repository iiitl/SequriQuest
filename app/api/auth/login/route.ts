import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    const { db } = await connectToDatabase();

    // Find user by team_name
    const user = await db.collection("users").findOne({ team_name: username });
    
    if (!user) {
      return NextResponse.json({
        success: false,
        message: "Invalid username or password"
      }, { status: 401 });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({
        success: false,
        message: "Invalid username or password"
      }, { status: 401 });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, teamName: user.team_name },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '7d' }
    );

    // Set JWT cookie
    const cookieStore = await cookies();
    cookieStore.set('jwt', token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 1 week in seconds
      path: '/'
    });
    
    return NextResponse.json({
      success: true,
      teamName: user.team_name,
      message: 'Logged in successfully'
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({
      success: false,
      message: 'An unexpected error occurred'
    }, { status: 500 });
  }
}