// "use client";

// import Image from "next/image";
// import { useCodeExecution } from "./CodeExecutionContext";
// import { useEffect, useRef } from "react";

// const Console = () => {
//   const { output, plot, isLoading } = useCodeExecution();
//   const consoleRef = useRef(null);

//   // Auto-scroll to bottom when output changes
//   useEffect(() => {
//     if (consoleRef.current) {
//       consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
//     }
//   }, [output]);

//   return (
//     <div className="flex h-full flex-col overflow-hidden p-4">
//       <div className="mb-2 flex items-center justify-between">
//         <h2 className="text-lg font-bold">Console Output</h2>
//         {isLoading && (
//           <div className="flex items-center">
//             <div className="mr-2 size-2 animate-pulse rounded-full bg-green-400"></div>
//             <span className="text-sm">Running code...</span>
//           </div>
//         )}
//       </div>

//       {/* Scrollable output area */}
//       <div ref={consoleRef} className="flex-1 overflow-auto font-mono text-sm">
//         {output ? (
//           <pre className="whitespace-pre-wrap break-words">{output}</pre>
//         ) : (
//           <p className="text-gray-500">
//             No output to display. Run your code to see results here.
//           </p>
//         )}

//         {plot && (
//           <div className="mt-4 rounded bg-white p-2">
//             <div className="relative max-h-96 w-full">
//               <Image
//                 src={`data:image/png;base64,${plot}`}
//                 alt="Generated Diagram"
//                 layout="responsive"
//                 width={800}
//                 height={600}
//                 className="rounded object-contain"
//               />
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Console;

// Console.tsx
// "use client";

// import Image from "next/image";
// // import { useCodeExecution } from "./CodeExecutionContext";
// import { useEffect, useRef } from "react";
// import { usePyodide } from "./PyodideProvider";

// const Console = () => {
//   const { output, plot, isLoading } = usePyodide();
//   const consoleRef = useRef(null);

//   useEffect(() => {
//     if (consoleRef.current) {
//       consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
//     }
//   }, [output]);

//   return (
//     <div className="flex h-full flex-col overflow-hidden rounded-lg border bg-gray-900 text-white shadow-md">
//       {/* Console header */}
//       <div className="flex items-center justify-between border-b border-gray-700 bg-gray-800 px-4 py-2">
//         <h2 className="font-medium">Console Output</h2>
//         {isLoading && (
//           <div className="flex items-center">
//             <div className="mr-2 size-2 animate-pulse rounded-full bg-green-400"></div>
//             <span className="text-sm">Running code...</span>
//           </div>
//         )}
//       </div>

//       {/* Console content area with its own scroll */}
//       <div
//         ref={consoleRef}
//         className="flex-1 overflow-auto p-4 font-mono text-sm"
//       >
//         {output ? (
//           <pre className="whitespace-pre-wrap break-words">{output}</pre>
//         ) : (
//           <p className="text-gray-400">
//             No output to display. Run your code to see results here.
//           </p>
//         )}
//         {plot && (
//           <div className="mt-4 rounded bg-white p-2">
//             <div className="relative max-h-96 w-full">
//               <Image
//                 src={`data:image/png;base64,${plot}`}
//                 alt="Generated Diagram"
//                 layout="responsive"
//                 width={800}
//                 height={600}
//                 className="rounded object-contain"
//               />
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Console;
// Console.tsx

import Image from "next/image";
import { useEffect, useRef } from "react";
import { usePyodide } from "./PyodideProvider";

const Console = () => {
  const { output, plot, isLoading } = usePyodide();
  const consoleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [output]);

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border bg-gray-900 text-white shadow-md">
      <div className="flex items-center justify-between border-b border-gray-700 bg-gray-800 px-4 py-2">
        <h2 className="font-medium">Console Output</h2>
        {isLoading && (
          <div className="flex items-center">
            <div className="mr-2 size-2 animate-pulse rounded-full bg-green-400"></div>
            <span className="text-sm">Running code...</span>
          </div>
        )}
      </div>

      <div
        ref={consoleRef}
        className="flex-1 overflow-auto p-4 font-mono text-sm"
      >
        {output ? (
          <pre className="whitespace-pre-wrap break-words">{output}</pre>
        ) : (
          <p className="text-gray-400">
            No output to display. Run your code to see results here.
          </p>
        )}
        {plot && (
          <div className="mt-4 rounded bg-white p-2">
            <div className="relative max-h-96 w-full">
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
      </div>
    </div>
  );
};

export default Console;
