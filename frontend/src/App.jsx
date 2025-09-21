import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Lesson from "./pages/Lesson";
import Quiz from "./pages/Quiz";
import Game from "./pages/Game";
import Rewards from "./pages/Rewards";
import Leaderboard from "./pages/Leaderboard";
import { AuthProvider } from "./context/AuthContext";
import TeacherLogin from "./pages/TeacherLogin";
import TeacherDashboard from "./pages/TeacherDashboard";
import Lessons from "./pages/Lessons";
import LoginSelector from "./pages/LoginSelector";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/teacher/login" element={<TeacherLogin />} />
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/lessons/:id" element={<Lesson />} />
          <Route path="/lessons/:id/quiz" element={<Quiz />} />
          <Route path="/lessons/:id/game" element={<Game />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/" element={<LoginSelector />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
