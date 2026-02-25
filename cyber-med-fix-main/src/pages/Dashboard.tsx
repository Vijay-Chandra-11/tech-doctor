// // // import { useState, useEffect, useRef } from "react";
// // // import { motion, AnimatePresence } from "framer-motion";
// // // import { BodyPart } from "@/lib/gameData";
// // // import { saveScore, computeScore, useGameStore } from "@/lib/gameStore";
// // // import HumanBody from "@/components/HumanBody";
// // // import QuestionModal from "@/components/QuestionModal"; // Fixed the import error!
// // // import { Clock, Activity, LogOut, Trophy } from "lucide-react";

// // // interface DashboardProps {
// // //   studentName: string;
// // //   onLogout: () => void;
// // // }

// // // // Helper to format body part IDs to readable text
// // // const formatPartName = (part: string) => {
// // //   return part.replace(/([A-Z])/g, ' $1').trim().toUpperCase();
// // // };

// // // export default function Dashboard({ studentName, onLogout }: DashboardProps) {
// // //   const [seconds, setSeconds] = useState(0);
// // //   const [gameOver, setGameOver] = useState(false);
// // //   const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

// // //   // Pull live state from Zustand store
// // //   const { activePart, setActivePart, curedParts, penalties, resetGame } = useGameStore();

// // //   useEffect(() => {
// // //     // Reset game state whenever a new player starts
// // //     resetGame();
// // //     timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
// // //     return () => { if (timerRef.current) clearInterval(timerRef.current); };
// // //   }, []);

// // //   useEffect(() => {
// // //     if (curedParts.length === 5) {
// // //       if (timerRef.current) clearInterval(timerRef.current);
// // //       const score = computeScore(5, seconds, penalties);
// // //       saveScore({ name: studentName, timeTaken: seconds, organsRestored: 5, totalScore: score });
// // //       setTimeout(() => setGameOver(true), 500);
// // //     }
// // //   }, [curedParts, seconds, penalties, studentName]);

// // //   function formatTime(s: number) {
// // //     const m = Math.floor(s / 60).toString().padStart(2, "0");
// // //     const sec = (s % 60).toString().padStart(2, "0");
// // //     return `${m}:${sec}`;
// // //   }

// // //   const progress = (curedParts.length / 5) * 100;

// // //   return (
// // //     <div className="relative min-h-screen flex flex-col overflow-hidden"
// // //       style={{ background: "hsl(var(--background))" }}>

// // //       {/* Top bar */}
// // //       <motion.header
// // //         className="relative z-10 glass-card border-b px-6 py-3"
// // //         style={{ borderColor: "hsla(186,100%,50%,0.2)" }}
// // //         initial={{ y: -60, opacity: 0 }}
// // //         animate={{ y: 0, opacity: 1 }}
// // //         transition={{ duration: 0.6 }}
// // //       >
// // //         <div className="flex items-center justify-between max-w-6xl mx-auto">
// // //           {/* Logo */}
// // //           <div className="flex items-center gap-3">
// // //             <span className="text-2xl">🏥</span>
// // //             <h1 className="text-lg font-black tracking-widest neon-cyan"
// // //               style={{ fontFamily: "'Orbitron', sans-serif" }}>
// // //               TECH DOCTOR
// // //             </h1>
// // //           </div>

// // //           {/* Stats */}
// // //           <div className="flex items-center gap-6">
// // //             {/* Timer */}
// // //             <div className="flex items-center gap-2">
// // //               <Clock size={16} className="text-muted-foreground" />
// // //               <span className="font-mono text-lg font-bold neon-cyan"
// // //                 style={{ fontFamily: "'JetBrains Mono', monospace" }}>
// // //                 {formatTime(seconds)}
// // //               </span>
// // //             </div>
// // //             {/* Organs */}
// // //             <div className="flex items-center gap-2">
// // //               <Activity size={16} className="text-muted-foreground" />
// // //               <span className="text-sm font-bold tracking-wider"
// // //                 style={{ fontFamily: "'Orbitron', sans-serif", color: "hsl(var(--neon-magenta))" }}>
// // //                 {curedParts.length}/5 PARTS
// // //               </span>
// // //             </div>
// // //             {/* Student name */}
// // //             <div className="px-3 py-1.5 rounded-lg text-sm font-semibold tracking-wider"
// // //               style={{
// // //                 background: "hsla(186,100%,50%,0.1)",
// // //                 border: "1px solid hsla(186,100%,50%,0.3)",
// // //                 color: "hsl(var(--neon-cyan))",
// // //                 fontFamily: "'Rajdhani', sans-serif",
// // //               }}>
// // //               👤 {studentName}
// // //             </div>
// // //             {/* Logout */}
// // //             <motion.button
// // //               onClick={onLogout}
// // //               whileHover={{ scale: 1.05 }}
// // //               whileTap={{ scale: 0.95 }}
// // //               className="p-2 rounded-lg text-muted-foreground hover:text-white transition-colors"
// // //               style={{ border: "1px solid hsla(186,100%,50%,0.2)" }}
// // //             >
// // //               <LogOut size={16} />
// // //             </motion.button>
// // //           </div>
// // //         </div>

// // //         {/* Progress bar */}
// // //         <div className="mt-2 max-w-6xl mx-auto">
// // //           <div className="h-1 rounded-full bg-muted overflow-hidden">
// // //             <motion.div
// // //               className="h-full rounded-full"
// // //               style={{ background: "linear-gradient(90deg, hsl(var(--neon-cyan)), hsl(var(--neon-magenta)), hsl(var(--neon-crimson)))" }}
// // //               animate={{ width: `${progress}%` }}
// // //               transition={{ duration: 0.8, ease: "easeOut" }}
// // //             />
// // //           </div>
// // //         </div>
// // //       </motion.header>

// // //       {/* Main content */}
// // //       <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-8 p-6">

// // //         {/* Left panel: Instructions */}
// // //         <motion.div
// // //           className="hidden lg:block w-64 space-y-4"
// // //           initial={{ opacity: 0, x: -40 }}
// // //           animate={{ opacity: 1, x: 0 }}
// // //           transition={{ duration: 0.7, delay: 0.2 }}
// // //         >
// // //           <div className="glass-card rounded-xl p-4 glow-border-cyan">
// // //             <h3 className="text-xs font-bold tracking-widest neon-cyan uppercase mb-3"
// // //               style={{ fontFamily: "'Orbitron', sans-serif" }}>
// // //               ⚡ Mission Brief
// // //             </h3>
// // //             <p className="text-sm text-muted-foreground leading-relaxed">
// // //               The patient's body has been corrupted by buggy code. Click on each body part to diagnose the issue and fix the bug.
// // //             </p>
// // //           </div>

// // //           <div className="glass-card rounded-xl p-4 glow-border-magenta">
// // //             <h3 className="text-xs font-bold tracking-widest uppercase mb-3"
// // //               style={{ fontFamily: "'Orbitron', sans-serif", color: "hsl(var(--neon-magenta))" }}>
// // //               📊 Status
// // //             </h3>
// // //             <div className="space-y-2">
// // //               {(["head", "torso", "leftArm", "rightArm", "legs"] as BodyPart[]).map((part) => (
// // //                 <div key={part} className="flex items-center justify-between">
// // //                   <span className="text-xs text-muted-foreground font-mono">{formatPartName(part)}</span>
// // //                   <span className="text-xs font-bold"
// // //                     style={{ color: curedParts.includes(part) ? "hsl(var(--neon-green))" : "hsl(var(--neon-crimson))" }}>
// // //                     {curedParts.includes(part) ? "✅ FIXED" : "⚠ BROKEN"}
// // //                   </span>
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           </div>
// // //         </motion.div>

// // //         {/* Center: Human Body */}
// // //         <motion.div
// // //           className="flex flex-col items-center gap-6"
// // //           initial={{ opacity: 0, scale: 0.8 }}
// // //           animate={{ opacity: 1, scale: 1 }}
// // //           transition={{ duration: 0.7, delay: 0.1 }}
// // //         >
// // //           <p className="text-xs tracking-[0.4em] text-muted-foreground uppercase">
// // //             — Click a body part to treat —
// // //           </p>
// // //           <HumanBody restoredParts={curedParts} onPartClick={setActivePart as any} />
// // //         </motion.div>

// // //         {/* Right panel: Only Score Preview remains */}
// // //         <motion.div
// // //           className="hidden lg:block w-64 space-y-4"
// // //           initial={{ opacity: 0, x: 40 }}
// // //           animate={{ opacity: 1, x: 0 }}
// // //           transition={{ duration: 0.7, delay: 0.3 }}
// // //         >
// // //           <div className="glass-card rounded-xl p-4" style={{ border: "1px solid hsla(186,100%,50%,0.15)" }}>
// // //             <h3 className="text-xs font-bold tracking-widest neon-cyan uppercase mb-3"
// // //               style={{ fontFamily: "'Orbitron', sans-serif" }}>
// // //               🎯 Score Preview
// // //             </h3>
// // //             <p className="text-2xl font-black neon-cyan" style={{ fontFamily: "'Orbitron', sans-serif" }}>
// // //               {computeScore(curedParts.length, seconds, penalties).toLocaleString()}
// // //             </p>
// // //             <p className="text-xs text-muted-foreground mt-1">Base + time bonus</p>
// // //             {penalties > 0 && (
// // //               <p className="text-xs text-red-400 font-bold mt-2 border-t border-slate-800 pt-2">
// // //                 Penalties: {penalties} (-{penalties * 120}s)
// // //               </p>
// // //             )}
// // //           </div>
// // //         </motion.div>
// // //       </div>

// // //       {/* Question Modal (No props needed since it reads from Zustand) */}
// // //       <AnimatePresence>
// // //         {activePart && (
// // //           <QuestionModal key={activePart} />
// // //         )}
// // //       </AnimatePresence>

// // //       {/* Game Over Modal */}
// // //       <AnimatePresence>
// // //         {gameOver && (
// // //           <motion.div
// // //             className="fixed inset-0 z-50 flex items-center justify-center"
// // //             initial={{ opacity: 0 }}
// // //             animate={{ opacity: 1 }}
// // //             style={{ background: "rgba(0,0,0,0.9)", backdropFilter: "blur(12px)" }}
// // //           >
// // //             <motion.div
// // //               className="glass-card rounded-2xl p-10 text-center max-w-sm w-full mx-4 glow-border-cyan"
// // //               initial={{ scale: 0.5, rotateY: -30 }}
// // //               animate={{ scale: 1, rotateY: 0 }}
// // //               transition={{ type: "spring", stiffness: 200, damping: 20 }}
// // //             >
// // //               <motion.div
// // //                 animate={{ rotate: [0, 5, -5, 0] }}
// // //                 transition={{ duration: 1, repeat: 3 }}
// // //                 className="text-6xl mb-4"
// // //               >
// // //                 🎉
// // //               </motion.div>
// // //               <h2 className="text-2xl font-black neon-green mb-2"
// // //                 style={{ fontFamily: "'Orbitron', sans-serif" }}>
// // //                 PATIENT SAVED!
// // //               </h2>
// // //               <p className="text-muted-foreground mb-6">All parts successfully restored</p>
// // //               <div className="glass-card rounded-xl p-4 mb-6 glow-border-cyan">
// // //                 <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Final Score</p>
// // //                 <p className="text-3xl font-black neon-cyan" style={{ fontFamily: "'Orbitron', sans-serif" }}>
// // //                   {computeScore(5, seconds, penalties).toLocaleString()}
// // //                 </p>
// // //                 <p className="text-sm text-muted-foreground mt-1">Time: {formatTime(seconds)}</p>
// // //               </div>
// // //               <motion.button
// // //                 onClick={onLogout}
// // //                 whileHover={{ scale: 1.05, y: -2 }}
// // //                 whileTap={{ scale: 0.95 }}
// // //                 className="btn-cyber w-full py-3 rounded-xl text-sm flex items-center justify-center gap-2"
// // //                 style={{
// // //                   background: "linear-gradient(135deg, hsl(var(--neon-cyan)), hsl(var(--neon-magenta)))",
// // //                   color: "hsl(var(--background))",
// // //                   boxShadow: "0 0 20px hsla(186,100%,50%,0.4)",
// // //                 }}
// // //               >
// // //                 <Trophy size={16} />
// // //                 BACK TO LOBBY
// // //               </motion.button>
// // //             </motion.div>
// // //           </motion.div>
// // //         )}
// // //       </AnimatePresence>
// // //     </div>
// // //   );
// // // }

// // import { useState, useEffect, useRef } from "react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { BodyPart } from "@/lib/gameData";
// // import { saveScore, computeScore, useGameStore } from "@/lib/gameStore";
// // import HumanBody from "@/components/HumanBody";
// // import { QuestionModal } from "@/components/QuestionModal";
// // import { Clock, Activity, LogOut, Save } from "lucide-react";

// // interface DashboardProps {
// //   studentName: string;
// //   onLogout: () => void;
// // }

// // // Helper to format body part IDs to readable text
// // const formatPartName = (part: string) => {
// //   return part.replace(/([A-Z])/g, ' $1').trim().toUpperCase();
// // };

// // export default function Dashboard({ studentName, onLogout }: DashboardProps) {
// //   const [seconds, setSeconds] = useState(0);
// //   const [gameOver, setGameOver] = useState(false);
// //   const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

// //   // Pull live state from Zustand store
// //   const { activePart, setActivePart, curedParts, failedParts, penalties, resetGame } = useGameStore();

// //   useEffect(() => {
// //     // Reset game state whenever a new player starts
// //     resetGame();
// //     timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
// //     return () => { if (timerRef.current) clearInterval(timerRef.current); };
// //   }, []);

// //   useEffect(() => {
// //     if (curedParts.length === 5) {
// //       // Just stop the timer and show the modal. DO NOT save yet.
// //       if (timerRef.current) clearInterval(timerRef.current);
// //       setTimeout(() => setGameOver(true), 500);
// //     }
// //   }, [curedParts]);

// //   function formatTime(s: number) {
// //     const m = Math.floor(s / 60).toString().padStart(2, "0");
// //     const sec = (s % 60).toString().padStart(2, "0");
// //     return `${m}:${sec}`;
// //   }

// //   // Handle final submission to the database
// //   const handleFinishAndSubmit = async () => {
// //     const score = computeScore(5, seconds, penalties);
    
// //     // Make sure StudentScore in gameData.ts has "level: number" added to it!
// //     await saveScore({ 
// //       name: studentName, 
// //       level: 1, // You can make this dynamic later based on your level logic
// //       timeTaken: seconds, 
// //       organsRestored: 5, 
// //       totalScore: score 
// //     });
    
// //     // Return to the login screen after successful submission
// //     onLogout();
// //   };

// //   const progress = (curedParts.length / 5) * 100;

// //   return (
// //     <div className="relative min-h-screen flex flex-col overflow-hidden"
// //       style={{ background: "hsl(var(--background))" }}>

// //       {/* Top bar */}
// //       <motion.header
// //         className="relative z-10 glass-card border-b px-6 py-3"
// //         style={{ borderColor: "hsla(186,100%,50%,0.2)" }}
// //         initial={{ y: -60, opacity: 0 }}
// //         animate={{ y: 0, opacity: 1 }}
// //         transition={{ duration: 0.6 }}
// //       >
// //         <div className="flex items-center justify-between max-w-6xl mx-auto">
// //           {/* Logo */}
// //           <div className="flex items-center gap-3">
// //             <span className="text-2xl">🏥</span>
// //             <h1 className="text-lg font-black tracking-widest neon-cyan"
// //               style={{ fontFamily: "'Orbitron', sans-serif" }}>
// //               TECH DOCTOR
// //             </h1>
// //           </div>

// //           {/* Stats */}
// //           <div className="flex items-center gap-6">
// //             {/* Timer */}
// //             <div className="flex items-center gap-2">
// //               <Clock size={16} className="text-muted-foreground" />
// //               <span className="font-mono text-lg font-bold neon-cyan"
// //                 style={{ fontFamily: "'JetBrains Mono', monospace" }}>
// //                 {formatTime(seconds)}
// //               </span>
// //             </div>
// //             {/* Organs */}
// //             <div className="flex items-center gap-2">
// //               <Activity size={16} className="text-muted-foreground" />
// //               <span className="text-sm font-bold tracking-wider"
// //                 style={{ fontFamily: "'Orbitron', sans-serif", color: "hsl(var(--neon-magenta))" }}>
// //                 {curedParts.length}/5 PARTS
// //               </span>
// //             </div>
// //             {/* Student name */}
// //             <div className="px-3 py-1.5 rounded-lg text-sm font-semibold tracking-wider"
// //               style={{
// //                 background: "hsla(186,100%,50%,0.1)",
// //                 border: "1px solid hsla(186,100%,50%,0.3)",
// //                 color: "hsl(var(--neon-cyan))",
// //                 fontFamily: "'Rajdhani', sans-serif",
// //               }}>
// //               👤 {studentName}
// //             </div>
// //             {/* Logout (Quit without saving) */}
// //             <motion.button
// //               onClick={onLogout}
// //               whileHover={{ scale: 1.05 }}
// //               whileTap={{ scale: 0.95 }}
// //               className="p-2 rounded-lg text-muted-foreground hover:text-white transition-colors"
// //               style={{ border: "1px solid hsla(186,100%,50%,0.2)" }}
// //             >
// //               <LogOut size={16} />
// //             </motion.button>
// //           </div>
// //         </div>

// //         {/* Progress bar */}
// //         <div className="mt-2 max-w-6xl mx-auto">
// //           <div className="h-1 rounded-full bg-muted overflow-hidden">
// //             <motion.div
// //               className="h-full rounded-full"
// //               style={{ background: "linear-gradient(90deg, hsl(var(--neon-cyan)), hsl(var(--neon-magenta)), hsl(var(--neon-crimson)))" }}
// //               animate={{ width: `${progress}%` }}
// //               transition={{ duration: 0.8, ease: "easeOut" }}
// //             />
// //           </div>
// //         </div>
// //       </motion.header>

// //       {/* Main content */}
// //       <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-8 p-6">

// //         {/* Left panel: Instructions */}
// //         <motion.div
// //           className="hidden lg:block w-64 space-y-4"
// //           initial={{ opacity: 0, x: -40 }}
// //           animate={{ opacity: 1, x: 0 }}
// //           transition={{ duration: 0.7, delay: 0.2 }}
// //         >
// //           <div className="glass-card rounded-xl p-4 glow-border-cyan">
// //             <h3 className="text-xs font-bold tracking-widest neon-cyan uppercase mb-3"
// //               style={{ fontFamily: "'Orbitron', sans-serif" }}>
// //               ⚡ Mission Brief
// //             </h3>
// //             <p className="text-sm text-muted-foreground leading-relaxed">
// //               The patient's body has been corrupted by buggy code. Click on each body part to diagnose the issue and fix the bug.
// //             </p>
// //           </div>

// //           <div className="glass-card rounded-xl p-4 glow-border-magenta">
// //             <h3 className="text-xs font-bold tracking-widest uppercase mb-3"
// //               style={{ fontFamily: "'Orbitron', sans-serif", color: "hsl(var(--neon-magenta))" }}>
// //               📊 Status
// //             </h3>
// //             <div className="space-y-2">
// //               {(["head", "torso", "leftArm", "rightArm", "legs"] as BodyPart[]).map((part) => (
// //                 <div key={part} className="flex items-center justify-between">
// //                   <span className="text-xs text-muted-foreground font-mono">{formatPartName(part)}</span>
// //                   <span className="text-xs font-bold"
// //                     style={{ color: curedParts.includes(part) ? "hsl(var(--neon-green))" : "hsl(var(--neon-crimson))" }}>
// //                     {curedParts.includes(part) ? "✅ FIXED" : "⚠ BROKEN"}
// //                   </span>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </motion.div>

// //         {/* Center: Human Body */}
// //         <motion.div
// //           className="flex flex-col items-center gap-6"
// //           initial={{ opacity: 0, scale: 0.8 }}
// //           animate={{ opacity: 1, scale: 1 }}
// //           transition={{ duration: 0.7, delay: 0.1 }}
// //         >
// //           <p className="text-xs tracking-[0.4em] text-muted-foreground uppercase">
// //             — Click a body part to treat —
// //           </p>
// //           <HumanBody restoredParts={curedParts} failedParts={failedParts} onPartClick={setActivePart as any} />
// //         </motion.div>

// //         {/* Right panel: Only Score Preview remains */}
// //         <motion.div
// //           className="hidden lg:block w-64 space-y-4"
// //           initial={{ opacity: 0, x: 40 }}
// //           animate={{ opacity: 1, x: 0 }}
// //           transition={{ duration: 0.7, delay: 0.3 }}
// //         >
// //           <div className="glass-card rounded-xl p-4" style={{ border: "1px solid hsla(186,100%,50%,0.15)" }}>
// //             <h3 className="text-xs font-bold tracking-widest neon-cyan uppercase mb-3"
// //               style={{ fontFamily: "'Orbitron', sans-serif" }}>
// //               🎯 Score Preview
// //             </h3>
// //             <p className="text-2xl font-black neon-cyan" style={{ fontFamily: "'Orbitron', sans-serif" }}>
// //               {computeScore(curedParts.length, seconds, penalties).toLocaleString()}
// //             </p>
// //             <p className="text-xs text-muted-foreground mt-1">Base + time bonus</p>
// //             {penalties > 0 && (
// //               <p className="text-xs text-red-400 font-bold mt-2 border-t border-slate-800 pt-2">
// //                 Penalties: {penalties} (-{penalties * 120}s)
// //               </p>
// //             )}
// //           </div>
// //         </motion.div>
// //       </div>

// //       {/* Question Modal */}
// //       <AnimatePresence>
// //         {activePart && (
// //           <QuestionModal key={activePart} />
// //         )}
// //       </AnimatePresence>

// //       {/* Game Over Modal */}
// //       <AnimatePresence>
// //         {gameOver && (
// //           <motion.div
// //             className="fixed inset-0 z-50 flex items-center justify-center"
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             style={{ background: "rgba(0,0,0,0.9)", backdropFilter: "blur(12px)" }}
// //           >
// //             <motion.div
// //               className="glass-card rounded-2xl p-10 text-center max-w-sm w-full mx-4 glow-border-cyan"
// //               initial={{ scale: 0.5, rotateY: -30 }}
// //               animate={{ scale: 1, rotateY: 0 }}
// //               transition={{ type: "spring", stiffness: 200, damping: 20 }}
// //             >
// //               <motion.div
// //                 animate={{ rotate: [0, 5, -5, 0] }}
// //                 transition={{ duration: 1, repeat: 3 }}
// //                 className="text-6xl mb-4"
// //               >
// //                 🎉
// //               </motion.div>
// //               <h2 className="text-2xl font-black neon-green mb-2"
// //                 style={{ fontFamily: "'Orbitron', sans-serif" }}>
// //                 PATIENT SAVED!
// //               </h2>
// //               <p className="text-muted-foreground mb-6">All parts successfully restored</p>
// //               <div className="glass-card rounded-xl p-4 mb-6 glow-border-cyan">
// //                 <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Final Score</p>
// //                 <p className="text-3xl font-black neon-cyan" style={{ fontFamily: "'Orbitron', sans-serif" }}>
// //                   {computeScore(5, seconds, penalties).toLocaleString()}
// //                 </p>
// //                 <p className="text-sm text-muted-foreground mt-1">Time: {formatTime(seconds)}</p>
// //               </div>
              
// //               {/* NEW SUBMIT BUTTON */}
// //               <motion.button
// //                 onClick={handleFinishAndSubmit}
// //                 whileHover={{ scale: 1.05, y: -2 }}
// //                 whileTap={{ scale: 0.95 }}
// //                 className="btn-cyber w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2"
// //                 style={{
// //                   background: "linear-gradient(135deg, hsl(var(--neon-cyan)), hsl(var(--neon-magenta)))",
// //                   color: "hsl(var(--background))",
// //                   boxShadow: "0 0 20px hsla(186,100%,50%,0.4)",
// //                   letterSpacing: "0.1em"
// //                 }}
// //               >
// //                 <Save size={18} />
// //                 FINISH & SUBMIT
// //               </motion.button>
// //             </motion.div>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>
// //     </div>
// //   );
// // }



// import { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { BodyPart } from "@/lib/gameData";
// import { saveScore, computeScore, useGameStore } from "@/lib/gameStore";
// import HumanBody from "@/components/HumanBody";
// import { QuestionModal } from "@/components/QuestionModal";
// import { Clock, Activity, Save, AlertTriangle } from "lucide-react";

// interface DashboardProps {
//   studentName: string;
//   onLogout: () => void;
// }

// const formatPartName = (part: string) => {
//   return part.replace(/([A-Z])/g, ' $1').trim().toUpperCase();
// };

// export default function Dashboard({ studentName, onLogout }: DashboardProps) {
//   const [seconds, setSeconds] = useState(0);
//   const [gameOver, setGameOver] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);
//   const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

//   // Pull live state from Zustand store (Added failedParts)
//   const { activePart, setActivePart, curedParts, failedParts, penalties, resetGame } = useGameStore();

//   useEffect(() => {
//     //resetGame();
//     timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
//     return () => { if (timerRef.current) clearInterval(timerRef.current); };
//   }, []);

//   // FIXED: The game is over when all 5 parts have been ATTEMPTED (cured + failed)
//   useEffect(() => {
//     const totalAttempted = curedParts.length + failedParts.length;
//     if (totalAttempted === 5) {
//       if (timerRef.current) clearInterval(timerRef.current);
//       setTimeout(() => setGameOver(true), 800);
//     }
//   }, [curedParts, failedParts]);

//   function formatTime(s: number) {
//     const m = Math.floor(s / 60).toString().padStart(2, "0");
//     const sec = (s % 60).toString().padStart(2, "0");
//     return `${m}:${sec}`;
//   }

//   // FIXED: Handles saving to Firebase
//   const handleFinishAndSubmit = async () => {
//     setIsSaving(true);
//     const score = computeScore(curedParts.length, seconds, penalties);
    
//     // Save to Firebase
//     await saveScore({ 
//       name: studentName, 
//       level: 1, // Defaulting to Level 1
//       timeTaken: seconds, 
//       organsRestored: curedParts.length, 
//       totalScore: score 
//     });
    
//     // Once saved, logout to return to the main screen
//     resetGame();
//     onLogout();
//   };

//   const progress = ((curedParts.length + failedParts.length) / 5) * 100;
//   const isPerfect = curedParts.length === 5;

//   return (
//     <div className="relative min-h-screen flex flex-col overflow-hidden"
//       style={{ background: "hsl(var(--background))" }}>

//       {/* Top bar (Logout Button Removed) */}
//       <motion.header
//         className="relative z-10 glass-card border-b px-6 py-3"
//         style={{ borderColor: "hsla(186,100%,50%,0.2)" }}
//         initial={{ y: -60, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.6 }}
//       >
//         <div className="flex items-center justify-between max-w-6xl mx-auto">
//           <div className="flex items-center gap-3">
//             <span className="text-2xl">🏥</span>
//             <h1 className="text-lg font-black tracking-widest neon-cyan"
//               style={{ fontFamily: "'Orbitron', sans-serif" }}>
//               TECH DOCTOR
//             </h1>
//           </div>

//           <div className="flex items-center gap-6">
//             <div className="flex items-center gap-2">
//               <Clock size={16} className="text-muted-foreground" />
//               <span className="font-mono text-lg font-bold neon-cyan"
//                 style={{ fontFamily: "'JetBrains Mono', monospace" }}>
//                 {formatTime(seconds)}
//               </span>
//             </div>
//             <div className="flex items-center gap-2">
//               <Activity size={16} className="text-muted-foreground" />
//               <span className="text-sm font-bold tracking-wider"
//                 style={{ fontFamily: "'Orbitron', sans-serif", color: "hsl(var(--neon-magenta))" }}>
//                 {curedParts.length}/5 CURED
//               </span>
//             </div>
//             <div className="px-3 py-1.5 rounded-lg text-sm font-semibold tracking-wider"
//               style={{
//                 background: "hsla(186,100%,50%,0.1)",
//                 border: "1px solid hsla(186,100%,50%,0.3)",
//                 color: "hsl(var(--neon-cyan))",
//                 fontFamily: "'Rajdhani', sans-serif",
//               }}>
//               👤 {studentName}
//             </div>
//           </div>
//         </div>

//         <div className="mt-2 max-w-6xl mx-auto">
//           <div className="h-1 rounded-full bg-muted overflow-hidden">
//             <motion.div
//               className="h-full rounded-full"
//               style={{ background: "linear-gradient(90deg, hsl(var(--neon-cyan)), hsl(var(--neon-magenta)), hsl(var(--neon-crimson)))" }}
//               animate={{ width: `${progress}%` }}
//               transition={{ duration: 0.8, ease: "easeOut" }}
//             />
//           </div>
//         </div>
//       </motion.header>

//       {/* Main content */}
//       <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-8 p-6">
//         <motion.div className="hidden lg:block w-64 space-y-4" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
//           <div className="glass-card rounded-xl p-4 glow-border-cyan">
//             <h3 className="text-xs font-bold tracking-widest neon-cyan uppercase mb-3" style={{ fontFamily: "'Orbitron', sans-serif" }}>⚡ Mission Brief</h3>
//             <p className="text-sm text-muted-foreground leading-relaxed">The patient's body has been corrupted by buggy code. Click on each body part to diagnose the issue and fix the bug.</p>
//           </div>

//           <div className="glass-card rounded-xl p-4 glow-border-magenta">
//             <h3 className="text-xs font-bold tracking-widest uppercase mb-3" style={{ fontFamily: "'Orbitron', sans-serif", color: "hsl(var(--neon-magenta))" }}>📊 Status</h3>
//             <div className="space-y-2">
//               {(["head", "torso", "leftArm", "rightArm", "legs"] as BodyPart[]).map((part) => {
//                 const isCured = curedParts.includes(part);
//                 const isFailed = failedParts.includes(part);
//                 return (
//                   <div key={part} className="flex items-center justify-between">
//                     <span className="text-xs text-muted-foreground font-mono">{formatPartName(part)}</span>
//                     <span className="text-xs font-bold"
//                       style={{ color: isCured ? "hsl(var(--neon-green))" : isFailed ? "hsl(var(--neon-crimson))" : "hsl(var(--muted-foreground))" }}>
//                       {isCured ? "✅ FIXED" : isFailed ? "❌ FAILED" : "WAITING"}
//                     </span>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </motion.div>

//         {/* Center: Human Body */}
//         <motion.div className="flex flex-col items-center gap-6" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }}>
//           <p className="text-xs tracking-[0.4em] text-muted-foreground uppercase">— Click a body part to treat —</p>
//           {/* Passed failedParts to HumanBody */}
//           <HumanBody restoredParts={curedParts} failedParts={failedParts} onPartClick={setActivePart as any} />
//         </motion.div>

//         {/* Right panel */}
//         <motion.div className="hidden lg:block w-64 space-y-4" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
//           <div className="glass-card rounded-xl p-4" style={{ border: "1px solid hsla(186,100%,50%,0.15)" }}>
//             <h3 className="text-xs font-bold tracking-widest neon-cyan uppercase mb-3" style={{ fontFamily: "'Orbitron', sans-serif" }}>🎯 Score Preview</h3>
//             <p className="text-2xl font-black neon-cyan" style={{ fontFamily: "'Orbitron', sans-serif" }}>
//               {computeScore(curedParts.length, seconds, penalties).toLocaleString()}
//             </p>
//             <p className="text-xs text-muted-foreground mt-1">Base + time bonus</p>
//             {penalties > 0 && (
//               <p className="text-xs text-red-400 font-bold mt-2 border-t border-slate-800 pt-2">
//                 Penalties: {penalties} (-{penalties * 120}s)
//               </p>
//             )}
//           </div>
//         </motion.div>
//       </div>

//       <AnimatePresence>
//         {activePart && <QuestionModal key={activePart} />}
//       </AnimatePresence>

//       {/* Game Over Modal */}
//       <AnimatePresence>
//         {gameOver && (
//           <motion.div
//             className="fixed inset-0 z-50 flex items-center justify-center"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             style={{ background: "rgba(0,0,0,0.95)", backdropFilter: "blur(12px)" }}
//           >
//             <motion.div
//               className="glass-card rounded-2xl p-10 text-center max-w-sm w-full mx-4"
//               style={{ border: `1px solid ${isPerfect ? 'hsl(var(--neon-green))' : 'hsl(var(--neon-crimson))'}`, boxShadow: `0 0 30px ${isPerfect ? 'hsla(145,100%,50%,0.2)' : 'hsla(348,100%,54%,0.2)'}` }}
//               initial={{ scale: 0.5, rotateY: -30 }}
//               animate={{ scale: 1, rotateY: 0 }}
//               transition={{ type: "spring", stiffness: 200, damping: 20 }}
//             >
//               <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 1, repeat: 3 }} className="text-6xl mb-4">
//                 {isPerfect ? '🎉' : '🩺'}
//               </motion.div>
//               <h2 className="text-2xl font-black mb-2" style={{ fontFamily: "'Orbitron', sans-serif", color: isPerfect ? "hsl(var(--neon-green))" : "hsl(var(--neon-crimson))" }}>
//                 {isPerfect ? "PATIENT SAVED!" : "OPERATION FINISHED"}
//               </h2>
//               <p className="text-muted-foreground mb-6">
//                 {isPerfect ? "All parts successfully restored" : `You saved ${curedParts.length} out of 5 parts.`}
//               </p>
              
//               <div className="glass-card rounded-xl p-4 mb-6 border border-slate-800">
//                 <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Final Score</p>
//                 <p className="text-3xl font-black neon-cyan" style={{ fontFamily: "'Orbitron', sans-serif" }}>
//                   {computeScore(curedParts.length, seconds, penalties).toLocaleString()}
//                 </p>
//                 <p className="text-sm text-muted-foreground mt-1">Time: {formatTime(seconds)}</p>
//               </div>
              
//               <motion.button
//                 onClick={handleFinishAndSubmit}
//                 disabled={isSaving}
//                 whileHover={{ scale: 1.05, y: -2 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="btn-cyber w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-50"
//                 style={{
//                   background: isPerfect ? "hsl(var(--neon-green))" : "hsl(var(--neon-cyan))",
//                   color: "hsl(var(--background))",
//                   letterSpacing: "0.1em"
//                 }}
//               >
//                 {isSaving ? <AlertTriangle size={18} className="animate-spin" /> : <Save size={18} />}
//                 {isSaving ? "TRANSMITTING DATA..." : "FINISH & SUBMIT"}
//               </motion.button>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }



import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BodyPart } from "@/lib/gameData";
import { saveScore, computeScore, useGameStore } from "@/lib/gameStore";
import HumanBody from "@/components/HumanBody";
import { QuestionModal } from "@/components/QuestionModal";
import { Clock, Activity, Save, AlertTriangle } from "lucide-react";

interface DashboardProps {
  studentName: string;
  onLogout: () => void;
}

const formatPartName = (part: string) => {
  return part.replace(/([A-Z])/g, ' $1').trim().toUpperCase();
};

export default function Dashboard({ studentName, onLogout }: DashboardProps) {
  const [gameOver, setGameOver] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // FIXED: Pull ALL data from the persistent Zustand store, including time!
  const { 
    activePart, setActivePart, 
    curedParts, failedParts, 
    penalties, secondsElapsed, tick, resetGame 
  } = useGameStore();

  useEffect(() => {
    // FIXED: Removed resetGame() so it doesn't wipe memory on reload
    // We use the tick() function to update the permanent memory timer
    timerRef.current = setInterval(() => tick(), 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [tick]);

  useEffect(() => {
    const totalAttempted = curedParts.length + failedParts.length;
    if (totalAttempted === 5) {
      if (timerRef.current) clearInterval(timerRef.current);
      setTimeout(() => setGameOver(true), 800);
    }
  }, [curedParts, failedParts]);

  function formatTime(s: number) {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  }

  const handleFinishAndSubmit = async () => {
    setIsSaving(true);
    // Use the persistent secondsElapsed here
    const score = computeScore(curedParts.length, secondsElapsed, penalties);
    
    await saveScore({ 
      name: studentName, 
      level: 1, 
      timeTaken: secondsElapsed, 
      organsRestored: curedParts.length, 
      totalScore: score 
    });
    
    // Wipe the memory ONLY after they successfully submit
    resetGame(); 
    onLogout();
  };

  const progress = ((curedParts.length + failedParts.length) / 5) * 100;
  const isPerfect = curedParts.length === 5;

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: "hsl(var(--background))" }}>

      {/* Top bar */}
      <motion.header
        className="relative z-10 glass-card border-b px-6 py-3"
        style={{ borderColor: "hsla(186,100%,50%,0.2)" }}
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏥</span>
            <h1 className="text-lg font-black tracking-widest neon-cyan"
              style={{ fontFamily: "'Orbitron', sans-serif" }}>
              TECH DOCTOR
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-muted-foreground" />
              <span className="font-mono text-lg font-bold neon-cyan"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                {formatTime(secondsElapsed)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Activity size={16} className="text-muted-foreground" />
              <span className="text-sm font-bold tracking-wider"
                style={{ fontFamily: "'Orbitron', sans-serif", color: "hsl(var(--neon-magenta))" }}>
                {curedParts.length}/5 CURED
              </span>
            </div>
            <div className="px-3 py-1.5 rounded-lg text-sm font-semibold tracking-wider"
              style={{
                background: "hsla(186,100%,50%,0.1)",
                border: "1px solid hsla(186,100%,50%,0.3)",
                color: "hsl(var(--neon-cyan))",
                fontFamily: "'Rajdhani', sans-serif",
              }}>
              👤 {studentName}
            </div>
          </div>
        </div>

        <div className="mt-2 max-w-6xl mx-auto">
          <div className="h-1 rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, hsl(var(--neon-cyan)), hsl(var(--neon-magenta)), hsl(var(--neon-crimson)))" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </div>
      </motion.header>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-8 p-6">
        <motion.div className="hidden lg:block w-64 space-y-4" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
          <div className="glass-card rounded-xl p-4 glow-border-cyan">
            <h3 className="text-xs font-bold tracking-widest neon-cyan uppercase mb-3" style={{ fontFamily: "'Orbitron', sans-serif" }}>⚡ Mission Brief</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">The patient's body has been corrupted by buggy code. Click on each body part to diagnose the issue and fix the bug.</p>
          </div>

          <div className="glass-card rounded-xl p-4 glow-border-magenta">
            <h3 className="text-xs font-bold tracking-widest uppercase mb-3" style={{ fontFamily: "'Orbitron', sans-serif", color: "hsl(var(--neon-magenta))" }}>📊 Status</h3>
            <div className="space-y-2">
              {(["head", "torso", "leftArm", "rightArm", "legs"] as BodyPart[]).map((part) => {
                const isCured = curedParts.includes(part);
                const isFailed = failedParts.includes(part);
                return (
                  <div key={part} className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground font-mono">{formatPartName(part)}</span>
                    <span className="text-xs font-bold"
                      style={{ color: isCured ? "hsl(var(--neon-green))" : isFailed ? "hsl(var(--neon-crimson))" : "hsl(var(--muted-foreground))" }}>
                      {isCured ? "✅ FIXED" : isFailed ? "❌ FAILED" : "WAITING"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Center: Human Body */}
        <motion.div className="flex flex-col items-center gap-6" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }}>
          <p className="text-xs tracking-[0.4em] text-muted-foreground uppercase">— Click a body part to treat —</p>
          <HumanBody restoredParts={curedParts} failedParts={failedParts} onPartClick={setActivePart as any} />
        </motion.div>

        {/* Right panel */}
        <motion.div className="hidden lg:block w-64 space-y-4" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
          <div className="glass-card rounded-xl p-4" style={{ border: "1px solid hsla(186,100%,50%,0.15)" }}>
            <h3 className="text-xs font-bold tracking-widest neon-cyan uppercase mb-3" style={{ fontFamily: "'Orbitron', sans-serif" }}>🎯 Score Preview</h3>
            <p className="text-2xl font-black neon-cyan" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              {computeScore(curedParts.length, secondsElapsed, penalties).toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Base + time bonus</p>
            {penalties > 0 && (
              <p className="text-xs text-red-400 font-bold mt-2 border-t border-slate-800 pt-2">
                Penalties: {penalties} (-{penalties * 120}s)
              </p>
            )}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {activePart && <QuestionModal key={activePart} />}
      </AnimatePresence>

      {/* Game Over Modal */}
      <AnimatePresence>
        {gameOver && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ background: "rgba(0,0,0,0.95)", backdropFilter: "blur(12px)" }}
          >
            <motion.div
              className="glass-card rounded-2xl p-10 text-center max-w-sm w-full mx-4"
              style={{ border: `1px solid ${isPerfect ? 'hsl(var(--neon-green))' : 'hsl(var(--neon-crimson))'}`, boxShadow: `0 0 30px ${isPerfect ? 'hsla(145,100%,50%,0.2)' : 'hsla(348,100%,54%,0.2)'}` }}
              initial={{ scale: 0.5, rotateY: -30 }}
              animate={{ scale: 1, rotateY: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 1, repeat: 3 }} className="text-6xl mb-4">
                {isPerfect ? '🎉' : '🩺'}
              </motion.div>
              <h2 className="text-2xl font-black mb-2" style={{ fontFamily: "'Orbitron', sans-serif", color: isPerfect ? "hsl(var(--neon-green))" : "hsl(var(--neon-crimson))" }}>
                {isPerfect ? "PATIENT SAVED!" : "OPERATION FINISHED"}
              </h2>
              <p className="text-muted-foreground mb-6">
                {isPerfect ? "All parts successfully restored" : `You saved ${curedParts.length} out of 5 parts.`}
              </p>
              
              <div className="glass-card rounded-xl p-4 mb-6 border border-slate-800">
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Final Score</p>
                <p className="text-3xl font-black neon-cyan" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                  {computeScore(curedParts.length, secondsElapsed, penalties).toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground mt-1">Time: {formatTime(secondsElapsed)}</p>
              </div>
              
              <motion.button
                onClick={handleFinishAndSubmit}
                disabled={isSaving}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="btn-cyber w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-50"
                style={{
                  background: isPerfect ? "hsl(var(--neon-green))" : "hsl(var(--neon-cyan))",
                  color: "hsl(var(--background))",
                  letterSpacing: "0.1em"
                }}
              >
                {isSaving ? <AlertTriangle size={18} className="animate-spin" /> : <Save size={18} />}
                {isSaving ? "TRANSMITTING DATA..." : "FINISH & SUBMIT"}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}