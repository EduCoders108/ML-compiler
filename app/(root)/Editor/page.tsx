import { CodeExecutionProvider } from "@/components/Editorpage/CodeExecutionContext";
import Editor from "@/components/Editorpage/Editor";
import Console from "@/components/Editorpage/Console";
import { Terminal } from "lucide-react";

export default function EditorPage() {
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
          <div className="flex-1 overflow-auto p-4">
            <Editor />
          </div>

          {/* Console Section */}
          <div className="h-64 max-h-screen min-h-64 resize-y overflow-auto border-t border-gray-200 bg-gray-900 text-gray-100 dark:border-gray-700 dark:bg-black">
            <Console />
          </div>
        </div>
      </div>
    </CodeExecutionProvider>
  );
}
