import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "@/lib/mongodb";

const challengePoints: Record<string, number> = {
  "c1": 50,
  "c2": 75,
  "c3": 100,
  "c4": 50,
  "c5": 75,
  "c6": 100,
  "c7": 50,
  "c8": 75,
  "c9": 100,
  "c10": 75
};

async function verifyAuthentication() {
  try {
    const cookieStore = await cookies();
    const jwtCookie = cookieStore.get('jwt')?.value;
    
    if (!jwtCookie) {
      return { isAuthenticated: false, username: null };
    }
    
    if (process.env.BACKEND_URL) {
      const response = await fetch(`${process.env.BACKEND_URL}/auth/verify`, {
        headers: {
          'Cookie': `jwt=${jwtCookie}`
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        return {
          isAuthenticated: true,
          username: data.teamName
        };
      }
    } else {
      try {
        interface JWTPayload {
          team_name?: string;
          teamName?: string;
        }
        
        const decoded = jwt.verify(jwtCookie, process.env.JWT_SECRET || "secret");
        const payload = typeof decoded === 'object' ? decoded as JWTPayload : {};
        const username = payload.team_name || payload.teamName || "Team";
        
        return {
          isAuthenticated: true,
          username
        };
      } catch (jwtError) {
        console.error('JWT verification failed:', jwtError);
      }
    }
    
    return { isAuthenticated: false, username: null };
  } catch (error) {
    console.error('Auth verification error:', error);
    return { isAuthenticated: false, username: null };
  }
}

export async function POST(req: NextRequest) {
  try {
    const { challengeId, flag }: { challengeId: string, flag: string } = await req.json();
    const { isAuthenticated, username } = await verifyAuthentication();
    
    if (!isAuthenticated) {
      return NextResponse.json({ success: false, message: 'Not authenticated' }, { status: 401 });
    }
    
    const correctFlag = process.env[challengeId];
    if (!correctFlag) {
      return NextResponse.json({ success: false, message: 'Challenge not found' }, { status: 404 });
    }
    
    if (flag === correctFlag) {
      const points = challengePoints[challengeId] || 0;
      const timestamp = new Date().toISOString();
      
      try {
        const { db } = await connectToDatabase();
        const leaderboardCollection = db.collection('userProgress');
        const user = await leaderboardCollection.findOne({ username });
        // console.log(user)
        if (!user) {
          await leaderboardCollection.insertOne({
            username,
            solved: [challengeId],
            totalPoints: points,
            lastSolveTime: timestamp
          });
        } else {
          if (!user.solved.includes(challengeId)) {
            const updatedSolved = [...user.solved, challengeId];
            const updatedPoints = user.totalPoints + points;
            
            await leaderboardCollection.updateOne(
              { username },
              {
                $set : {username,
                solved: updatedSolved,
                totalPoints: updatedPoints,
                lastSolveTime: timestamp}
              }
            );
          }
        }
      } catch (dbError) {
        console.error('Error updating MongoDB:', dbError);
      }
      
      return NextResponse.json({
        success: true,
        message: 'Congratulations! Flag is correct',
        points: points
      });
    } else {
      return NextResponse.json({ success: false, message: 'Incorrect flag, try again' });
    }
  } catch (error) {
    console.error('Error verifying flag:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}