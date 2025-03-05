"use client";
import { useState } from "react";

const DatasetPreview = () => {
  const [datasetName, setDatasetName] = useState("");
  const [preview, setPreview] = useState("");

  const fetchPreview = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_NODE_API_URL}/dataset-preview?name=${datasetName}`
    );
    const data = await response.text();
    setPreview(data);
  };

  return (
    <div>
      <h2 className="text-xl font-bold">Dataset Preview</h2>
      <input
        type="text"
        placeholder="Enter dataset name"
        onChange={(e) => setDatasetName(e.target.value)}
        className="border p-2"
      />
      <button
        onClick={fetchPreview}
        className="ml-2 bg-blue-500 p-2 text-white"
      >
        Preview
      </button>
      {preview && <pre className="mt-4 rounded bg-gray-200 p-4">{preview}</pre>}
    </div>
  );
};

export default DatasetPreview;
