import React, { useEffect, useState, useContext } from "react";
import AppLayout from "../components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Link } from "react-router-dom";
import { apiFetch } from "../lib/api";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";

export default function Lessons() {
  const [lessons, setLessons] = useState([]);
  const [error, setError] = useState("");
  const { token } = useContext(AuthContext);
  useEffect(() => {
    setError("");
    apiFetch("/lessons", { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => (r.ok ? r.json() : r.text().then((t) => Promise.reject(t))))
      .then(setLessons)
      .catch((e) => setError(e || "Failed to load lessons"));
  }, [token]);

  return (
    <AppLayout>
      <h1 className="text-3xl font-bold mb-6">Lessons</h1>
      {error && <div className="mb-4 text-red-400">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {lessons.map((l, i) => (
          <motion.div key={l._id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Link to={`/lessons/${l._id}`}>
              <Card className="w-full overflow-hidden cursor-pointer hover:shadow-[0_0_0_2px_rgba(16,185,129,0.35)] transition-shadow">
                <div className="h-36 bg-gradient-to-br from-emerald-500/30 to-blue-500/20" />
                <CardHeader>
                  <CardTitle>{l.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-white/70">Badge: {l.badge}</div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </AppLayout>
  );
}


