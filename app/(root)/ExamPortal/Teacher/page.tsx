// "use client";
// import React, { useState, useEffect } from "react";
// import MLExamCreator from "@/components/teacher/create-exam";

// type MLCodingQuestion = {
//   id: string;
//   topic: string;
//   difficulty: "Beginner" | "Intermediate" | "Advanced";
//   questionText: string;
//   expectedOutputType: string;
//   codeTemplate?: string;
// };

// type MLExam = {
//   _id?: string; // MongoDB ID
//   id: string;
//   semester: string;
//   topic: string;
//   date: string;
//   totalStudents: number;
//   status: "Upcoming" | "Completed";
//   questions: MLCodingQuestion[];
// };

// const MLExamDashboard: React.FC = () => {
//   const [exams, setExams] = useState<MLExam[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedExam, setSelectedExam] = useState<MLExam | null>(null);
//   const [isCreateExamModalOpen, setIsCreateExamModalOpen] = useState(false);

//   // Fetch exams from the API on component mount
//   useEffect(() => {
//     const fetchExams = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch("/api/exams");

//         if (!response.ok) {
//           throw new Error("Failed to fetch exams");
//         }

//         const data = await response.json();
//         setExams(data);
//       } catch (err) {
//         console.error("Error fetching exams:", err);
//         setError("Failed to load exams. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchExams();
//   }, []);

//   const openExamDetails = (exam: MLExam) => {
//     setSelectedExam(exam);
//   };

//   const handleExamCreated = (newExam: {
//     semester: string;
//     questions: MLCodingQuestion[];
//   }) => {
//     // The exam has already been saved to MongoDB in the MLExamCreator component
//     // We just need to refresh our list
//     fetch("/api/exams")
//       .then((response) => {
//         if (!response.ok) throw new Error("Failed to fetch updated exams");
//         return response.json();
//       })
//       .then((data) => {
//         setExams(data);
//         setIsCreateExamModalOpen(false);
//       })
//       .catch((err) => {
//         console.error("Error refreshing exams:", err);
//       });
//   };

//   return (
//     <div className="container mx-auto bg-white p-6 text-gray-900 dark:bg-gray-900 dark:text-white">
//       <h1 className="mb-6 text-3xl font-bold">ML Exam Dashboard</h1>

//       {/* Dashboard Summary */}
//       <div className="mb-6 grid grid-cols-3 gap-4">
//         {[
//           { title: "Total Exams", value: exams.length },
//           {
//             title: "Upcoming Exams",
//             value: exams.filter((e) => e.status === "Upcoming").length,
//           },
//           {
//             title: "Total Students",
//             value: exams.reduce((sum, exam) => sum + exam.totalStudents, 0),
//           },
//         ].map((card, index) => (
//           <div
//             key={index}
//             className="rounded-lg border bg-white p-4 shadow dark:border-gray-700 dark:bg-gray-800"
//           >
//             <h2 className="mb-2 text-gray-500 dark:text-gray-400">
//               {card.title}
//             </h2>
//             <p className="text-2xl font-bold text-gray-900 dark:text-white">
//               {card.value}
//             </p>
//           </div>
//         ))}
//       </div>

//       {/* Exam Management Table */}
//       <div className="rounded-lg border bg-white shadow dark:border-gray-700 dark:bg-gray-800">
//         <div className="flex items-center justify-between border-b p-4 dark:border-gray-700">
//           <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
//             ML Exam Management
//           </h2>
//           <button
//             onClick={() => setIsCreateExamModalOpen(true)}
//             className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 dark:hover:bg-green-400"
//           >
//             Create New Exam
//           </button>
//         </div>

//         {loading ? (
//           <div className="flex h-32 items-center justify-center">
//             <div className="size-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
//           </div>
//         ) : error ? (
//           <div className="p-4 text-center text-red-500">{error}</div>
//         ) : exams.length === 0 ? (
//           <div className="p-8 text-center text-gray-500 dark:text-gray-400">
//             No exams found. Create your first exam to get started.
//           </div>
//         ) : (
//           <table className="w-full">
//             <thead className="bg-gray-50 dark:bg-gray-700">
//               <tr className="border-b dark:border-gray-600">
//                 <th className="p-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
//                   Semester
//                 </th>
//                 <th className="p-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
//                   Topic
//                 </th>
//                 <th className="p-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
//                   Date
//                 </th>
//                 <th className="p-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
//                   Students
//                 </th>
//                 <th className="p-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
//                   Status
//                 </th>
//                 <th className="p-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {exams.map((exam) => (
//                 <tr
//                   key={exam._id || exam.id}
//                   className="border-b hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
//                 >
//                   <td className="p-3 text-gray-900 dark:text-white">
//                     {exam.semester}
//                   </td>
//                   <td className="p-3 text-gray-900 dark:text-white">
//                     {exam.topic}
//                   </td>
//                   <td className="p-3 text-gray-900 dark:text-white">
//                     {exam.date}
//                   </td>
//                   <td className="p-3 text-gray-900 dark:text-white">
//                     {exam.totalStudents}
//                   </td>
//                   <td className="p-3">
//                     <span
//                       className={`
//                       rounded px-2 py-1 text-sm
//                       ${
//                         exam.status === "Upcoming"
//                           ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
//                           : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
//                       }
//                     `}
//                     >
//                       {exam.status}
//                     </span>
//                   </td>
//                   <td className="p-3">
//                     <button
//                       onClick={() => openExamDetails(exam)}
//                       className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600 dark:hover:bg-blue-400"
//                     >
//                       Details
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>

//       {/* Exam Creation Modal */}
//       {isCreateExamModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="size-3/4 rounded-lg bg-white p-6 shadow-xl dark:bg-gray-900">
//             <div className="mb-4 flex items-center justify-between">
//               <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
//                 Create New ML Exam
//               </h2>
//               <button
//                 onClick={() => setIsCreateExamModalOpen(false)}
//                 className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
//               >
//                 ✕
//               </button>
//             </div>
//             <MLExamCreator onExamCreated={handleExamCreated} />
//           </div>
//         </div>
//       )}

//       {/* Exam Details Modal */}
//       {selectedExam && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="w-1/2 rounded-lg bg-white p-6 shadow-xl dark:bg-gray-900">
//             <div className="mb-4 flex items-center justify-between">
//               <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
//                 Exam Details
//               </h2>
//               <button
//                 onClick={() => setSelectedExam(null)}
//                 className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
//               >
//                 ✕
//               </button>
//             </div>
//             <div className="space-y-2">
//               <p className="text-gray-900 dark:text-white">
//                 <strong>Semester:</strong> {selectedExam.semester}
//               </p>
//               <p className="text-gray-900 dark:text-white">
//                 <strong>Topic:</strong> {selectedExam.topic}
//               </p>
//               <p className="text-gray-900 dark:text-white">
//                 <strong>Date:</strong> {selectedExam.date}
//               </p>
//               <p className="text-gray-900 dark:text-white">
//                 <strong>Total Students:</strong> {selectedExam.totalStudents}
//               </p>
//               <p className="text-gray-900 dark:text-white">
//                 <strong>Status:</strong> {selectedExam.status}
//               </p>

//               <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
//                 Questions:
//               </h3>
//               {selectedExam.questions.length > 0 ? (
//                 selectedExam.questions.map((question, index) => (
//                   <div
//                     key={question.id}
//                     className="rounded bg-gray-100 p-3 dark:bg-gray-800"
//                   >
//                     <p className="font-medium text-gray-900 dark:text-white">
//                       Q{index + 1}: {question.topic} - {question.difficulty}
//                     </p>
//                     <p className="text-gray-600 dark:text-gray-300">
//                       {question.questionText}
//                     </p>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-gray-500 dark:text-gray-400">
//                   No questions available for this exam.
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MLExamDashboard;
"use client";
import React, { useState } from "react";
import MLExamCreator from "@/components/teacher/create-exam";

type ExamData = {
  id: string;
  semester: string;
  questionsCount: number;
};

const TeacherDashboard: React.FC = () => {
  const [exams, setExams] = useState<ExamData[]>([]);
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const handleExamCreated = (examData: {
    semester: string;
    questions: any[];
  }) => {
    setExams([
      ...exams,
      {
        id: Date.now().toString(),
        semester: examData.semester,
        questionsCount: examData.questions.length,
      },
    ]);
    setIsCreating(false);
  };

  return (
    <div className="p-6">
      <h2 className="mb-4 text-2xl font-bold">Teacher Dashboard</h2>

      {!isCreating ? (
        <>
          <button
            onClick={() => setIsCreating(true)}
            className="mb-4 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Create New Exam
          </button>

          <div className="space-y-4">
            {exams.length === 0 ? (
              <p>No exams created yet.</p>
            ) : (
              exams.map((exam) => (
                <div
                  key={exam.id}
                  className="rounded-md border bg-gray-100 p-4 dark:bg-gray-800"
                >
                  <h3 className="font-semibold">{exam.semester} Exam</h3>
                  <p>Questions: {exam.questionsCount}</p>
                </div>
              ))
            )}
          </div>
        </>
      ) : (
        <MLExamCreator onExamCreated={handleExamCreated} />
      )}
    </div>
  );
};

export default TeacherDashboard;
