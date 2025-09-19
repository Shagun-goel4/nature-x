import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import Button from "../components/ui/Button";
import { apiFetch } from "../lib/api";

export default function Dashboard() {
  const { user, token, logout } = useContext(AuthContext);
  const [dashboard, setDashboard] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/login");
    apiFetch("/user/dashboard", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setDashboard);
    apiFetch("/lessons", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setLessons);
    apiFetch("/leaderboard")
      .then((res) => res.json())
      .then(setLeaderboard);
  }, [token, navigate]);

  if (!user || !dashboard) return null;

  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Welcome, {user.username}!</h1>
        <Button variant="secondary" onClick={logout}>Logout</Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Lessons</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {lessons.map((lesson) => (
                <li key={lesson._id} className="flex items-center justify-between">
                  <Link to={`/lessons/${lesson._id}`} className="hover:underline">
                    {lesson.title}
                  </Link>
                  {dashboard.progress && dashboard.progress[lesson._id] && (
                    <span className="text-xs text-emerald-300">✓</span>
                  )}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Your Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-3">Eco-points: <span className="font-bold text-emerald-300">{dashboard.ecoPoints}</span></div>
            <div className="mb-2">Badges:</div>
            <div className="flex flex-wrap gap-2">
              {dashboard.badges.map((badge) => (
                <span key={badge} className="px-2 py-1 rounded-lg text-xs font-semibold bg-white/10 border border-white/10">
                  {badge}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Leaderboard</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-1">
              {leaderboard.map((entry, i) => (
                <li key={entry._id} className={i === 0 ? "font-bold text-emerald-300" : ""}>
                  {entry.username} ({entry.ecoPoints} pts)
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
