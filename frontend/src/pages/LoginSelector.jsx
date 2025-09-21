import React from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import Button from "../components/ui/Button";

export default function LoginSelector() {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="max-w-md mx-auto p-6 bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-emerald-400 mb-6">
          Nature-X Login
        </h1>
        
        <div className="space-y-4">
          <div className="p-4 border border-emerald-500/30 rounded-md bg-black/30 hover:bg-black/50 transition">
            <h2 className="text-xl font-semibold text-emerald-400 mb-2">Student Login</h2>
            <p className="text-white/70 mb-4">
              Access your eco-learning journey, track progress, and earn rewards.
            </p>
            <Button 
              onClick={() => navigate("/login")} 
              className="w-full bg-emerald-600 hover:bg-emerald-700"
            >
              Login as Student
            </Button>
          </div>
          
          <div className="p-4 border border-blue-500/30 rounded-md bg-black/30 hover:bg-black/50 transition">
            <h2 className="text-xl font-semibold text-blue-400 mb-2">Teacher Login</h2>
            <p className="text-white/70 mb-4">
              Manage your classroom, create assignments, and monitor student progress.
            </p>
            <Button 
              onClick={() => navigate("/teacher/login")} 
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Login as Teacher
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}