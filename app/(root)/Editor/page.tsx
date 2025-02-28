"use client";

import { useState } from "react";
import Console from "@/components/Console";
import CodeEditor from "@/components/Editor";
import { ArrowDownUp, Play } from "lucide-react";

export default function Home() {
  const [consoleExpanded, setConsoleExpanded] = useState(false);

  return (
    <div className="flex h-[calc(100vh-72px)] w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 overflow-hidden p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">ML Editor</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Write your ML code and compile it to WebAssembly
            </p>
          </div>
          <button className="flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-white transition-colors hover:bg-indigo-700">
            <Play className="size-4" />
            <span>Compile</span>
          </button>
        </div>

        {/* Main content area with editor and console */}
        <div className="relative flex flex-1 flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
          <div
            className={`flex-1 overflow-hidden transition-all duration-300 ${consoleExpanded ? "h-1/2" : "h-3/4"}`}
          >
            <div className="h-full overflow-hidden rounded-t-lg bg-gray-900 p-1">
              <CodeEditor />
            </div>
          </div>

          {/* Resizer handle */}
          <div
            className="flex cursor-ns-resize items-center justify-center border-y border-gray-700 bg-gray-800 py-1"
            onClick={() => setConsoleExpanded(!consoleExpanded)}
          >
            <ArrowDownUp className="size-4 text-gray-400" />
          </div>

          {/* Console section */}
          <div
            className={`overflow-auto transition-all duration-300 ${consoleExpanded ? "h-1/2" : "h-1/4"}`}
          >
            <div className="h-full overflow-auto bg-gray-950 p-4 text-white">
              <Console />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
