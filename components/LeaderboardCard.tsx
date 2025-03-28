"use client";

interface LeaderboardCardProps {
  rank: number;
  username: string;
  solved: number;
  score: number;
  time: string;
}

export default function LeaderboardCard({rank, username, solved, score, time }: LeaderboardCardProps) {
  return (
    <div className="bg-black border border-green-600 shadow-md p-6 rounded-lg text-green-400 font-mono text-sm sm:text-base md:text-lg grid grid-cols-1 md:grid-cols-5 gap-4 justify-items-center">
      <span className="text-green-300">#{rank}</span>
      <span className="text-green-400">{username}</span>
      <span className="text-green-500">{solved}</span>
      <span className="text-green-500">{score}</span>
      <span className="text-green-600">{time}</span>
    </div>
  );
}