"use client";
import React, { useState } from "react";

type MLCodingQuestion = {
  id: string;
  topic: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  questionText: string;
  expectedOutputType: string;
  codeTemplate?: string;
};

type MLExam = {
  semester: string;
  questions: MLCodingQuestion[];
};

const MLExamCreator: React.FC = () => {
  const [exam, setExam] = useState<MLExam>({
    semester: "",
    questions: [],
  });
  const [newQuestion, setNewQuestion] = useState<MLCodingQuestion>({
    id: "",
    topic: "",
    difficulty: "Beginner",
    questionText: "",
    expectedOutputType: "",
    codeTemplate: "",
  });

  const mlTopics = [
    "Neural Networks",
    "Decision Trees",
    "Regression",
    "Machine Learning Foundations",
  ];

  const semesters = [
    "Fall 2024",
    "Spring 2025",
    "Summer 2025",
    "Fall 2025",
    "Spring 2026",
  ];

  const handleAddQuestion = () => {
    if (!newQuestion.topic || !newQuestion.questionText) {
      alert("Please fill in all required fields");
      return;
    }

    const newQuestionWithId = {
      ...newQuestion,
      id: `q_${Date.now()}`,
    };

    setExam((prevExam) => ({
      ...prevExam,
      questions: [...prevExam.questions, newQuestionWithId],
    }));

    // Reset form
    setNewQuestion({
      id: "",
      topic: "",
      difficulty: "Beginner",
      questionText: "",
      expectedOutputType: "",
      codeTemplate: "",
    });
  };

  const handleRemoveQuestion = (id: string) => {
    setExam((prevExam) => ({
      ...prevExam,
      questions: prevExam.questions.filter((q) => q.id !== id),
    }));
  };

  const handleCreateExam = () => {
    if (exam.questions.length === 0) {
      alert("Please add at least one question to the exam");
      return;
    }

    if (!exam.semester) {
      alert("Please select a semester for the exam");
      return;
    }

    console.log("Exam Created:", exam);
    alert(`Exam created with ${exam.questions.length} questions`);
  };

  return (
    <div className="flex h-full flex-col bg-white p-4 text-gray-900 dark:bg-gray-900 dark:text-white">
      <div className="grid h-full grid-cols-2 gap-4">
        {/* Question Creation Form */}
        <div className="rounded-lg bg-white p-4 shadow-md dark:bg-gray-800">
          <h2 className="mb-4 text-xl font-semibold">Add ML Coding Question</h2>

          <div className="space-y-4">
            {/* Semester Selection */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Semester
              </label>
              <select
                value={exam.semester}
                onChange={(e) =>
                  setExam((prevExam) => ({
                    ...prevExam,
                    semester: e.target.value,
                  }))
                }
                className="w-full rounded-md border bg-white p-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select Semester</option>
                {semesters.map((semester) => (
                  <option key={semester} value={semester}>
                    {semester}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Topic
              </label>
              <select
                value={newQuestion.topic}
                onChange={(e) =>
                  setNewQuestion({
                    ...newQuestion,
                    topic: e.target.value,
                  })
                }
                className="w-full rounded-md border bg-white p-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select Topic</option>
                {mlTopics.map((topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Difficulty
              </label>
              <select
                value={newQuestion.difficulty}
                onChange={(e) =>
                  setNewQuestion({
                    ...newQuestion,
                    difficulty: e.target.value as
                      | "Beginner"
                      | "Intermediate"
                      | "Advanced",
                  })
                }
                className="w-full rounded-md border bg-white p-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Question Text
              </label>
              <textarea
                value={newQuestion.questionText}
                onChange={(e) =>
                  setNewQuestion({
                    ...newQuestion,
                    questionText: e.target.value,
                  })
                }
                className="w-full rounded-md border bg-white p-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                rows={3}
                placeholder="Describe the ML coding task"
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleAddQuestion}
                className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 dark:hover:bg-blue-400"
              >
                Add Question
              </button>
            </div>
          </div>
        </div>

        {/* Questions List */}
        <div className="flex flex-col rounded-lg bg-white p-4 shadow-md dark:bg-gray-800">
          <h2 className="mb-4 text-xl font-semibold">
            Added Questions ({exam.questions.length})
          </h2>

          <div className="grow space-y-2 overflow-y-auto">
            {exam.questions.length === 0 ? (
              <div className="text-center text-gray-500 dark:text-gray-400">
                No questions added yet
              </div>
            ) : (
              exam.questions.map((question, index) => (
                <div
                  key={question.id}
                  className="flex items-center justify-between rounded-md bg-gray-100 p-3 dark:bg-gray-700"
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      Q{index + 1}: {question.topic} - {question.difficulty}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {question.questionText}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemoveQuestion(question.id)}
                    className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>

          {exam.questions.length > 0 && exam.semester && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleCreateExam}
                className="rounded-md bg-green-500 px-6 py-2 text-white hover:bg-green-600 dark:hover:bg-green-400"
              >
                Create Exam
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MLExamCreator;
