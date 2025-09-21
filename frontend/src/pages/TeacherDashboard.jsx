import React, { useEffect, useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../lib/api";
import ChatbotWidget from "../components/ChatbotWidget";

export default function TeacherDashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [assignments, setAssignments] = useState([]);
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    description: "",
    dueDate: "",
    xpReward: 50,
    badge: "eco-warrior",
    ecoTheme: "waste",
  });
  const [newLesson, setNewLesson] = useState({
    title: "",
    description: "",
    content: "",
    ecoTheme: "waste",
    xpReward: 100,
  });
  const navigate = useNavigate();
  const token = localStorage.getItem("teacherToken");

  useEffect(() => {
    if (!token) return;
    setLoading(true);

    // Fetch dashboard data
    apiFetch("/teacher/dashboard", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch dashboard");
        return r.json();
      })
      .then((d) => {
        setData(d);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));

    // Fetch assignments data
    apiFetch("/teacher/assignments", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch assignments");
        return r.json();
      })
      .then((assignmentsData) => {
        // If the API returns assignments, use them
        if (Array.isArray(assignmentsData)) {
          setAssignments(assignmentsData);
        }
      })
      .catch((err) => {
        console.error("Error fetching assignments:", err);
        // We don't set the main error state here to avoid blocking the dashboard
      });
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("teacherToken");
    setData(null);
    setError(null);
    navigate("/teacher/login");
  };

  if (!token) {
    return (
      <AppLayout>
        <div className="text-red-400 font-bold text-xl mb-4">
          You are not logged in as a teacher.
        </div>
        <Button onClick={() => navigate("/teacher/login")}>
          Go to Teacher Login
        </Button>
      </AppLayout>
    );
  }

  if (error) {
    return (
      <AppLayout>
        <div className="text-red-400 font-bold text-xl">Error: {error}</div>
        <div className="mt-4">
          Check your API server, token, and network connection.
        </div>
        <Button className="mt-6" onClick={handleLogout}>
          Logout
        </Button>
      </AppLayout>
    );
  }

  if (loading || !data) {
    return (
      <AppLayout>
        <div className="text-gray-400 font-semibold text-xl">
          Loading dashboard...
        </div>
        <Button className="mt-6" onClick={handleLogout}>
          Logout
        </Button>
      </AppLayout>
    );
  }

  // Function to handle assignment creation
  const handleCreateAssignment = () => {
    // Show validation error if title is empty
    if (!newAssignment.title.trim()) {
      setError("Mission title is required");
      return;
    }

    // Create assignment object
    const assignmentData = {
      ...newAssignment,
      createdAt: new Date().toISOString(),
      status: "active",
    };

    // Make API call to create assignment
    setLoading(true);
    apiFetch("/teacher/assignments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(assignmentData),
    })
      .then((r) => {
        if (!r.ok) {
          if (r.status === 401) {
            throw new Error("Authentication failed. Please log in again.");
          } else if (r.status === 503 || r.status === 500) {
            throw new Error(
              "Server error. Please check your API server connection."
            );
          } else {
            throw new Error(
              "Failed to create assignment. Check your network connection."
            );
          }
        }
        return r.json();
      })
      .then((createdAssignment) => {
        // Add the new assignment to the state
        setAssignments([...assignments, createdAssignment]);
        setError(null);

        // Reset the form
        setNewAssignment({
          title: "",
          description: "",
          dueDate: "",
          xpReward: 50,
          badge: "eco-warrior",
          ecoTheme: "waste",
        });

        // Show success message
        alert("Mission created successfully!");
      })
      .catch((err) => {
        // Only show error for this operation
        setError(`${err.message}`);
        console.error("API Error:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Function to handle input changes for new assignment
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAssignment({
      ...newAssignment,
      [name]: value,
    });
  };

  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Teacher Portal</h1>
        <Button variant="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "dashboard"
              ? "border-b-2 border-emerald-500 text-emerald-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("dashboard")}
        >
          Dashboard Overview
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "assignments"
              ? "border-b-2 border-emerald-500 text-emerald-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("assignments")}
        >
          Gamified Assignments
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "lessons"
              ? "border-b-2 border-emerald-500 text-emerald-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("lessons")}
        >
          Lessons
        </button>
      </div>

      {/* Dashboard Overview Tab */}
      {activeTab === "dashboard" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Snapshot</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <div>
                  Average XP:{" "}
                  <span className="text-emerald-300 font-semibold">
                    {data?.summary?.avgXP ?? "-"}
                  </span>
                </div>
                <div>Modules: {data?.summary?.modules ?? "-"}</div>
                <div>Missions: {data?.summary?.missions ?? "-"}</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Classes</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1">
                {Array.isArray(data?.classes) ? (
                  data.classes.map((c) => (
                    <li key={c.id}>
                      {c.name} – {c.students} students
                    </li>
                  ))
                ) : (
                  <li>-</li>
                )}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Leaderboard</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-1">
                {Array.isArray(data?.leaderboard) ? (
                  data.leaderboard.map((e, i) => (
                    <li key={i}>
                      {e.username} ({e.ecoPoints})
                    </li>
                  ))
                ) : (
                  <li>-</li>
                )}
              </ol>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Lessons Tab */}
      {activeTab === "lessons" && (
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Create New Lesson</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Lesson Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={newLesson.title}
                    onChange={(e) =>
                      setNewLesson({ ...newLesson, title: e.target.value })
                    }
                    placeholder="e.g., Introduction to Recycling"
                    className="w-full p-2 border rounded-md bg-black/30 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400 border-white/10"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={newLesson.description}
                    onChange={(e) =>
                      setNewLesson({
                        ...newLesson,
                        description: e.target.value,
                      })
                    }
                    placeholder="Brief description of the lesson..."
                    className="w-full p-2 border rounded-md h-24 bg-black/30 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400 border-white/10"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Lesson Content
                  </label>
                  <textarea
                    name="content"
                    value={newLesson.content}
                    onChange={(e) =>
                      setNewLesson({ ...newLesson, content: e.target.value })
                    }
                    placeholder="Full lesson content with details..."
                    className="w-full p-2 border rounded-md h-48 bg-black/30 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400 border-white/10"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      XP Reward
                    </label>
                    <input
                      type="number"
                      name="xpReward"
                      value={newLesson.xpReward}
                      onChange={(e) =>
                        setNewLesson({
                          ...newLesson,
                          xpReward: parseInt(e.target.value),
                        })
                      }
                      className="w-full p-2 border rounded-md bg-black/30 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400 border-white/10"
                      min="1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Eco Theme
                    </label>
                    <select
                      name="ecoTheme"
                      value={newLesson.ecoTheme}
                      onChange={(e) =>
                        setNewLesson({ ...newLesson, ecoTheme: e.target.value })
                      }
                      className="w-full p-2 border rounded-md bg-black/30 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 border-white/10"
                    >
                      <option value="waste">Waste</option>
                      <option value="energy">Energy</option>
                      <option value="water">Water</option>
                      <option value="biodiversity">Biodiversity</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    onClick={() => {
                      // Validate lesson title
                      if (!newLesson.title.trim()) {
                        setError("Lesson title is required");
                        return;
                      }

                      // Create lesson object
                      const lessonData = {
                        ...newLesson,
                        createdAt: new Date().toISOString(),
                      };

                      // Make API call to create lesson
                      setLoading(true);
                      apiFetch("/teacher/lessons", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify(lessonData),
                      })
                        .then((r) => {
                          if (!r.ok) {
                            if (r.status === 401) {
                              throw new Error(
                                "Authentication failed. Please log in again."
                              );
                            } else if (r.status === 503 || r.status === 500) {
                              throw new Error(
                                "Server error. Please check your API server connection."
                              );
                            } else {
                              throw new Error(
                                "Failed to create lesson. Check your network connection."
                              );
                            }
                          }
                          return r.json();
                        })
                        .then(() => {
                          setError(null);
                          // Reset the form
                          setNewLesson({
                            title: "",
                            description: "",
                            content: "",
                            ecoTheme: "waste",
                            xpReward: 100,
                          });
                          alert("Lesson created successfully!");
                        })
                        .catch((err) => {
                          setError(`${err.message}`);
                          console.error("API Error:", err);
                        })
                        .finally(() => {
                          setLoading(false);
                        });
                    }}
                  >
                    Create Lesson
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Gamified Assignments Tab */}
      {activeTab === "assignments" && (
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Create Eco-Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Mission Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={newAssignment.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Bring a reusable bottle tomorrow"
                    className={`w-full p-2 border rounded-md bg-black/30 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                      !newAssignment.title && error?.includes("title")
                        ? "border-red-500"
                        : "border-white/10"
                    }`}
                    required
                  />
                  {error?.includes("title") && (
                    <p className="text-red-500 text-sm mt-1">
                      Mission title is required
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={newAssignment.description}
                    onChange={handleInputChange}
                    placeholder="Explain the eco-mission details..."
                    className="w-full p-2 border rounded-md h-24 bg-black/30 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400 border-white/10"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Due Date
                    </label>
                    <input
                      type="date"
                      name="dueDate"
                      value={newAssignment.dueDate}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md bg-black/30 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400 border-white/10"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      XP Reward
                    </label>
                    <input
                      type="number"
                      name="xpReward"
                      value={newAssignment.xpReward}
                      onChange={handleInputChange}
                      min="10"
                      max="500"
                      className="w-full p-2 border rounded-md bg-black/30 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400 border-white/10"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Badge Reward
                    </label>
                    <select
                      name="badge"
                      value={newAssignment.badge}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md bg-black/30 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 border-white/10"
                    >
                      <option value="eco-warrior">Eco Warrior</option>
                      <option value="waste-reducer">Waste Reducer</option>
                      <option value="energy-saver">Energy Saver</option>
                      <option value="water-protector">Water Protector</option>
                      <option value="biodiversity-champion">
                        Biodiversity Champion
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Eco Theme
                    </label>
                    <select
                      name="ecoTheme"
                      value={newAssignment.ecoTheme}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md bg-black/30 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 border-white/10"
                    >
                      <option value="waste">Waste</option>
                      <option value="energy">Energy</option>
                      <option value="water">Water</option>
                      <option value="biodiversity">Biodiversity</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <Button onClick={handleCreateAssignment}>
                    Create Eco-Mission
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Eco-Missions</CardTitle>
            </CardHeader>
            <CardContent>
              {assignments.length === 0 ? (
                <p className="text-gray-500">
                  No active eco-missions. Create one above!
                </p>
              ) : (
                <div className="space-y-4">
                  {assignments.map((assignment) => (
                    <div key={assignment.id} className="border p-4 rounded-md">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold">{assignment.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {assignment.description}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded">
                              {assignment.xpReward} XP
                            </span>
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                              {assignment.badge.replace("-", " ")}
                            </span>
                            <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                              {assignment.ecoTheme}
                            </span>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          Due:{" "}
                          {new Date(assignment.dueDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Floating Chatbot Widget */}
      <ChatbotWidget />
    </AppLayout>
  );
}
