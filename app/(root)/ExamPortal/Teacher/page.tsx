"use client";
import React, { useState } from "react";
import MLExamCreator from "@/components/teacher/create-exam";

type MLCodingQuestion = {
  id: string;
  topic: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  questionText: string;
  expectedOutputType: string;
  codeTemplate?: string;
};

type MLExam = {
  id: string;
  semester: string;
  topic: string;
  date: string;
  totalStudents: number;
  status: "Upcoming" | "Completed";
  questions: MLCodingQuestion[];
};

const MLExamDashboard: React.FC = () => {
  const [exams, setExams] = useState<MLExam[]>([
    {
      id: "1",
      semester: "Fall 2024",
      topic: "Neural Networks",
      date: "2024-09-15",
      totalStudents: 30,
      status: "Upcoming",
      questions: [],
    },
    {
      id: "2",
      semester: "Spring 2024",
      topic: "Deep Learning",
      date: "2024-03-20",
      totalStudents: 25,
      status: "Completed",
      questions: [],
    },
  ]);

  const [selectedExam, setSelectedExam] = useState<MLExam | null>(null);
  const [isCreateExamModalOpen, setIsCreateExamModalOpen] = useState(false);

  const openExamDetails = (exam: MLExam) => {
    setSelectedExam(exam);
  };

  const handleExamCreated = (newExam: {
    semester: string;
    questions: MLCodingQuestion[];
  }) => {
    const createdExam: MLExam = {
      id: `exam_${Date.now()}`,
      semester: newExam.semester,
      topic: newExam.questions[0]?.topic || "Unnamed Topic",
      date: new Date().toISOString().split("T")[0],
      totalStudents: 0,
      status: "Upcoming",
      questions: newExam.questions,
    };

    setExams((prevExams) => [...prevExams, createdExam]);
    setIsCreateExamModalOpen(false);
  };

  return (
    <div className="container mx-auto bg-white p-6 text-gray-900 dark:bg-gray-900 dark:text-white">
      <h1 className="mb-6 text-3xl font-bold">ML Exam Dashboard</h1>

      {/* Dashboard Summary */}
      <div className="mb-6 grid grid-cols-3 gap-4">
        {[
          { title: "Total Exams", value: exams.length },
          {
            title: "Upcoming Exams",
            value: exams.filter((e) => e.status === "Upcoming").length,
          },
          {
            title: "Total Students",
            value: exams.reduce((sum, exam) => sum + exam.totalStudents, 0),
          },
        ].map((card, index) => (
          <div
            key={index}
            className="rounded-lg border bg-white p-4 shadow dark:border-gray-700 dark:bg-gray-800"
          >
            <h2 className="mb-2 text-gray-500 dark:text-gray-400">
              {card.title}
            </h2>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* Exam Management Table */}
      <div className="rounded-lg border bg-white shadow dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center justify-between border-b p-4 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            ML Exam Management
          </h2>
          <button
            onClick={() => setIsCreateExamModalOpen(true)}
            className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 dark:hover:bg-green-400"
          >
            Create New Exam
          </button>
        </div>

        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr className="border-b dark:border-gray-600">
              <th className="p-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                Semester
              </th>
              <th className="p-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                Topic
              </th>
              <th className="p-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                Date
              </th>
              <th className="p-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                Students
              </th>
              <th className="p-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                Status
              </th>
              <th className="p-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {exams.map((exam) => (
              <tr
                key={exam.id}
                className="border-b hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
              >
                <td className="p-3 text-gray-900 dark:text-white">
                  {exam.semester}
                </td>
                <td className="p-3 text-gray-900 dark:text-white">
                  {exam.topic}
                </td>
                <td className="p-3 text-gray-900 dark:text-white">
                  {exam.date}
                </td>
                <td className="p-3 text-gray-900 dark:text-white">
                  {exam.totalStudents}
                </td>
                <td className="p-3">
                  <span
                    className={`
                    rounded px-2 py-1 text-sm
                    ${
                      exam.status === "Upcoming"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                        : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                    }
                  `}
                  >
                    {exam.status}
                  </span>
                </td>
                <td className="p-3">
                  <button
                    onClick={() => openExamDetails(exam)}
                    className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600 dark:hover:bg-blue-400"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Exam Creation Modal */}
      {isCreateExamModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="size-3/4 rounded-lg bg-white p-6 shadow-xl dark:bg-gray-900">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Create New ML Exam
              </h2>
              <button
                onClick={() => setIsCreateExamModalOpen(false)}
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                ✕
              </button>
            </div>
            <MLExamCreator />
          </div>
        </div>
      )}

      {/* Exam Details Modal */}
      {selectedExam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-1/2 rounded-lg bg-white p-6 shadow-xl dark:bg-gray-900">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Exam Details
              </h2>
              <button
                onClick={() => setSelectedExam(null)}
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="space-y-2">
              <p className="text-gray-900 dark:text-white">
                <strong>Semester:</strong> {selectedExam.semester}
              </p>
              <p className="text-gray-900 dark:text-white">
                <strong>Topic:</strong> {selectedExam.topic}
              </p>
              <p className="text-gray-900 dark:text-white">
                <strong>Date:</strong> {selectedExam.date}
              </p>
              <p className="text-gray-900 dark:text-white">
                <strong>Total Students:</strong> {selectedExam.totalStudents}
              </p>
              <p className="text-gray-900 dark:text-white">
                <strong>Status:</strong> {selectedExam.status}
              </p>

              <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                Questions:
              </h3>
              {selectedExam.questions.map((question, index) => (
                <div
                  key={question.id}
                  className="rounded bg-gray-100 p-3 dark:bg-gray-800"
                >
                  <p className="font-medium text-gray-900 dark:text-white">
                    Q{index + 1}: {question.topic} - {question.difficulty}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    {question.questionText}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MLExamDashboard;
