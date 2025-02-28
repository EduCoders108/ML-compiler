"use client"; // Required for interactivity in Next.js App Router

import { useState, useEffect } from "react";

const DatasetSelection = () => {
  const [datasets, setDatasets] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDatasets = async () => {
      try {
        // ✅ Fetch datasets from Node.js backend
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_NODE_API_URL}/datasets`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched Datasets:", data.datasets); // Debugging log
        setDatasets([...new Set(data.datasets)]); // Remove duplicates
      } catch (err) {
        setError("Error fetching datasets");
        console.error("Error fetching datasets:", err);
      }
    };

    fetchDatasets();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Select a Dataset</h1>

      {error && <p className="text-red-500">{error}</p>}

      <ul className="mt-4 space-y-2">
        {datasets.map((dataset, index) => (
          <li
            key={index}
            className="flex items-center justify-between rounded border p-4"
          >
            <span className="text-lg font-semibold">{dataset}</span>
            {/* ✅ Fixed Download Link */}
            <a
              href={`${process.env.NEXT_PUBLIC_NODE_API_URL}/datasets/${dataset}`}
              download
              className="text-blue-500 underline"
            >
              Download
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DatasetSelection;
