"use client";

import LeaderboardCard from "@/components/LeaderboardCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Fallback data in case API fails
const fallbackData = [
  { rank: 1, username: "@MrRobot", solved: 9, points: 800, time: "00:45:30" },
  { rank: 2, username: "@Sherlock22B", solved: 5, points: 500, time: "01:05:30" },
  { rank: 3, username: "@SheldorTheConquerer", solved: 2, points: 200, time: "00:10:30" },
];

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        // First check if user is authenticated
        const authResponse = await fetch('/api/auth/verify');
        const authData = await authResponse.json();
        
        if (!authData.isAuthenticated) {
          router.push('/login');
          return;
        }
        
        // Fetch leaderboard data
        const response = await fetch('/api/leaderboard');
        const data = await response.json();
        
        if (data.success && data.leaderboard) {
          // Format the time display from ISO string
          const formattedData = data.leaderboard.map(entry => ({
            ...entry,
            time: formatTime(entry.lastSolveTime)
          }));
          setLeaderboardData(formattedData);
        } else {
          setError("Failed to load leaderboard data");
          setLeaderboardData(fallbackData);
        }
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
        setError("Failed to load leaderboard data");
        setLeaderboardData(fallbackData);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchLeaderboard();
  }, [router]);

  // Format ISO time string to display format
  const formatTime = (isoString) => {
    if (!isoString) return "N/A";
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    } catch (e) {
      return "N/A";
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black text-green-400 flex flex-col items-center py-10">
        <h1 className="text-4xl font-bold text-green-300">🏆 Leaderboard 🏆</h1>
        <p className="text-lg text-green-500 mb-6">Where hackers compete for glory!</p>
        
        {isLoading ? (
          <p className="text-green-400 text-xl">Loading leaderboard data...</p>
        ) : error ? (
          <p className="text-red-400 text-xl">{error}</p>
        ) : (
          <div className="w-3/4 space-y-4 mb-10">
            {leaderboardData.length === 0 ? (
              <p className="text-green-400 text-center">No players on the leaderboard yet. Be the first!</p>
            ) : (
              leaderboardData.map((player) => (
                <LeaderboardCard key={player.rank} {...player} />
              ))
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
