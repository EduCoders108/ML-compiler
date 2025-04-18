"use client";

import ThemeToggle from "../Theme/ThemeToggle";
import { Menu } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
// import LoginIcon from "@mui/icons-material/Login";

export default function Navbar({
  toggleSidebar,
}: {
  toggleSidebar: () => void;
}) {
  const { data: session } = useSession();
  const router = useRouter();

  // Common button styles
  const baseButtonClasses =
    "h-10 rounded-lg px-4 text-sm font-semibold shadow-md flex items-center justify-center";

  return (
    <nav className="fixed left-0 top-0 z-50 flex w-full items-center justify-between bg-white px-6 py-4 shadow-md transition-colors duration-300 dark:bg-black dark:from-gray-950 dark:via-gray-900 dark:to-gray-800">
      {/* Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="text-black dark:text-white md:hidden"
      >
        <Menu className="text-black" width={28} height={28} />
      </button>

      {/* Title */}
      <h1 className="font-serif text-3xl font-extrabold tracking-wide text-black dark:text-white">
        ML Companion
      </h1>

      {/* Right Section: Theme Toggle, Exam Portal, Auth Button */}
      <div className="flex items-center gap-4">
        <ThemeToggle />

        {/* Exam Portal Button */}
        <button
          onClick={() => router.push("/ExamPortal")}
          className={`${baseButtonClasses} bg-white text-indigo-600 transition-transform duration-200 hover:scale-105 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700`}
        >
          Exam Portal
        </button>

        {/* Auth Buttons */}
        {session ? (
          <button
            onClick={() => signOut()}
            className={`${baseButtonClasses} bg-red-500 text-white hover:bg-red-600`}
          >
            Sign Out
          </button>
        ) : (
          <button
            onClick={() => router.push("/sign-in")}
            className={`${baseButtonClasses} bg-white text-blue-500 transition-all hover:bg-blue-500 hover:text-white hover:shadow-md dark:bg-blue-500 dark:text-white dark:hover:bg-white dark:hover:text-blue-500 dark:hover:shadow-md`}
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}
