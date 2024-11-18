import express from "express";
import cors from "cors";

// Import data from json file
import dummyData from "./dummyData.json" assert { type: "json" };

// convert data into list of objects
const data = dummyData.data.map((listing) => ({
  id: listing.id,
  image: listing.image,
  title: listing.title,
  type: listing.type,
  guests: listing.guests,
  bedrooms: listing.bedrooms,
  bathrooms: listing.bathrooms,
  pricePerNight: listing.price_per_night,
  rating: listing.rating,
  category: listing.category,
}));

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS for all requests
app.use(cors());

// Static JSON Data
const data2 = [
  {
    id: 1,
    image: "1.jpg",
    title: "Luxury Villa with Ocean View",
    type: "Entire home",
    guests: 6,
    bedrooms: 3,
    bathrooms: 3,
    pricePerNight: 250,
    rating: 4.8,
    category: "Villas",
  },
  {
    id: 2,
    image: "2.jpg",
    title: "Cozy Cottage in the Woods",
    type: "Entire home",
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    pricePerNight: 100,
    rating: 4.5,
    category: "Houses",
  },
  {
    id: 3,
    image: "src/assets/img/3.jpg",
    title: "Modern Apartment in the City",
    type: "Entire home",
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    pricePerNight: 150,
    rating: 4.7,
    category: "Apartments",
  },
];

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
