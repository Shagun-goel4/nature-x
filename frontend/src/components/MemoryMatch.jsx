import React, { useState } from "react";

const pairs = [
  { animal: "Tiger", habitat: "Forest" },
  { animal: "Fish", habitat: "River" },
  { animal: "Eagle", habitat: "Sky" },
];
const cards = [
  ...pairs.map((p) => ({ type: "animal", value: p.animal })),
  ...pairs.map((p) => ({ type: "habitat", value: p.habitat })),
].sort(() => Math.random() - 0.5);

export default function MemoryMatch({ onComplete }) {
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [done, setDone] = useState(false);

  const handleFlip = (idx) => {
    if (flipped.length === 2 || matched.includes(idx)) return;
    setFlipped((f) => [...f, idx]);
    if (flipped.length === 1) {
      const first = cards[flipped[0]];
      const second = cards[idx];
      const pair = pairs.find(
        (p) =>
          (p.animal === first.value && p.habitat === second.value) ||
          (p.animal === second.value && p.habitat === first.value)
      );
      if (pair) {
        setMatched((m) => [...m, flipped[0], idx]);
        if (matched.length + 2 === cards.length) {
          setDone(true);
          onComplete(10);
        }
      }
      setTimeout(() => setFlipped([]), 800);
    }
  };

  return (
    <div>
      <div className="mb-2">Match animals to their habitats!</div>
      <div className="grid grid-cols-6 gap-2 mb-4">
        {cards.map((card, i) => (
          <button
            key={i}
            className={`w-20 h-20 border rounded ${
              flipped.includes(i) || matched.includes(i)
                ? "bg-green-200"
                : "bg-gray-200"
            }`}
            onClick={() => handleFlip(i)}
          >
            {flipped.includes(i) || matched.includes(i) ? card.value : "?"}
          </button>
        ))}
      </div>
      {done && (
        <div className="text-green-700 font-bold">All pairs matched!</div>
      )}
    </div>
  );
}
