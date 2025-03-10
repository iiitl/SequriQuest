"use client";
import Link from "next/link";
import { useState } from "react";
import Navbar from "../../../components/Navbar";
import "../../styles/blink.css";
import Footer from "@/components/Footer";


export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
    <Navbar />
    <div className="bg-black text-green-400 min-h-screen flex flex-col justify-center items-center py-10">
      <div className="text-center">
        <h1 className="text-5xl font-bold font-mono">
          REGISTER<span className="text-green-500 blinking">_</span>
        </h1>
        <p className="text-lg mt-2 font-mono text-green-300">
          Create an account to start hacking
        </p>
      </div>

      <div className="bg-gray-900 p-8 mt-6 rounded-lg shadow-lg w-96 border border-green-500">
        <h2 className="text-2xl mb-4 font-mono">Sign Up</h2>

        <div className="mb-4">
          <label className="block text-green-300 font-mono">Email</label>
          <div className="flex items-center border border-green-500 px-3 py-2 bg-black">
            <span className="text-green-500">@</span>
            <input
              type="email"
              className="bg-black text-green-400 w-full outline-none px-2 font-mono"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-green-300 font-mono">Username</label>
          <div className="flex items-center border border-green-500 px-3 py-2 bg-black">
            <span className="text-green-500">@</span>
            <input
              type="text"
              className="bg-black text-green-400 w-full outline-none px-2 font-mono"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-green-300 font-mono">Password</label>
          <div className="flex items-center border border-green-500 px-3 py-2 bg-black">
            <span className="text-green-500">#</span>
            <input
              type="password"
              className="bg-black text-green-400 w-full outline-none px-2 font-mono"
              placeholder="Make it strong!"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Register Button */}
        <button className="w-full bg-green-600 text-black py-2 font-mono text-lg shadow-md hover:bg-green-500 transition">
          Register Now
        </button>

        {/* Navigation Link to Login */}
        <p className="text-center text-sm text-green-300 mt-4">
          Already have an account?{" "}
          <Link href="/login">
            <span className="text-red-500 cursor-pointer hover:underline">Login here</span>
          </Link>
        </p>
      </div>
    </div>
    <Footer />
    </>
  );
}
