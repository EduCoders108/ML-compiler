// import { CodeExecutionProvider } from "@/components/Editorpage/CodeExecutionContext";
// import Editor from "@/components/Editorpage/Editor";
// import Console from "@/components/Editorpage/Console";
// import { Terminal } from "lucide-react";

// export default function EditorPage() {
//   return (
//     <CodeExecutionProvider>
//       <div className="flex h-auto flex-col overflow-x-hidden">
//         {/* Header Section */}
//         <header className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-indigo-700 p-4 shadow-md dark:from-blue-800 dark:to-indigo-900">
//           <div className="flex items-center space-x-4">
//             <Terminal className="size-10 text-white" />
//             <h1 className="text-2xl font-bold text-white">Code Editor</h1>
//           </div>
//           <span className="rounded-full bg-blue-500/20 px-3 py-1 text-sm font-medium text-blue-50 dark:bg-blue-300/10">
//             Python 3.x (Flask Backend)
//           </span>
//         </header>

//         {/* Main Content */}
//         <div className="flex flex-1 flex-col overflow-hidden bg-gray-50 dark:bg-gray-900">
//           {/* Editor Section */}
//           <div className="flex-1 overflow-auto p-4">
//             <Editor />
//           </div>

//           {/* Console Section */}
//           <div className="h-64 max-h-screen min-h-64 resize-y overflow-auto border-t border-gray-200 bg-gray-900 text-gray-100 dark:border-gray-700 dark:bg-black">
//             <Console />
//           </div>
//         </div>
//       </div>
//     </CodeExecutionProvider>
//   );
// }
"use client";
import { useState } from "react";
import { CodeExecutionProvider } from "@/components/Editorpage/CodeExecutionContext";
import Editor from "@/components/Editorpage/Editor";
import Console from "@/components/Editorpage/Console";
import { Terminal, ChevronUp, ChevronDown } from "lucide-react";

export default function EditorPage() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <CodeExecutionProvider>
      <div className="flex h-auto flex-col overflow-x-hidden">
        {/* Header Section */}
        <header className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-indigo-700 p-4 shadow-md dark:from-blue-800 dark:to-indigo-900">
          <div className="flex items-center space-x-4">
            <Terminal className="size-10 text-white" />
            <h1 className="text-2xl font-bold text-white">Code Editor</h1>
          </div>
          <span className="rounded-full bg-blue-500/20 px-3 py-1 text-sm font-medium text-blue-50 dark:bg-blue-300/10">
            Python 3.x (Flask Backend)
          </span>
        </header>

        {/* Main Content */}
        <div className="flex flex-1 flex-col overflow-hidden bg-gray-50 dark:bg-gray-900">
          {/* Editor Section */}
          <div
            className={`flex-1 overflow-auto p-4 transition-all ${isExpanded ? "h-1/2" : "h-full"}`}
          >
            <Editor />
          </div>

          {/* Console Section */}
          <div
            className={`relative border-t border-gray-200 bg-gray-900 text-gray-100 transition-all dark:border-gray-700 dark:bg-black ${
              isExpanded ? "h-[60vh]" : "h-64"
            }`}
          >
            {/* Expand/Collapse Button */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="absolute -top-5 left-1/2 -translate-x-1/2 rounded-md bg-gray-800 px-3 py-1 text-sm text-white shadow-md hover:bg-gray-700"
            >
              {isExpanded ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
            </button>

            <Console />
          </div>
        </div>
      </div>
    </CodeExecutionProvider>
  );
}
