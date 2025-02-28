"use client";

import Navbar from "@/components/navbar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import { ThemeProvider } from "next-themes";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <main className="relative bg-white dark:bg-gray-900">
        <Navbar />
        <div className="flex min-h-screen">
          <LeftSidebar />
          <section className="ml-0 flex flex-1 flex-col gap-4 px-6 pb-6 pt-[72px] sm:px-14 md:ml-64">
            <div className="mx-auto w-full max-w-5xl">{children}</div>
          </section>
        </div>
        {/* Toaster Placeholder */}
      </main>
    </ThemeProvider>
  );
};

export default Layout;
