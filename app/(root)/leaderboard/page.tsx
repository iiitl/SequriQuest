"use client";

import LeaderboardCard from "@/components/LeaderboardCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const players = [
  { rank: 1, username: "@MrRobot", solved: 9, time: "00:45:30" },
  { rank: 2, username: "@Sherlock22B", solved: 5, time: "01:05:30" },
  { rank: 3, username: "@SheldorTheConquerer", solved: 2, time: "00:10:30" },
];

export default function Leaderboard() {
  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-black text-green-400 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold text-green-300">🏆 Leaderboard 🏆</h1>
      <p className="text-lg text-green-500 mb-6">Where the world gets ranked!</p>
      <div className="w-3/4 space-y-4 mb-10">
        {players.map((player) => (
          <LeaderboardCard key={player.rank} {...player} />
        ))}
      </div>
    </div>
    <Footer />
    </>
  );
}
