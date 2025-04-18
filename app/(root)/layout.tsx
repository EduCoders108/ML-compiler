"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/shared/navbar";
import LeftSidebar from "@/components/shared/LeftSidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // Prevent SSR mismatch

  return (
    <main className="relative bg-slate-100 dark:bg-gray-900">
      {/* Navbar with Sidebar Toggle */}
      <Navbar toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />

      <div className="flex min-h-screen">
        {/* Sidebar with Toggle Control */}
        <LeftSidebar isOpen={isSidebarOpen} />

        {/* Main Content Section */}
        <section
          className={`flex flex-1 flex-col transition-all duration-300 ${
            isSidebarOpen ? "ml-64" : "ml-0"
          } md:ml-64`}
        >
          <div className="w-full px-6 pb-6 pt-[72px] sm:px-14">{children}</div>
        </section>
      </div>
    </main>
  );
};

export default Layout;
