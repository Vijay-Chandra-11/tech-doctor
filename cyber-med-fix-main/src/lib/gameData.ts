// Updated to match the external body parts pivot
export type BodyPart = "leftArm" | "rightArm" | "legs" | "torso" | "head";

export interface BodyPartData {
  id: BodyPart;
  label: string;
  icon: string;
  color: string;
  glowVar: string;
  // Note: The 'questions' array has been removed because we now fetch 
  // them dynamically from public/questions.json!
}

export const bodyPartsData: BodyPartData[] = [
  {
    id: "leftArm",
    label: "Left Arm",
    icon: "💪",
    color: "neon-magenta",
    glowVar: "--neon-magenta",
  },
  {
    id: "rightArm",
    label: "Right Arm",
    icon: "🦾",
    color: "neon-magenta",
    glowVar: "--neon-magenta",
  },
  {
    id: "legs",
    label: "Legs",
    icon: "🦵",
    color: "neon-cyan",
    glowVar: "--neon-cyan",
  },
  {
    id: "torso",
    label: "Torso",
    icon: "🩻", // Torso/Chest x-ray icon
    color: "neon-crimson",
    glowVar: "--neon-crimson",
  },
  {
    id: "head",
    label: "Head",
    icon: "🧠",
    color: "neon-cyan",
    glowVar: "--neon-cyan",
  },
];

// export interface StudentScore {
//   name: string;
//   timeTaken: number; // seconds
//   organsRestored: number;
//   totalScore: number;
// }

export interface StudentScore {
  name: string;
  level: number; // <-- ADD THIS
  timeTaken: number;
  organsRestored: number;
  totalScore: number;
}