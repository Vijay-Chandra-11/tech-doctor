export interface Question {
  id: string; // Ensure your JSON has unique IDs for each question!
  text: string;
  options: string[];
  correctAnswer: string;
}

const PLAYED_KEY = "tech_doctor_played_questions";

export async function getGameQuestions(): Promise<Question[]> {
  try {
    // 1. Read the File
    const response = await fetch('/questions.json');
    const allQuestions: Question[] = await response.json();

    // 2. Check Memory (localStorage)
    const playedIdsStr = localStorage.getItem(PLAYED_KEY);
    const playedIds: string[] = playedIdsStr ? JSON.parse(playedIdsStr) : [];

    // 3. Sort & Push (Separate unplayed from played)
    const unplayed = allQuestions.filter(q => !playedIds.includes(q.id));
    const played = allQuestions.filter(q => playedIds.includes(q.id));

    // Combine them, putting unplayed at the top, and played at the very bottom
    const sortedQuestions = [...unplayed, ...played];

    // 4. Select the top 5
    const selected = sortedQuestions.slice(0, 5);

    // 5. Remember (Save these 5 IDs to localStorage so they aren't used next time)
    const newPlayedIds = [...playedIds, ...selected.map(q => q.id)];
    localStorage.setItem(PLAYED_KEY, JSON.stringify(newPlayedIds));

    return selected;
  } catch (error) {
    console.error("Error loading questions:", error);
    return [];
  }
}

// Optional: A function for the admin to reset the memory
export function resetQuestionMemory() {
  localStorage.removeItem(PLAYED_KEY);
}