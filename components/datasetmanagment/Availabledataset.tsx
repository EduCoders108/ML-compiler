// Purpose: Component to display available datasets and allow selection of a dataset.

"use client";
import useSWR from "swr";

// Define the fetcher function
const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch datasets: ${response.status}`);
  }
  return response.json();
};

const DatasetList = ({ onSelect }: { onSelect: (dataset: string) => void }) => {
  const API_URL = process.env.NEXT_PUBLIC_FLASK_API_URL?.replace(/\/$/, ""); // Remove trailing slash

  // Use SWR hook for data fetching
  const { data, error, isLoading } = useSWR(`${API_URL}/datasets`, fetcher, {
    revalidateOnFocus: false, // Disable revalidation on window focus
    dedupingInterval: 10000, // Dedupe requests within this time window (ms)
  });

  return (
    <div>
      <h2 className="text-xl font-bold">Available Datasets</h2>

      {error ? (
        <p className="mt-2 text-red-500">
          Failed to fetch datasets. Check console for details.
        </p>
      ) : isLoading ? (
        <p className="mt-2 text-gray-500">Loading datasets...</p>
      ) : (
        <ul className="mt-2 space-y-2">
          {data?.datasets?.length > 0 ? (
            data.datasets.map((dataset: string) => (
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
