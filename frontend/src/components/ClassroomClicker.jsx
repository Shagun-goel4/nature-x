import React, { useState } from "react";

const appliances = [
  { name: "Light", on: true },
  { name: "Fan", on: true },
  { name: "Projector", on: true },
];

export default function ClassroomClicker({ onComplete }) {
  const [state, setState] = useState(appliances);
  const [done, setDone] = useState(false);

  const handleClick = (idx) => {
    setState((s) => s.map((a, i) => (i === idx ? { ...a, on: false } : a)));
  };
  const handleFinish = () => {
    setDone(true);
    const points = state.filter((a) => !a.on).length * 3;
    onComplete(points);
  };

  return (
    <div>
      <div className="mb-2">Turn off all appliances as quickly as you can!</div>
      <div className="flex gap-4 mb-4">
        {state.map((a, i) => (
          <button
            key={a.name}
            className={`p-4 rounded ${a.on ? "bg-yellow-200" : "bg-gray-300"}`}
            onClick={() => handleClick(i)}
            disabled={!a.on}
          >
            {a.name} {a.on ? "ON" : "OFF"}
          </button>
        ))}
      </div>
      {!done && (
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={handleFinish}
        >
          Finish
        </button>
      )}
      {done && (
        <div className="text-green-700 font-bold mt-2">All appliances off!</div>
      )}
    </div>
  );
}
