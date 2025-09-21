import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import Button from "../components/ui/Button";
import { apiFetch } from "../lib/api";

export default function TeacherLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    const endpoint = isRegister ? "/auth/register" : "/auth/login";
    const body = isRegister ? { username, password, role: "teacher" } : { username, password };
    const res = await apiFetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) return setError(data.message || "Error");
    if (isRegister) {
      setIsRegister(false);
      return;
    }
    localStorage.setItem("teacherToken", data.token);
    navigate("/teacher/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold tracking-tight">NatureX – Teacher</h1>
        <p className="text-white/70 text-sm mt-2">Manage classes, modules, and missions.</p>
      </div>
      <Card className="max-w-md w-full bg-black/40 backdrop-blur-sm border border-white/10 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-white">{isRegister ? "Create teacher account" : "Teacher sign in"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-3">
            <input className="w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)} required />
            <input className="w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400" type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
            {error && <div className="text-red-400 text-sm">{error}</div>}
            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">{isRegister ? "Create account" : "Sign in"}</Button>
            <button type="button" className="w-full text-emerald-400 hover:text-emerald-300 text-sm" onClick={()=>setIsRegister(v=>!v)}>
              {isRegister ? "Already have an account? Sign in" : "No account? Register"}
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}


