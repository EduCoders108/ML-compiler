"use client";

import { useState } from "react";
import { Menu, X, Home, Code, Settings, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function LeftSidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside
      className={`fixed left-0 top-[72px] h-[calc(100vh-72px)] w-64 bg-gradient-to-b from-gray-800 to-gray-900 p-6 text-white shadow-lg transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } dark:from-gray-900 dark:to-black md:translate-x-0`}
    >
      {/* Sidebar Toggle Button */}
      <button
        className="absolute -right-10 top-6 rounded-full bg-gray-800 p-2 shadow-md dark:bg-gray-900 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="size-6 text-white" />
        ) : (
          <Menu className="size-6 text-white" />
        )}
      </button>

      {/* Profile Section */}
      <div className="mb-6 flex flex-col items-center">
        <Image
          src="/profile.jpg" // Change this to your actual profile image path
          alt="Profile Picture"
          width={60}
          height={60}
          className="rounded-full border-2 border-white"
        />
        <h3 className="mt-2 text-lg font-semibold">Your Name</h3>
        <p className="text-sm text-gray-400">ML Developer</p>
      </div>

      {/* Sidebar Navigation */}
      <nav className="flex flex-col space-y-4">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-md p-2 hover:bg-gray-700"
        >
          <Home className="size-5" />
          <span>Home</span>
        </Link>
        <Link
          href="/Editor"
          className="flex items-center gap-3 rounded-md p-2 hover:bg-gray-700"
        >
          <Code className="size-5" />
          <span>Editor</span>
        </Link>
        <Link
          href="/datasets"
          className="flex items-center gap-3 rounded-md p-2 hover:bg-gray-700"
        >
          <Code className="size-5" />
          <span>Dataset Management</span>
        </Link>

        <Link
          href="/profile"
          className="flex items-center gap-3 rounded-md p-2 hover:bg-gray-700"
        >
          <User className="size-5" />
          <span>Profile</span>
        </Link>
        <Link
          href="/setting"
          className="flex items-center gap-3 rounded-md p-2 hover:bg-gray-700"
        >
          <Settings className="size-5" />
          <span>Settings</span>
        </Link>
      </nav>
    </aside>
  );
}
