import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes.js";

const app = express();
const port = 3000;
dotenv.config();
// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());
// Enable CORS for all requests
app.use(cors());

// Database connection
mongoose.connect(process.env.MONGODB_CONNECTION_URL);

mongoose.connection.on("connected", () => {
  console.log("Connected to the MongoDB server");
});

export const connection = null;

// Routes
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 5000;
// API Endpoints

app.get("/", (req, res) => {
  res.send("Server running on port 3000");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// 1. Get all listings
// app.get("/api/listings", (req, res) => {
//   res.json(data);
// });

// // 2. Get listing details by ID
// app.get("/api/listings/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   const listing = data.find((item) => item.id === id);
//   if (listing) {
//     res.json(listing);
//   } else {
//     res.status(404).send({ error: "Listing not found" });
//   }
// });

// // 3. Search functionality (filter by location, using title here as a proxy)
// app.get("/api/listings/search", (req, res) => {
//   const query = req.query.query?.toLowerCase() || "";
//   const results = data.filter((item) =>
//     item.title.toLowerCase().includes(query)
//   );
//   res.json(results);
// });

// // 4. Create a booking (mock implementation)
// app.post("/api/booking", (req, res) => {
//   const booking = req.body; // Expecting booking details in request body
//   console.log(booking);
//   res.status(201).send({
//     message: "Booking created successfully (mock)",
//     booking,
//   });
// });

// Start the server
