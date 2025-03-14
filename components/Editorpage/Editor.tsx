"use client";
import { useState, useEffect } from "react";
import MonacoEditorWrapper from "./MonacoEditorWrapper";
import { Play } from "lucide-react";
import { useCodeExecution } from "./CodeExecutionContext"; // We'll create this context

export default function Editor() {
  const { executeCode, isLoading } = useCodeExecution();
  const [code, setCode] = useState<string>("print('Hello from Code Editor!')");
  const [editorTheme, setEditorTheme] = useState<string>("light");

  // Auto-detect dark mode
  useEffect(() => {
    if (typeof window !== "undefined") {
      const darkMode: boolean = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setEditorTheme(darkMode ? "vs-dark" : "light");
    }
  }, []);

  const handleCodeChange = (newValue: string | undefined): void => {
    setCode(newValue || "");
  };

  const handleRunCode = (): void => {
    executeCode(code);
  };

  return (
    <div className="flex h-full flex-col rounded-lg border bg-white p-4 shadow-md dark:bg-gray-800">
      {/* Monaco Editor */}
      <div className="flex-1 rounded-lg border dark:border-gray-700">
        <MonacoEditorWrapper
          height="300px"
          language="python"
          value={code}
          onChange={handleCodeChange}
          theme={editorTheme}
        />
      </div>

      {/* Run Button */}
      <button
        onClick={handleRunCode}
        className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50 dark:bg-blue-700 dark:hover:bg-blue-600"
        disabled={isLoading}
      >
        <Play className="size-4" />
        {isLoading ? "Executing..." : "Run Code"}
      </button>
    </div>
  );
}
