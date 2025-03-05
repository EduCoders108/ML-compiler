"use client";
import { useState } from "react";

const Predict = () => {
  const [input, setInput] = useState("");
  const [prediction, setPrediction] = useState("");

  const handlePredict = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_NODE_API_URL}/predict`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      }
    );

    const data = await response.json();
    setPrediction(data.prediction);
  };

  return (
    <div>
      <h2 className="text-xl font-bold">Make Predictions</h2>
      <input
        type="text"
        onChange={(e) => setInput(e.target.value)}
        className="border p-2"
      />
      <button
        onClick={handlePredict}
        className="ml-2 bg-blue-500 p-2 text-white"
      >
        Predict
      </button>
      {prediction && <p className="mt-4">Prediction: {prediction}</p>}
    </div>
  );
};

export default Predict;
