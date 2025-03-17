"use client";

import QuestCard from "@/components/QuestCard";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const quests = [
  { title: "Challenge 1", points: 50, description: "Pointy pointers.", hint: "Is the source code in C?", id: "c1" },
  { title: "Challenge 2", points: 75, description: "Disk Diving.", hint: "Dive deep to find the best gems.", id: "c2" },
  { title: "Challenge 3", points: 100, description: "Easy search.", hint: "Its not that easy. LOL.", id: "c3" },
  { title: "Challenge 4", points: 50, description: "Secret hunting.", hint: "The file is not as innocent as it looks.", id: "c4" },
  { title: "Challenge 5", points: 100, description: "Eye catcher.", hint: "Don't believe your eyes.", id: "c5" },
];

export default function Challenges() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/verify');
        const data = await response.json();
        
        if (!data.isAuthenticated) {
          router.push('/login');
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        router.push('/login');
      }
    };
    
    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-6 py-12 text-center">
          <p className="text-green-400 text-xl">Loading...</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
    <Navbar />
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-green-400 text-center mb-6">QUEST ZONE!</h2>
      <p className="text-lg font-mono text-green-300 text-center mb-8">
        Are you ready to solve the quests?
      </p>
      
      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quests.map((quest, index) => (
          <QuestCard key={index} {...quest} />
        ))}
      </div>
    </div>
    <Footer />
    </>
  );
}
