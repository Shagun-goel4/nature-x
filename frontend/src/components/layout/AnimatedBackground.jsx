import React from "react";
import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute -top-20 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-brand-500/20 blur-3xl"
        animate={{
          y: [0, -10, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-10%] right-[-10%] h-[30rem] w-[30rem] rounded-full bg-blue-500/10 blur-3xl"
        animate={{ rotate: [0, 15, 0], scale: [1, 1.07, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-[30%] left-[-10%] h-[24rem] w-[24rem] rounded-full bg-emerald-400/10 blur-3xl"
        animate={{ y: [0, 15, 0], x: [0, 10, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(transparent_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
    </div>
  );
}


