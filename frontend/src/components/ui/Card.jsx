import React from "react";

export function Card({ className = "", children }) {
  return (
    <div className={`glass elevate ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ className = "", children }) {
  return <div className={`px-5 pt-5 ${className}`}>{children}</div>;
}

export function CardTitle({ className = "", children }) {
  return <h3 className={`text-xl font-semibold ${className}`}>{children}</h3>;
}

export function CardContent({ className = "", children }) {
  return <div className={`px-5 pb-5 ${className}`}>{children}</div>;
}


