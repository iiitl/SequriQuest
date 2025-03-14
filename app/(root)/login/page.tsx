"use client";
import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import Navbar from "../../../components/Navbar";
import "../../styles/blink.css";
import Footer from "@/components/Footer";
import { useRouter, useSearchParams } from "next/navigation";

// Create a separate component for the parts that use useSearchParams
interface LoginFormProps {
  onUsernameChange: (username: string) => void;
  onPasswordChange: (password: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  username: string;
  password: string;
  loading: boolean;
  error: string | null;
  success: string | null;
}

function LoginForm({ onUsernameChange, onPasswordChange, onSubmit, username, password, loading, error, success }: LoginFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-4">
        <label className="block text-green-300 font-mono">Username</label>
        <div className="flex items-center border border-green-500 px-3 py-2 bg-black">
          <span className="text-green-500">@</span>
          <input
            type="text"
            className="bg-black text-green-400 w-full outline-none px-2 font-mono"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => onUsernameChange(e.target.value)}
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
            placeholder="Make sure nobody's behind you ;)"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            required
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-black py-2 font-mono text-lg shadow-md hover:bg-green-500 transition disabled:opacity-50"
      >
        {loading ? "Authenticating..." : "Let's Hack!"}
      </button>

      {error && (
        <div className="bg-red-900/30 border border-red-500 text-red-300 px-4 py-2 rounded mt-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-900/30 border border-green-500 text-green-300 px-4 py-2 rounded mt-4">
          {success}
        </div>
      )}
    </form>
  );
}

// Component that uses useSearchParams
function LoginWithParams() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  
  // Use the imported useSearchParams hook
  const searchParams = useSearchParams();
  
  useEffect(() => {
    if (searchParams?.get("registered") === "true") {
      setSuccess("Registration successful! Please log in.");
    }
  }, [searchParams]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/verify', {
          credentials: 'include' 
        });
        const data = await response.json();
        
        if (data.isAuthenticated) {
          router.push('/');
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, [router]);

  // Define interfaces for the request body and response data
  interface LoginRequestBody {
    username: string;
    password: string;
  }

  interface LoginResponseData {
    success: boolean;
    message?: string;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password } as LoginRequestBody),
        credentials: "include", 
      });

      const data = await response.json() as LoginResponseData;

      if (data.success) {
        setSuccess("Login successful, redirecting...");
        setTimeout(() => router.push("/"), 1000);
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("An error occurred during login");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <p className="text-green-400 text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-black text-green-400 min-h-screen flex flex-col justify-center items-center py-10">
      <div className="text-center">
        <h1 className="text-5xl font-bold font-mono">
          ACCESS<span className="text-green-500 blinking">_</span>
        </h1>
        <p className="text-lg mt-2 font-mono text-green-300">
          Enter your credentials to proceed
        </p>
      </div>

      <div className="bg-gray-900 p-8 mt-6 rounded-lg shadow-lg w-96 border border-green-500">
        <h2 className="text-2xl mb-4 font-mono">Login</h2>

        <LoginForm 
          onUsernameChange={setUsername}
          onPasswordChange={setPassword}
          onSubmit={handleSubmit}
          username={username}
          password={password}
          loading={loading}
          error={error}
          success={success}
        />

        <p className="text-center text-sm text-green-300 mt-4">
          Need access?{" "}
          <Link href="/register">
            <span className="text-red-500 cursor-pointer hover:underline">Register here</span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function Login() {
  return (
    <>
      <Navbar />
      <Suspense fallback={
        <div className="container mx-auto px-6 py-12 text-center">
          <p className="text-green-400 text-xl">Loading...</p>
        </div>
      }>
        <LoginWithParams />
      </Suspense>
      <Footer />
    </>
  );
}