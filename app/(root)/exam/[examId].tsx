import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import dynamic from "next/dynamic";

// Dynamically import Monaco Editor for better performance
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ExamPage() {
  const router = useRouter();
  const { examId } = router.query;

  const { data: exam, error } = useSWR(
    examId ? `/api/exam/${examId}` : null,
    fetcher
  );
  const { data: attempt, mutate } = useSWR(
    examId ? `/api/exam/start` : null,
    fetcher
  );

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(3600); // Example: 1-hour timer

  useEffect(() => {
    if (attempt?.answers) {
      const savedAnswers: Record<string, string> = {};
      attempt.answers.forEach(
        (a: any) => (savedAnswers[a.questionId] = a.code || "")
      );
      setAnswers(savedAnswers);
    }
  }, [attempt]);

  // Timer functionality
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswerChange = async (questionId: string, code: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: code }));

    await fetch("/api/exam/saveAnswer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ examId, questionId, code }),
    });
  };

  const handleSubmit = async () => {
    await fetch("/api/exam/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ examId }),
    });
    router.push("/dashboard");
  };

  if (error) return <p>Error loading exam...</p>;
  if (!exam) return <p>Loading...</p>;

  const currentQuestion = exam.questions[currentQuestionIndex];

  return (
    <div className="mx-auto max-w-3xl p-4">
      <h1 className="text-2xl font-bold">{exam.title}</h1>

      {/* Timer */}
      <div className="mt-2 font-semibold text-red-500">
        Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? "0" : ""}
        {timeLeft % 60}
      </div>

      <div className="mt-4">
        <p className="font-semibold">{currentQuestion?.text}</p>

        {/* Code Editor */}
        <div className="mt-4 rounded-md border p-2">
          <MonacoEditor
            height="300px"
            defaultLanguage="javascript"
            theme="vs-dark"
            value={answers[currentQuestion._id] || ""}
            onChange={(value) =>
              handleAnswerChange(currentQuestion._id, value || "")
            }
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="mt-4 flex justify-between">
        <button
          disabled={currentQuestionIndex === 0}
          onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
          className="rounded bg-gray-500 px-4 py-2 text-white"
        >
          Previous
        </button>

        <button
          onClick={() => {
            if (currentQuestionIndex === exam.questions.length - 1)
              handleSubmit();
            else setCurrentQuestionIndex((prev) => prev + 1);
          }}
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          {currentQuestionIndex === exam.questions.length - 1
            ? "Submit"
            : "Next"}
        </button>
      </div>
    </div>
  );
}
