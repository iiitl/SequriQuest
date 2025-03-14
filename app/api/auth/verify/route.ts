import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const jwtCookie = cookieStore.get('jwt')?.value;
    
    if (!jwtCookie) {
      return NextResponse.json({ isAuthenticated: false }, { status: 401 });
    }

    if (process.env.BACKEND_URL) {
      const response = await fetch(`${process.env.BACKEND_URL}/auth/verify`, {
        headers: {
          'Cookie': `jwt=${jwtCookie}`
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        return NextResponse.json({
          isAuthenticated: true,
          teamName: data.team_name
        });
      } else {
        return NextResponse.json({ isAuthenticated: false }, { status: 401 });
      }
    } else {
      try {
        const decoded = jwt.verify(jwtCookie, process.env.JWT_SECRET || "secret_bro_why_tell_u");
        
        // Define the payload interface
        interface JwtPayload {
          team_name?: string;
          teamName?: string;
        }
        
        // Extract team name from decoded JWT
        const payload = typeof decoded === 'string' ? {} as JwtPayload : decoded as JwtPayload;
        const teamName = payload.team_name || payload.teamName || "Team";
        
        return NextResponse.json({
          isAuthenticated: true,
          teamName
        });
      } catch (jwtError) {
        console.error('JWT verification failed:', jwtError);
        return NextResponse.json({ isAuthenticated: false }, { status: 401 });
      }
    }
  } catch (error) {
    console.error('Auth verification error:', error);
    return NextResponse.json({ isAuthenticated: false }, { status: 500 });
  }
}