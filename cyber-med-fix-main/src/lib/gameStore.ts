// import { create } from 'zustand';
// import { StudentScore } from "./gameData";

// // ==========================================
// // 1. LEADERBOARD & ADMIN LOGIC (Your existing code)
// // ==========================================
// const SCORES_KEY = "tech_doctor_scores";
// const ADMIN_PASSWORD = "admin123";

// export function saveScore(score: StudentScore) {
//   const scores = getScores();
//   const existing = scores.findIndex((s) => s.name === score.name);
//   if (existing >= 0) {
//     // Keep best score
//     if (score.totalScore > scores[existing].totalScore) {
//       scores[existing] = score;
//     }
//   } else {
//     scores.push(score);
//   }
//   localStorage.setItem(SCORES_KEY, JSON.stringify(scores));
// }

// export function getScores(): StudentScore[] {
//   try {
//     const data = localStorage.getItem(SCORES_KEY);
//     return data ? JSON.parse(data) : [];
//   } catch {
//     return [];
//   }
// }

// export function verifyAdminPassword(password: string): boolean {
//   return password === ADMIN_PASSWORD;
// }

// // Updated to account for the 2-minute (120 seconds) penalty per wrong answer
// export function computeScore(organsRestored: number, timeTaken: number, penalties: number = 0): number {
//   const base = organsRestored * 1000;
//   const actualTimeTaken = timeTaken + (penalties * 120); // Adds 120s per penalty
//   const timeBonus = Math.max(0, 600 - actualTimeTaken) * 2; // Assuming 600s (10 min) par time
//   return base + timeBonus;
// }


// // ==========================================
// // 2. LIVE GAME STATE (New Zustand Store)
// // ==========================================
// interface GameState {
//   activePart: string | null;      // Which body part modal is currently open
//   curedParts: string[];           // Array of body parts that have been cured
//   penalties: number;              // Total count of wrong answers
//   setActivePart: (part: string | null) => void;
//   curePart: (part: string) => void;
//   addPenalty: (amount: number) => void;
//   resetGame: () => void;
// }

// export const useGameStore = create<GameState>((set) => ({
//   activePart: null,
//   curedParts: [],
//   penalties: 0,
  
//   // Opens or closes the question modal
//   setActivePart: (part) => set({ activePart: part }),
  
//   // Marks a part as cured and adds it to the list
//   curePart: (part) => set((state) => {
//     if (!state.curedParts.includes(part)) {
//       return { curedParts: [...state.curedParts, part] };
//     }
//     return state; // Do nothing if already cured
//   }),
  
//   // Increments the penalty count when a wrong answer is submitted
//   addPenalty: (amount) => set((state) => ({ penalties: state.penalties + amount })),
  
//   // Resets the board for the next team
//   resetGame: () => set({ activePart: null, curedParts: [], penalties: 0 })
// }));



import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { StudentScore } from "./gameData";

const SCORES_KEY = "tech_doctor_scores";
const ADMIN_PASSWORD = "admin123";

export function saveScore(score: StudentScore) {
  const scores = getScores();
  const existing = scores.findIndex((s) => s.name === score.name);
  if (existing >= 0) {
    if (score.totalScore > scores[existing].totalScore) {
      scores[existing] = score;
    }
  } else {
    scores.push(score);
  }
  localStorage.setItem(SCORES_KEY, JSON.stringify(scores));
}

export function getScores(): StudentScore[] {
  try {
    const data = localStorage.getItem(SCORES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function verifyAdminPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

export function computeScore(organsRestored: number, timeTaken: number, penalties: number = 0): number {
  const base = organsRestored * 1000;
  const actualTimeTaken = timeTaken + (penalties * 120); 
  const timeBonus = Math.max(0, 600 - actualTimeTaken) * 2; 
  return base + timeBonus;
}

// --- LIVE GAME STATE ---
interface GameState {
  activePart: string | null;
  curedParts: string[];
  failedParts: string[]; // NEW: Track blocked organs
  penalties: number;
  secondsElapsed: number; // NEW: Track time in the store so it survives reloads
  setActivePart: (part: string | null) => void;
  curePart: (part: string) => void;
  failPart: (part: string) => void; // NEW: Mark an organ as failed
  addPenalty: (amount: number) => void;
  tick: () => void; // NEW: Advance timer
  resetGame: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      activePart: null,
      curedParts: [],
      failedParts: [],
      penalties: 0,
      secondsElapsed: 0,
      
      setActivePart: (part) => set({ activePart: part }),
      
      curePart: (part) => set((state) => ({ 
        curedParts: state.curedParts.includes(part) ? state.curedParts : [...state.curedParts, part] 
      })),
      
      failPart: (part) => set((state) => ({ 
        failedParts: state.failedParts.includes(part) ? state.failedParts : [...state.failedParts, part] 
      })),
      
      addPenalty: (amount) => set((state) => ({ penalties: state.penalties + amount })),
      
      tick: () => set((state) => ({ secondsElapsed: state.secondsElapsed + 1 })),
      
      resetGame: () => set({ activePart: null, curedParts: [], failedParts: [], penalties: 0, secondsElapsed: 0 })
    }),
    {
      name: 'tech-doctor-storage', // Saves game to localStorage automatically!
    }
  )
);