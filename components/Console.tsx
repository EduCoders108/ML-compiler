"use client";

import { useState } from "react";
import Editor from "@monaco-editor/react";

export default function Console() {
  const [output, setOutput] = useState<string>(
    "Output will be displayed here...\n"
  );

  return (
    <div className="w-full max-w-3xl rounded-lg bg-gray-900 p-4 shadow-md">
      <h2 className="mb-2 text-lg font-semibold text-white">Console Output</h2>
      <Editor
        height="200px"
        defaultLanguage="plaintext"
        value={output}
        theme="vs-dark"
        options={{
          readOnly: true,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 14,
          wordWrap: "on",
        }}
      />
    </div>
  );
}
