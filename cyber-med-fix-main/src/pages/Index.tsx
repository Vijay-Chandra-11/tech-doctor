// // import { useState } from "react";
// // import LoginPage from "./LoginPage";
// // import Dashboard from "./Dashboard";
// // import Leaderboard from "./Leaderboard";

// // type AppState = "login" | "game" | "leaderboard";

// // export default function Index() {
// //   const [state, setState] = useState<AppState>("login");
// //   const [studentName, setStudentName] = useState("");

// //   function handleStudentLogin(name: string) {
// //     setStudentName(name);
// //     setState("game");
// //   }

// //   function handleAdminLogin() {
// //     setState("leaderboard");
// //   }

// //   function handleLogout() {
// //     setStudentName("");
// //     setState("login");
// //   }

// //   if (state === "game") {
// //     return <Dashboard studentName={studentName} onLogout={handleLogout} />;
// //   }

// //   if (state === "leaderboard") {
// //     return <Leaderboard onLogout={handleLogout} />;
// //   }

// //   return <LoginPage onStudentLogin={handleStudentLogin} onAdminLogin={handleAdminLogin} />;
// // }





// import { useState, useEffect } from "react";
// import LoginPage from "./LoginPage";
// import Dashboard from "./Dashboard";
// import Leaderboard from "./Leaderboard";
// import { motion, AnimatePresence } from "framer-motion";
// import { verifyAdminPassword } from "@/lib/gameStore";
// import { Lock, ShieldAlert } from "lucide-react";
// import { getGameQuestions } from "@/lib/questionEngine";
// import { useGameStore } from "@/lib/gameStore";

// type AppState = "login" | "admin_gate" | "countdown" | "game" | "leaderboard";

// export default function Index() {
//   // FIXED: Initialize state from memory, default to "login" if nothing is saved
//   const [state, setState] = useState<AppState>(() => {
//     return (localStorage.getItem("tech_doctor_screen") as AppState) || "login";
//   });
  
//   // FIXED: Initialize student name from memory
//   const [studentName, setStudentName] = useState(() => {
//     return localStorage.getItem("tech_doctor_student") || "";
//   });

//   const [gatePassword, setGatePassword] = useState("");
//   const [gateError, setGateError] = useState("");
//   const [countdown, setCountdown] = useState(10);
  
//   const setCurrentQuestions = useGameStore((s) => s.setCurrentQuestions);

//   // FIXED: Whenever the screen state or student name changes, save it to memory immediately!
//   useEffect(() => {
//     localStorage.setItem("tech_doctor_screen", state);
//     localStorage.setItem("tech_doctor_student", studentName);
//   }, [state, studentName]);

//   function handleStudentLogin(name: string) {
//     setStudentName(name);
//     setState("admin_gate");
//   }

//   async function handleGateSubmit() {
//     if (verifyAdminPassword(gatePassword)) {
//       setGateError("");
//       setGatePassword("");
      
//       const questions = await getGameQuestions();
//       setCurrentQuestions(questions);
//       setState("countdown");
//     } else {
//       setGateError("ACCESS DENIED: Invalid Override Code");
//     }
//   }

//   useEffect(() => {
//     if (state === "countdown") {
//       setCountdown(10);
//       const timer = setInterval(() => {
//         setCountdown((prev) => {
//           if (prev <= 1) {
//             clearInterval(timer);
//             setState("game");
//             return 0;
//           }
//           return prev - 1;
//         });
//       }, 1000);
//       return () => clearInterval(timer);
//     }
//   }, [state]);

//   function handleAdminLogin() { setState("leaderboard"); }
  
//   function handleLogout() {
//     setStudentName("");
//     setState("login");
//   }

//   /* --- RENDER SCREENS --- */

//   if (state === "admin_gate") {
//     return (
//       <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "hsl(var(--background))" }}>
//         <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-8 rounded-2xl max-w-md w-full text-center" style={{ border: "1px solid hsla(348,100%,54%,0.3)", boxShadow: "0 0 30px hsla(348,100%,54%,0.2)" }}>
//           <ShieldAlert className="mx-auto mb-4" size={48} style={{ color: "hsl(var(--neon-crimson))" }} />
//           <h2 className="text-2xl font-black mb-2 uppercase" style={{ fontFamily: "'Orbitron', sans-serif", color: "hsl(var(--neon-crimson))" }}>Admin Override Required</h2>
//           <p className="text-muted-foreground text-sm mb-6">Instructor must authorize the session for <span className="text-white font-bold tracking-widest">{studentName}</span>.</p>
          
//           <input
//             type="password"
//             className="input-cyber w-full px-4 py-3 rounded-lg mb-4 text-center tracking-[0.3em] font-mono"
//             placeholder="ENTER AUTHORIZATION CODE"
//             value={gatePassword}
//             onChange={(e) => setGatePassword(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && handleGateSubmit()}
//           />
          
//           <button onClick={handleGateSubmit} className="btn-cyber w-full py-3 rounded-xl mb-4 font-bold tracking-widest flex items-center justify-center gap-2" style={{ background: "hsl(var(--neon-crimson))", color: "white" }}>
//             <Lock size={16} /> AUTHORIZE LAUNCH
//           </button>
          
//           <button onClick={handleLogout} className="text-xs text-muted-foreground hover:text-white underline tracking-widest uppercase">
//             Cancel & Return to Login
//           </button>
          
//           {gateError && <p className="mt-4 text-sm font-bold font-mono" style={{ color: "hsl(var(--neon-crimson))" }}>{gateError}</p>}
//         </motion.div>
//       </div>
//     );
//   }

//   if (state === "countdown") {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: "hsl(var(--background))" }}>
//         <p className="text-xl tracking-[0.5em] uppercase mb-8" style={{ fontFamily: "'Orbitron', sans-serif", color: "hsl(var(--neon-cyan))" }}>
//           PREPARING CYBER-SURGERY
//         </p>
//         <AnimatePresence mode="popLayout">
//           <motion.div 
//             key={countdown}
//             initial={{ opacity: 0, scale: 0.5 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 1.5 }}
//             transition={{ duration: 0.5 }}
//             className="text-[15rem] font-black leading-none"
//             style={{
//               fontFamily: "'Orbitron', sans-serif",
//               color: countdown <= 3 ? "hsl(var(--neon-crimson))" : "hsl(var(--neon-cyan))",
//               textShadow: `0 0 50px ${countdown <= 3 ? 'hsla(348,100%,54%,0.8)' : 'hsla(186,100%,50%,0.8)'}`
//             }}
//           >
//             {countdown}
//           </motion.div>
//         </AnimatePresence>
//         <p className="text-muted-foreground mt-8 font-mono animate-pulse tracking-widest">DO NOT TOUCH THE CONSOLE</p>
//       </div>
//     );
//   }

//   if (state === "game") return <Dashboard studentName={studentName} onLogout={handleLogout} />;
//   if (state === "leaderboard") return <Leaderboard onLogout={handleLogout} />;
  
//   return <LoginPage onStudentLogin={handleStudentLogin} onAdminLogin={handleAdminLogin} />;
// }



import { useState, useEffect } from "react";
import LoginPage from "./LoginPage";
import Dashboard from "./Dashboard";
import Leaderboard from "./Leaderboard";
import { motion, AnimatePresence } from "framer-motion";
import { verifyAdminPassword } from "@/lib/gameStore";
import { Lock, ShieldAlert } from "lucide-react";

type AppState = "login" | "admin_gate" | "countdown" | "game" | "leaderboard";

export default function Index() {
  const [state, setState] = useState<AppState>(() => {
    return (localStorage.getItem("tech_doctor_screen") as AppState) || "login";
  });
  
  const [studentName, setStudentName] = useState(() => {
    return localStorage.getItem("tech_doctor_student") || "";
  });

  const [gatePassword, setGatePassword] = useState("");
  const [gateError, setGateError] = useState("");
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    localStorage.setItem("tech_doctor_screen", state);
    localStorage.setItem("tech_doctor_student", studentName);
  }, [state, studentName]);

  function handleStudentLogin(name: string) {
    setStudentName(name);
    setState("admin_gate");
  }

  // FIXED: Simply verify the password and move to countdown. No more setCurrentQuestions!
  function handleGateSubmit() {
    if (verifyAdminPassword(gatePassword)) {
      setGateError("");
      setGatePassword("");
      setState("countdown");
    } else {
      setGateError("ACCESS DENIED: Invalid Override Code");
    }
  }

  useEffect(() => {
    if (state === "countdown") {
      setCountdown(10);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setState("game");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [state]);

  function handleAdminLogin() { setState("leaderboard"); }
  
  function handleLogout() {
    setStudentName("");
    setState("login");
  }

  /* --- RENDER SCREENS --- */

  if (state === "admin_gate") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "hsl(var(--background))" }}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-8 rounded-2xl max-w-md w-full text-center" style={{ border: "1px solid hsla(348,100%,54%,0.3)", boxShadow: "0 0 30px hsla(348,100%,54%,0.2)" }}>
          <ShieldAlert className="mx-auto mb-4" size={48} style={{ color: "hsl(var(--neon-crimson))" }} />
          <h2 className="text-2xl font-black mb-2 uppercase" style={{ fontFamily: "'Orbitron', sans-serif", color: "hsl(var(--neon-crimson))" }}>Admin Override Required</h2>
          <p className="text-muted-foreground text-sm mb-6">Instructor must authorize the session for <span className="text-white font-bold tracking-widest">{studentName}</span>.</p>
          
          <input
            type="password"
            className="input-cyber w-full px-4 py-3 rounded-lg mb-4 text-center tracking-[0.3em] font-mono"
            placeholder="ENTER AUTHORIZATION CODE"
            value={gatePassword}
            onChange={(e) => setGatePassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleGateSubmit()}
          />
          
          <button onClick={handleGateSubmit} className="btn-cyber w-full py-3 rounded-xl mb-4 font-bold tracking-widest flex items-center justify-center gap-2" style={{ background: "hsl(var(--neon-crimson))", color: "white" }}>
            <Lock size={16} /> AUTHORIZE LAUNCH
          </button>
          
          <button onClick={handleLogout} className="text-xs text-muted-foreground hover:text-white underline tracking-widest uppercase">
            Cancel & Return to Login
          </button>
          
          {gateError && <p className="mt-4 text-sm font-bold font-mono" style={{ color: "hsl(var(--neon-crimson))" }}>{gateError}</p>}
        </motion.div>
      </div>
    );
  }

  if (state === "countdown") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: "hsl(var(--background))" }}>
        <p className="text-xl tracking-[0.5em] uppercase mb-8" style={{ fontFamily: "'Orbitron', sans-serif", color: "hsl(var(--neon-cyan))" }}>
          PREPARING CYBER-SURGERY
        </p>
        <AnimatePresence mode="popLayout">
          <motion.div 
            key={countdown}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 0.5 }}
            className="text-[15rem] font-black leading-none"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              color: countdown <= 3 ? "hsl(var(--neon-crimson))" : "hsl(var(--neon-cyan))",
              textShadow: `0 0 50px ${countdown <= 3 ? 'hsla(348,100%,54%,0.8)' : 'hsla(186,100%,50%,0.8)'}`
            }}
          >
            {countdown}
          </motion.div>
        </AnimatePresence>
        <p className="text-muted-foreground mt-8 font-mono animate-pulse tracking-widest">DO NOT TOUCH THE CONSOLE</p>
      </div>
    );
  }

  if (state === "game") return <Dashboard studentName={studentName} onLogout={handleLogout} />;
  if (state === "leaderboard") return <Leaderboard onLogout={handleLogout} />;
  
  return <LoginPage onStudentLogin={handleStudentLogin} onAdminLogin={handleAdminLogin} />;
}