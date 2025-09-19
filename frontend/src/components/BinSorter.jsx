import React, { useState } from "react";
import { motion } from "framer-motion";

const items = [
  { name: "Banana peel", bin: "Green" },
  { name: "Plastic bottle", bin: "Blue" },
  { name: "Chips wrapper", bin: "Black" },
  { name: "Leaves", bin: "Green" },
  { name: "Newspaper", bin: "Blue" },
];
const bins = ["Green", "Blue", "Black"];

export default function BinSorter({ onComplete }) {
  const [dragged, setDragged] = useState(null);
  const [sorted, setSorted] = useState({});
  const [done, setDone] = useState(false);

  const handleDragStart = (item) => setDragged(item);
  const handleDrop = (bin) => {
    if (dragged) {
      setSorted((s) => ({ ...s, [dragged.name]: bin }));
      setDragged(null);
    }
  };
  const handleFinish = () => {
    let points = 0;
    items.forEach((item) => {
      if (sorted[item.name] === item.bin) points += 2;
    });
    setDone(true);
    onComplete(points);
  };

  return (
    <div className="glass p-4 rounded-2xl">
      <div className="flex flex-wrap gap-3 mb-4">
        {items.map((item) => (
          <motion.div
            key={item.name}
            draggable={!sorted[item.name]}
            onDragStart={() => handleDragStart(item)}
            className={`px-3 py-2 rounded-xl cursor-move bg-white/10 border border-white/10 ${sorted[item.name] ? "opacity-50" : ""}`}
            whileHover={{ scale: 1.03 }}
          >
            {item.name}
          </motion.div>
        ))}
      </div>
      <div className="flex gap-8 mb-4 flex-wrap">
        {bins.map((bin) => (
          <div
            key={bin}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(bin)}
            className="w-40 h-40 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center bg-white/5 border-white/20"
          >
            <span className="font-bold text-lg">{bin} Bin</span>
            <div className="mt-2 flex flex-col gap-1">
              {Object.entries(sorted)
                .filter(([_, b]) => b === bin)
                .map(([name]) => (
                  <span
                    key={name}
                    className="text-xs bg-emerald-300/20 border border-emerald-300/30 rounded px-1"
                  >
                    {name}
                  </span>
                ))}
            </div>
          </div>
        ))}
      </div>
      {!done && (
        <button
          className="bg-brand-500 hover:bg-brand-400 text-white px-5 py-2 rounded-xl shadow-glow"
          onClick={handleFinish}
        >
          Finish
        </button>
      )}
      {done && (
        <div className="text-emerald-300 font-bold mt-2">Game complete!</div>
      )}
    </div>
  );
}
