import { StudentScore } from "./gameData";

const SCORES_KEY = "tech_doctor_scores";
const ADMIN_PASSWORD = "admin123";

export function saveScore(score: StudentScore) {
  const scores = getScores();
  const existing = scores.findIndex((s) => s.name === score.name);
  if (existing >= 0) {
    // Keep best score
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

export function computeScore(organsRestored: number, timeTaken: number): number {
  const base = organsRestored * 1000;
  const timeBonus = Math.max(0, 600 - timeTaken) * 2;
  return base + timeBonus;
}
