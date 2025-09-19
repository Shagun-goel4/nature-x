import React from "react";
import { twMerge } from "tailwind-merge";

export default function Button({
  children,
  className = "",
  variant = "primary",
  size = "md",
  ...props
}) {
  const base = "inline-flex items-center justify-center rounded-xl font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-400 disabled:opacity-60 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-brand-500 hover:bg-brand-400 text-white shadow-glow",
    secondary:
      "bg-white/10 hover:bg-white/20 text-white border border-white/10",
    subtle:
      "bg-white text-surface-800 hover:bg-slate-100",
  };

  const sizes = {
    sm: "text-sm px-3 py-1.5",
    md: "text-sm px-4 py-2",
    lg: "text-base px-5 py-2.5",
  };

  return (
    <button className={twMerge(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}


