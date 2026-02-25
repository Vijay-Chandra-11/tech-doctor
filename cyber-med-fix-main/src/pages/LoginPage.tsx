import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BodyPart, bodyPartsData } from "@/lib/gameData";
import { verifyAdminPassword } from "@/lib/gameStore";
import { Shield, User, Zap, Lock } from "lucide-react";

interface LoginPageProps {
  onStudentLogin: (name: string) => void;
  onAdminLogin: () => void;
}

export default function LoginPage({ onStudentLogin, onAdminLogin }: LoginPageProps) {
  const [tab, setTab] = useState<"student" | "admin">("student");
  const [studentName, setStudentName] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState("");
  const [glitchTitle, setGlitchTitle] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchTitle(true);
      setTimeout(() => setGlitchTitle(false), 200);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  function handleStudentLogin() {
    if (!studentName.trim()) { setError("Patient ID required"); return; }
    setError("");
    setScanning(true);
    setTimeout(() => onStudentLogin(studentName.trim()), 2200);
  }

  function handleAdminLogin() {
    if (verifyAdminPassword(adminPass)) {
      setError("");
      setScanning(true);
      setTimeout(() => onAdminLogin(), 2200);
    } else {
      setError("ACCESS DENIED: Invalid credentials");
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "hsl(var(--background))" }}>

      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div key={i}
            className="absolute rounded-full opacity-10"
            style={{
              width: Math.random() * 200 + 50,
              height: Math.random() * 200 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 3 === 0
                ? "radial-gradient(circle, hsl(186,100%,50%), transparent)"
                : i % 3 === 1
                ? "radial-gradient(circle, hsl(300,100%,60%), transparent)"
                : "radial-gradient(circle, hsl(348,100%,54%), transparent)",
            }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.15, 0.05] }}
            transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2 }}
          />
        ))}
      </div>

      {/* Main card */}
      <motion.div
        className="relative z-10 w-full max-w-md mx-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Logo / Title */}
        <div className="text-center mb-8">
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-4"
            style={{
              background: "linear-gradient(135deg, hsla(186,100%,50%,0.2), hsla(300,100%,60%,0.2))",
              border: "1px solid hsla(186,100%,50%,0.4)",
              boxShadow: "0 0 30px hsla(186,100%,50%,0.3)",
            }}
            animate={{ rotateY: [0, 10, 0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            <span className="text-4xl"><img src="/doctor.jpeg" alt="Tech Doctor" className="w-16 h-16 object-cover rounded-md" /></span>
          </motion.div>
          <h1
            className={`text-4xl font-black tracking-wider mb-1 ${glitchTitle ? "animate-glitch" : ""}`}
            style={{
              fontFamily: "'Orbitron', sans-serif",
              background: "linear-gradient(90deg, hsl(var(--neon-cyan)), hsl(var(--neon-magenta)))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            TECH DOCTOR
          </h1>
          <p className="text-sm tracking-[0.3em] text-muted-foreground uppercase">
            Cyber Medical System v2.0
          </p>
        </div>

        {/* Card */}
        <div className="glass-card rounded-2xl p-6 glow-border-cyan">
          {/* Tab switcher */}
          <div className="flex gap-2 mb-6 p-1 rounded-xl"
            style={{ background: "hsl(var(--muted))" }}>
            {(["student", "admin"] as const).map((t) => (
              <motion.button
                key={t}
                onClick={() => { setTab(t); setError(""); }}
                className="flex-1 py-2.5 rounded-lg text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-all"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  background: tab === t
                    ? t === "student"
                      ? "linear-gradient(135deg, hsl(var(--neon-cyan)), hsla(186,100%,50%,0.7))"
                      : "linear-gradient(135deg, hsl(var(--neon-crimson)), hsla(348,100%,54%,0.7))"
                    : "transparent",
                  color: tab === t ? "hsl(var(--background))" : "hsl(var(--muted-foreground))",
                  boxShadow: tab === t
                    ? t === "student" ? "0 0 15px hsla(186,100%,50%,0.5)" : "0 0 15px hsla(348,100%,54%,0.5)"
                    : "none",
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {t === "student" ? <User size={14} /> : <Shield size={14} />}
                {t === "student" ? "Student" : "Admin"}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {tab === "student" ? (
              <motion.div key="student"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-2">
                    Patient ID
                  </label>
                  <input
                    className="input-cyber w-full px-4 py-3 rounded-lg"
                    placeholder="Enter your Roll No."
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleStudentLogin()}
                  />
                </div>
                <motion.button
                  onClick={handleStudentLogin}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-cyber w-full py-3.5 rounded-xl text-sm flex items-center justify-center gap-2"
                  style={{
                    background: "linear-gradient(135deg, hsl(var(--neon-cyan)), hsla(186,100%,40%,0.9))",
                    color: "hsl(var(--background))",
                    boxShadow: "0 0 20px hsla(186,100%,50%,0.4)",
                  }}
                >
                  <Zap size={16} />
                  Start Operation
                </motion.button>
              </motion.div>
            ) : (
              <motion.div key="admin"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-2">
                    Access Code
                  </label>
                  <input
                    type="password"
                    className="input-cyber w-full px-4 py-3 rounded-lg"
                    placeholder="••••••••"
                    value={adminPass}
                    onChange={(e) => setAdminPass(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAdminLogin()}
                  />
                </div>
                <motion.button
                  onClick={handleAdminLogin}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-cyber w-full py-3.5 rounded-xl text-sm flex items-center justify-center gap-2"
                  style={{
                    background: "linear-gradient(135deg, hsl(var(--neon-crimson)), hsla(348,100%,40%,0.9))",
                    color: "white",
                    boxShadow: "0 0 20px hsla(348,100%,54%,0.4)",
                  }}
                >
                  <Lock size={16} />
                  BREACH SECURITY
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 text-center text-sm font-bold"
              style={{ color: "hsl(var(--neon-crimson))", fontFamily: "'JetBrains Mono', monospace" }}
            >
              {error}
            </motion.p>
          )}
        </div>

        {/* <p className="text-center mt-4 text-xs text-muted-foreground tracking-widest">
          HINT: Admin password is <span className="neon-cyan font-mono">X-Kernel-Head-Hema</span>
        </p> */}
      </motion.div>

      {/* Scanning overlay */}
      <AnimatePresence>
        {scanning && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ background: "rgba(0,0,0,0.95)" }}
          >
            {/* Scan line */}
            <div className="relative w-64 h-64 mb-8">
              <div className="absolute inset-0 rounded-2xl border-2"
                style={{ borderColor: "hsl(var(--neon-cyan))", boxShadow: "0 0 30px hsla(186,100%,50%,0.4)" }} />
              <motion.div
                className="absolute w-full h-1 rounded-full"
                style={{ background: "linear-gradient(90deg, transparent, hsl(var(--neon-cyan)), transparent)" }}
                animate={{ top: ["5%", "95%", "5%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl"><img src="/doctor.jpeg" alt="Tech Doctor" className="w-16 h-16 object-cover rounded-md" /></span>
              </div>
              {/* Corner markers */}
              {[["top-0 left-0", "border-t-2 border-l-2"],
                ["top-0 right-0", "border-t-2 border-r-2"],
                ["bottom-0 left-0", "border-b-2 border-l-2"],
                ["bottom-0 right-0", "border-b-2 border-r-2"]].map(([pos, border], i) => (
                <div key={i} className={`absolute ${pos} w-6 h-6 ${border}`}
                  style={{ borderColor: "hsl(var(--neon-cyan))" }} />
              ))}
            </div>
            <motion.p
              className="text-lg tracking-[0.4em] neon-cyan"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              AUTHENTICATING...
            </motion.p>
            <div className="mt-4 flex gap-1">
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div key={i}
                  className="w-2 h-2 rounded-full"
                  style={{ background: "hsl(var(--neon-cyan))" }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
