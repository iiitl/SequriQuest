"use client";
import Navbar from "../../components/Navbar";
import Footer from "@/components/Footer";
import "../styles/blink.css";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";


export default function Home() {
  const { isAuthenticated, isLoading, user } = useAuth();

  const [fakeLogs, setFakeLogs] = useState([
    "[SEQURIQUEST] Booting up...",
    "[AUTH] Establishing secure connection...",
    "[LOADING] Fetching challenges...",
    "[SECURITY] System integrity check passed.",
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFakeLogs((prevLogs) => [
        ...prevLogs.slice(-3),
        `[LOG] New threat detected...`,
      ]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="bg-black text-green-400 min-h-screen py-[-10px]">
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col lg:flex-row items-center">
            {/* Left Column - Text Content */}
            <div className="lg:w-1/2">
              <h1 className="text-5xl font-bold font-mono leading-tight">
                SEQURIQUEST<span className="text-green-500 blinking">_</span>
              </h1>
              <p className="text-lg mt-4 font-mono text-green-300">
                Welcome hackers! Prove to the world that a computer genius with a laptop is not a nerd in a messy room but a fun-loving work of brilliance!  
                Join our CTF and expand your knowledge in computer forensics.
              </p>

              {/* Conditional Login & Register Buttons */}
              <div className="mt-6 space-x-4">
                {!isAuthenticated && !isLoading ? (
                  <>
                    <Link href="/login">
                      <button className="bg-green-600 text-black px-6 py-2 font-mono text-lg shadow-md hover:bg-green-500 transition">
                        Login
                      </button>
                    </Link>
                    <Link href="/register">
                      <button className="bg-red-600 text-black px-6 py-2 font-mono text-lg shadow-md hover:bg-red-500 transition">
                        Register
                      </button>
                    </Link>
                  </>
                ) : isAuthenticated ? (
                  <Link href="/challenges">
                    <button className="bg-green-600 text-black px-6 py-2 font-mono text-lg shadow-md hover:bg-green-500 transition">
                      Start Hacking
                    </button>
                  </Link>
                ) : null}
              </div>
            </div>

            {/* Right Column - Hackrrr decorrrr */}
            <div className="lg:w-1/2 mt-12 lg:mt-0 px-6">
              <div className="bg-black border border-green-600 text-green-300 p-4 font-mono h-60 overflow-hidden">
                <div className="text-green-500">┌──(root@sequriquest)-[~]</div>
                <div className="text-green-500">└─$ ./start_ctf</div>
                {fakeLogs.map((log, index) => (
                  <p key={index} className="text-green-400">{log}</p>
                ))}
                {isAuthenticated && (
                  <p className="text-green-400">[AUTH] Welcome back, {user?.teamName}!</p>
                )}
                <div className="blinking text-green-500">█</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
