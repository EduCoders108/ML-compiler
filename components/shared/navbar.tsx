"use client";

import ThemeToggle from "../Theme/ThemeToggle";
import { Menu } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Navbar({
  toggleSidebar,
}: {
  toggleSidebar: () => void;
}) {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <nav className="fixed left-0 top-0 z-50 flex w-full items-center justify-between bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-6 py-4 shadow-md transition-colors duration-300 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800">
      {/* Sidebar Toggle Button */}
      <button onClick={toggleSidebar} className="text-white md:hidden">
        <Menu width={28} height={28} />
      </button>

      {/* Title */}
      <h1 className="text-4xl font-extrabold tracking-wide text-white">
        ML Companion
      </h1>

      {/* Right Section: Theme Toggle, Exam Portal, Auth Button */}
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <button
          onClick={() => router.push("/ExamPortal")}
          className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-indigo-600 shadow-md transition-transform duration-200 hover:scale-105 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
        >
          Exam Portal
        </button>

        {session ? (
          <button
            onClick={() => signOut()}
            className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Sign Out
          </button>
        ) : (
          <button
            onClick={() => router.push("/sign-in")}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}
