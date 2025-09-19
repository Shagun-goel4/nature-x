import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import AppLayout from "../components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import Button from "../components/ui/Button";
import { apiFetch } from "../lib/api";

export default function Quiz() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [lesson, setLesson] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    apiFetch(`/lessons/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setLesson);
  }, [id, token]);

  if (!lesson) return null;

  const handleChange = (qIdx, value) => {
    setAnswers((a) => ({ ...a, [qIdx]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let points = 0;
    lesson.quiz.forEach((q, i) => {
      if (q.type === "match") {
        if (JSON.stringify(answers[i]) === JSON.stringify(q.answer))
          points += 2;
      } else if (q.type === "fill" || q.type === "scenario") {
        if (answers[i]?.toLowerCase().trim() === q.answer.toLowerCase().trim())
          points += 2;
      } else {
        if (answers[i] === q.answer) points += 2;
      }
    });
    setScore(points);
    setSubmitted(true);
    await apiFetch(`/lessons/${id}/quiz`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ score: points }),
    });
    await apiFetch("/user/progress", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        lessonId: id,
        completed: true,
        ecoPoints: points,
        badge: lesson.badge,
      }),
    });
  };

  return (
    <AppLayout>
      <div className="flex justify-center">
        <Card className="max-w-2xl w-full">
          <CardHeader>
            <CardTitle>Quiz: {lesson.title}</CardTitle>
          </CardHeader>
          <CardContent>
            {lesson.quiz.map((q, i) => (
              <div key={i} className="mb-4">
                <div className="font-semibold mb-1">{q.question}</div>
                {q.type === "mcq" &&
                  q.options.map((opt) => (
                    <label key={opt} className="block">
                      <input
                        type="radio"
                        name={`q${i}`}
                        value={opt}
                        checked={answers[i] === opt}
                        onChange={() => handleChange(i, opt)}
                        required
                      /> {opt}
                    </label>
                  ))}
                {q.type === "truefalse" &&
                  q.options.map((opt) => (
                    <label key={opt} className="block">
                      <input
                        type="radio"
                        name={`q${i}`}
                        value={opt}
                        checked={answers[i] === opt}
                        onChange={() => handleChange(i, opt)}
                        required
                      /> {opt}
                    </label>
                  ))}
                {q.type === "fill" && (
                  <input
                    className="w-full rounded-lg bg-white/10 border border-white/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-400"
                    value={answers[i] || ""}
                    onChange={(e) => handleChange(i, e.target.value)}
                    required
                  />
                )}
                {q.type === "scenario" && (
                  <input
                    className="w-full rounded-lg bg-white/10 border border-white/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-400"
                    value={answers[i] || ""}
                    onChange={(e) => handleChange(i, e.target.value)}
                    required
                  />
                )}
                {q.type === "match" && (
                  <div className="flex gap-2">
                    {["Leaves", "Newspaper", "Chips wrapper"].map((item, idx) => (
                      <div key={item} className="flex flex-col items-center">
                        <span className="text-xs mb-1">{item}</span>
                        <select
                          className="rounded-md bg-white/10 border border-white/10 px-2 py-1"
                          value={answers[i]?.[idx] || ""}
                          onChange={(e) => {
                            const arr = answers[i] ? [...answers[i]] : ["", "", ""];
                            arr[idx] = e.target.value;
                            handleChange(i, arr);
                          }}
                          required
                        >
                          <option value="">Select</option>
                          {q.options.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {!submitted ? (
              <Button type="submit" onClick={handleSubmit}>Submit Quiz</Button>
            ) : (
              <div className="mt-4">
                <div className="text-emerald-300 font-bold">You scored {score} eco-points!</div>
                <Button className="mt-2" onClick={() => navigate(`/lessons/${id}/game`)}>Play Game</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
