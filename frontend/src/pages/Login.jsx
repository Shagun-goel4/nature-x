import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import Button from "../components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { apiFetch } from "../lib/api";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [school, setSchool] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const url = isRegister
      ? "/auth/register"
      : "/auth/login";
    const body = isRegister
      ? { username, password, school }
      : { username, password };
    try {
      const res = await apiFetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const contentType = res.headers.get("content-type") || "";
      const data = contentType.includes("application/json") ? await res.json() : await res.text();
      if (!res.ok) throw new Error((data && data.message) || (typeof data === "string" ? data : "Error"));
      if (isRegister) {
        setIsRegister(false);
        navigate("/login");
        return;
      }
      else {
        login(data.token);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold tracking-tight">NatureX</h1>
        <p className="text-white/70 text-sm mt-2">Earn eco-points by learning and playing.</p>
      </div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="w-full max-w-md">
        <Card className="overflow-hidden bg-black/40 backdrop-blur-sm border border-white/10 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white">{isRegister ? "Create your account" : "Sign in"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                className="w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                className="w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {isRegister && (
                <input
                  className="w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  placeholder="School"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  required
                />
              )}
              {error && <div className="text-red-400 text-sm">{error}</div>}
              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" size="lg">
                {isRegister ? "Create account" : "Sign in"}
              </Button>
              <button
                type="button"
                className="w-full text-emerald-400 hover:text-emerald-300 text-sm"
                onClick={() => setIsRegister((r) => !r)}
              >
                {isRegister ? "Already have an account? Sign in" : "No account? Register"}
              </button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
