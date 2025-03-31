import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

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

  useEffect(() => {
    if (attempt?.answers) {
      const savedAnswers: Record<string, string> = {};
      attempt.answers.forEach(
        (a: any) => (savedAnswers[a.questionId] = a.answer)
      );
      setAnswers(savedAnswers);
    }
  }, [attempt]);

  const handleAnswerChange = async (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));

    await fetch("/api/exam/saveAnswer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ examId, questionId, answer }),
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
    <div className="mx-auto max-w-2xl p-4">
      <h1 className="text-xl font-bold">{exam.title}</h1>

      <div className="mt-4">
        <p className="font-semibold">{currentQuestion?.text}</p>

        <div className="mt-2 flex flex-col space-y-2">
          {currentQuestion?.options.map((option: string, idx: number) => (
            <label
              key={idx}
              className="flex cursor-pointer items-center space-x-2"
            >
              <input
                type="radio"
                name={`question-${currentQuestion._id}`}
                value={option}
                checked={answers[currentQuestion._id] === option}
                onChange={() => handleAnswerChange(currentQuestion._id, option)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>

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
