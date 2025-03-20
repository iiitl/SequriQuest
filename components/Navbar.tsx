"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false); // Mobile menu state
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/verify", {
          credentials: "include"
        });
        
        if (!res.ok) {
          console.log(`Authentication error: ${res.status} ${res.statusText}`);
          setIsLoggedIn(false);
          return;
        }
        
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await res.json();
          if (data.isAuthenticated) {
            setIsLoggedIn(true);
            setTeamName(data.teamName || "");
          } else {
            setIsLoggedIn(false);
          }
        } else {
          console.error("Received non-JSON response from authentication endpoint");
          const text = await res.text();
          console.error("Response starts with:", text.substring(0, 100));
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    }
    
    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include"
      });
      setIsLoggedIn(false);
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="bg-black text-green-400 border-b border-green-600 shadow-lg">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="font-mono font-bold">
            <Link href="/" className="text-xl">
              SEQURI<span className="text-white">QUEST</span>
              <span className="text-green-500">_</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 font-mono tracking-wide">
            {!loading && (
              <>
                <Link href="/" className="hover:text-green-300 transition duration-200">
                  [ HOME ]
                </Link>
                    <Link href="/leaderboard" className="hover:text-green-300 transition duration-200">
                      [ LEADERBOARD ]
                    </Link>
                
                {isLoggedIn ? (
                  <>
                    <Link href="/challenges" className="hover:text-green-300 transition duration-200">
                      [ CHALLENGES ]
                    </Link>
                    <div className="text-green-300 font-bold ml-2">TEAM: {teamName}</div>
                    <button
                      onClick={handleLogout}
                      className="ml-4 px-4 py-2 text-black bg-green-600 hover:bg-green-500 transition font-mono shadow-md"
                    >
                      LOGOUT
                    </button>
                  </>
                ) : (
                  <>
                    {/* <Link href="/about" className="hover:text-green-300 transition duration-200">
                      [ ABOUT ]
                    </Link> */}
                    <Link href="/login" className="px-4 py-2 text-black bg-green-600 hover:bg-green-500 transition font-mono shadow-md">
                      LOGIN
                    </Link>
                    <Link href="/register" className="border border-green-500 text-green-500 hover:bg-green-900 px-4 py-2 font-mono">
                      REGISTER
                    </Link>
                  </>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu Button (Hamburger) */}
          <button className="md:hidden text-green-400 focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
            <div className="w-6 h-0.5 bg-green-400 mb-1"></div>
            <div className="w-6 h-0.5 bg-green-400 mb-1"></div>
            <div className="w-6 h-0.5 bg-green-400"></div>
          </button>
        </nav>

        {/* Mobile Navigation */}
        {!loading && (
          <div className={`md:hidden ${isOpen ? "block" : "hidden"} flex flex-col items-center py-4 space-y-4 font-mono text-lg bg-black border-t border-green-600`}>
            <Link href="/" className="hover:text-green-300 transition duration-200" onClick={() => setIsOpen(false)}>
              [ HOME ]
            </Link>
                <Link href="/leaderboard" className="hover:text-green-300 transition duration-200" onClick={() => setIsOpen(false)}>
                  [ Leaderboard ]
                </Link>
            
            {isLoggedIn ? (
              <>
                <Link href="/challenges" className="hover:text-green-300 transition duration-200" onClick={() => setIsOpen(false)}>
                  [ CHALLENGES ]
                </Link>
                <div className="text-green-300 font-bold">TEAM: {teamName}</div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="px-4 py-2 text-black bg-green-600 hover:bg-green-500 transition font-mono shadow-md"
                >
                  LOGOUT
                </button>
              </>
            ) : (
              <>
                {/* <Link href="/about" className="hover:text-green-300 transition duration-200" onClick={() => setIsOpen(false)}>
                  [ ABOUT ]
                </Link> */}
                <Link href="/login" className="px-4 py-2 text-black bg-green-600 hover:bg-green-500 transition font-mono shadow-md" onClick={() => setIsOpen(false)}>
                  LOGIN
                </Link>
                <Link href="/register" className="border border-green-500 text-green-500 hover:bg-green-900 px-4 py-2 font-mono" onClick={() => setIsOpen(false)}>
                  REGISTER
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}