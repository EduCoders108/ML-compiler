"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Home, Code, Settings, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface LeftSidebarProps {
  isOpen: boolean;
}

export default function LeftSidebar({ isOpen }: LeftSidebarProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensures theme is applied on mount to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <aside
      className={`fixed left-0 top-[72px] h-[calc(100vh-72px)] w-64 p-6 shadow-lg transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 ${
        theme === "dark"
          ? "text-ellipsis bg-gray-950 text-white"
          : "bg-gradient-to-b from-gray-100 to-gray-200 text-black"
      }`}
    >
      {/* Profile Section */}
      <div className="mb-6 flex flex-col items-center">
        <Image
          src="/profile.jpg"
          alt="Profile Picture"
          width={60}
          height={60}
          className="rounded-full border-2 border-white"
        />
        <h3 className="mt-2 text-lg font-semibold">Rit Narayan Mallick</h3>
        <p className="text-sm text-gray-400">ML Developer</p>
      </div>

      {/* Sidebar Navigation */}
      <nav className="flex flex-col space-y-4">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-md p-2 transition hover:bg-gray-300 dark:hover:bg-gray-700"
        >
          <Home className="size-5" />
          <span>Home</span>
        </Link>
        <Link
          href="/Editor"
          className="flex items-center gap-3 rounded-md p-2 transition hover:bg-gray-300 dark:hover:bg-gray-700"
        >
          <Code className="size-5" />
          <span>Editor</span>
        </Link>
        <Link
          href="/datasets"
          className="flex items-center gap-3 rounded-md p-2 transition hover:bg-gray-300 dark:hover:bg-gray-700"
        >
          <Code className="size-5" />
          <span>Dataset Management</span>
        </Link>
        <Link
          href="/profile"
          className="flex items-center gap-3 rounded-md p-2 transition hover:bg-gray-300 dark:hover:bg-gray-700"
        >
          <User className="size-5" />
          <span>Profile</span>
        </Link>
        <Link
          href="/setting"
          className="flex items-center gap-3 rounded-md p-2 transition hover:bg-gray-300 dark:hover:bg-gray-700"
        >
          <Settings className="size-5" />
          <span>Settings</span>
        </Link>
      </nav>
    </aside>
  );
}
