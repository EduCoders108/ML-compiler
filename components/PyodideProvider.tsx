"use client";

import { useEffect, useState } from "react";
import { Editor } from "@monaco-editor/react";

export default function PyodideRunner() {
  const [pyodide, setPyodide] = useState<any>(null);
  const [code, setCode] = useState<string>("print('Hello from Pyodide!')");
  const [output, setOutput] = useState<string>("");
  const [outputType, setOutputType] = useState<"success" | "error" | "loading">(
    "loading"
  );

  useEffect(() => {
    const loadPyodide = async () => {
      try {
        const py = await (window as any).loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/",
        });
        setPyodide(py);
        setOutputType("success");
        setOutput("✅ Pyodide loaded successfully!");
      } catch (error) {
        setOutputType("error");
        setOutput(`❌ Pyodide failed to load: ${error}`);
      }
    };

    // Check if Pyodide is already loaded
    if ((window as any).loadPyodide) {
      loadPyodide();
    } else {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js";
      script.async = true;
      script.onload = () => loadPyodide();
      script.onerror = () => {
        setOutputType("error");
        setOutput("❌ Failed to load Pyodide script.");
      };
      document.body.appendChild(script);
    }
  }, []);

  const runPythonCode = async () => {
    if (pyodide) {
      try {
        // Redirect stdout to capture print() output
        pyodide.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
        `);

        pyodide.runPython(code); // Execute the Python code

        // Capture the printed output
        const outputText = pyodide.runPython("sys.stdout.getvalue()");
        setOutput(outputText || "✅ No output (but ran successfully)");
        setOutputType("success");
      } catch (error) {
        setOutput(`❌ Error: ${error}`);
        setOutputType("error");
      }
    } else {
      setOutput("⏳ Pyodide is still loading...");
      setOutputType("loading");
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl rounded-lg border bg-white p-4 shadow-md">
      <h2 className="mb-2 text-lg font-bold">
        Python Code Executor (Monaco Editor)
      </h2>

      {/* Monaco Editor for Python Code Input */}
      <div className="mb-3 overflow-hidden rounded border">
        <Editor
          height="200px"
          defaultLanguage="python"
          value={code}
          theme="vs-dark"
          onChange={(value) => setCode(value || "")}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
          }}
        />
      </div>

      <button
        onClick={runPythonCode}
        className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Run Python Code
      </button>

      {/* Output Section */}
      <pre
        className={`mt-3 whitespace-pre-wrap rounded border p-2 text-sm ${
          outputType === "success"
            ? "bg-green-100 text-green-600"
            : outputType === "error"
              ? "bg-red-100 text-red-600"
              : "bg-gray-100 text-gray-600"
        }`}
      >
        {output}
      </pre>
    </div>
  );
}
