import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { userProgress } from "@/lib/store";

export async function GET() {
  try {

    const { db } = await connectToDatabase();
    const leaderboardCollection = db.collection('userProgress');

    const progressData = await leaderboardCollection.find({}).toArray();

    let leaderboardData = progressData.map((progress) => {
      return {
        username: progress.username,
        score: progress.totalPoints || 0, 
        solved: progress.solved ? progress.solved.length : 0, 
        lastSolveTime: progress.lastSolveTime
      };
    });
 
    leaderboardData.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
  
      return new Date(a.lastSolveTime).getTime() - new Date(b.lastSolveTime).getTime();
    });
    
    leaderboardData = leaderboardData.map((entry, index) => ({
      ...entry,
      rank: index + 1
    }));
    console.log(leaderboardData);
    return NextResponse.json({ 
      success: true, 
      leaderboard: leaderboardData,
      message: "Points are displayed in the 'score' field"
    });
  } catch (error) {
    console.error('Error fetching leaderboard data:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}


export async function POST(req: NextRequest) {
  try {
    const { username, challengeId, points, timestamp } = await req.json();
    
    if (!username || !challengeId) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }
    
    const { db } = await connectToDatabase();
    const leaderboardCollection = db.collection('userProgress');

    const user = await leaderboardCollection.findOne({ username });
    
    if (!user) {
      await leaderboardCollection.insertOne({
        username,
        solved: [challengeId],
        totalPoints: points || 0,
        lastSolveTime: timestamp || new Date().toISOString()
      });
    } else {
      if (!user.solved.includes(challengeId)) {
        await leaderboardCollection.updateOne(
          { username },
          { 
            $push: { solved: challengeId },
            $inc: { totalPoints: points || 0 },
            $set: { lastSolveTime: timestamp || new Date().toISOString() }
          }
        );
      }
    }

    if (userProgress.has(username)) {
      const progress = userProgress.get(username)!; 
      if (!progress.solved.includes(challengeId)) {
        progress.solved.push(challengeId);
        progress.totalPoints += (points || 0);
        progress.lastSolveTime = timestamp || new Date().toISOString();
        userProgress.set(username, progress);
      }
    } else {
      userProgress.set(username, {
        solved: [challengeId],
        totalPoints: points || 0,
        lastSolveTime: timestamp || new Date().toISOString()
      });
    }
    console.log(NextResponse.json({ success: true }));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating user progress:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}