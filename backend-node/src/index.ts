import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const FLASK_API_URL = process.env.FLASK_API_URL || "http://localhost:5000"; // Flask running on port 5000

// ✅ Add a root route
app.get("/", (req, res) => {
    res.send("Node.js backend is running!");
});

// Forward request to Flask's /train
app.post("/train", async (req, res) => {
    try {
        const response = await axios.post(`${FLASK_API_URL}/train`, req.body);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error forwarding request to Flask" });
    }
});

// Forward request to Flask's /predict
app.post("/predict", async (req, res) => {
    try {
        const response = await axios.post(`${FLASK_API_URL}/predict`, req.body);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error forwarding request to Flask" });
    }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Backend-Node running on http://localhost:${PORT}`);
});
