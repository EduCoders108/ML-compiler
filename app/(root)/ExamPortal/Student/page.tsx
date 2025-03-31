"use client";
import React, { useState, useEffect } from "react";

// Simulated API-like data structure for exams created by teachers
const mockTeacherCreatedExams = [
  {
    id: "1",
    subject: "Neural Networks Fundamentals",
    teacher: "Dr. Anna Rodriguez",
    date: "2024-07-15",
    duration: "2 hours",
    totalMarks: 100,
    description:
      "Comprehensive exam covering neural network architectures and learning algorithms",
    status: "Upcoming",
  },
  {
    id: "2",
    subject: "Advanced Machine Learning Techniques",
    teacher: "Prof. Michael Chen",
    date: "2024-08-10",
    duration: "3 hours",
    totalMarks: 150,
    description:
      "In-depth assessment of advanced ML algorithms and their applications",
    status: "Upcoming",
  },
  {
    id: "3",
    subject: "Deep Learning Practical",
    teacher: "Dr. Sarah Kim",
    date: "2024-09-05",
    duration: "2.5 hours",
    totalMarks: 120,
    description:
      "Practical implementation and theoretical understanding of deep learning models",
    status: "Upcoming",
  },
];

const MLStudentDashboard: React.FC = () => {
  const [exams, setExams] = useState(mockTeacherCreatedExams);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Theme toggle functionality
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
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

      <h1 className="text-3xl font-bold">Student Exam Dashboard</h1>

      <div className="rounded-lg border bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
        <div className="border-b p-4 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Available Exams
          </h2>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr className="border-b dark:border-gray-600">
              {[
                "Exam Subject",
                "Teacher",
                "Date",
                "Duration",
                "Total Marks",
                "Actions",
              ].map((header) => (
                <th
                  key={header}
                  className="p-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
                >
                  {header}
                </th>
              ))}
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
                  {exam.teacher}
                </td>
                <td className="p-3 text-gray-900 dark:text-gray-100">
                  {exam.date}
                </td>
                <td className="p-3 text-gray-900 dark:text-gray-100">
                  {exam.duration}
                </td>
                <td className="p-3 text-gray-900 dark:text-gray-100">
                  {exam.totalMarks}
                </td>
                <td className="p-3">
                  <button
                    className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500"
                    onClick={() => {
                      /* Future: Open exam details modal */
                    }}
                  >
                    View Details
                  </button>
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
              Upcoming Exams
            </h2>
          </div>
          <div className="space-y-4 p-6">
            {exams.map((exam) => (
              <div
                key={exam.id}
                className="flex items-center justify-between rounded bg-gray-50 p-3 dark:bg-gray-700"
              >
                <div>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    {exam.subject}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {exam.teacher}
                  </p>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {exam.date}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
          <div className="border-b p-4 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Exam Preparation
            </h2>
          </div>
          <div className="p-6">
            <p className="text-gray-600 dark:text-gray-300">
              Total Upcoming Exams: {exams.length}
            </p>
            <div className="mt-4 space-y-2">
              {exams.map((exam) => (
                <div
                  key={exam.id}
                  className="flex items-center justify-between rounded bg-gray-100 p-2 dark:bg-gray-700"
                >
                  <span className="text-gray-900 dark:text-gray-100">
                    {exam.subject}
                  </span>
                  <button className="text-sm text-blue-600 dark:text-blue-400">
                    Study Resources
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MLStudentDashboard;
