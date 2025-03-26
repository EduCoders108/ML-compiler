"use client";

import Image from "next/image";
import { useCodeExecution } from "./CodeExecutionContext";

const Console = () => {
  const { output, plot, isLoading } = useCodeExecution();

  return (
    <div className="max-h-screen min-h-[50%] rounded bg-gray-900 p-4 text-white">
      <h2 className="mb-2 text-lg font-bold">Console Output</h2>

      {isLoading ? (
        <p>⏳ Running code...</p>
      ) : (
        <>
          {output && (
            <pre className="mb-4 whitespace-pre-wrap break-words">{output}</pre>
          )}

          {plot && (
            <div className="mt-4 rounded bg-white p-2 shadow-lg">
              <div className="relative h-64 max-h-96 w-full max-w-3xl">
                <Image
                  src={`data:image/png;base64,${plot}`}
                  alt="Generated Diagram"
                  layout="responsive"
                  width={800}
                  height={600}
                  className="rounded object-contain"
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Console;
