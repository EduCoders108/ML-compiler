// "use client";
// import { usePyodide } from "./PyodideProvider";

// export default function Console() {
//   const { output } = usePyodide();

//   return (
//     <div className="h-40 overflow-auto rounded-t-lg bg-black p-4 text-white">
//       <pre>{output}</pre>
//     </div>
//   );
// }

"use client";
import { useCodeExecution } from "./CodeExecutionContext";

export default function Console() {
  const { output } = useCodeExecution();

  return (
    <div className="h-40 overflow-auto rounded-lg bg-black p-4 text-white">
      <pre className="font-mono text-sm">{output}</pre>
    </div>
  );
}
