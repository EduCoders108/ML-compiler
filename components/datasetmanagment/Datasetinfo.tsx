"use client";
import { useState, useEffect } from "react";

const DatasetInfo = ({
  dataset,
  onBack,
}: {
  dataset: string;
  onBack: () => void;
}) => {
  const [info, setInfo] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_NODE_API_URL}/dataset-info?name=${dataset}`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch dataset info: ${response.status}`);
        }
        const data = await response.json();
        setInfo(data);
      } catch (err) {
        console.error("Error fetching dataset info:", err);
        setError("Failed to fetch dataset info.");
      }
    };

    fetchInfo();
  }, [dataset]);

  return (
    <div>
      <button
        onClick={onBack}
        className="mb-4 rounded bg-blue-500 p-2 text-white"
      >
        ← Back to Datasets
      </button>

      <h2 className="text-xl font-bold">Dataset Info: {dataset}</h2>

      {error ? (
        <p className="mt-2 text-red-500">{error}</p>
      ) : (
        <pre className="mt-4 rounded bg-gray-200 p-4 dark:bg-gray-800">
          {JSON.stringify(info, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default DatasetInfo;
