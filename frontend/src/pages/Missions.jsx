import React, { useEffect, useState, useContext } from "react";
import AppLayout from "../components/layout/AppLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { apiFetch } from "../lib/api";
import { AuthContext } from "../context/AuthContext";

export default function Missions() {
  const { token } = useContext(AuthContext);
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    apiFetch("/user/missions", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => (r.ok ? r.json() : r.text().then((t) => Promise.reject(t))))
      .then((data) => {
        setMissions(data);
        setError("");
      })
      .catch((e) => setError(e || "Failed to load missions"))
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-emerald-400 mb-2">
              Eco-Missions
            </CardTitle>
            <p className="text-white/70 text-base mb-2">
              Complete missions to earn eco-points and badges!
            </p>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-gray-400 text-lg">Loading missions...</div>
            ) : error ? (
              <div className="text-red-400 text-lg">{error}</div>
            ) : missions.length === 0 ? (
              <div className="text-gray-400 text-lg">
                No missions assigned yet.
              </div>
            ) : (
              <ul className="space-y-6">
                {missions.map((mission) => (
                  <li
                    key={mission._id}
                    className="bg-black/30 border border-white/10 rounded-xl p-5 shadow"
                  >
                    <div className="font-bold text-xl text-emerald-300 mb-1">
                      {mission.title}
                    </div>
                    <div className="text-white/80 mb-2">
                      {mission.description}
                    </div>
                    <div className="flex gap-4 mb-2">
                      <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded">
                        {mission.rewards?.xp || 0} XP
                      </span>
                      {mission.rewards?.badge && (
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {mission.rewards.badge}
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-400">
                      Due:{" "}
                      {mission.createdAt
                        ? new Date(mission.createdAt).toLocaleDateString()
                        : "-"}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
