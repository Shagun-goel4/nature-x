import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import Button from "../components/ui/Button";
import { apiFetch } from "../lib/api";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  useEffect(() => {
    apiFetch("/leaderboard")
      .then((res) => res.json())
      .then(setLeaderboard);
  }, []);
  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <Card className="w-full max-w-xl mx-auto bg-black/40 backdrop-blur-lg border border-white/10 shadow-2xl rounded-3xl p-8">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-extrabold text-emerald-400 mb-4">
              Leaderboard
            </CardTitle>
            <p className="text-white/60 text-lg mb-2">Top Eco-Warriors</p>
          </CardHeader>
          <CardContent>
            <ol className="flex flex-col items-center gap-4 mt-6">
              {leaderboard.length === 0 ? (
                <div className="text-gray-400 text-lg">
                  No leaderboard data yet.
                </div>
              ) : (
                leaderboard.map((entry, i) => (
                  <li
                    key={entry._id}
                    className={`w-full max-w-md px-6 py-4 rounded-xl bg-white/10 border border-white/10 flex items-center justify-between shadow-lg ${
                      i === 0
                        ? "font-bold text-emerald-300 scale-105"
                        : "text-white/90"
                    }`}
                    style={{ animationDelay: `${i * 0.08}s` }}
                  >
                    <span className="text-lg">{i + 1}.</span>
                    <span className="flex-1 text-center text-xl">
                      {entry.username}
                    </span>
                    <span className="text-emerald-400 font-bold text-lg">
                      {entry.ecoPoints} pts
                    </span>
                  </li>
                ))
              )}
            </ol>
            <Link to="/dashboard">
              <Button className="mt-8 w-full text-lg py-3">
                Back to Dashboard
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
