// "use client";
// import React, { useState } from "react";
// import { v4 as uuidv4 } from "uuid"; // You'll need to install this package

// type MLCodingQuestion = {
//   id: string;
//   topic: string;
//   difficulty: "Beginner" | "Intermediate" | "Advanced";
//   questionText: string;
//   expectedOutputType: string;
//   codeTemplate?: string;
// };

// type ExamFormData = {
//   semester: string;
//   questions: MLCodingQuestion[];
// };

// interface MLExamCreatorProps {
//   onExamCreated: (examData: ExamFormData) => void;
// }

// const MLExamCreator: React.FC<MLExamCreatorProps> = ({ onExamCreated }) => {
//   const [formData, setFormData] = useState<ExamFormData>({
//     semester: "",
//     questions: [
//       {
//         id: uuidv4(),
//         topic: "",
//         difficulty: "Intermediate",
//         questionText: "",
//         expectedOutputType: "",
//         codeTemplate: "",
//       },
//     ],
//   });

//   const [currentStep, setCurrentStep] = useState<number>(0);
//   const totalSteps = 2; // Step 1: Basic info, Step 2: Questions

//   const handleInputChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
//     >
//   ) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleQuestionChange = (
//     questionId: string,
//     field: keyof MLCodingQuestion,
//     value: string
//   ) => {
//     setFormData({
//       ...formData,
//       questions: formData.questions.map((q) =>
//         q.id === questionId ? { ...q, [field]: value } : q
//       ),
//     });
//   };

//   const addQuestion = () => {
//     setFormData({
//       ...formData,
//       questions: [
//         ...formData.questions,
//         {
//           id: uuidv4(),
//           topic: "",
//           difficulty: "Intermediate",
//           questionText: "",
//           expectedOutputType: "",
//           codeTemplate: "",
//         },
//       ],
//     });
//   };

//   const removeQuestion = (questionId: string) => {
//     if (formData.questions.length <= 1) {
//       return; // Prevent removing all questions
//     }
//     setFormData({
//       ...formData,
//       questions: formData.questions.filter((q) => q.id !== questionId),
//     });
//   };

//   const nextStep = () => {
//     if (currentStep < totalSteps - 1) {
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   const prevStep = () => {
//     if (currentStep > 0) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onExamCreated(formData);
//   };

//   const renderStep = () => {
//     switch (currentStep) {
//       case 0:
//         return (
//           <div className="space-y-4">
//             <h3 className="text-lg font-medium">Basic Exam Information</h3>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                 Semester
//               </label>
//               <input
//                 type="text"
//                 name="semester"
//                 value={formData.semester}
//                 onChange={handleInputChange}
//                 placeholder="e.g. Fall 2024"
//                 className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:text-sm"
//                 required
//               />
//             </div>
//           </div>
//         );
//       case 1:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-lg font-medium">ML Coding Questions</h3>
//             {formData.questions.map((question, index) => (
//               <div
//                 key={question.id}
//                 className="rounded-lg border border-gray-300 bg-white p-4 shadow-sm dark:border-gray-600 dark:bg-gray-800"
//               >
//                 <div className="mb-2 flex items-center justify-between">
//                   <h4 className="text-md font-medium">Question {index + 1}</h4>
//                   <button
//                     type="button"
//                     onClick={() => removeQuestion(question.id)}
//                     className="rounded bg-red-500 px-2 py-1 text-sm text-white hover:bg-red-600"
//                     disabled={formData.questions.length <= 1}
//                   >
//                     Remove
//                   </button>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                       Topic
//                     </label>
//                     <input
//                       type="text"
//                       value={question.topic}
//                       onChange={(e) =>
//                         handleQuestionChange(
//                           question.id,
//                           "topic",
//                           e.target.value
//                         )
//                       }
//                       placeholder="e.g. Neural Networks"
//                       className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:text-sm"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                       Difficulty
//                     </label>
//                     <select
//                       value={question.difficulty}
//                       onChange={(e) =>
//                         handleQuestionChange(
//                           question.id,
//                           "difficulty",
//                           e.target.value as
//                             | "Beginner"
//                             | "Intermediate"
//                             | "Advanced"
//                         )
//                       }
//                       className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:text-sm"
//                     >
//                       <option value="Beginner">Beginner</option>
//                       <option value="Intermediate">Intermediate</option>
//                       <option value="Advanced">Advanced</option>
//                     </select>
//                   </div>
//                 </div>

//                 <div className="mt-4">
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                     Question Text
//                   </label>
//                   <textarea
//                     value={question.questionText}
//                     onChange={(e) =>
//                       handleQuestionChange(
//                         question.id,
//                         "questionText",
//                         e.target.value
//                       )
//                     }
//                     rows={4}
//                     placeholder="Enter the question text here..."
//                     className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:text-sm"
//                     required
//                   />
//                 </div>

//                 <div className="mt-4">
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                     Expected Output Type
//                   </label>
//                   <input
//                     type="text"
//                     value={question.expectedOutputType}
//                     onChange={(e) =>
//                       handleQuestionChange(
//                         question.id,
//                         "expectedOutputType",
//                         e.target.value
//                       )
//                     }
//                     placeholder="e.g. NumPy array, Pandas DataFrame, etc."
//                     className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:text-sm"
//                     required
//                   />
//                 </div>

//                 <div className="mt-4">
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                     Code Template (Optional)
//                   </label>
//                   <textarea
//                     value={question.codeTemplate || ""}
//                     onChange={(e) =>
//                       handleQuestionChange(
//                         question.id,
//                         "codeTemplate",
//                         e.target.value
//                       )
//                     }
//                     rows={6}
//                     placeholder="# Provide a code template for students to fill in"
//                     className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 font-mono shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:text-sm"
//                   />
//                 </div>
//               </div>
//             ))}

//             <button
//               type="button"
//               onClick={addQuestion}
//               className="flex w-full items-center justify-center rounded-md border border-dashed border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
//             >
//               + Add Another Question
//             </button>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       {renderStep()}

//       <div className="mt-6 flex justify-between space-x-4">
//         {currentStep > 0 && (
//           <button
//             type="button"
//             onClick={prevStep}
//             className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
//           >
//             Previous
//           </button>
//         )}

//         {currentStep < totalSteps - 1 ? (
//           <button
//             type="button"
//             onClick={nextStep}
//             className="ml-auto rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
//           >
//             Next
//           </button>
//         ) : (
//           <button
//             type="submit"
//             className="ml-auto rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700"
//           >
//             Create Exam
//           </button>
//         )}
//       </div>
//     </form>
//   );
// };

// export default MLExamCreator;
"use client";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

type MLCodingQuestion = {
  id: string;
  topic: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  questionText: string;
  expectedOutputType: string;
  codeTemplate?: string;
};

type ExamFormData = {
  semester: string;
  questions: MLCodingQuestion[];
};

const MLExamCreator: React.FC = () => {
  const [formData, setFormData] = useState<ExamFormData>({
    semester: "",
    questions: [
      {
        id: uuidv4(),
        topic: "",
        difficulty: "Intermediate",
        questionText: "",
        expectedOutputType: "",
        codeTemplate: "",
      },
    ],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
          topic: "",
          difficulty: "Intermediate",
          questionText: "",
          expectedOutputType: "",
          codeTemplate: "",
        },
      ],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/exams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Exam Created Successfully!");
      setFormData({
        semester: "",
        questions: [
          {
            id: uuidv4(),
            topic: "",
            difficulty: "Intermediate",
            questionText: "",
            expectedOutputType: "",
            codeTemplate: "",
          },
        ],
      });
    } else {
      alert("Failed to create exam.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-md border bg-white p-4 shadow-md dark:bg-gray-800"
    >
      <h3 className="text-xl font-semibold">Create ML Exam</h3>

      <div>
        <label className="block text-sm font-medium">Semester</label>
        <input
          type="text"
          name="semester"
          value={formData.semester}
          onChange={handleInputChange}
          required
          className="w-full rounded-md border px-3 py-2"
        />
      </div>

      <h3 className="text-lg font-medium">Questions</h3>
      {formData.questions.map((question, index) => (
        <div key={question.id} className="rounded-md border p-4">
          <h4 className="font-medium">Question {index + 1}</h4>

          <label className="block text-sm font-medium">Topic</label>
          <input
            type="text"
            value={question.topic}
            onChange={(e) =>
              handleQuestionChange(question.id, "topic", e.target.value)
            }
            className="w-full rounded-md border px-3 py-2"
            required
          />

          <label className="mt-2 block text-sm font-medium">Difficulty</label>
          <select
            value={question.difficulty}
            onChange={(e) =>
              handleQuestionChange(
                question.id,
                "difficulty",
                e.target.value as "Beginner" | "Intermediate" | "Advanced"
              )
            }
            className="w-full rounded-md border px-3 py-2"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
      ))}

      <button
        type="button"
        onClick={addQuestion}
        className="mt-2 rounded-md bg-gray-200 p-2"
      >
        + Add Question
      </button>

      <button
        type="submit"
        className="mt-4 w-full rounded-md bg-green-600 p-2 text-white"
      >
        Create Exam
      </button>
    </form>
  );
};

export default MLExamCreator;
