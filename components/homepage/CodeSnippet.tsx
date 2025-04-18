"use client";

import React from "react";

interface CodeSnippetProps {
  language: string;
  code: string;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ language, code }) => (
  <div className="my-4 overflow-x-auto rounded-lg bg-gray-800 p-4 dark:bg-gray-900">
    <pre className="font-mono text-sm text-gray-100">
      <code>{code}</code>
    </pre>
  </div>
);

export default CodeSnippet;
