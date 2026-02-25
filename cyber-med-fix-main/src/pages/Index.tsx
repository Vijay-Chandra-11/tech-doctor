import { useState } from "react";
import LoginPage from "./LoginPage";
import Dashboard from "./Dashboard";
import Leaderboard from "./Leaderboard";

type AppState = "login" | "game" | "leaderboard";

export default function Index() {
  const [state, setState] = useState<AppState>("login");
  const [studentName, setStudentName] = useState("");

  function handleStudentLogin(name: string) {
    setStudentName(name);
    setState("game");
  }

  function handleAdminLogin() {
    setState("leaderboard");
  }

  function handleLogout() {
    setStudentName("");
    setState("login");
  }

  if (state === "game") {
    return <Dashboard studentName={studentName} onLogout={handleLogout} />;
  }

  if (state === "leaderboard") {
    return <Leaderboard onLogout={handleLogout} />;
  }

  return <LoginPage onStudentLogin={handleStudentLogin} onAdminLogin={handleAdminLogin} />;
}
