"use client"; // Required for event handling in Next.js App Router

import useSWR from "swr";
import axios from "axios";
import { useState } from "react";

// Fetcher function for SWR
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const DatasetSelection = () => {
  const { data: datasets, error } = useSWR("http://localhost:5000/api/datasets", fetcher);
  const [selectedDataset, setSelectedDataset] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  // Handle file input change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      await axios.post("http://localhost:5000/api/upload", formData);
      alert("File uploaded successfully");
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  // Loading state
  if (!datasets) return <p className="p-6 text-lg">Loading datasets...</p>;

  // Error state
  if (error) return <p className="p-6 text-red-500">Failed to load datasets.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Select a Dataset</h1>
      <div className="mt-4">
        {datasets.map((dataset: { name: string; description: string }, index: number) => (
          <div key={index} className="p-4 border rounded mb-2">
            <h2 className="text-lg font-semibold">{dataset.name}</h2>
            <p className="text-gray-600">{dataset.description}</p>
            <button
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => setSelectedDataset(dataset.name)}
            >
              Select
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold">Upload Your Own Dataset</h2>
        <input type="file" onChange={handleFileChange} className="mt-2" />
        <button
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
          onClick={handleUpload}
        >
          Upload
        </button>
      </div>

      {selectedDataset && (
        <div className="mt-6 p-4 border rounded">
          <h2 className="text-lg font-semibold">Selected Dataset:</h2>
          <p>{selectedDataset}</p>
        </div>
      )}
    </div>
  );
};

export default DatasetSelection;
