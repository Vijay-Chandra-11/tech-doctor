import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BodyPart } from "@/lib/gameData";
import { saveScore, computeScore } from "@/lib/gameStore";
import HumanBody from "@/components/HumanBody";
import QuestionModal from "@/components/QuestionModal";
import { Clock, Activity, LogOut, Trophy } from "lucide-react";

interface DashboardProps {
  studentName: string;
  onLogout: () => void;
}

export default function Dashboard({ studentName, onLogout }: DashboardProps) {
  const [seconds, setSeconds] = useState(0);
  const [restoredParts, setRestoredParts] = useState<BodyPart[]>([]);
  const [activeModal, setActiveModal] = useState<BodyPart | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  useEffect(() => {
    if (restoredParts.length === 5) {
      if (timerRef.current) clearInterval(timerRef.current);
      const score = computeScore(5, seconds);
      saveScore({ name: studentName, timeTaken: seconds, organsRestored: 5, totalScore: score });
      setTimeout(() => setGameOver(true), 500);
    }
  }, [restoredParts]);

  function formatTime(s: number) {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  }

  function handleOrganRestored(part: BodyPart) {
    setRestoredParts((prev) => prev.includes(part) ? prev : [...prev, part]);
  }

  const progress = (restoredParts.length / 5) * 100;

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
          {/* Logo */}
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏥</span>
            <h1 className="text-lg font-black tracking-widest neon-cyan"
              style={{ fontFamily: "'Orbitron', sans-serif" }}>
              TECH DOCTOR
            </h1>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6">
            {/* Timer */}
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-muted-foreground" />
              <span className="font-mono text-lg font-bold neon-cyan"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                {formatTime(seconds)}
              </span>
            </div>
            {/* Organs */}
            <div className="flex items-center gap-2">
              <Activity size={16} className="text-muted-foreground" />
              <span className="text-sm font-bold tracking-wider"
                style={{ fontFamily: "'Orbitron', sans-serif", color: "hsl(var(--neon-magenta))" }}>
                {restoredParts.length}/5 ORGANS
              </span>
            </div>
            {/* Student name */}
            <div className="px-3 py-1.5 rounded-lg text-sm font-semibold tracking-wider"
              style={{
                background: "hsla(186,100%,50%,0.1)",
                border: "1px solid hsla(186,100%,50%,0.3)",
                color: "hsl(var(--neon-cyan))",
                fontFamily: "'Rajdhani', sans-serif",
              }}>
              👤 {studentName}
            </div>
            {/* Logout */}
            <motion.button
              onClick={onLogout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg text-muted-foreground hover:text-white transition-colors"
              style={{ border: "1px solid hsla(186,100%,50%,0.2)" }}
            >
              <LogOut size={16} />
            </motion.button>
          </div>
        </div>

        {/* Progress bar */}
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

        {/* Left panel: Instructions */}
        <motion.div
          className="hidden lg:block w-64 space-y-4"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="glass-card rounded-xl p-4 glow-border-cyan">
            <h3 className="text-xs font-bold tracking-widest neon-cyan uppercase mb-3"
              style={{ fontFamily: "'Orbitron', sans-serif" }}>
              ⚡ Mission Brief
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The patient's body has been corrupted by buggy code. Click on each body part to diagnose the issue and fix the bug.
            </p>
          </div>

          <div className="glass-card rounded-xl p-4 glow-border-magenta">
            <h3 className="text-xs font-bold tracking-widest uppercase mb-3"
              style={{ fontFamily: "'Orbitron', sans-serif", color: "hsl(var(--neon-magenta))" }}>
              📊 Status
            </h3>
            <div className="space-y-2">
              {(["Head", "Torso", "Arms", "Legs", "Heart"] as BodyPart[]).map((part) => (
                <div key={part} className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground font-mono">{part}</span>
                  <span className="text-xs font-bold"
                    style={{ color: restoredParts.includes(part) ? "hsl(var(--neon-green))" : "hsl(var(--neon-crimson))" }}>
                    {restoredParts.includes(part) ? "✅ FIXED" : "⚠ BROKEN"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Center: Human Body */}
        <motion.div
          className="flex flex-col items-center gap-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <p className="text-xs tracking-[0.4em] text-muted-foreground uppercase">
            — Click a body part to treat —
          </p>
          <HumanBody restoredParts={restoredParts} onPartClick={setActiveModal} />
        </motion.div>

        {/* Right panel: Live vitals */}
        <motion.div
          className="hidden lg:block w-64 space-y-4"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="glass-card rounded-xl p-4 glow-border-crimson">
            <h3 className="text-xs font-bold tracking-widest neon-crimson uppercase mb-3"
              style={{ fontFamily: "'Orbitron', sans-serif" }}>
              💉 Vital Signs
            </h3>
            <div className="space-y-3">
              {[
                { label: "CPU Load", value: `${Math.floor(60 + restoredParts.length * 8)}%`, color: "var(--neon-cyan)" },
                { label: "Memory", value: `${Math.floor(40 + restoredParts.length * 10)}%`, color: "var(--neon-magenta)" },
                { label: "Bug Rate", value: `${Math.max(0, 5 - restoredParts.length)}/5`, color: "var(--neon-crimson)" },
              ].map(({ label, value, color }) => (
                <div key={label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground font-mono">{label}</span>
                    <span className="font-bold font-mono" style={{ color: `hsl(${color})` }}>{value}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <motion.div className="h-full rounded-full"
                      style={{ background: `hsl(${color})`, boxShadow: `0 0 8px hsl(${color})` }}
                      animate={{ width: value }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-xl p-4" style={{ border: "1px solid hsla(186,100%,50%,0.15)" }}>
            <h3 className="text-xs font-bold tracking-widest neon-cyan uppercase mb-3"
              style={{ fontFamily: "'Orbitron', sans-serif" }}>
              🎯 Score Preview
            </h3>
            <p className="text-2xl font-black neon-cyan" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              {computeScore(restoredParts.length, seconds).toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Base + time bonus</p>
          </div>
        </motion.div>
      </div>

      {/* Question Modal */}
      <AnimatePresence>
        {activeModal && (
          <QuestionModal
            key={activeModal}
            bodyPart={activeModal}
            onClose={() => setActiveModal(null)}
            onOrganRestored={handleOrganRestored}
            alreadyRestored={restoredParts.includes(activeModal)}
          />
        )}
      </AnimatePresence>

      {/* Game Over Modal */}
      <AnimatePresence>
        {gameOver && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ background: "rgba(0,0,0,0.9)", backdropFilter: "blur(12px)" }}
          >
            <motion.div
              className="glass-card rounded-2xl p-10 text-center max-w-sm w-full mx-4 glow-border-cyan"
              initial={{ scale: 0.5, rotateY: -30 }}
              animate={{ scale: 1, rotateY: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 1, repeat: 3 }}
                className="text-6xl mb-4"
              >
                🎉
              </motion.div>
              <h2 className="text-2xl font-black neon-green mb-2"
                style={{ fontFamily: "'Orbitron', sans-serif" }}>
                PATIENT SAVED!
              </h2>
              <p className="text-muted-foreground mb-6">All organs successfully restored</p>
              <div className="glass-card rounded-xl p-4 mb-6 glow-border-cyan">
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Final Score</p>
                <p className="text-3xl font-black neon-cyan" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                  {computeScore(5, seconds).toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground mt-1">Time: {formatTime(seconds)}</p>
              </div>
              <motion.button
                onClick={onLogout}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="btn-cyber w-full py-3 rounded-xl text-sm flex items-center justify-center gap-2"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--neon-cyan)), hsl(var(--neon-magenta)))",
                  color: "hsl(var(--background))",
                  boxShadow: "0 0 20px hsla(186,100%,50%,0.4)",
                }}
              >
                <Trophy size={16} />
                BACK TO LOBBY
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
