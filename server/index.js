import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes.js";
import listingRoutes from "./routes/listingRoutes.js";
import categorieRoutes from "./routes/categorieRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

const app = express();
const port = 3000;
dotenv.config();
// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());
// Enable CORS for all requests
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true, 
  })
);

// Database connection
mongoose.connect(process.env.MONGODB_CONNECTION_URL);

mongoose.connection.on("connected", () => {
  console.log("Connected to the MongoDB server");
});

export const connection = null;

// Routes
app.use("/auth", authRoutes);
app.use("/listing", listingRoutes);
app.use("/categorie", categorieRoutes);
app.use("/booking", bookingRoutes);

const PORT = process.env.PORT || 5000;
// API Endpoints

app.get("/", (req, res) => {
  res.send("Server running on port 3000");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
