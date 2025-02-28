import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const FLASK_API_URL = process.env.FLASK_API_URL || "http://localhost:5000"; // Flask running on port 5000

// ✅ Root route
app.get("/", (req, res) => {
    res.send("Node.js backend is running!");
});

// ✅ Fetch list of available datasets
app.get("/datasets", async (req, res) => {
    try {
        const response = await axios.get(`${FLASK_API_URL}/datasets`);
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching datasets:", error);
        res.status(500).json({ error: "Error fetching datasets from Flask" });
    }
});

// ✅ Upload dataset
app.post("/upload", async (req, res) => {
    try {
        const response = await axios.post(`${FLASK_API_URL}/upload`, req.body, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        res.json(response.data);
    } catch (error) {
        console.error("Error uploading dataset:", error);
        res.status(500).json({ error: "Error uploading dataset to Flask" });
    }
});

// ✅ Get dataset info
app.post("/dataset-info", async (req, res) => {
    try {
        const response = await axios.post(`${FLASK_API_URL}/dataset-info`, req.body);
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching dataset info:", error);
        res.status(500).json({ error: "Error fetching dataset info from Flask" });
    }
});

// ✅ Get dataset preview
app.post("/dataset-preview", async (req, res) => {
    try {
        const response = await axios.post(`${FLASK_API_URL}/dataset-preview`, req.body);
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching dataset preview:", error);
        res.status(500).json({ error: "Error fetching dataset preview from Flask" });
    }
});

// ✅ Train model
app.post("/train", async (req, res) => {
    try {
        const response = await axios.post(`${FLASK_API_URL}/train`, req.body);
        res.json(response.data);
    } catch (error) {
        console.error("Error training model:", error);
        res.status(500).json({ error: "Error training model in Flask" });
    }
});

// ✅ Predict using trained model
app.post("/predict", async (req, res) => {
    try {
        const response = await axios.post(`${FLASK_API_URL}/predict`, req.body);
        res.json(response.data);
    } catch (error) {
        console.error("Error making prediction:", error);
        res.status(500).json({ error: "Error making prediction with Flask" });
    }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Backend-Node running on http://localhost:${PORT}`);
});
