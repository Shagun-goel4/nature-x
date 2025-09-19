import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
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
      <div className="flex justify-center">
        <Card className="w-full">
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
            <Link to="/dashboard">
              <Button className="mt-4">Back to Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
