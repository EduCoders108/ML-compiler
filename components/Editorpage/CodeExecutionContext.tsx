"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface CodeExecutionContextType {
  output: string;
  isLoading: boolean;
  executeCode: (code: string) => Promise<void>;
}

const CodeExecutionContext = createContext<CodeExecutionContextType | null>(
  null
);

interface CodeExecutionProviderProps {
  children: ReactNode;
}

export function CodeExecutionProvider({
  children,
}: CodeExecutionProviderProps) {
  const [output, setOutput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const executeCode = async (code: string): Promise<void> => {
    setIsLoading(true);
    setOutput("⏳ Running code...");

    try {
      const portForwardedUrl = process.env.NEXT_PUBLIC_FLASK_API_URL;
      const response = await fetch(`${portForwardedUrl}execute`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      const result = await response.json();

      if (result.error) {
        setOutput(`❌ Error: ${result.error}`);
      } else {
        setOutput(
          result.output || "✅ Code executed successfully with no output"
        );
      }
    } catch (error: any) {
      setOutput(`❌ Server error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CodeExecutionContext.Provider value={{ output, isLoading, executeCode }}>
      {children}
    </CodeExecutionContext.Provider>
  );
}

export const useCodeExecution = (): CodeExecutionContextType => {
  const context = useContext(CodeExecutionContext);
  if (context === null) {
    throw new Error(
      "useCodeExecution must be used within a CodeExecutionProvider"
    );
  }
  return context;
};
