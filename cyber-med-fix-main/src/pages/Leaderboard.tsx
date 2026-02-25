import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getScores } from "@/lib/gameStore";
import { StudentScore } from "@/lib/gameData";
import { LogOut, RefreshCw, Trophy, Clock, Activity, Star } from "lucide-react";

interface LeaderboardProps {
  onLogout: () => void;
}

export default function Leaderboard({ onLogout }: LeaderboardProps) {
  const [scores, setScores] = useState<StudentScore[]>([]);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [pulse, setPulse] = useState(false);

  function loadScores() {
    const data = getScores().sort((a, b) => b.totalScore - a.totalScore);
    setScores(data);
    setLastRefresh(new Date());
    setPulse(true);
    setTimeout(() => setPulse(false), 1000);
  }

  useEffect(() => {
    loadScores();
    const interval = setInterval(loadScores, 10000);
    return () => clearInterval(interval);
  }, []);

  function formatTime(s: number) {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  }

  const rankColors = ["hsl(45,100%,55%)", "hsl(220,20%,70%)", "hsl(30,80%,50%)"];
  const rankIcons = ["🥇", "🥈", "🥉"];

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: "hsl(var(--background))" }}>

      {/* Header */}
      <motion.header
        className="glass-card border-b px-6 py-4"
        style={{ borderColor: "hsla(348,100%,54%,0.3)" }}
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="flex items-center justify-between max-w-5xl mx-auto">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏥</span>
            <div>
              <h1 className="text-xl font-black tracking-widest neon-crimson"
                style={{ fontFamily: "'Orbitron', sans-serif" }}>
                COMMAND CENTER
              </h1>
              <p className="text-xs text-muted-foreground tracking-widest">RESTRICTED ACCESS — ADMIN ONLY</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* Live pulse */}
            <div className="flex items-center gap-2">
              <motion.div
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: pulse ? "hsl(var(--neon-green))" : "hsl(var(--neon-crimson))" }}
                animate={{ opacity: [1, 0.3, 1], scale: [1, 1.2, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              />
              <span className="text-xs font-mono text-muted-foreground">
                LIVE · {lastRefresh.toLocaleTimeString()}
              </span>
            </div>
            <motion.button
              onClick={loadScores}
              whileHover={{ scale: 1.05, rotate: 180 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg transition-colors"
              style={{ border: "1px solid hsla(186,100%,50%,0.3)", color: "hsl(var(--neon-cyan))" }}
              transition={{ duration: 0.5 }}
            >
              <RefreshCw size={16} />
            </motion.button>
            <motion.button
              onClick={onLogout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-lg text-xs font-bold tracking-widest uppercase btn-cyber flex items-center gap-2"
              style={{
                background: "linear-gradient(135deg, hsl(var(--neon-crimson)), hsla(348,100%,40%,0.8))",
                color: "white",
                fontFamily: "'Orbitron', sans-serif",
              }}
            >
              <LogOut size={14} />
              Exit
            </motion.button>
          </div>
        </div>
      </motion.header>

      <div className="flex-1 p-6 max-w-5xl mx-auto w-full">

        {/* Title */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-black tracking-wider mb-2"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              background: "linear-gradient(90deg, hsl(var(--neon-cyan)), hsl(var(--neon-magenta)), hsl(var(--neon-crimson)))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
            GLOBAL LEADERBOARD
          </h2>
          <p className="text-muted-foreground text-sm tracking-widest">
            {scores.length} student{scores.length !== 1 ? "s" : ""} competed
          </p>
        </motion.div>

        {/* Top 3 podium */}
        {scores.length >= 1 && (
          <div className="flex items-end justify-center gap-4 mb-8">
            {[1, 0, 2].map((rank) => {
              const s = scores[rank];
              if (!s) return <div key={rank} className="w-28" />;
              const heights = ["h-28", "h-36", "h-20"];
              return (
                <motion.div
                  key={rank}
                  className={`w-28 glass-card rounded-t-xl flex flex-col items-center justify-end pb-3 pt-4 ${heights[rank]}`}
                  style={{
                    border: `1px solid ${rankColors[rank]}40`,
                    boxShadow: `0 0 20px ${rankColors[rank]}30`,
                  }}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * rank + 0.3 }}
                >
                  <span className="text-2xl mb-1">{rankIcons[rank]}</span>
                  <p className="text-xs font-bold text-center px-2 truncate w-full text-center"
                    style={{ color: rankColors[rank], fontFamily: "'Rajdhani', sans-serif" }}>
                    {s.name}
                  </p>
                  <p className="text-xs font-black font-mono" style={{ color: rankColors[rank] }}>
                    {s.totalScore.toLocaleString()}
                  </p>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Full table */}
        <motion.div
          className="glass-card rounded-2xl overflow-hidden glow-border-cyan"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {/* Table header */}
          <div className="grid grid-cols-5 gap-4 px-6 py-3 text-xs font-bold tracking-widest uppercase"
            style={{
              background: "linear-gradient(90deg, hsla(186,100%,50%,0.1), hsla(300,100%,60%,0.1))",
              borderBottom: "1px solid hsla(186,100%,50%,0.2)",
              fontFamily: "'Orbitron', sans-serif",
              color: "hsl(var(--muted-foreground))",
            }}>
            <div className="flex items-center gap-1"><Trophy size={12} /> Rank</div>
            <div className="flex items-center gap-1"><Star size={12} /> Student</div>
            <div className="flex items-center gap-1"><Clock size={12} /> Time</div>
            <div className="flex items-center gap-1"><Activity size={12} /> Organs</div>
            <div className="text-right">Score</div>
          </div>

          {scores.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-4xl mb-3">📊</p>
              <p className="text-muted-foreground text-sm font-mono">No data recorded yet</p>
              <p className="text-xs text-muted-foreground mt-1">Students need to complete games first</p>
            </div>
          ) : (
            scores.map((s, i) => (
              <motion.div
                key={s.name + i}
                className="grid grid-cols-5 gap-4 px-6 py-4 items-center border-b"
                style={{ borderColor: "hsla(186,100%,50%,0.08)" }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i + 0.5 }}
                whileHover={{
                  background: "hsla(186,100%,50%,0.05)",
                  transition: { duration: 0.2 },
                }}
              >
                {/* Rank */}
                <div className="flex items-center gap-2">
                  <span className="text-lg">
                    {i < 3 ? rankIcons[i] : ""}
                  </span>
                  <span className="font-black text-lg"
                    style={{
                      fontFamily: "'Orbitron', sans-serif",
                      color: i < 3 ? rankColors[i] : "hsl(var(--muted-foreground))",
                    }}>
                    #{i + 1}
                  </span>
                </div>
                {/* Name */}
                <div>
                  <p className="font-bold text-sm" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                    {s.name}
                  </p>
                </div>
                {/* Time */}
                <div className="font-mono text-sm" style={{ color: "hsl(var(--neon-cyan))" }}>
                  {formatTime(s.timeTaken)}
                </div>
                {/* Organs */}
                <div>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <div key={j} className="w-3 h-3 rounded-sm"
                        style={{
                          background: j < s.organsRestored
                            ? "hsl(var(--neon-green))"
                            : "hsl(var(--muted))",
                          boxShadow: j < s.organsRestored ? "0 0 6px hsla(145,100%,50%,0.6)" : "none",
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 font-mono">
                    {s.organsRestored}/5
                  </p>
                </div>
                {/* Score */}
                <div className="text-right">
                  <span className="font-black text-lg"
                    style={{
                      fontFamily: "'Orbitron', sans-serif",
                      color: i === 0 ? "hsl(var(--neon-amber))" : i === 1 ? "hsl(220,20%,70%)" : i === 2 ? "hsl(30,80%,50%)" : "hsl(var(--foreground))",
                      textShadow: i < 3 ? `0 0 10px ${rankColors[i]}` : "none",
                    }}>
                    {s.totalScore.toLocaleString()}
                  </span>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Footer note */}
        <p className="text-center mt-4 text-xs text-muted-foreground font-mono">
          Auto-refreshes every 10s · Scores persist in local storage
        </p>
      </div>
    </div>
  );
}
