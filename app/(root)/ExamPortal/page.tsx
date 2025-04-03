// This is the main entry point for the Exam Portal.
// It handles the redirection based on user roles (student, teacher, admin).
// It uses NextAuth for session management and Next.js router for navigation.
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function ExamPortal() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    // Only redirect if authentication data is loaded
    if (status === "authenticated" && session?.user?.role) {
      const role = session.user.role;

      // Redirect based on role
      switch (role) {
        case "student":
          router.push("/ExamPortal/Student");
          break;
        case "teacher":
          router.push("/ExamPortal/Teacher");
          break;
        case "admin":
          // Assuming you might add an admin section later
          router.push("/ExamPortal/Teacher"); // or wherever admin should go
          break;
      }
    }
  }, [session, status, router]);

  // Show loading while checking auth
  if (status === "loading") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-lg text-gray-600 dark:text-gray-300">Loading...</p>
      </div>
    );
  }

  // If not authenticated, show sign-in prompt
  if (status === "unauthenticated") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
        <h1 className="text-4xl font-bold text-indigo-600 dark:text-white">
          Exam Portal
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
          Please sign in to access your dashboard
        </p>
        {/* Add sign-in button if needed */}
        <button
          onClick={() => router.push("/sign-in")}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Sign In
        </button>
      </div>
    );
  }

  // Fallback while redirect happens
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <p className="text-lg text-gray-600 dark:text-gray-300">
        Redirecting to your dashboard...
      </p>
    </div>
  );
}
