"use client";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useSession } from "next-auth/react";

type MLCodingQuestion = {
  id: string;
  questionText: string;
  expectedOutputType: string;
  codeTemplate?: string;
};

type ExamFormData = {
  title: string;
  semester: string;
  topic: string;
  date: string;
  duration?: number;
  totalMarks?: number;
  status: "Draft" | "Active" | "Scheduled" | "Completed";
  questions: MLCodingQuestion[];
};

interface MLExamCreatorProps {
  onExamCreated: () => void;
}

const MLExamCreator: React.FC<MLExamCreatorProps> = ({ onExamCreated }) => {
  const { data: session } = useSession();

  const [formData, setFormData] = useState<ExamFormData>({
    title: "",
    semester: "",
    topic: "",
    date: "",
    duration: undefined,
    totalMarks: undefined,
    status: "Draft",
    questions: [
      {
        id: uuidv4(),
        questionText: "",
        expectedOutputType: "",
        codeTemplate: "",
      },
    ],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]:
        name === "duration" || name === "totalMarks" ? Number(value) : value,
    });
  };

  const handleQuestionChange = (
    questionId: string,
    field: keyof MLCodingQuestion,
    value: string
  ) => {
    setFormData({
      ...formData,
      questions: formData.questions.map((q) =>
        q.id === questionId ? { ...q, [field]: value } : q
      ),
    });
  };

  const addQuestion = () => {
    setFormData({
      ...formData,
      questions: [
        ...formData.questions,
        {
          id: uuidv4(),
          questionText: "",
          expectedOutputType: "",
          codeTemplate: "",
        },
      ],
    });
  };

  const removeQuestion = (questionId: string) => {
    setFormData({
      ...formData,
      questions: formData.questions.filter((q) => q.id !== questionId),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session?.user?.id) {
      alert("You must be logged in to create an exam.");
      return;
    }

    try {
      const questionResponses = await Promise.all(
        formData.questions.map(async (question) => {
          const res = await fetch("/api/exams/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              type: "question",
              ...question,
            }),
          });

          if (!res.ok) throw new Error("Failed to create question");

          const data = await res.json();
          return data.questionId;
        })
      );

      const examData = {
        type: "exam",
        title: formData.title,
        semester: formData.semester,
        topic: formData.topic,
        date: formData.date,
        duration: formData.duration,
        totalMarks: formData.totalMarks,
        status: formData.status,
        createdBy: session.user.id,
        questions: questionResponses,
      };

      const examRes = await fetch("/api/exams/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(examData),
      });

      if (!examRes.ok) throw new Error("Failed to create exam");

      alert("Exam Created Successfully!");

      setFormData({
        title: "",
        semester: "",
        topic: "",
        date: "",
        duration: undefined,
        totalMarks: undefined,
        status: "Draft",
        questions: [
          {
            id: uuidv4(),
            questionText: "",
            expectedOutputType: "",
            codeTemplate: "",
          },
        ],
      });

      onExamCreated();
    } catch (error: any) {
      alert(error.message || "Something went wrong.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col rounded-md border bg-white p-4 shadow-md dark:bg-gray-800"
    >
      <h3 className="text-xl font-semibold">Create ML Exam</h3>

      {/* Basic Exam Fields */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Exam Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="w-full rounded-md border px-3 py-2"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Semester</label>
        <input
          type="text"
          name="semester"
          value={formData.semester}
          onChange={handleInputChange}
          className="w-full rounded-md border px-3 py-2"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Topic</label>
        <input
          type="text"
          name="topic"
          value={formData.topic}
          onChange={handleInputChange}
          className="w-full rounded-md border px-3 py-2"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          className="w-full rounded-md border px-3 py-2"
          required
        />
      </div>

      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Duration (mins)</label>
          <input
            type="number"
            name="duration"
            value={formData.duration || ""}
            onChange={handleInputChange}
            className="w-full rounded-md border px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Total Marks</label>
          <input
            type="number"
            name="totalMarks"
            value={formData.totalMarks || ""}
            onChange={handleInputChange}
            className="w-full rounded-md border px-3 py-2"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          className="w-full rounded-md border px-3 py-2"
        >
          <option value="Draft">Draft</option>
          <option value="Active">Active</option>
          <option value="Scheduled">Scheduled</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Questions */}
      <h3 className="mb-2 text-lg font-medium">Questions</h3>
      <div className="mb-4 space-y-4">
        {formData.questions.map((question, index) => (
          <div key={question.id} className="rounded-md border p-4">
            <h4 className="font-medium">Question {index + 1}</h4>

            <label className="mt-2 block text-sm font-medium">
              Question Text
            </label>
            <textarea
              value={question.questionText}
              onChange={(e) =>
                handleQuestionChange(
                  question.id,
                  "questionText",
                  e.target.value
                )
              }
              rows={4}
              className="w-full rounded-md border px-3 py-2"
              required
            />

            <label className="mt-2 block text-sm font-medium">
              Expected Output Type
            </label>
            <input
              type="text"
              value={question.expectedOutputType}
              onChange={(e) =>
                handleQuestionChange(
                  question.id,
                  "expectedOutputType",
                  e.target.value
                )
              }
              className="w-full rounded-md border px-3 py-2"
              required
            />

            <label className="mt-2 block text-sm font-medium">
              Code Template
            </label>
            <textarea
              value={question.codeTemplate}
              onChange={(e) =>
                handleQuestionChange(
                  question.id,
                  "codeTemplate",
                  e.target.value
                )
              }
              rows={3}
              className="w-full rounded-md border px-3 py-2"
            />

            <button
              type="button"
              onClick={() => removeQuestion(question.id)}
              className="mt-2 rounded-md bg-red-500 px-3 py-1 text-white hover:bg-red-600"
              disabled={formData.questions.length === 1}
            >
              Remove Question
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addQuestion}
        className="mb-4 rounded-md bg-gray-200 p-2 hover:bg-gray-300"
      >
        + Add Question
      </button>

      <button
        type="submit"
        className="w-full rounded-md bg-green-600 p-2 text-white hover:bg-green-700"
      >
        Create Exam
      </button>
    </form>
  );
};

export default MLExamCreator;
