"use client";
import React, { useState, useEffect } from "react";

// Mock data for ML-specific exams
const mockMLExams = [
  {
    id: "1",
    subject: "Neural Networks",
    date: "2024-07-15",
    status: "Upcoming",
    result: null,
  },
  {
    id: "2",
    subject: "Deep Learning",
    date: "2024-06-20",
    status: "Completed",
    result: "85%",
  },
  {
    id: "3",
    subject: "Machine Learning Algorithms",
    date: "2024-08-10",
    status: "Upcoming",
    result: null,
  },
];

const MLStudentDashboard: React.FC = () => {
  const [exams, setExams] = useState(mockMLExams);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Theme toggle functionality
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      // Check system preference
      const prefersDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setTheme(prefersDarkMode ? "dark" : "light");
      document.documentElement.classList.toggle("dark", prefersDarkMode);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="container mx-auto min-h-screen space-y-6 bg-white p-6 text-gray-900 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-100">
      {/* Theme Toggle Button */}
      <div className="absolute right-4 top-4">
        <button
          onClick={toggleTheme}
          className="rounded-full bg-gray-200 p-2 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>

      <h1 className="text-3xl font-bold">ML Student Dashboard</h1>

      <div className="rounded-lg border bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
        <div className="border-b p-4 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            ML Exam Schedule
          </h2>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr className="border-b dark:border-gray-600">
              {["ML Subject", "Date", "Status", "Result", "Actions"].map(
                (header) => (
                  <th
                    key={header}
                    className="p-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {exams.map((exam) => (
              <tr
                key={exam.id}
                className="border-b hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
              >
                <td className="p-3 text-gray-900 dark:text-gray-100">
                  {exam.subject}
                </td>
                <td className="p-3 text-gray-900 dark:text-gray-100">
                  {exam.date}
                </td>
                <td className="p-3">
                  <span
                    className={`
                      rounded-full px-2 py-1 text-xs 
                      ${
                        exam.status === "Upcoming"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      }
                    `}
                  >
                    {exam.status}
                  </span>
                </td>
                <td className="p-3 text-gray-900 dark:text-gray-100">
                  {exam.result || "N/A"}
                </td>
                <td className="p-3">
                  {exam.status === "Upcoming" ? (
                    <button className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500">
                      Prepare Exam
                    </button>
                  ) : (
                    <button className="rounded border border-blue-500 px-3 py-1 text-sm text-blue-500 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-950">
                      View Detailed Results
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="rounded-lg border bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
          <div className="border-b p-4 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              ML Performance Overview
            </h2>
          </div>
          <div className="space-y-4 p-6">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Average ML Score
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                78%
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total ML Exams
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {exams.length}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
          <div className="border-b p-4 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Upcoming ML Exams
            </h2>
          </div>
          <div className="p-6">
            {exams
              .filter((exam) => exam.status === "Upcoming")
              .map((exam) => (
                <div
                  key={exam.id}
                  className="mb-2 flex items-center justify-between text-gray-900 dark:text-gray-100"
                >
                  <span>{exam.subject}</span>
                  <span className="text-gray-500 dark:text-gray-400">
                    {exam.date}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MLStudentDashboard;
