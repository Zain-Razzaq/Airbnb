import express from "express";
import cors from "cors";

// Import data from json file
import dummyData from "./dummyData.json" assert { type: "json" };

const data = dummyData.data;

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS for all requests
app.use(cors());

// API Endpoints

app.get("/", (req, res) => {
  res.send("Server running on port 3000");
});

// 1. Get all listings
app.get("/api/listings", (req, res) => {
  res.json(data);
});

// 2. Get listing details by ID
app.get("/api/listings/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const listing = data.find((item) => item.id === id);
  if (listing) {
    res.json(listing);
  } else {
    res.status(404).send({ error: "Listing not found" });
  }
});

// 3. Search functionality (filter by location, using title here as a proxy)
app.get("/api/listings/search", (req, res) => {
  const query = req.query.query?.toLowerCase() || "";
  const results = data.filter((item) =>
    item.title.toLowerCase().includes(query)
  );
  res.json(results);
});

// 4. Create a booking (mock implementation)
app.post("/api/bookings", (req, res) => {
  const booking = req.body; // Expecting booking details in request body
  res.status(201).send({
    message: "Booking created successfully (mock)",
    booking,
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
