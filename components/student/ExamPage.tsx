"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter, usePathname } from "next/navigation";
import useSWR from "swr";
import dynamic from "next/dynamic";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

// Define props interface for ExamPage
interface ExamPageProps {
  examId?: string; // Optional to maintain compatibility with both ways of using the component
}

// Enhanced fetcher with detailed debugging
const fetcher = async (url: string) => {
  console.log(`🔍 Fetching: ${url}`);

  try {
    const res = await fetch(url, {
      method: "GET",
      credentials: "include",
    });

    console.log(`📨 Response status for ${url}:`, res.status);

    // Check content type to detect HTML responses
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("text/html")) {
      console.error(`❌ Received HTML instead of JSON for ${url}`);
      throw new Error(`Received HTML instead of JSON. Status: ${res.status}`);
    }

    if (!res.ok) {
      let errorData;
      try {
        errorData = await res.json();
        console.error(`❌ Error response for ${url}:`, errorData);
      } catch (e) {
        console.error(`❌ Failed to parse error for ${url}:`, e);
        throw new Error(`Status ${res.status}: Failed to fetch`);
      }
      throw new Error(
        errorData?.error || `Status ${res.status}: Failed to fetch`
      );
    }

    const data = await res.json();
    console.log(`✅ Success data for ${url}:`, data);
    return data;
  } catch (error) {
    console.error(`❌ Fetch exception for ${url}:`, error);
    throw error;
  }
};

export default function ExamPage({ examId: propExamId }: ExamPageProps) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  // Try multiple methods to extract the examId
  const paramExamId = params?.examId as string;
  const pathExamId = pathname?.split("/").pop();

  // Get examId from URL or props if not in params
  const [examId, setExamId] = useState<string | null>(propExamId || null);

  useEffect(() => {
    console.log("🔑 URL Pathname:", pathname);
    console.log("🔑 URL Params:", params);
    console.log("🔑 Prop examId:", propExamId);

    // Priority: 1. propExamId, 2. paramExamId, 3. URL-based extraction
    if (propExamId) {
      console.log("🔑 Using prop-derived examId:", propExamId);
      setExamId(propExamId);
    } else if (!examId) {
      // Try to extract from params if props didn't provide it
      if (paramExamId) {
        console.log("🔑 Using params-derived examId:", paramExamId);
        setExamId(paramExamId);
      }
      // Try to extract from URL if params failed
      else if (pathname) {
        const lastSegment = pathname.split("/").pop();
        console.log("🔑 Last URL segment:", lastSegment);

        if (lastSegment && lastSegment !== "exams") {
          console.log("🔑 Using pathname-derived examId:", lastSegment);
          setExamId(lastSegment);
        }
      }

      // Try using window.location as last resort
      if (
        typeof window !== "undefined" &&
        !examId &&
        !paramExamId &&
        !pathExamId
      ) {
        const urlParts = window.location.pathname.split("/");
        const lastUrlPart = urlParts[urlParts.length - 1];
        console.log("🔑 Window location path:", window.location.pathname);
        console.log("🔑 Last URL part from window:", lastUrlPart);

        if (lastUrlPart && lastUrlPart !== "exams") {
          console.log("🔑 Using window-derived examId:", lastUrlPart);
          setExamId(lastUrlPart);
        }
      }
    }
  }, [pathname, params, paramExamId, pathExamId, propExamId, examId]);

  // Only fetch once we have a valid examId
  const {
    data: exam,
    error: examError,
    isLoading: examLoading,
  } = useSWR(examId ? `/api/exams/${examId}` : null, fetcher, {
    revalidateOnFocus: false,
    retry: 1,
  });

  const {
    data: attemptData,
    error: attemptError,
    isLoading: attemptLoading,
  } = useSWR(examId ? `/api/exams/start?examId=${examId}` : null, fetcher, {
    revalidateOnFocus: false,
    retry: 1,
  });

  // Debug SWR state
  useEffect(() => {
    console.log("📊 SWR Debug State:");
    console.log(" - Exam ID used for fetch:", examId);
    console.log(" - Exam Data:", exam);
    console.log(" - Exam Error:", examError);
    console.log(" - Exam Loading:", examLoading);
    console.log(" - Attempt Data:", attemptData);
    console.log(" - Attempt Error:", attemptError);
    console.log(" - Attempt Loading:", attemptLoading);
  }, [
    examId,
    exam,
    examError,
    examLoading,
    attemptData,
    attemptError,
    attemptLoading,
  ]);

  const attempt = attemptData?.attempt;

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Authentication check
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/session");
        const session = await response.json();
        console.log("🔐 Auth Session:", session);

        if (!session || !session.user) {
          console.log("🔐 No active session, redirecting to login");
          router.push("/login");
        }
      } catch (error) {
        console.error("🔐 Auth check error:", error);
      }
    };

    checkAuth();
  }, [router]);

  useEffect(() => {
    if (
      examError?.message?.includes("Unauthorized") ||
      attemptError?.message?.includes("Unauthorized")
    ) {
      console.log("🚫 Unauthorized access detected, redirecting to login");
      router.push("/login");
    }
  }, [examError, attemptError, router]);

  useEffect(() => {
    if (attempt?.answers) {
      const saved: Record<string, string> = {};
      attempt.answers.forEach((a: any) => (saved[a.questionId] = a.code || ""));
      setAnswers(saved);
    }
  }, [attempt]);

  const handleAnswerChange = async (questionId: string, code: string) => {
    if (!examId) return;

    setAnswers((prev) => ({ ...prev, [questionId]: code }));
    try {
      console.log("💾 Saving answer for question:", questionId);
      const response = await fetch("/api/exams/saveAnswer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ examId, questionId, code }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("❌ Failed to save answer:", error);
      } else {
        console.log("✅ Answer saved successfully");
      }
    } catch (error) {
      console.error("❌ Error saving answer:", error);
    }
  };

  const handleSubmit = async () => {
    if (!examId) return;

    try {
      console.log("📤 Submitting exam");
      const response = await fetch("/api/exams/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ examId }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("❌ Failed to submit exam:", error);
        return;
      }

      console.log("✅ Exam submitted successfully");
      router.push("/dashboard");
    } catch (error) {
      console.error("❌ Error submitting exam:", error);
    }
  };

  // Manual fetch button for debugging
  const manualFetch = async () => {
    if (!examId) {
      console.error("❌ Cannot fetch: No examId available");
      return;
    }

    try {
      console.log("🔄 Manually fetching exam data for:", examId);
      const [examRes, attemptRes] = await Promise.all([
        fetch(`/api/exams/${examId}`, { credentials: "include" }),
        fetch(`/api/exams/start?examId=${examId}`, { credentials: "include" }),
      ]);

      console.log("📦 Exam response status:", examRes.status);
      console.log("📦 Attempt response status:", attemptRes.status);

      if (!examRes.ok || !attemptRes.ok) {
        console.error("❌ API returned error status");
        return;
      }

      const examData = await examRes.json();
      const attemptData = await attemptRes.json();

      console.log("📦 Manual exam fetch result:", examData);
      console.log("📦 Manual attempt fetch result:", attemptData);
    } catch (error) {
      console.error("❌ Manual fetch error:", error);
    }
  };

  // No examId yet
  if (!examId) {
    return (
      <div className="p-4 text-center">
        <p className="text-lg text-red-500">⚠️ Exam ID not found in URL</p>
        <p className="mt-2 text-sm text-gray-700">
          The URL should be in the format: /exams/[exam-id]
        </p>
        <p className="mt-2 text-sm text-gray-700">
          Current pathname: {pathname}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
        >
          Reload Page
        </button>
      </div>
    );
  }

  // Handle loading states
  if (examLoading || attemptLoading) {
    return (
      <div className="p-4 text-center">
        <p className="text-lg">⏳ Loading exam data...</p>
        <p className="text-sm text-gray-500">
          This may take a moment. Please wait.
        </p>
        <p className="mt-2 text-sm text-gray-500">Exam ID: {examId}</p>
        <button
          onClick={manualFetch}
          className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
        >
          Debug: Try Manual Fetch
        </button>
      </div>
    );
  }

  // Handle errors
  if (examError || attemptError) {
    return (
      <div className="p-4 text-center">
        <p className="text-xl font-bold text-red-500">Error Loading Exam</p>
        <p className="mt-2 text-gray-700">Exam ID: {examId}</p>
        <p className="mt-2 text-gray-700">
          {examError ? `Exam Error: ${examError.message}` : ""}
        </p>
        <p className="mt-2 text-gray-700">
          {attemptError ? `Attempt Error: ${attemptError.message}` : ""}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mr-2 mt-4 rounded bg-blue-500 px-4 py-2 text-white"
        >
          Reload Page
        </button>
        <button
          onClick={manualFetch}
          className="mt-4 rounded bg-green-500 px-4 py-2 text-white"
        >
          Try Manual Fetch
        </button>
      </div>
    );
  }

  // No data
  if (!exam || !attempt) {
    return (
      <div className="p-4 text-center">
        <p className="text-lg">⏳ Waiting for data...</p>
        <pre className="text-sm text-gray-500">
          exam ID: {examId} | exam: {exam ? "✅" : "❌"} | attempt:{" "}
          {attempt ? "✅" : "❌"}
        </pre>
        <p className="mt-4 text-sm text-gray-500">
          If this persists, please check your connection and try refreshing the
          page.
        </p>
        <button
          onClick={manualFetch}
          className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
        >
          Debug: Try Manual Fetch
        </button>
      </div>
    );
  }

  // No questions in exam
  if (!exam.questions || exam.questions.length === 0) {
    return (
      <div className="p-4 text-center">
        <p className="text-lg text-red-500">
          This exam contains no questions. Please contact the instructor.
        </p>
      </div>
    );
  }

  const currentQuestion = exam.questions[currentQuestionIndex];

  return (
    <div className="mx-auto max-w-3xl p-4">
      <h1 className="text-2xl font-bold">{exam.title}</h1>

      <div className="mt-4">
        <div className="flex justify-between">
          <p className="font-semibold">
            Question {currentQuestionIndex + 1} of {exam.questions.length}
          </p>
          <p className="text-sm text-gray-500">
            {currentQuestion?.points || 0} points
          </p>
        </div>

        <p className="mt-2">{currentQuestion?.text}</p>

        <div className="mt-4 rounded-md border p-2">
          <MonacoEditor
            height="300px"
            defaultLanguage="python"
            theme="vs-dark"
            value={answers[currentQuestion._id] || ""}
            onChange={(value) =>
              handleAnswerChange(currentQuestion._id, value || "")
            }
          />
        </div>
      </div>

      <div className="mt-4 flex justify-between">
        <button
          disabled={currentQuestionIndex === 0}
          onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
          className={`rounded px-4 py-2 text-white ${
            currentQuestionIndex === 0 ? "bg-gray-300" : "bg-gray-500"
          }`}
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
