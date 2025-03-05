"use client";
import { useState } from "react";

const TrainModel = () => {
  const [message, setMessage] = useState("");

  const handleTrain = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_NODE_API_URL}/train`,
      { method: "POST" }
    );
    const data = await response.json();
    setMessage(data.message);
  };

  return (
    <div>
      <h2 className="text-xl font-bold">Train Model</h2>
      <button
        onClick={handleTrain}
        className="mt-4 rounded bg-green-500 p-2 text-white"
      >
        Start Training
      </button>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default TrainModel;
