"use client"; // Required for state in Next.js 13+ App Router

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isOpen, setIsOpen] = useState(false); // Mobile menu state

  return (
    <div className="bg-black text-green-400 border-b border-green-600 shadow-lg">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="text-xl font-mono font-bold">
            SEQURIQUEST<span className="text-green-500">_</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 font-mono text-lg tracking-wide">
            {isAuthenticated ? (
              <>
                <Link href="/" className="hover:text-green-300 transition duration-200">
                  [ HOME ]
                </Link>
                <Link href="/challenges" className="hover:text-green-300 transition duration-200">
                  [ CHALLENGES ]
                </Link>
                <Link href="/leaderboard" className="hover:text-green-300 transition duration-200">
                  [ LEADERBOARD ]
                </Link>
              </>
            ) : (
              <>
                <Link href="/login" className="hover:text-green-300 transition duration-200">
                  [ LOGIN ]
                </Link>
                <Link href="/register" className="text-green-300 border-b-2 border-green-500">
                  [ REGISTER ]
                </Link>
              </>
            )}
          </div>

          {/* Desktop Auth Button */}
          <button
            onClick={() => setIsAuthenticated(!isAuthenticated)}
            className="hidden md:block ml-6 px-4 py-2 text-black bg-green-600 hover:bg-green-500 transition font-mono text-sm shadow-md"
          >
            {isAuthenticated ? "LOGOUT" : "LOGIN"}
          </button>

          {/* Mobile Menu Button (Hamburger) */}
          <button className="md:hidden text-green-400 focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
            <div className="w-6 h-0.5 bg-green-400 mb-1"></div>
            <div className="w-6 h-0.5 bg-green-400 mb-1"></div>
            <div className="w-6 h-0.5 bg-green-400"></div>
          </button>
        </nav>

        {/* Mobile Navigation */}
        <div className={`md:hidden ${isOpen ? "block" : "hidden"} flex flex-col items-center py-4 space-y-4 font-mono text-lg bg-black border-t border-green-600`}>
          {isAuthenticated ? (
            <>
              <Link href="/" className="hover:text-green-300 transition duration-200" onClick={() => setIsOpen(false)}>
                [ HOME ]
              </Link>
              <Link href="/challenges" className="hover:text-green-300 transition duration-200" onClick={() => setIsOpen(false)}>
                [ CHALLENGES ]
              </Link>
              <Link href="/leaderboard" className="hover:text-green-300 transition duration-200" onClick={() => setIsOpen(false)}>
                [ LEADERBOARD ]
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-green-300 transition duration-200" onClick={() => setIsOpen(false)}>
                [ LOGIN ]
              </Link>
              <Link href="/register" className="text-green-300 border-b-2 border-green-500" onClick={() => setIsOpen(false)}>
                [ REGISTER ]
              </Link>
            </>
          )}

          {/* Mobile Auth Button */}
          <button
            onClick={() => {
              setIsAuthenticated(!isAuthenticated);
              setIsOpen(false);
            }}
            className="mt-4 px-4 py-2 text-black bg-green-600 hover:bg-green-500 transition font-mono text-sm shadow-md"
          >
            {isAuthenticated ? "LOGOUT" : "LOGIN"}
          </button>
        </div>
      </div>
    </div>
  );
}
