import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import AppLayout from "../components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import Button from "../components/ui/Button";
import { motion } from "framer-motion";
import { apiFetch } from "../lib/api";
import BinSorter from "../components/BinSorter";
import TapLeakClicker from "../components/TapLeakClicker";
import ClassroomClicker from "../components/ClassroomClicker";
import RunnerObstacles from "../components/RunnerObstacles";
import MemoryMatch from "../components/MemoryMatch";

export default function Game() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [lesson, setLesson] = useState(null);
  const [loadError, setLoadError] = useState("");
  const [completed, setCompleted] = useState(false);
  const [points, setPoints] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        setLoadError("");
        const res = await apiFetch(`/lessons/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          const text = await res.text();
          setLoadError(text || `Failed to load lesson (${res.status})`);
          return;
        }
        const data = await res.json();
        setLesson(data);
      } catch (e) {
        setLoadError(e.message || "Network error");
      }
    })();
  }, [id, token]);

  const handleComplete = async (ecoPoints) => {
    setPoints(ecoPoints);
    setCompleted(true);
    await apiFetch(`/lessons/${id}/game`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ score: ecoPoints }),
    });
    await apiFetch("/user/progress", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        lessonId: id,
        completed: true,
        ecoPoints: ecoPoints,
        badge: lesson.badge,
      }),
    });
  };

  if (!lesson) {
    return (
      <AppLayout>
        <div className="text-white/80">{loadError || "Loading game..."}</div>
      </AppLayout>
    );
  }

  let GameComponent = null;
  if (lesson.game.logic === "drag-drop-bins") GameComponent = BinSorter;
  if (lesson.game.logic === "tap-leak-clicker") GameComponent = TapLeakClicker;
  if (lesson.game.logic === "classroom-clicker")
    GameComponent = ClassroomClicker;
  if (lesson.game.logic === "runner-obstacles") GameComponent = RunnerObstacles;
  if (lesson.game.logic === "memory-match") GameComponent = MemoryMatch;

  return (
    <AppLayout>
      <div className="flex justify-center">
        <Card className="max-w-3xl w-full">
          <CardHeader>
            <CardTitle>Game: {lesson.game.name}</CardTitle>
            <p className="text-white/60 text-sm">{lesson.game.description}</p>
          </CardHeader>
          <CardContent>
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
              {!completed ? (
                GameComponent && <GameComponent onComplete={handleComplete} />
              ) : (
                <div className="text-emerald-300 font-bold mb-4">You earned {points} eco-points!</div>
              )}
            </motion.div>
            {completed && (
              <Button className="mt-2" onClick={() => navigate("/rewards")}>See Rewards</Button>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
