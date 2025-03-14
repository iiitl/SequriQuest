
export interface UserProgress {
  solved: string[];        // Array of solved challenge IDs
  totalPoints: number;     // Cumulative points earned
  lastSolveTime: string;   // ISO timestamp of last solve
}

// User progress store - shared across all API routes
export const userProgress = new Map<string, UserProgress>();

// You can add other shared data structures here as needed