import "dotenv/config";
import cors from "cors";
import express from "express";
import route from "./api/payment";
import dotenv from "dotenv";
import path from "path";
const app = express();

dotenv.config({ path: "../.env" });
app.use(cors({ origin: ["http://localhost:5173", "http://localhost:3000"] }));
app.use(express.json());
app.use("/api", route);
app.listen(4000, () => console.log("API on localhost:4000"));
