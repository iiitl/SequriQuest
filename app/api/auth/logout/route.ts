import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: 'Logged out successfully'
  });
  
  response.cookies.set('jwt', '', { 
    httpOnly: true,
    expires: new Date(0),
    path: '/'
  });
  
  return response;
}