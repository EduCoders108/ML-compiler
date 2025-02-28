"use strict";
// import express from "express";
// import cors from "cors";
// import axios from "axios";
// import dotenv from "dotenv";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// dotenv.config();
// const app = express();
// app.use(express.json());
// app.use(cors());
// const FLASK_API_URL = process.env.FLASK_API_URL || "http://localhost:5000"; // Flask running on port 5000
// // ✅ Add a root route
// app.get("/", (req, res) => {
//     res.send("Node.js backend is running!");
// });
// // Forward request to Flask's /train
// app.post("/train", async (req, res) => {
//     try {
//         const response = await axios.post(`${FLASK_API_URL}/train`, req.body);
//         res.json(response.data);
//     } catch (error) {
//         res.status(500).json({ error: "Error forwardin  g request to Flask" });
//     }
// });
// // Forward request to Flask's /predict
// app.post("/predict", async (req, res) => {
//     try {
//         const response = await axios.post(`${FLASK_API_URL}/predict`, req.body);
//         res.json(response.data);
//     } catch (error) {
//         res.status(500).json({ error: "Error forwarding request to Flask" });
//     }
// });
// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//     console.log(`Backend-Node running on http://localhost:${PORT}`);
// });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "*", // Allow all origins (for testing)
    methods: ["GET", "POST"],
}));
const FLASK_API_URL = process.env.FLASK_API_URL || "http://localhost:5000";
const PORT = Number(process.env.PORT) || 4000;
// ✅ Path to the datasets folder (adjust based on your project structure)
const datasetsPath = path_1.default.resolve(__dirname, "../../../datasets");
// ✅ Serve datasets folder statically
app.use("/datasets", express_1.default.static(datasetsPath));
// ✅ API to list available datasets (only .csv files)
app.get("/list-datasets", (req, res) => {
    fs_1.default.readdir(datasetsPath, (err, files) => {
        if (err) {
            return res.status(500).json({ error: "Failed to read datasets folder" });
        }
        const csvFiles = files.filter(file => file.endsWith(".csv"));
        res.json({ datasets: csvFiles });
    });
});
// ✅ Root route
app.get("/", (req, res) => {
    res.send("Node.js backend is running!");
});
// ✅ Forward request to Flask's /train endpoint
app.post("/train", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.post(`${FLASK_API_URL}/train`, req.body);
        res.json(response.data);
    }
    catch (error) {
        res.status(500).json({ error: "Error forwarding request to Flask" });
    }
}));
// ✅ Forward request to Flask's /predict endpoint
app.post("/predict", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.post(`${FLASK_API_URL}/predict`, req.body);
        res.json(response.data);
    }
    catch (error) {
        res.status(500).json({ error: "Error forwarding request to Flask" });
    }
}));
// ✅ Start the server and make it accessible over the network
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Backend-Node running on http://0.0.0.0:${PORT}`);
    console.log(`Serving datasets at http://<your-ip>:${PORT}/datasets`);
});
