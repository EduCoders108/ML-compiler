"use client";

import DatasetList from "@/components/datasetmanagment/Availabledataset";
import DatasetInfo from "@/components/datasetmanagment/Datasetinfo";
import DatasetPreview from "@/components/datasetmanagment/Datasetpreview";
import Predict from "@/components/datasetmanagment/Makeprediction";
import TrainModel from "@/components/datasetmanagment/Trainmodel";
import UploadDataset from "@/components/datasetmanagment/Uploaddataset";
import { useState } from "react";

const DatasetsPage = () => {
  const [activeTab, setActiveTab] = useState("list");
  const [selectedDataset, setSelectedDataset] = useState<string | null>(null);

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Dataset Management</h1>

      {/* Navigation Tabs */}
      <div className="flex space-x-4 border-b pb-2">
        {["list", "upload", "info", "preview", "train", "predict"].map(
          (tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-t px-4 py-2 ${
                activeTab === tab ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          )
        )}
      </div>

      {/* Content Section */}
      <div className="mt-4">
        {activeTab === "list" && (
          <DatasetList
            onSelect={(dataset) => {
              setSelectedDataset(dataset);
              setActiveTab("info");
            }}
          />
        )}
        {activeTab === "upload" && <UploadDataset />}
        {activeTab === "info" && selectedDataset && (
          <DatasetInfo
            dataset={selectedDataset}
            onBack={() => setActiveTab("list")}
          />
        )}
        {activeTab === "preview" && <DatasetPreview />}
        {activeTab === "train" && <TrainModel />}
        {activeTab === "predict" && <Predict />}
      </div>
    </div>
  );
};

export default DatasetsPage;
