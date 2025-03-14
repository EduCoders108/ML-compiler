// "use client";
// import { useState, useEffect } from "react";
// import { ChevronDown, ChevronUp } from "lucide-react";

// const DatasetInfo = ({
//   dataset,
//   onBack,
// }: {
//   dataset: string;
//   onBack: () => void;
// }) => {
//   const [info, setInfo] = useState<any>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [expandedKeys, setExpandedKeys] = useState<Record<string, boolean>>({});

//   useEffect(() => {
//     const fetchInfo = async () => {
//       try {
//         const response = await fetch(
//           `${process.env.NEXT_PUBLIC_FLASK_API_URL}dataset-info?name=${dataset}`
//         );
//         if (!response.ok) {
//           throw new Error(`Failed to fetch dataset info: ${response.status}`);
//         }
//         const data = await response.json();
//         setInfo(data);
//       } catch (err) {
//         console.error("Error fetching dataset info:", err);
//         setError("Failed to fetch dataset info.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInfo();
//   }, [dataset]);

//   const toggleExpand = (key: string) => {
//     setExpandedKeys((prev) => ({ ...prev, [key]: !prev[key] }));
//   };

//   const renderInfo = (data: any) => {
//     return Object.entries(data).map(([key, value]) => {
//       const isObject = typeof value === "object" && value !== null;
//       const isExpanded = expandedKeys[key] || false;

//       return (
//         <div
//           key={key}
//           className="border-b border-gray-200 py-3 dark:border-gray-700"
//         >
//           <div
//             className={`flex cursor-pointer items-center justify-between rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800`}
//             onClick={() => isObject && toggleExpand(key)}
//           >
//             <span className="font-semibold capitalize text-gray-800 dark:text-gray-200">
//               {key}
//             </span>

//             {isObject && (
//               <span className="text-gray-500 dark:text-gray-400">
//                 {isExpanded ? (
//                   <ChevronUp size={18} />
//                 ) : (
//                   <ChevronDown size={18} />
//                 )}
//               </span>
//             )}
//           </div>

//           <div className="pl-4">
//             {isObject ? (
//               isExpanded && (
//                 <pre className="overflow-auto rounded-lg bg-gray-100 p-3 text-sm dark:bg-gray-800 dark:text-gray-300">
//                   {JSON.stringify(value, null, 2)}
//                 </pre>
//               )
//             ) : (
//               <p className="text-gray-700 dark:text-gray-300">
//                 {String(value)}
//               </p>
//             )}
//           </div>
//         </div>
//       );
//     });
//   };

//   return (
//     <div className="mx-auto max-w-3xl p-6">
//       <button
//         onClick={onBack}
//         className="mb-4 inline-flex items-center gap-2 rounded-lg bg-blue-500 p-2 text-white transition hover:bg-blue-600"
//       >
//         ← Back to Datasets
//       </button>

//       <h2 className="mb-6 text-2xl font-bold text-gray-800 dark:text-gray-200">
//         Dataset Info: <span className="text-blue-500">{dataset}</span>
//       </h2>

//       {loading ? (
//         <p className="text-gray-600 dark:text-gray-400">
//           Loading dataset info...
//         </p>
//       ) : error ? (
//         <p className="text-red-500">{error}</p>
//       ) : info ? (
//         <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-900">
//           {renderInfo(info)}
//         </div>
//       ) : (
//         <p className="text-gray-600 dark:text-gray-400">
//           No information available.
//         </p>
//       )}
//     </div>
//   );
// };

// export default DatasetInfo;

"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import useSWR from "swr";

// Define the fetcher function
const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch dataset info: ${response.status}`);
  }
  return response.json();
};

const DatasetInfo = ({
  dataset,
  onBack,
}: {
  dataset: string;
  onBack: () => void;
}) => {
  const [expandedKeys, setExpandedKeys] = useState<Record<string, boolean>>({});

  // Use SWR hook for data fetching with caching
  const {
    data: info,
    error,
    isLoading,
  } = useSWR(
    `${process.env.NEXT_PUBLIC_FLASK_API_URL}dataset-info?name=${dataset}`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 30000, // Cache for 30 seconds before allowing refetch
      revalidateIfStale: false, // Don't automatically revalidate stale data
    }
  );

  const toggleExpand = (key: string) => {
    setExpandedKeys((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const renderInfo = (data: any) => {
    return Object.entries(data).map(([key, value]) => {
      const isObject = typeof value === "object" && value !== null;
      const isExpanded = expandedKeys[key] || false;

      return (
        <div
          key={key}
          className="border-b border-gray-200 py-3 dark:border-gray-700"
        >
          <div
            className={`flex cursor-pointer items-center justify-between rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800`}
            onClick={() => isObject && toggleExpand(key)}
          >
            <span className="font-semibold capitalize text-gray-800 dark:text-gray-200">
              {key}
            </span>

            {isObject && (
              <span className="text-gray-500 dark:text-gray-400">
                {isExpanded ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </span>
            )}
          </div>

          <div className="pl-4">
            {isObject ? (
              isExpanded && (
                <pre className="overflow-auto rounded-lg bg-gray-100 p-3 text-sm dark:bg-gray-800 dark:text-gray-300">
                  {JSON.stringify(value, null, 2)}
                </pre>
              )
            ) : (
              <p className="text-gray-700 dark:text-gray-300">
                {String(value)}
              </p>
            )}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="mx-auto max-w-3xl p-6">
      <button
        onClick={onBack}
        className="mb-4 inline-flex items-center gap-2 rounded-lg bg-blue-500 p-2 text-white transition hover:bg-blue-600"
      >
        ← Back to Datasets
      </button>

      <h2 className="mb-6 text-2xl font-bold text-gray-800 dark:text-gray-200">
        Dataset Info: <span className="text-blue-500">{dataset}</span>
      </h2>

      {isLoading ? (
        <p className="text-gray-600 dark:text-gray-400">
          Loading dataset info...
        </p>
      ) : error ? (
        <p className="text-red-500">Failed to fetch dataset info.</p>
      ) : info ? (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-900">
          {renderInfo(info)}
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-400">
          No information available.
        </p>
      )}
    </div>
  );
};

export default DatasetInfo;
