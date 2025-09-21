import React from "react";
import AnimatedBackground from "./AnimatedBackground";
import { Link } from "react-router-dom";

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen text-white">
      <AnimatedBackground />
      <header className="sticky top-0 z-10 bg-surface-900/40 backdrop-blur-xl border-b border-white/10">
        <div className="mx-auto max-w-screen-2xl px-6 py-3 flex items-center justify-between">
          <Link to="/dashboard" className="font-extrabold tracking-tight text-white">
            Nature-X
          </Link>
          <nav className="hidden md:flex items-center gap-2">
            <Link className="px-3 py-1.5 rounded-lg hover:bg-white/10" to="/dashboard">Dashboard</Link>
            <Link className="px-3 py-1.5 rounded-lg hover:bg-white/10" to="/lessons">Lessons</Link>
            <Link className="px-3 py-1.5 rounded-lg hover:bg-white/10" to="/leaderboard">Leaderboard</Link>
            <Link className="px-3 py-1.5 rounded-lg hover:bg-white/10" to="/rewards">Rewards</Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-screen-2xl px-6 py-8">
        {children}
      </main>
    </div>
  );
}


