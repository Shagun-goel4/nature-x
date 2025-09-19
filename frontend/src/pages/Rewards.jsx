import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import Button from "../components/ui/Button";
import { apiFetch } from "../lib/api";

export default function Rewards() {
  const { token } = useContext(AuthContext);
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    apiFetch("/user/dashboard", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setDashboard);
  }, [token]);

  if (!dashboard) return null;

  return (
    <AppLayout>
      <div className="flex justify-center">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Your Rewards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-2">Eco-points: <span className="font-bold text-emerald-300">{dashboard.ecoPoints}</span></div>
            <div className="mb-2">Badges:</div>
            <div className="flex flex-wrap gap-2 mb-4">
              {dashboard.badges.map((badge) => (
                <span key={badge} className="px-2 py-1 rounded-lg text-xs font-semibold bg-white/10 border border-white/10">
                  {badge}
                </span>
              ))}
            </div>
            <Link to="/dashboard">
              <Button>Back to Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
