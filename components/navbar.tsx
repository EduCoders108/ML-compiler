"use client";

import { Pacifico } from "next/font/google";
import ThemeToggle from "./Theme/ThemeToggle";

const pacifico = Pacifico({ subsets: ["latin"], weight: ["400"] });

export default function Navbar() {
  return (
    <nav className="fixed left-0 top-0 z-50 flex w-full items-center justify-between bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-6 py-4 shadow-md transition-colors duration-300 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800">
      <h1
        className={`text-2xl font-extrabold tracking-wide text-white ${pacifico.className}`}
      >
        ML Compiler
      </h1>
      <div className="flex items-center gap-4">
        <ThemeToggle />
      </div>
    </nav>
  );
}
