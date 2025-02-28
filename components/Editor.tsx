"use client";

import { useState } from "react";
import Editor from "@monaco-editor/react";

export default function CodeEditor() {
  const [code, setCode] = useState("# Write your ML code here");

  return (
    <div className="w-full max-w-3xl rounded-lg bg-gray-900 p-4 shadow-md">
      <Editor
        height="400px"
        defaultLanguage="python"
        defaultValue={code}
        theme="vs-dark"
        onChange={(value) => setCode(value || "")}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          wordWrap: "on",
        }}
      />
    </div>
  );
}
