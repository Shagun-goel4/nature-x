import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import LessonPageNav from "../components/LessonPageNav";
import AppLayout from "../components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import Button from "../components/ui/Button";
import { motion } from "framer-motion";
import { apiFetch } from "../lib/api";

export default function Lesson() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [lesson, setLesson] = useState(null);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    apiFetch(`/lessons/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setLesson(data);
        setPage(0);
      });
  }, [id, token]);

  if (!lesson) return null;

  // Use pages array for all lessons
  const isLesson1 =
    lesson.title && lesson.title.toLowerCase().includes("waste segregation");
  const totalPages = lesson.pages ? lesson.pages.length : 1;

  return (
    <AppLayout>
      <div className="flex justify-center">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>{lesson.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              {/* <img src="/Public/waste-segregation-diagram.png" alt="Lesson visual" className="w-full rounded-xl border border-white/10" /> */}
            </div>
            {lesson.pages && lesson.pages[page] && (
              <div className="flex flex-col justify-center items-center h-full w-full">
              {/* Special layout for Lesson 1, page 0 */}
              {isLesson1 && page === 0 ? (
                <>
                  <h2 className="text-lg font-semibold text-emerald-300 mb-2">
                    Concept & Importance
                  </h2>
                  <div className="whitespace-pre-line text-base mb-4">
                    Waste segregation means dividing garbage into different
                    groups so it can be handled properly.\nWe usually use three
                    bins:
                  </div>
                  <table className="w-full mb-4 text-center bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                    <thead>
                      <tr className="bg-white/10">
                        <th className="p-2">Bin</th>
                        <th className="p-2">Color</th>
                        <th className="p-2">What to Throw</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-2">🟢 Green Bin</td>
                        <td className="p-2">Green</td>
                        <td className="p-2">
                          Food waste, vegetable peels, garden waste, anything
                          that rots easily.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2">🔵 Blue Bin</td>
                        <td className="p-2">Blue</td>
                        <td className="p-2">
                          Paper, plastic bottles, metal cans, glass jars – items
                          that can be recycled.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2">⚫ Black Bin</td>
                        <td className="p-2">Black</td>
                        <td className="p-2">
                          Plastic wrappers, thermocol, non-recyclable materials.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="mb-2 font-semibold text-emerald-300">
                    Why it matters:
                  </div>
                  <ul className="list-disc ml-6 mb-4 text-base">
                    <li>Prevents harmful mixing of waste.</li>
                    <li>Allows recycling and composting.</li>
                    <li>Keeps our streets, rivers, and soil clean.</li>
                  </ul>
                  <h2 className="text-lg font-semibold text-emerald-300 mb-2 mt-6">
                    Examples & Student Action Plan
                  </h2>
                  <div className="mb-2 text-base">
                    School examples:{" "}
                    <span className="font-medium">
                      Canteen leftovers → Green bin, Exam papers → Blue bin.
                    </span>
                  </div>
                  <div className="mb-2 text-base">
                    Home examples:{" "}
                    <span className="font-medium">
                      Chips packets → Black bin, Broken glass bottle → Blue bin.
                    </span>
                  </div>
                  <div className="mb-2 font-semibold text-green-700 mt-4">
                    Do’s & Don’ts:
                  </div>
                  <ul className="list-disc ml-6 mb-2 text-base">
                    <li>✅ Always check before throwing waste.</li>
                    <li>
                      ✅ Clean recyclables before putting them in blue bin.
                    </li>
                    <li>❌ Don’t mix food waste with recyclables.</li>
                  </ul>
                  <div className="mt-4 text-base font-bold text-blue-300">
                    Call to Action:
                  </div>
                  <div className="italic text-base">
                    “Be a Waste Wizard! Help your school stay clean by teaching
                    your friends and family about the 3-bin system.”
                  </div>
                </>
              ) : lesson.title &&
                lesson.title.toLowerCase().includes("energy saving") &&
                page === 1 ? (
                <>
                  <h2 className="text-lg font-semibold text-emerald-300 mb-4">
                    Lesson Summary
                  </h2>
                  <img
                    src="/WhatsApp Image 2025-09-19 at 10.51.39_d43290c2.jpg"
                    alt="Energy Saving Summary"
                    className="w-full max-w-md mb-4 rounded shadow"
                    style={{ minHeight: 200, objectFit: "contain" }}
                  />
                  <div className="text-white/70 text-center mt-2">
                    This image summarizes the importance of saving energy: turn
                    off unused devices, unplug to save, and use solar power for
                    a brighter future!
                  </div>
                </>
              ) : lesson.title &&
                lesson.title.toLowerCase().includes("climate change") &&
                page === 1 ? (
                <>
                  <h2 className="text-lg font-semibold text-emerald-300 mb-4">
                    Lesson Summary
                  </h2>
                  <img
                    src="/WhatsApp Image 2025-09-19 at 10.51.39_2cc077a0.jpg"
                    alt="Climate Change Summary"
                    className="w-full max-w-md mb-4 rounded shadow"
                    style={{ minHeight: 20, objectFit: "contain" }}
                  />
                  <div className="text-white/70 text-center mt-2">
                    This image summarizes the importance of fighting climate
                    change: protect nature, reduce pollution, and act now for a
                    healthier planet.
                  </div>
                </>
              ) : lesson.title &&
                lesson.title.toLowerCase().includes("water conservation") &&
                page === 1 ? (
                <>
                  <h2 className="text-lg font-semibold text-emerald-300 mb-4">
                    Lesson Summary
                  </h2>
                  <img
                    src="/WhatsApp Image 2025-09-19 at 10.51.40_cdda455e.jpg"
                    alt="Water Conservation Summary"
                    className="w-full max-w-md mb-4 rounded shadow"
                    style={{ minHeight: 200, objectFit: "contain" }}
                  />
                  <div className="text-white/70 text-center mt-2">
                    This image summarizes the importance of saving water: turn
                    off taps, collect rainwater, and every drop you save makes a
                    difference!
                  </div>
                </>
              ) : isLesson1 && page === 1 ? (
                <>
                  <h2 className="text-lg font-semibold text-emerald-300 mb-4">
                    Lesson Summary
                  </h2>
                  <img
                    src="/WhatsApp Image 2025-09-19 at 10.51.41_85f42638.jpg"
                    alt="Lesson Summary Diagram"
                    className="w-full max-w-md mb-4 rounded shadow"
                    style={{ minHeight: 200, objectFit: "contain" }}
                  />
                  <div className="text-white/70 text-center mt-2">
                    This diagram shows the 3-bin system: Green for food/garden
                    waste, Blue for recyclables, Black for non-recyclables.
                    Remember to always check before you throw!
                  </div>
                </>
              ) : lesson.title &&
                lesson.title.toLowerCase().includes("biodiversity") &&
                page === 1 ? (
                <>
                  <h2 className="text-lg font-semibold text-green-600 mb-4">
                    Lesson Summary
                  </h2>
                  <img
                    src="/WhatsApp Image 2025-09-19 at 10.51.40_2a90a30e.jpg"
                    alt="Biodiversity & Wildlife Protection Summary"
                    className="w-full max-w-md mb-4 rounded shadow"
                    style={{ minHeight: 200, objectFit: "contain" }}
                  />
                  <div className="text-gray-700 text-center mt-2">
                    This image summarizes the importance of protecting wildlife
                    and biodiversity: care for all living things, plant trees,
                    and help nature thrive!
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-lg font-semibold text-emerald-300 mb-2">
                    {lesson.pages[page].title}
                  </h2>
                  <div className="whitespace-pre-line text-base text-white/80">
                    {lesson.pages[page].content}
                  </div>
                </>
              )}
              </div>
            )}
            <div className="flex flex-col gap-3 mt-8">
              {page < totalPages - 1 && (
                <Button onClick={() => setPage(page + 1)} className="w-full">Next</Button>
              )}
              {page === totalPages - 1 && (
                <>
                  <Link to={`/lessons/${id}/quiz`} className="w-full">
                    <Button className="w-full">Take Quiz</Button>
                  </Link>
                  <Link to="/dashboard" className="w-full">
                    <Button variant="secondary" className="w-full">Back</Button>
                  </Link>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
