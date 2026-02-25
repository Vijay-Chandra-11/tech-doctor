// // import { motion } from "framer-motion";
// // import { BodyPart } from "@/lib/gameData";
// // import { useGameStore } from "@/lib/gameStore"; // If you want to trigger the modal via Zustand directly

// // interface HumanBodyProps {
// //   restoredParts: string[];
// //   onPartClick?: (part: BodyPart) => void;
// // }

// // interface BodyZone {
// //   id: BodyPart;
// //   label: string;
// //   icon: string;
// //   top: string;
// //   left: string;
// //   w: string;
// //   h: string;
// //   color: string;
// //   glowColor: string;
// // }

// // // Exactly 5 distinct body parts
// // const zones: BodyZone[] = [
// //   {
// //     id: "head", label: "HEAD", icon: "🧠",
// //     top: "2%", left: "35%", w: "30%", h: "18%",
// //     color: "hsla(186,100%,50%,0.15)",
// //     glowColor: "hsla(186,100%,50%,0.6)",
// //   },
// //   {
// //     id: "torso", label: "TORSO", icon: "🩻",
// //     top: "22%", left: "25%", w: "50%", h: "28%",
// //     color: "hsla(300,100%,60%,0.15)",
// //     glowColor: "hsla(300,100%,60%,0.6)",
// //   },
// //   {
// //     id: "leftArm", label: "L. ARM", icon: "💪",
// //     top: "22%", left: "5%", w: "18%", h: "35%",
// //     color: "hsla(300,100%,60%,0.12)",
// //     glowColor: "hsla(300,100%,60%,0.5)",
// //   },
// //   {
// //     id: "rightArm", label: "R. ARM", icon: "🦾",
// //     top: "22%", left: "77%", w: "18%", h: "35%",
// //     color: "hsla(300,100%,60%,0.12)",
// //     glowColor: "hsla(300,100%,60%,0.5)",
// //   },
// //   {
// //     id: "legs", label: "LEGS", icon: "🦵",
// //     top: "52%", left: "28%", w: "44%", h: "33%",
// //     color: "hsla(186,100%,50%,0.12)",
// //     glowColor: "hsla(186,100%,50%,0.5)",
// //   }
// // ];

// // export default function HumanBody({ restoredParts, onPartClick }: HumanBodyProps) {
// //   // Use Zustand store to open modal if you switched to the global state
// //   const { setActivePart } = useGameStore();

// //   const handleZoneClick = (id: BodyPart) => {
// //     // Call local state setter if passed
// //     if (onPartClick) onPartClick(id);
// //     // Call global store setter
// //     setActivePart(id);
// //   };

// //   return (
// //     <motion.div
// //       className="relative mx-auto"
// //       style={{ width: "280px", height: "520px" }}
// //       animate={{ y: [0, -8, 0] }}
// //       transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
// //     >
// //       {/* Body silhouette SVG */}
// //       <svg
// //         viewBox="0 0 200 520"
// //         className="absolute inset-0 w-full h-full"
// //         style={{ filter: "drop-shadow(0 0 20px hsla(186,100%,50%,0.2))" }}
// //       >
// //         {/* Head */}
// //         <ellipse cx="100" cy="50" rx="38" ry="44"
// //           fill="hsla(186,100%,50%,0.04)" stroke="hsla(186,100%,50%,0.3)" strokeWidth="1.5" />
// //         {/* Neck */}
// //         <rect x="88" y="90" width="24" height="20" rx="4"
// //           fill="hsla(186,100%,50%,0.04)" stroke="hsla(186,100%,50%,0.2)" strokeWidth="1" />
// //         {/* Torso */}
// //         <path d="M55,110 L145,110 L155,260 L45,260 Z"
// //           fill="hsla(300,100%,60%,0.04)" stroke="hsla(300,100%,60%,0.3)" strokeWidth="1.5" />
// //         {/* Left arm */}
// //         <path d="M55,115 L25,125 L18,230 L35,232 L42,145 L55,138 Z"
// //           fill="hsla(300,100%,60%,0.04)" stroke="hsla(300,100%,60%,0.25)" strokeWidth="1.5" />
// //         {/* Right arm */}
// //         <path d="M145,115 L175,125 L182,230 L165,232 L158,145 L145,138 Z"
// //           fill="hsla(300,100%,60%,0.04)" stroke="hsla(300,100%,60%,0.25)" strokeWidth="1.5" />
// //         {/* Left leg */}
// //         <path d="M75,258 L65,400 L80,402 L100,270 Z"
// //           fill="hsla(186,100%,50%,0.04)" stroke="hsla(186,100%,50%,0.25)" strokeWidth="1.5" />
// //         {/* Right leg */}
// //         <path d="M125,258 L135,400 L120,402 L100,270 Z"
// //           fill="hsla(186,100%,50%,0.04)" stroke="hsla(186,100%,50%,0.25)" strokeWidth="1.5" />
// //         {/* Left foot */}
// //         <ellipse cx="72" cy="415" rx="16" ry="8"
// //           fill="hsla(348,100%,54%,0.04)" stroke="hsla(348,100%,54%,0.25)" strokeWidth="1.5" />
// //         {/* Right foot */}
// //         <ellipse cx="128" cy="415" rx="16" ry="8"
// //           fill="hsla(348,100%,54%,0.04)" stroke="hsla(348,100%,54%,0.25)" strokeWidth="1.5" />
        
// //         {/* Circuit lines */}
// //         <path d="M100,94 L100,110" stroke="hsla(186,100%,50%,0.4)" strokeWidth="1" strokeDasharray="3,3" />
// //         <path d="M55,180 L25,180" stroke="hsla(300,100%,60%,0.3)" strokeWidth="1" strokeDasharray="2,2" />
// //         <path d="M145,180 L175,180" stroke="hsla(300,100%,60%,0.3)" strokeWidth="1" strokeDasharray="2,2" />
// //         <path d="M80,258 L80,400" stroke="hsla(186,100%,50%,0.3)" strokeWidth="1" strokeDasharray="2,2" />
// //         <path d="M120,258 L120,400" stroke="hsla(186,100%,50%,0.3)" strokeWidth="1" strokeDasharray="2,2" />
// //       </svg>

// //       {/* Clickable zones */}
// //       {zones.map((zone) => {
// //         const isRestored = restoredParts.includes(zone.id);
// //         return (
// //           <motion.button
// //             key={zone.id}
// //             onClick={() => handleZoneClick(zone.id)}
// //             className="absolute rounded-xl flex flex-col items-center justify-center gap-0.5 cursor-pointer"
// //             style={{
// //               top: zone.top,
// //               left: zone.left,
// //               width: zone.w,
// //               height: zone.h,
// //               background: isRestored
// //                 ? "hsla(145,100%,50%,0.2)"
// //                 : zone.color,
// //               border: `1px solid ${isRestored ? "hsla(145,100%,50%,0.5)" : zone.glowColor.replace("0.6", "0.3")}`,
// //               boxShadow: isRestored
// //                 ? "0 0 15px hsla(145,100%,50%,0.4)"
// //                 : "none",
// //             }}
// //             whileHover={{
// //               scale: 1.08,
// //               boxShadow: `0 0 25px ${zone.glowColor}, 0 8px 30px rgba(0,0,0,0.5)`,
// //               y: -4,
// //               transition: { duration: 0.2 },
// //             }}
// //             whileTap={{ scale: 0.95 }}
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             transition={{ delay: 0.1 }}
// //           >
// //             <span className="text-base leading-none">{isRestored ? "✅" : zone.icon}</span>
// //             <span className="text-[9px] font-bold tracking-widest"
// //               style={{
// //                 fontFamily: "'Orbitron', sans-serif",
// //                 color: isRestored ? "hsl(var(--neon-green))" : "hsla(255,255,255,0.7)",
// //               }}>
// //               {zone.label}
// //             </span>
// //           </motion.button>
// //         );
// //       })}
// //     </motion.div>
// //   );
// // }


// import { motion } from "framer-motion";
// import { useGameStore } from "@/lib/gameStore";

// interface HumanBodyProps {
//   restoredParts: string[];
//   failedParts: string[]; // NEW
//   onPartClick?: (part: string) => void;
// }

// // ... (keep your zones array exactly the same) ...
// const zones = [
//   { id: "head", label: "HEAD", icon: "🧠", top: "2%", left: "35%", w: "30%", h: "18%", color: "hsla(186,100%,50%,0.15)", glowColor: "hsla(186,100%,50%,0.6)" },
//   { id: "torso", label: "TORSO", icon: "🩻", top: "22%", left: "25%", w: "50%", h: "28%", color: "hsla(300,100%,60%,0.15)", glowColor: "hsla(300,100%,60%,0.6)" },
//   { id: "leftArm", label: "L. ARM", icon: "💪", top: "22%", left: "5%", w: "18%", h: "35%", color: "hsla(300,100%,60%,0.12)", glowColor: "hsla(300,100%,60%,0.5)" },
//   { id: "rightArm", label: "R. ARM", icon: "🦾", top: "22%", left: "77%", w: "18%", h: "35%", color: "hsla(300,100%,60%,0.12)", glowColor: "hsla(300,100%,60%,0.5)" },
//   { id: "legs", label: "LEGS", icon: "🦵", top: "52%", left: "28%", w: "44%", h: "33%", color: "hsla(186,100%,50%,0.12)", glowColor: "hsla(186,100%,50%,0.5)" }
// ];

// export default function HumanBody({ restoredParts, failedParts, onPartClick }: HumanBodyProps) {
//   const { setActivePart } = useGameStore();

//   const handleZoneClick = (id: string) => {
//     if (onPartClick) onPartClick(id);
//     setActivePart(id);
//   };

//   return (
//     <motion.div className="relative mx-auto" style={{ width: "280px", height: "520px" }} animate={{ y: [0, -8, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}>
//       {/* ... (Keep your SVG body outline exactly the same here) ... */}
      
//       {/* Clickable zones */}
//       {zones.map((zone) => {
//         const isRestored = restoredParts.includes(zone.id);
//         const isFailed = failedParts.includes(zone.id);
        
//         // Dynamic Styling based on state
//         let bgColor = zone.color;
//         let borderColor = zone.glowColor.replace("0.6", "0.3");
//         let displayIcon = zone.icon;
//         let textColor = "hsla(255,255,255,0.7)";

//         if (isRestored) {
//           bgColor = "hsla(145,100%,50%,0.2)";
//           borderColor = "hsla(145,100%,50%,0.5)";
//           displayIcon = "✅";
//           textColor = "hsl(var(--neon-green))";
//         } else if (isFailed) {
//           bgColor = "hsla(0,100%,30%,0.5)";
//           borderColor = "hsla(0,100%,50%,0.8)";
//           displayIcon = "❌";
//           textColor = "hsl(var(--neon-crimson))";
//         }

//         return (
//           <motion.button
//             key={zone.id}
//             onClick={() => handleZoneClick(zone.id)}
//             disabled={isRestored || isFailed} // CANNOT CLICK AGAIN
//             className="absolute rounded-xl flex flex-col items-center justify-center gap-0.5"
//             style={{
//               top: zone.top, left: zone.left, width: zone.w, height: zone.h,
//               background: bgColor, border: `1px solid ${borderColor}`,
//               boxShadow: isRestored ? "0 0 15px hsla(145,100%,50%,0.4)" : isFailed ? "0 0 15px hsla(0,100%,50%,0.6)" : "none",
//               cursor: (isRestored || isFailed) ? "not-allowed" : "pointer"
//             }}
//             whileHover={!(isRestored || isFailed) ? { scale: 1.08, boxShadow: `0 0 25px ${zone.glowColor}`, y: -4 } : {}}
//             whileTap={!(isRestored || isFailed) ? { scale: 0.95 } : {}}
//           >
//             <span className="text-base leading-none">{displayIcon}</span>
//             <span className="text-[9px] font-bold tracking-widest" style={{ fontFamily: "'Orbitron', sans-serif", color: textColor }}>
//               {isFailed ? "FAILED" : zone.label}
//             </span>
//           </motion.button>
//         );
//       })}
//     </motion.div>
//   );
// }


import { motion } from "framer-motion";
import { useGameStore } from "@/lib/gameStore";

interface HumanBodyProps {
  restoredParts: string[];
  failedParts: string[];
  onPartClick?: (part: string) => void;
}

interface BodyZone {
  id: string;
  label: string;
  icon: string;
  top: string;
  left: string;
  w: string;
  h: string;
  color: string;
  glowColor: string;
}

// Exactly 5 distinct body parts
const zones: BodyZone[] = [
  { id: "head", label: "HEAD", icon: "🧠", top: "2%", left: "35%", w: "30%", h: "18%", color: "hsla(186,100%,50%,0.15)", glowColor: "hsla(186,100%,50%,0.6)" },
  { id: "torso", label: "TORSO", icon: "🩻", top: "22%", left: "25%", w: "50%", h: "28%", color: "hsla(300,100%,60%,0.15)", glowColor: "hsla(300,100%,60%,0.6)" },
  { id: "leftArm", label: "L. ARM", icon: "💪", top: "22%", left: "5%", w: "18%", h: "35%", color: "hsla(300,100%,60%,0.12)", glowColor: "hsla(300,100%,60%,0.5)" },
  { id: "rightArm", label: "R. ARM", icon: "🦾", top: "22%", left: "77%", w: "18%", h: "35%", color: "hsla(300,100%,60%,0.12)", glowColor: "hsla(300,100%,60%,0.5)" },
  { id: "legs", label: "LEGS", icon: "🦵", top: "52%", left: "28%", w: "44%", h: "33%", color: "hsla(186,100%,50%,0.12)", glowColor: "hsla(186,100%,50%,0.5)" }
];

export default function HumanBody({ restoredParts, failedParts, onPartClick }: HumanBodyProps) {
  const { setActivePart } = useGameStore();

  const handleZoneClick = (id: string) => {
    if (onPartClick) onPartClick(id);
    setActivePart(id);
  };

  return (
    <motion.div 
      className="relative mx-auto" 
      style={{ width: "280px", height: "520px" }} 
      animate={{ y: [0, -8, 0] }} 
      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
    >
      
      {/* Body silhouette SVG */}
      <svg
        viewBox="0 0 200 520"
        className="absolute inset-0 w-full h-full"
        style={{ filter: "drop-shadow(0 0 20px hsla(186,100%,50%,0.2))" }}
      >
        {/* Head */}
        <ellipse cx="100" cy="50" rx="38" ry="44" fill="hsla(186,100%,50%,0.04)" stroke="hsla(186,100%,50%,0.3)" strokeWidth="1.5" />
        {/* Neck */}
        <rect x="88" y="90" width="24" height="20" rx="4" fill="hsla(186,100%,50%,0.04)" stroke="hsla(186,100%,50%,0.2)" strokeWidth="1" />
        {/* Torso */}
        <path d="M55,110 L145,110 L155,260 L45,260 Z" fill="hsla(300,100%,60%,0.04)" stroke="hsla(300,100%,60%,0.3)" strokeWidth="1.5" />
        {/* Left arm */}
        <path d="M55,115 L25,125 L18,230 L35,232 L42,145 L55,138 Z" fill="hsla(300,100%,60%,0.04)" stroke="hsla(300,100%,60%,0.25)" strokeWidth="1.5" />
        {/* Right arm */}
        <path d="M145,115 L175,125 L182,230 L165,232 L158,145 L145,138 Z" fill="hsla(300,100%,60%,0.04)" stroke="hsla(300,100%,60%,0.25)" strokeWidth="1.5" />
        {/* Left leg */}
        <path d="M75,258 L65,400 L80,402 L100,270 Z" fill="hsla(186,100%,50%,0.04)" stroke="hsla(186,100%,50%,0.25)" strokeWidth="1.5" />
        {/* Right leg */}
        <path d="M125,258 L135,400 L120,402 L100,270 Z" fill="hsla(186,100%,50%,0.04)" stroke="hsla(186,100%,50%,0.25)" strokeWidth="1.5" />
        {/* Left foot */}
        <ellipse cx="72" cy="415" rx="16" ry="8" fill="hsla(348,100%,54%,0.04)" stroke="hsla(348,100%,54%,0.25)" strokeWidth="1.5" />
        {/* Right foot */}
        <ellipse cx="128" cy="415" rx="16" ry="8" fill="hsla(348,100%,54%,0.04)" stroke="hsla(348,100%,54%,0.25)" strokeWidth="1.5" />
        
        {/* Circuit lines */}
        <path d="M100,94 L100,110" stroke="hsla(186,100%,50%,0.4)" strokeWidth="1" strokeDasharray="3,3" />
        <path d="M55,180 L25,180" stroke="hsla(300,100%,60%,0.3)" strokeWidth="1" strokeDasharray="2,2" />
        <path d="M145,180 L175,180" stroke="hsla(300,100%,60%,0.3)" strokeWidth="1" strokeDasharray="2,2" />
        <path d="M80,258 L80,400" stroke="hsla(186,100%,50%,0.3)" strokeWidth="1" strokeDasharray="2,2" />
        <path d="M120,258 L120,400" stroke="hsla(186,100%,50%,0.3)" strokeWidth="1" strokeDasharray="2,2" />
      </svg>

      {/* Clickable zones */}
      {zones.map((zone) => {
        const isRestored = restoredParts.includes(zone.id);
        const isFailed = failedParts.includes(zone.id);
        
        // Dynamic Styling based on state
        let bgColor = zone.color;
        let borderColor = zone.glowColor.replace("0.6", "0.3");
        let displayIcon = zone.icon;
        let textColor = "hsla(255,255,255,0.7)";

        if (isRestored) {
          bgColor = "hsla(145,100%,50%,0.2)";
          borderColor = "hsla(145,100%,50%,0.5)";
          displayIcon = "✅";
          textColor = "hsl(var(--neon-green))";
        } else if (isFailed) {
          bgColor = "hsla(0,100%,30%,0.5)";
          borderColor = "hsla(0,100%,50%,0.8)";
          displayIcon = "❌";
          textColor = "hsl(var(--neon-crimson))";
        }

        return (
          <motion.button
            key={zone.id}
            onClick={() => handleZoneClick(zone.id)}
            disabled={isRestored || isFailed} // CANNOT CLICK AGAIN
            className="absolute rounded-xl flex flex-col items-center justify-center gap-0.5"
            style={{
              top: zone.top, left: zone.left, width: zone.w, height: zone.h,
              background: bgColor, border: `1px solid ${borderColor}`,
              boxShadow: isRestored ? "0 0 15px hsla(145,100%,50%,0.4)" : isFailed ? "0 0 15px hsla(0,100%,50%,0.6)" : "none",
              cursor: (isRestored || isFailed) ? "not-allowed" : "pointer"
            }}
            whileHover={!(isRestored || isFailed) ? { scale: 1.08, boxShadow: `0 0 25px ${zone.glowColor}`, y: -4 } : {}}
            whileTap={!(isRestored || isFailed) ? { scale: 0.95 } : {}}
          >
            <span className="text-base leading-none">{displayIcon}</span>
            <span className="text-[9px] font-bold tracking-widest" style={{ fontFamily: "'Orbitron', sans-serif", color: textColor }}>
              {isFailed ? "FAILED" : zone.label}
            </span>
          </motion.button>
        );
      })}
    </motion.div>
  );
}