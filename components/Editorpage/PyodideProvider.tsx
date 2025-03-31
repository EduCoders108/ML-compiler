"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

// Define the type for the Pyodide context
interface PyodideContextType {
  runPythonCode: (code: string) => Promise<void>;
  output: string;
  isLoading: boolean;
}

// Create context with proper typing
const PyodideContext = createContext<PyodideContextType | null>(null);

interface PyodideProviderProps {
  children: ReactNode;
}

export function PyodideProvider({ children }: PyodideProviderProps) {
  const [pyodide, setPyodide] = useState<any>(null);
  const [output, setOutput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Skip execution during SSR
    if (typeof window === "undefined") return;

    const loadPyodide = async (): Promise<void> => {
      try {
        setOutput("⏳ Loading Pyodide...");
        const py: any = await (window as any).loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/",
        });

        // Load essential ML packages
        await py.loadPackage(["numpy", "pandas", "scikit-learn"]);

        setPyodide(py);
        setOutput("✅ Pyodide and ML packages loaded successfully!");
        setIsLoading(false);
      } catch (error: any) {
        setOutput(`❌ Pyodide failed to load: ${error}`);
        setIsLoading(false);
      }
    };

    if ((window as any).loadPyodide) {
      loadPyodide();
    } else {
      const script: HTMLScriptElement = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js";
      script.async = true;
      script.onload = loadPyodide;
      script.onerror = (): void => {
        setOutput("❌ Failed to load Pyodide script.");
        setIsLoading(false);
      };
      document.body.appendChild(script);
    }

    // Cleanup function
    return () => {
      // Remove the script tag if it exists and component unmounts
      const scriptElement: HTMLScriptElement | null = document.querySelector(
        'script[src="https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js"]'
      );
      if (scriptElement && scriptElement.parentNode) {
        scriptElement.parentNode.removeChild(scriptElement);
      }
    };
  }, []);

  const runPythonCode = async (code: string): Promise<void> => {
    if (!pyodide) {
      setOutput("⏳ Pyodide is still loading...");
      return;
    }

    try {
      setOutput("⏳ Running code...");
      pyodide.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
      `);

      await pyodide.loadPackagesFromImports(code); // Auto-load missing packages
      pyodide.runPython(code);
      const outputText: string = pyodide.runPython("sys.stdout.getvalue()");
      setOutput(outputText || "✅ No output (but ran successfully)");
    } catch (error: any) {
      setOutput(`❌ Error: ${error}`);
    }
  };

  // Create the context value with proper typing
  const contextValue: PyodideContextType = {
    runPythonCode,
    output,
    isLoading,
  };

  return (
    <PyodideContext.Provider value={contextValue}>
      {children}
    </PyodideContext.Provider>
  );
}

// Custom hook to use Pyodide context with proper type checking
export const usePyodide = (): PyodideContextType => {
  const context = useContext(PyodideContext);
  if (!context) {
    throw new Error("usePyodide must be used within a PyodideProvider");
  }
  return context;
};
