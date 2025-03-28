"use client";

import { useState } from 'react';

interface QuestCardProps {
  title: string;
  points: number;
  description: string;
  hint?: string;
  id: string;
  alreadySolved?: boolean;
  url?: string;
}

export default function QuestCard({ title, points, description, id, url, alreadySolved = false }: QuestCardProps) {
  const [flag, setFlag] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(alreadySolved ? 'success' : ''); // 'success', 'error', or empty
  const [isSubmitting, setIsSubmitting] = useState(false);

  interface SubmitResponse {
    success: boolean;
    message: string;
    points?: number;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    if (alreadySolved) return;
    
    setIsSubmitting(true);
    setMessage('');
    setStatus('');

    try {
      const response = await fetch('/api/verify-flag', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ challengeId: id, flag }),
      });

      const data: SubmitResponse = await response.json();
      
      if (data.success) {
        setStatus('success');
        setMessage(`${data.message} (+${data.points} points)`);
        setFlag('');
      } else {
        setStatus('error');
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Error submitting flag:', error);
      setStatus('error');
      setMessage('An error occurred while submitting the flag. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-black text-green-400 border border-green-500 p-4 rounded-md shadow-md relative">
      {/* Solved Badge */}
      {alreadySolved && (
        <div className="absolute top-0 right-0 bg-green-600 text-black px-2 py-1 font-mono text-xs transform translate-x-2 -translate-y-2 rounded-md shadow-lg">
          SOLVED
        </div>
      )}
      
      {/* Title & Points */}
      <div className="flex justify-between items-center border-b border-green-500 pb-2 mb-3">
        <h3 className="text-lg font-mono font-bold">{title}</h3>
        <span className="text-green-300 text-sm">{points} POINTS</span>
      </div>
      
      {/* Quest Description */}
      <p className="text-green-300 text-sm font-mono mb-3">{description}</p>
      
      {/* Buttons */}
      <div className="flex justify-between space-x-2">
        <button 
          className="bg-green-600 text-black px-3 py-2 font-mono text-sm shadow-md hover:bg-green-500 transition"
          onClick={() => window.open(url || `/api/download-challenge/${id}`, '_blank')}
        >
          Download Challenge
        </button>
      </div>
      
      {/* Flag Submission */}
      <form onSubmit={handleSubmit} className="mt-3">
        <input
          type="text"
          value={flag}
          onChange={(e) => setFlag(e.target.value)}
          placeholder={alreadySolved ? "Challenge already solved" : "Enter Flag"}
          className="bg-black text-green-300 border border-green-500 px-3 py-2 w-full font-mono focus:outline-none focus:ring focus:ring-green-500"
          disabled={alreadySolved}
          required={!alreadySolved}
        />
        <button 
          type="submit"
          disabled={isSubmitting || alreadySolved}
          className="mt-2 w-full bg-green-600 text-black px-3 py-2 font-mono text-sm shadow-md hover:bg-green-500 transition disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : alreadySolved ? 'Already Solved' : 'Submit Flag'}
        </button>
      </form>
      
      {/* Success/Error message or Already Solved message */}
      {(message || alreadySolved) && (
        <div className={`mt-3 p-2 rounded font-mono ${
          status === 'success' || alreadySolved ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'
        }`}>
          {alreadySolved && !message ? "You've already solved this challenge!" : message}
        </div>
      )}
    </div>
  );
}
