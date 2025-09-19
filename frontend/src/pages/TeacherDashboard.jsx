import React, { useEffect, useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import Button from "../components/ui/Button";
import { apiFetch } from "../lib/api";

export default function TeacherDashboard() {
  const [data, setData] = useState(null);
  const token = localStorage.getItem("teacherToken");

  useEffect(() => {
    apiFetch("/teacher/dashboard", { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then(setData);
  }, [token]);

  if (!data) return null;

  return (
    <AppLayout>
      <h1 className="text-3xl font-bold mb-6">Teacher Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Snapshot</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <div>Average XP: <span className="text-emerald-300 font-semibold">{data.summary.avgXP}</span></div>
              <div>Modules: {data.summary.modules}</div>
              <div>Missions: {data.summary.missions}</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Classes</CardTitle></CardHeader>
          <CardContent>
            <ul className="space-y-1">{data.classes.map(c => (<li key={c.id}>{c.name} – {c.students} students</li>))}</ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Leaderboard</CardTitle></CardHeader>
          <CardContent>
            <ol className="space-y-1">{data.leaderboard.map((e,i)=>(<li key={i}>{e.username} ({e.ecoPoints})</li>))}</ol>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}


