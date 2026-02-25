import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BodyPart, bodyPartsData } from "@/lib/gameData";

interface QuestionModalProps {
  bodyPart: BodyPart;
  onClose: () => void;
  onOrganRestored: (part: BodyPart) => void;
  alreadyRestored: boolean;
}

export default function QuestionModal({
  bodyPart,
  onClose,
  onOrganRestored,
  alreadyRestored,
}: QuestionModalProps) {
  const partData = bodyPartsData.find((b) => b.id === bodyPart)!;
  const [currentQ, setCurrentQ] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [shake, setShake] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);

  const question = partData.questions[currentQ];

  const isNeonCrimson = partData.id === "Heart";
  const accentClass = isNeonCrimson ? "neon-crimson" : partData.color === "neon-cyan" ? "neon-cyan" : "neon-magenta";
  const borderClass = isNeonCrimson ? "glow-border-crimson" : partData.color === "neon-cyan" ? "glow-border-cyan" : "glow-border-magenta";

  function handleSubmit() {
    const num = parseInt(answer);
    if (isNaN(num)) return;

    if (num === question.errorLine) {
      setFeedback("correct");
      const newCorrect = correctCount + 1;
      setCorrectCount(newCorrect);
      // spawn particles
      setParticles(Array.from({ length: 12 }, (_, i) => ({ id: i, x: Math.random() * 400 - 200, y: Math.random() * -300 })));
      setTimeout(() => {
        if (currentQ + 1 >= partData.questions.length) {
          setCompleted(true);
          setTimeout(() => {
            onOrganRestored(bodyPart);
            onClose();
          }, 1800);
        } else {
          setCurrentQ((q) => q + 1);
          setFeedback(null);
          setAnswer("");
          setParticles([]);
        }
      }, 1200);
    } else {
      setFeedback("wrong");
      setShake(true);
      setTimeout(() => {
        setFeedback(null);
        setShake(false);
        setAnswer("");
      }, 800);
    }
  }

  const codeLines = question.code.split("\n");

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          className={`relative w-full max-w-2xl glass-card rounded-2xl overflow-hidden ${borderClass}`}
          initial={{ scale: 0.5, rotateX: -30, opacity: 0 }}
          animate={{ scale: 1, rotateX: 0, opacity: 1 }}
          exit={{ scale: 0.5, rotateX: 30, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          style={{
            animation: shake ? "glitch 0.3s steps(1) 3" : undefined,
            boxShadow: feedback === "correct"
              ? "0 0 40px hsla(145,100%,50%,0.6), 0 0 80px hsla(145,100%,50%,0.3)"
              : feedback === "wrong"
              ? "0 0 40px hsla(0,100%,50%,0.6), 0 0 80px hsla(0,100%,50%,0.3)"
              : undefined,
          }}
        >
          {/* Scanline overlay */}
          <div className="absolute inset-0 pointer-events-none scanlines" />

          {/* Top header */}
          <div className="relative p-6 border-b border-white/10">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{partData.icon}</span>
                <div>
                  <h2 className="font-orbitron text-lg font-bold neon-crimson leading-tight"
                    style={{ fontFamily: "'Orbitron', sans-serif", letterSpacing: "0.05em" }}>
                    ⚠ EMERGENCY! {bodyPart.toUpperCase()} NEEDS FIXING!
                  </h2>
                  <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
                    Question {currentQ + 1} of {partData.questions.length} to restore organ
                  </p>
                </div>
              </div>
              <button onClick={onClose}
                className="text-2xl text-muted-foreground hover:text-white transition-colors ml-4">✕</button>
            </div>

            {/* Progress bar */}
            <div className="mt-3 h-1 rounded-full bg-muted overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, hsl(var(--neon-cyan)), hsl(var(--neon-magenta)))" }}
                initial={{ width: 0 }}
                animate={{ width: `${((currentQ) / partData.questions.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="p-6 space-y-4">
            {/* Description */}
            <div className="glass-card rounded-lg p-3 border border-neon-cyan/20">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-1">
                📋 Diagnosis Brief
              </p>
              <p className={`text-sm font-medium ${accentClass}`} style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                {question.description}
              </p>
            </div>

            {/* Code block */}
            <div className="code-block rounded-xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10"
                style={{ background: "hsl(220,30%,7%)" }}>
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-2 text-xs text-muted-foreground font-mono">patient_code.py</span>
              </div>
              <div className="p-4 max-h-56 overflow-y-auto">
                {codeLines.map((line, i) => (
                  <div key={i} className="flex group hover:bg-white/5 rounded transition-colors">
                    <span className="w-8 text-right pr-3 text-xs select-none shrink-0"
                      style={{ color: "hsl(var(--muted-foreground))", fontFamily: "'JetBrains Mono', monospace", lineHeight: "1.7" }}>
                      {i + 1}
                    </span>
                    <pre className="flex-1 text-sm leading-relaxed"
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        color: line.trim().startsWith("def ") ? "hsl(var(--neon-cyan))"
                          : line.trim().startsWith("return") ? "hsl(var(--neon-magenta))"
                          : line.trim().startsWith("if ") || line.trim().startsWith("elif ") || line.trim().startsWith("for ") || line.trim().startsWith("while ")
                          ? "hsl(var(--neon-amber))"
                          : "hsl(180,20%,80%)",
                        whiteSpace: "pre",
                      }}>
                      {line || " "}
                    </pre>
                  </div>
                ))}
              </div>
            </div>

            {/* Input area */}
            {!completed && (
              <div className="flex gap-3 items-end">
                <div className="flex-1">
                  <label className="block text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-2">
                    Enter the Line Number with the Error:
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={codeLines.length}
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                    placeholder="Line #"
                    className="input-cyber w-full px-4 py-3 rounded-lg text-lg text-center"
                  />
                </div>
                <motion.button
                  onClick={handleSubmit}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className="btn-cyber px-6 py-3 rounded-lg text-sm"
                  style={{
                    background: "linear-gradient(135deg, hsl(var(--neon-cyan)) 0%, hsl(var(--neon-magenta)) 100%)",
                    color: "hsl(var(--background))",
                    boxShadow: "0 0 20px hsla(186,100%,50%,0.4)",
                  }}
                >
                  ⚡ Administer Fix
                </motion.button>
              </div>
            )}

            {/* Feedback */}
            <AnimatePresence>
              {feedback === "correct" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-3 rounded-lg font-bold tracking-widest"
                  style={{
                    background: "hsla(145,100%,50%,0.15)",
                    border: "1px solid hsla(145,100%,50%,0.4)",
                    color: "hsl(var(--neon-green))",
                    fontFamily: "'Orbitron', sans-serif",
                    boxShadow: "0 0 20px hsla(145,100%,50%,0.3)",
                  }}
                >
                  ✅ CORRECT! ORGAN TISSUE RESPONDING...
                </motion.div>
              )}
              {feedback === "wrong" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-3 rounded-lg font-bold tracking-widest"
                  style={{
                    background: "hsla(0,100%,50%,0.15)",
                    border: "1px solid hsla(0,100%,50%,0.4)",
                    color: "hsl(var(--neon-crimson))",
                    fontFamily: "'Orbitron', sans-serif",
                    boxShadow: "0 0 20px hsla(0,100%,50%,0.3)",
                  }}
                >
                  ❌ INCORRECT! VITAL SIGNS CRITICAL!
                </motion.div>
              )}
              {completed && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-4 rounded-lg font-bold"
                  style={{
                    background: "linear-gradient(135deg, hsla(145,100%,50%,0.15), hsla(186,100%,50%,0.15))",
                    border: "1px solid hsla(145,100%,50%,0.5)",
                    fontFamily: "'Orbitron', sans-serif",
                    boxShadow: "0 0 30px hsla(145,100%,50%,0.4)",
                  }}
                >
                  <p className="text-xl neon-green">🎉 ORGAN RESTORED!</p>
                  <p className="text-sm text-muted-foreground mt-1">{bodyPart} is fully operational</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Particle burst */}
          <AnimatePresence>
            {particles.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                animate={{ opacity: 0, x: p.x, y: p.y, scale: 0 }}
                transition={{ duration: 1.0 }}
                className="absolute w-3 h-3 rounded-full pointer-events-none"
                style={{
                  left: "50%", top: "50%",
                  background: p.id % 2 === 0 ? "hsl(var(--neon-green))" : "hsl(var(--neon-cyan))",
                  boxShadow: "0 0 8px currentColor",
                }}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
