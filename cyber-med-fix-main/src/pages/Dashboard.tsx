// // import { useState, useEffect, useRef } from "react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { BodyPart } from "@/lib/gameData";
// // import { saveScore, computeScore, useGameStore } from "@/lib/gameStore";
// // import HumanBody from "@/components/HumanBody";
// // import { QuestionModal } from "@/components/QuestionModal";
// // import { Clock, Activity, Save, AlertTriangle } from "lucide-react";

// // interface DashboardProps {
// //   studentName: string;
// //   onLogout: () => void;
// // }

// // const formatPartName = (part: string) => {
// //   return part.replace(/([A-Z])/g, ' $1').trim().toUpperCase();
// // };

// // export default function Dashboard({ studentName, onLogout }: DashboardProps) {
// //   const [gameOver, setGameOver] = useState(false);
// //   const [isSaving, setIsSaving] = useState(false);
// //   const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

// //   // FIXED: Pull ALL data from the persistent Zustand store, including time!
// //   const { 
// //     activePart, setActivePart, 
// //     curedParts, failedParts, 
// //     penalties, secondsElapsed, tick, resetGame 
// //   } = useGameStore();

// //   useEffect(() => {
// //     // FIXED: Removed resetGame() so it doesn't wipe memory on reload
// //     // We use the tick() function to update the permanent memory timer
// //     timerRef.current = setInterval(() => tick(), 1000);
// //     return () => { if (timerRef.current) clearInterval(timerRef.current); };
// //   }, [tick]);

// //   useEffect(() => {
// //     const totalAttempted = curedParts.length + failedParts.length;
// //     if (totalAttempted === 5) {
// //       if (timerRef.current) clearInterval(timerRef.current);
// //       setTimeout(() => setGameOver(true), 800);
// //     }
// //   }, [curedParts, failedParts]);

// //   function formatTime(s: number) {
// //     const m = Math.floor(s / 60).toString().padStart(2, "0");
// //     const sec = (s % 60).toString().padStart(2, "0");
// //     return `${m}:${sec}`;
// //   }

// //   const handleFinishAndSubmit = async () => {
// //     setIsSaving(true);
// //     // Use the persistent secondsElapsed here
// //     const score = computeScore(curedParts.length, secondsElapsed, penalties);
    
// //     await saveScore({ 
// //       name: studentName, 
// //       level: 1, 
// //       timeTaken: secondsElapsed, 
// //       organsRestored: curedParts.length, 
// //       totalScore: score 
// //     });
    
// //     // Wipe the memory ONLY after they successfully submit
// //     resetGame(); 
// //     onLogout();
// //   };

// //   const progress = ((curedParts.length + failedParts.length) / 5) * 100;
// //   const isPerfect = curedParts.length === 5;

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
// //           <div className="flex items-center gap-3">
// //             <span className="text-2xl"><img src="/doctor.jpeg" alt="Tech Doctor" className="w-16 h-16 object-cover rounded-md" /></span>
// //             <h1 className="text-lg font-black tracking-widest neon-cyan"
// //               style={{ fontFamily: "'Orbitron', sans-serif" }}>
// //               TECH DOCTOR
// //             </h1>
// //           </div>

// //           <div className="flex items-center gap-6">
// //             <div className="flex items-center gap-2">
// //               <Clock size={16} className="text-muted-foreground" />
// //               <span className="font-mono text-lg font-bold neon-cyan"
// //                 style={{ fontFamily: "'JetBrains Mono', monospace" }}>
// //                 {formatTime(secondsElapsed)}
// //               </span>
// //             </div>
// //             <div className="flex items-center gap-2">
// //               <Activity size={16} className="text-muted-foreground" />
// //               <span className="text-sm font-bold tracking-wider"
// //                 style={{ fontFamily: "'Orbitron', sans-serif", color: "hsl(var(--neon-magenta))" }}>
// //                 {curedParts.length}/5 CURED
// //               </span>
// //             </div>
// //             <div className="px-3 py-1.5 rounded-lg text-sm font-semibold tracking-wider"
// //               style={{
// //                 background: "hsla(186,100%,50%,0.1)",
// //                 border: "1px solid hsla(186,100%,50%,0.3)",
// //                 color: "hsl(var(--neon-cyan))",
// //                 fontFamily: "'Rajdhani', sans-serif",
// //               }}>
// //               👤 {studentName}
// //             </div>
// //           </div>
// //         </div>

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
// //         <motion.div className="hidden lg:block w-64 space-y-4" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
// //           <div className="glass-card rounded-xl p-4 glow-border-cyan">
// //             <h3 className="text-xs font-bold tracking-widest neon-cyan uppercase mb-3" style={{ fontFamily: "'Orbitron', sans-serif" }}>⚡ Mission Brief</h3>
// //             <p className="text-sm text-muted-foreground leading-relaxed">The patient's body has been corrupted by buggy code. Click on each body part to diagnose the issue and fix the bug.</p>
// //           </div>

// //           <div className="glass-card rounded-xl p-4 glow-border-magenta">
// //             <h3 className="text-xs font-bold tracking-widest uppercase mb-3" style={{ fontFamily: "'Orbitron', sans-serif", color: "hsl(var(--neon-magenta))" }}>📊 Status</h3>
// //             <div className="space-y-2">
// //               {(["head", "torso", "leftArm", "rightArm", "legs"] as BodyPart[]).map((part) => {
// //                 const isCured = curedParts.includes(part);
// //                 const isFailed = failedParts.includes(part);
// //                 return (
// //                   <div key={part} className="flex items-center justify-between">
// //                     <span className="text-xs text-muted-foreground font-mono">{formatPartName(part)}</span>
// //                     <span className="text-xs font-bold"
// //                       style={{ color: isCured ? "hsl(var(--neon-green))" : isFailed ? "hsl(var(--neon-crimson))" : "hsl(var(--muted-foreground))" }}>
// //                       {isCured ? "✅ FIXED" : isFailed ? "❌ FAILED" : "WAITING"}
// //                     </span>
// //                   </div>
// //                 );
// //               })}
// //             </div>
// //           </div>
// //         </motion.div>

// //         {/* Center: Human Body */}
// //         <motion.div className="flex flex-col items-center gap-6" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }}>
// //           <p className="text-xs tracking-[0.4em] text-muted-foreground uppercase">— Click a body part to treat —</p>
// //           <HumanBody restoredParts={curedParts} failedParts={failedParts} onPartClick={setActivePart as any} />
// //         </motion.div>

// //         {/* Right panel */}
// //         <motion.div className="hidden lg:block w-64 space-y-4" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
// //           <div className="glass-card rounded-xl p-4" style={{ border: "1px solid hsla(186,100%,50%,0.15)" }}>
// //             <h3 className="text-xs font-bold tracking-widest neon-cyan uppercase mb-3" style={{ fontFamily: "'Orbitron', sans-serif" }}>🎯 Score Preview</h3>
// //             <p className="text-2xl font-black neon-cyan" style={{ fontFamily: "'Orbitron', sans-serif" }}>
// //               {computeScore(curedParts.length, secondsElapsed, penalties).toLocaleString()}
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

// //       <AnimatePresence>
// //         {activePart && <QuestionModal key={activePart} />}
// //       </AnimatePresence>

// //       {/* Game Over Modal */}
// //       <AnimatePresence>
// //         {gameOver && (
// //           <motion.div
// //             className="fixed inset-0 z-50 flex items-center justify-center"
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             style={{ background: "rgba(0,0,0,0.95)", backdropFilter: "blur(12px)" }}
// //           >
// //             <motion.div
// //               className="glass-card rounded-2xl p-10 text-center max-w-sm w-full mx-4"
// //               style={{ border: `1px solid ${isPerfect ? 'hsl(var(--neon-green))' : 'hsl(var(--neon-crimson))'}`, boxShadow: `0 0 30px ${isPerfect ? 'hsla(145,100%,50%,0.2)' : 'hsla(348,100%,54%,0.2)'}` }}
// //               initial={{ scale: 0.5, rotateY: -30 }}
// //               animate={{ scale: 1, rotateY: 0 }}
// //               transition={{ type: "spring", stiffness: 200, damping: 20 }}
// //             >
// //               <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 1, repeat: 3 }} className="text-6xl mb-4">
// //                 {isPerfect ? '🎉' : '🩺'}
// //               </motion.div>
// //               <h2 className="text-2xl font-black mb-2" style={{ fontFamily: "'Orbitron', sans-serif", color: isPerfect ? "hsl(var(--neon-green))" : "hsl(var(--neon-crimson))" }}>
// //                 {isPerfect ? "PATIENT SAVED!" : "OPERATION FINISHED"}
// //               </h2>
// //               <p className="text-muted-foreground mb-6">
// //                 {isPerfect ? "All parts successfully restored" : `You saved ${curedParts.length} out of 5 parts.`}
// //               </p>
              
// //               <div className="glass-card rounded-xl p-4 mb-6 border border-slate-800">
// //                 <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Final Score</p>
// //                 <p className="text-3xl font-black neon-cyan" style={{ fontFamily: "'Orbitron', sans-serif" }}>
// //                   {computeScore(curedParts.length, secondsElapsed, penalties).toLocaleString()}
// //                 </p>
// //                 <p className="text-sm text-muted-foreground mt-1">Time: {formatTime(secondsElapsed)}</p>
// //               </div>
              
// //               <motion.button
// //                 onClick={handleFinishAndSubmit}
// //                 disabled={isSaving}
// //                 whileHover={{ scale: 1.05, y: -2 }}
// //                 whileTap={{ scale: 0.95 }}
// //                 className="btn-cyber w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-50"
// //                 style={{
// //                   background: isPerfect ? "hsl(var(--neon-green))" : "hsl(var(--neon-cyan))",
// //                   color: "hsl(var(--background))",
// //                   letterSpacing: "0.1em"
// //                 }}
// //               >
// //                 {isSaving ? <AlertTriangle size={18} className="animate-spin" /> : <Save size={18} />}
// //                 {isSaving ? "TRANSMITTING DATA..." : "FINISH & SUBMIT"}
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
// import { saveScore, computeScore, useGameStore, verifyAdminPassword } from "@/lib/gameStore";
// import HumanBody from "@/components/HumanBody";
// import { QuestionModal } from "@/components/QuestionModal";
// import { Clock, Activity, Save, AlertTriangle, LogOut, ShieldAlert, Lock } from "lucide-react";

// interface DashboardProps {
//   studentName: string;
//   onLogout: () => void;
// }

// const formatPartName = (part: string) => {
//   return part.replace(/([A-Z])/g, ' $1').trim().toUpperCase();
// };

// export default function Dashboard({ studentName, onLogout }: DashboardProps) {
//   const [gameOver, setGameOver] = useState(false);
//   const [isTimeout, setIsTimeout] = useState(false); // NEW: 30-minute state
//   const [isSaving, setIsSaving] = useState(false);
//   const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

//   // NEW: Admin Logout State
//   const [showLogoutModal, setShowLogoutModal] = useState(false);
//   const [adminPassword, setAdminPassword] = useState("");
//   const [logoutError, setLogoutError] = useState("");

//   const { 
//     activePart, setActivePart, 
//     curedParts, failedParts, 
//     penalties, secondsElapsed, tick, resetGame 
//   } = useGameStore();

//   // 1. Timer Execution (Stops if game over or timeout)
//   useEffect(() => {
//     if (!gameOver && !isTimeout) {
//       timerRef.current = setInterval(() => tick(), 1000);
//     }
//     return () => { if (timerRef.current) clearInterval(timerRef.current); };
//   }, [tick, gameOver, isTimeout]);

//   // 2. Normal Game Over Check (All 5 parts attempted)
//   useEffect(() => {
//     const totalAttempted = curedParts.length + failedParts.length;
//     if (totalAttempted === 5 && !isTimeout) {
//       if (timerRef.current) clearInterval(timerRef.current);
//       setTimeout(() => setGameOver(true), 800);
//     }
//   }, [curedParts, failedParts, isTimeout]);

//   // 3. 30-Minute Auto-End & Auto-Save Check (900 seconds)
//   useEffect(() => {
//     if (secondsElapsed >= 900 && !gameOver && !isTimeout) {
//       if (timerRef.current) clearInterval(timerRef.current);
//       setIsTimeout(true);
      
//       // Immediately save to Firebase so data isn't lost if they abandon the PC
//       const autoSaveTimeout = async () => {
//         const score = computeScore(curedParts.length, 900, penalties);
//         await saveScore({ 
//           name: studentName, 
//           level: 1, 
//           timeTaken: 900, 
//           organsRestored: curedParts.length, 
//           totalScore: score 
//         });
//       };
//       autoSaveTimeout();
//     }
//   }, [secondsElapsed, gameOver, isTimeout, studentName, curedParts.length, penalties]);

//   function formatTime(s: number) {
//     const m = Math.floor(s / 60).toString().padStart(2, "0");
//     const sec = (s % 60).toString().padStart(2, "0");
//     return `${m}:${sec}`;
//   }

//   // Submit button for normal finishes
//   const handleFinishAndSubmit = async () => {
//     setIsSaving(true);
//     const score = computeScore(curedParts.length, secondsElapsed, penalties);
    
//     await saveScore({ 
//       name: studentName, 
//       level: 1, 
//       timeTaken: secondsElapsed, 
//       organsRestored: curedParts.length, 
//       totalScore: score 
//     });
    
//     resetGame(); 
//     onLogout();
//   };

//   // Submit button for Admin Logout
//   const handleAdminLogoutSubmit = () => {
//     if (verifyAdminPassword(adminPassword)) {
//       resetGame(); // Wipes memory for the next user
//       onLogout();
//     } else {
//       setLogoutError("ACCESS DENIED: Invalid Passkey");
//     }
//   };

//   const progress = ((curedParts.length + failedParts.length) / 5) * 100;
//   const isPerfect = curedParts.length === 5;

//   return (
//     <div className="relative min-h-screen flex flex-col overflow-hidden"
//       style={{ background: "hsl(var(--background))" }}>

//       {/* Top bar */}
//       <motion.header
//         className="relative z-10 glass-card border-b px-6 py-3"
//         style={{ borderColor: "hsla(186,100%,50%,0.2)" }}
//         initial={{ y: -60, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.6 }}
//       >
//         <div className="flex items-center justify-between max-w-6xl mx-auto">
//           <div className="flex items-center gap-3">
//             <span className="text-2xl"><img src="/doctor.jpeg" alt="Tech Doctor" className="w-16 h-16 object-cover rounded-md" /></span>
//             <h1 className="text-lg font-black tracking-widest neon-cyan"
//               style={{ fontFamily: "'Orbitron', sans-serif" }}>
//               TECH DOCTOR
//             </h1>
//           </div>

//           <div className="flex items-center gap-6">
//             <div className="flex items-center gap-2">
//               <Clock size={16} className="text-muted-foreground" />
//               <span className="font-mono text-lg font-bold neon-cyan"
//                 style={{ fontFamily: "'JetBrains Mono', monospace", color: secondsElapsed >= 720 ? "hsl(var(--neon-crimson))" : "" }}>
//                 {formatTime(secondsElapsed)}
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
            
//             {/* Admin-Only Logout Button */}
//             <motion.button
//               onClick={() => setShowLogoutModal(true)}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="p-2 rounded-lg text-muted-foreground hover:text-white transition-colors"
//               style={{ border: "1px solid hsla(186,100%,50%,0.2)" }}
//             >
//               <LogOut size={16} />
//             </motion.button>
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
//           <HumanBody restoredParts={curedParts} failedParts={failedParts} onPartClick={setActivePart as any} />
//         </motion.div>

//         {/* Right panel */}
//         <motion.div className="hidden lg:block w-64 space-y-4" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
//           <div className="glass-card rounded-xl p-4" style={{ border: "1px solid hsla(186,100%,50%,0.15)" }}>
//             <h3 className="text-xs font-bold tracking-widest neon-cyan uppercase mb-3" style={{ fontFamily: "'Orbitron', sans-serif" }}>🎯 Score Preview</h3>
//             <p className="text-2xl font-black neon-cyan" style={{ fontFamily: "'Orbitron', sans-serif" }}>
//               {computeScore(curedParts.length, Math.min(secondsElapsed, 900), penalties).toLocaleString()}
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

//       {/* Admin Logout Passkey Modal */}
//       <AnimatePresence>
//         {showLogoutModal && (
//           <motion.div
//             className="fixed inset-0 z-50 flex items-center justify-center"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
//           >
//             <motion.div
//               className="glass-card rounded-2xl p-8 text-center max-w-sm w-full mx-4 border-red-500/30 glow-border-crimson"
//               initial={{ scale: 0.9, y: 20 }}
//               animate={{ scale: 1, y: 0 }}
//               exit={{ scale: 0.9, y: 20 }}
//             >
//               <ShieldAlert className="mx-auto text-red-500 mb-4" size={40} />
//               <h2 className="text-xl font-black mb-2 uppercase neon-crimson" style={{ fontFamily: "'Orbitron', sans-serif" }}>
//                 Admin Override
//               </h2>
//               <p className="text-muted-foreground text-sm mb-6">Enter passkey to abort the current session.</p>
              
//               <input
//                 type="password"
//                 className="input-cyber w-full px-4 py-3 rounded-lg mb-4 text-center tracking-[0.3em] font-mono"
//                 placeholder="ADMIN PASSKEY"
//                 value={adminPassword}
//                 onChange={(e) => setAdminPassword(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && handleAdminLogoutSubmit()}
//               />
              
//               <div className="flex gap-3">
//                 <button
//                   onClick={() => {
//                       setShowLogoutModal(false);
//                       setAdminPassword("");
//                       setLogoutError("");
//                   }}
//                   className="flex-1 py-3 rounded-xl text-sm font-bold tracking-widest text-muted-foreground hover:text-white transition-colors"
//                 >
//                   CANCEL
//                 </button>
//                 <button
//                   onClick={handleAdminLogoutSubmit}
//                   className="flex-1 btn-cyber py-3 rounded-xl text-sm font-bold tracking-widest flex items-center justify-center gap-2"
//                   style={{ background: "hsl(var(--neon-crimson))", color: "white" }}
//                 >
//                   <Lock size={14} /> ABORT
//                 </button>
//               </div>
              
//               {logoutError && <p className="mt-4 text-sm font-bold font-mono text-red-500">{logoutError}</p>}
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Game Over / 30-Minute Timeout Modal */}
//       <AnimatePresence>
//         {(gameOver || isTimeout) && (
//           <motion.div
//             className="fixed inset-0 z-50 flex items-center justify-center"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             style={{ background: "rgba(0,0,0,0.95)", backdropFilter: "blur(12px)" }}
//           >
//             <motion.div
//               className="glass-card rounded-2xl p-10 text-center max-w-sm w-full mx-4"
//               style={{ border: `1px solid ${isTimeout ? 'hsl(var(--neon-amber))' : isPerfect ? 'hsl(var(--neon-green))' : 'hsl(var(--neon-crimson))'}`, boxShadow: `0 0 30px ${isTimeout ? 'hsla(45,100%,50%,0.2)' : isPerfect ? 'hsla(145,100%,50%,0.2)' : 'hsla(348,100%,54%,0.2)'}` }}
//               initial={{ scale: 0.5, rotateY: -30 }}
//               animate={{ scale: 1, rotateY: 0 }}
//               transition={{ type: "spring", stiffness: 200, damping: 20 }}
//             >
//               <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 1, repeat: 3 }} className="text-6xl mb-4">
//                 {isTimeout ? '⏳' : isPerfect ? '🎉' : '🩺'}
//               </motion.div>
//               <h2 className="text-2xl font-black mb-2" style={{ fontFamily: "'Orbitron', sans-serif", color: isTimeout ? "hsl(var(--neon-amber))" : isPerfect ? "hsl(var(--neon-green))" : "hsl(var(--neon-crimson))" }}>
//                 {isTimeout ? "TIME LIMIT EXCEEDED" : isPerfect ? "PATIENT SAVED!" : "OPERATION FINISHED"}
//               </h2>
//               <p className="text-muted-foreground mb-6">
//                 {isTimeout ? "15 minutes elapsed. Session auto-terminated." : isPerfect ? "All parts successfully restored." : `You saved ${curedParts.length} out of 5 parts.`}
//               </p>
              
//               <div className="glass-card rounded-xl p-4 mb-6 border border-slate-800">
//                 <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Final Score</p>
//                 <p className="text-3xl font-black neon-cyan" style={{ fontFamily: "'Orbitron', sans-serif" }}>
//                   {computeScore(curedParts.length, Math.min(secondsElapsed, 900), penalties).toLocaleString()}
//                 </p>
//                 <p className="text-sm text-muted-foreground mt-1">Time: {formatTime(Math.min(secondsElapsed, 900))}</p>
//               </div>
              
//               <motion.button
//                 onClick={isTimeout ? () => { resetGame(); onLogout(); } : handleFinishAndSubmit}
//                 disabled={isSaving && !isTimeout}
//                 whileHover={{ scale: 1.05, y: -2 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="btn-cyber w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-50"
//                 style={{
//                   background: isTimeout ? "hsl(var(--neon-amber))" : isPerfect ? "hsl(var(--neon-green))" : "hsl(var(--neon-cyan))",
//                   color: isTimeout ? "black" : "hsl(var(--background))",
//                   letterSpacing: "0.1em"
//                 }}
//               >
//                 {isTimeout ? (
//                    <> <LogOut size={18} /> ACKNOWLEDGE & EXIT </>
//                 ) : (
//                    <> 
//                      {isSaving ? <AlertTriangle size={18} className="animate-spin" /> : <Save size={18} />}
//                      {isSaving ? "TRANSMITTING DATA..." : "FINISH & SUBMIT"}
//                    </>
//                 )}
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
import { saveScore, useGameStore, verifyAdminPassword } from "@/lib/gameStore";
import HumanBody from "@/components/HumanBody";
import { QuestionModal } from "@/components/QuestionModal";
import { Clock, Activity, Save, AlertTriangle, LogOut, ShieldAlert, Lock } from "lucide-react";

interface DashboardProps {
  studentName: string;
  onLogout: () => void;
}

const formatPartName = (part: string) => {
  return part.replace(/([A-Z])/g, ' $1').trim().toUpperCase();
};

export default function Dashboard({ studentName, onLogout }: DashboardProps) {
  const [gameOver, setGameOver] = useState(false);
  const [isTimeout, setIsTimeout] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [logoutError, setLogoutError] = useState("");

  const { 
    activePart, setActivePart, 
    curedParts, failedParts, 
    secondsElapsed, tick, resetGame, score // Pulled LIVE Score
  } = useGameStore();

  useEffect(() => {
    if (!gameOver && !isTimeout) {
      timerRef.current = setInterval(() => tick(), 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [tick, gameOver, isTimeout]);

  useEffect(() => {
    const totalAttempted = curedParts.length + failedParts.length;
    if (totalAttempted === 5 && !isTimeout) {
      if (timerRef.current) clearInterval(timerRef.current);
      setTimeout(() => setGameOver(true), 800);
    }
  }, [curedParts, failedParts, isTimeout]);

  useEffect(() => {
    if (secondsElapsed >= 900 && !gameOver && !isTimeout) {
      if (timerRef.current) clearInterval(timerRef.current);
      setIsTimeout(true);
      
      const autoSaveTimeout = async () => {
        await saveScore({ 
          name: studentName, 
          level: 1, 
          timeTaken: 900, 
          organsRestored: curedParts.length, 
          totalScore: score 
        });
      };
      autoSaveTimeout();
    }
  }, [secondsElapsed, gameOver, isTimeout, studentName, curedParts.length, score]);

  function formatTime(s: number) {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  }

  const handleFinishAndSubmit = async () => {
    setIsSaving(true);
    await saveScore({ 
      name: studentName, 
      level: 1, 
      timeTaken: secondsElapsed, 
      organsRestored: curedParts.length, 
      totalScore: score 
    });
    resetGame(); 
    onLogout();
  };

  const handleAdminLogoutSubmit = () => {
    if (verifyAdminPassword(adminPassword)) {
      resetGame(); 
      onLogout();
    } else {
      setLogoutError("ACCESS DENIED: Invalid Passkey");
    }
  };

  const progress = ((curedParts.length + failedParts.length) / 5) * 100;
  const isPerfect = curedParts.length === 5;

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden" style={{ background: "hsl(var(--background))" }}>

      <motion.header
        className="relative z-10 glass-card border-b px-6 py-3"
        style={{ borderColor: "hsla(186,100%,50%,0.2)" }}
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <span className="text-2xl"><img src="/doctor.jpeg" alt="Tech Doctor" className="w-16 h-16 object-cover rounded-md" /></span>
            <h1 className="text-lg font-black tracking-widest neon-cyan" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              TECH DOCTOR
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-muted-foreground" />
              <span className="font-mono text-lg font-bold neon-cyan"
                style={{ fontFamily: "'JetBrains Mono', monospace", color: secondsElapsed >= 720 ? "hsl(var(--neon-crimson))" : "" }}>
                {formatTime(secondsElapsed)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Activity size={16} className="text-muted-foreground" />
              <span className="text-sm font-bold tracking-wider" style={{ fontFamily: "'Orbitron', sans-serif", color: "hsl(var(--neon-magenta))" }}>
                {curedParts.length}/5 CURED
              </span>
            </div>
            <div className="px-3 py-1.5 rounded-lg text-sm font-semibold tracking-wider"
              style={{
                background: "hsla(186,100%,50%,0.1)", border: "1px solid hsla(186,100%,50%,0.3)",
                color: "hsl(var(--neon-cyan))", fontFamily: "'Rajdhani', sans-serif",
              }}>
              👤 {studentName}
            </div>
            
            <motion.button
              onClick={() => setShowLogoutModal(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg text-muted-foreground hover:text-white transition-colors"
              style={{ border: "1px solid hsla(186,100%,50%,0.2)" }}
            >
              <LogOut size={16} />
            </motion.button>
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

        <motion.div className="flex flex-col items-center gap-6" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }}>
          <p className="text-xs tracking-[0.4em] text-muted-foreground uppercase">— Click a body part to treat —</p>
          <HumanBody restoredParts={curedParts} failedParts={failedParts} onPartClick={setActivePart as any} />
        </motion.div>

        <motion.div className="hidden lg:block w-64 space-y-4" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
          <div className="glass-card rounded-xl p-4" style={{ border: "1px solid hsla(186,100%,50%,0.15)" }}>
            <h3 className="text-xs font-bold tracking-widest neon-cyan uppercase mb-3" style={{ fontFamily: "'Orbitron', sans-serif" }}>🎯 Live Score</h3>
            <p className="text-3xl font-black neon-cyan" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              {score.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Real-time diagnosis</p>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {activePart && <QuestionModal key={activePart} />}
      </AnimatePresence>

      <AnimatePresence>
        {showLogoutModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
          >
            <motion.div
              className="glass-card rounded-2xl p-8 text-center max-w-sm w-full mx-4 border-red-500/30 glow-border-crimson"
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
            >
              <ShieldAlert className="mx-auto text-red-500 mb-4" size={40} />
              <h2 className="text-xl font-black mb-2 uppercase neon-crimson" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                Admin Override
              </h2>
              <p className="text-muted-foreground text-sm mb-6">Enter passkey to abort the current session.</p>
              
              <input
                type="password"
                className="input-cyber w-full px-4 py-3 rounded-lg mb-4 text-center tracking-[0.3em] font-mono"
                placeholder="ADMIN PASSKEY"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAdminLogoutSubmit()}
              />
              
              <div className="flex gap-3">
                <button
                  onClick={() => { setShowLogoutModal(false); setAdminPassword(""); setLogoutError(""); }}
                  className="flex-1 py-3 rounded-xl text-sm font-bold tracking-widest text-muted-foreground hover:text-white transition-colors"
                >
                  CANCEL
                </button>
                <button
                  onClick={handleAdminLogoutSubmit}
                  className="flex-1 btn-cyber py-3 rounded-xl text-sm font-bold tracking-widest flex items-center justify-center gap-2"
                  style={{ background: "hsl(var(--neon-crimson))", color: "white" }}
                >
                  <Lock size={14} /> ABORT
                </button>
              </div>
              
              {logoutError && <p className="mt-4 text-sm font-bold font-mono text-red-500">{logoutError}</p>}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {(gameOver || isTimeout) && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ background: "rgba(0,0,0,0.95)", backdropFilter: "blur(12px)" }}
          >
            <motion.div
              className="glass-card rounded-2xl p-10 text-center max-w-sm w-full mx-4"
              style={{ border: `1px solid ${isTimeout ? 'hsl(var(--neon-amber))' : isPerfect ? 'hsl(var(--neon-green))' : 'hsl(var(--neon-crimson))'}`, boxShadow: `0 0 30px ${isTimeout ? 'hsla(45,100%,50%,0.2)' : isPerfect ? 'hsla(145,100%,50%,0.2)' : 'hsla(348,100%,54%,0.2)'}` }}
              initial={{ scale: 0.5, rotateY: -30 }} animate={{ scale: 1, rotateY: 0 }} transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 1, repeat: 3 }} className="text-6xl mb-4">
                {isTimeout ? '⏳' : isPerfect ? '🎉' : '🩺'}
              </motion.div>
              <h2 className="text-2xl font-black mb-2" style={{ fontFamily: "'Orbitron', sans-serif", color: isTimeout ? "hsl(var(--neon-amber))" : isPerfect ? "hsl(var(--neon-green))" : "hsl(var(--neon-crimson))" }}>
                {isTimeout ? "TIME LIMIT EXCEEDED" : isPerfect ? "PATIENT SAVED!" : "OPERATION FINISHED"}
              </h2>
              <p className="text-muted-foreground mb-6">
                {isTimeout ? "15 minutes elapsed. Session auto-terminated." : isPerfect ? "All parts successfully restored." : `You saved ${curedParts.length} out of 5 parts.`}
              </p>
              
              <div className="glass-card rounded-xl p-4 mb-6 border border-slate-800">
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Final Score</p>
                <p className="text-4xl font-black neon-cyan" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                  {score.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground mt-2">Time: {formatTime(Math.min(secondsElapsed, 900))}</p>
              </div>
              
              <motion.button
                onClick={isTimeout ? () => { resetGame(); onLogout(); } : handleFinishAndSubmit}
                disabled={isSaving && !isTimeout}
                whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}
                className="btn-cyber w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-50"
                style={{
                  background: isTimeout ? "hsl(var(--neon-amber))" : isPerfect ? "hsl(var(--neon-green))" : "hsl(var(--neon-cyan))",
                  color: isTimeout ? "black" : "hsl(var(--background))",
                  letterSpacing: "0.1em"
                }}
              >
                {isTimeout ? (
                   <> <LogOut size={18} /> ACKNOWLEDGE & EXIT </>
                ) : (
                   <> 
                     {isSaving ? <AlertTriangle size={18} className="animate-spin" /> : <Save size={18} />}
                     {isSaving ? "TRANSMITTING DATA..." : "FINISH & SUBMIT"}
                   </>
                )}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}