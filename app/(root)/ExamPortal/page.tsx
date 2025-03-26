"use client";

import Link from "next/link";

export default function ExamPortal() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <h1 className="text-4xl font-bold text-indigo-600 dark:text-white">
        Exam Portal
      </h1>
      <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
        Choose your role:
      </p>

      <div className="mt-6 flex gap-6">
        <Link
          href="/ExamPortal/Student"
          className="rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white shadow-lg transition-transform duration-200 hover:scale-105"
        >
          Student Dashboard
        </Link>

        <Link
          href="/ExamPortal/Teacher"
          className="rounded-lg bg-green-500 px-6 py-3 font-semibold text-white shadow-lg transition-transform duration-200 hover:scale-105"
        >
          Teacher Dashboard
        </Link>
      </div>
    </div>
  );
}
