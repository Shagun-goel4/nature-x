import React, { useState, useRef } from "react";

export default function TapLeakClicker({ onComplete }) {
  const [drops, setDrops] = useState(0);
  const [fixed, setFixed] = useState(false);
  const timer = useRef(null);

  const startLeak = () => {
    setDrops(0);
    setFixed(false);
    timer.current = setInterval(() => {
      setDrops((d) => d + 1);
    }, 400);
  };
  const fixTap = () => {
    clearInterval(timer.current);
    setFixed(true);
    onComplete(Math.max(10 - drops, 2));
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-2">
        A tap is leaking! Click "Fix Tap" before the bucket fills.
      </div>
      <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-2xl mb-2">
        {drops} 💧
      </div>
      {!fixed ? (
        <>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded mb-2"
            onClick={startLeak}
          >
            Start Leak
          </button>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded"
            onClick={fixTap}
          >
            Fix Tap
          </button>
        </>
      ) : (
        <div className="text-green-700 font-bold">You fixed the tap!</div>
      )}
    </div>
  );
}
