import React, { useState } from "react";
import { motion } from "framer-motion";

const items = [
  { type: "obstacle", name: "Factory" },
  { type: "eco", name: "Tree" },
  { type: "obstacle", name: "Plastic Bag" },
  { type: "eco", name: "Bicycle" },
  { type: "eco", name: "Tree" },
];

export default function RunnerObstacles({ onComplete }) {
  const [score, setScore] = useState(0);
  const [idx, setIdx] = useState(0);
  const [done, setDone] = useState(false);

  const handleAction = (item) => {
    if (item.type === "eco") setScore((s) => s + 3);
    setIdx((i) => i + 1);
    if (idx + 1 === items.length) {
      setDone(true);
      onComplete(score + (item.type === "eco" ? 3 : 0));
    }
  };

  return (
    <div className="glass p-4 rounded-2xl">
      <div className="mb-3 text-white/80">Avoid obstacles, collect eco-actions!</div>
      {!done && (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
          <div className="text-xl font-semibold mb-3">{items[idx].name}</div>
          <button
            className="bg-brand-500 hover:bg-brand-400 text-white px-5 py-2 rounded-xl shadow-glow"
            onClick={() => handleAction(items[idx])}
          >
            {items[idx].type === "eco" ? "Collect" : "Jump"}
          </button>
        </motion.div>
      )}
      {done && <div className="text-emerald-300 font-bold">Game complete!</div>}
    </div>
  );
}
