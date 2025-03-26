"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface CodeExecutionContextType {
  output: string;
  plot: string;
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
  const [plot, setPlot] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const executeCode = async (code: string): Promise<void> => {
    setIsLoading(true);
    setOutput("⏳ Running code...");
    setPlot(""); // Clear previous plot

    try {
      const portForwardedUrl = process.env.NEXT_PUBLIC_FLASK_API_URL;
      const response = await fetch(`${portForwardedUrl}execute`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
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
        if (result.plot) {
          setPlot(result.plot);
        }
      }
    } catch (error: any) {
      setOutput(`❌ Server error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CodeExecutionContext.Provider
      value={{ output, plot, isLoading, executeCode }}
    >
      {children}
    </CodeExecutionContext.Provider>
  );
}

export const useCodeExecution = (): CodeExecutionContextType => {
  const context = useContext(CodeExecutionContext);
  if (!context) {
    throw new Error(
      "useCodeExecution must be used within a CodeExecutionProvider"
    );
  }
  return context;
};
