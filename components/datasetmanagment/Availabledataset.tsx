"use client";
import { useState, useEffect } from "react";

const DatasetList = ({ onSelect }: { onSelect: (dataset: string) => void }) => {
  const [datasets, setDatasets] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDatasets = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_NODE_API_URL}/datasets`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch datasets: ${response.status}`);
        }
        const data = await response.json();
        setDatasets(data.datasets);
      } catch (err) {
        console.error("Error fetching datasets:", err);
        setError("Failed to fetch datasets.");
      }
    };

    fetchDatasets();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold">Available Datasets</h2>

      {error ? (
        <p className="mt-2 text-red-500">{error}</p>
      ) : (
        <ul className="mt-2 space-y-2">
          {datasets.length > 0 ? (
            datasets.map((dataset) => (
              <li
                key={dataset}
                onClick={() => onSelect(dataset)}
                className="cursor-pointer rounded border p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                {dataset}
              </li>
            ))
          ) : (
            <p className="text-gray-500">No datasets available.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default DatasetList;
