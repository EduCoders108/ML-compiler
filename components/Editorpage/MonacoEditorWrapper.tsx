// components/MonacoEditorWrapper.tsx
"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Type for the editor props
interface MonacoEditorWrapperProps {
  value: string;
  onChange: (value: string | undefined) => void;
  language?: string;
  theme?: string;
  height?: string;
}

// Dynamically import Monaco to avoid SSR issues
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] w-full animate-pulse rounded-lg bg-gray-100"></div>
  ),
});

export default function MonacoEditorWrapper({
  value,
  onChange,
  language = "python",
  theme = "vs-dark",
  height = "300px",
}: MonacoEditorWrapperProps) {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-[300px] w-full rounded-lg bg-gray-100"></div>;
  }

  return (
    <MonacoEditor
      height={height}
      language={language}
      value={value}
      onChange={onChange}
      theme={theme}
      options={{
        fontSize: 14,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
    />
  );
}
