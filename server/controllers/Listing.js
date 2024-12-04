import { fetchAllListings, addListinginDB } from "../database/listingData.js";

export const getAllListings = async (req, res) => {
  try {
    const listings = await fetchAllListings();
    res.status(200).json(listings);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const newListingData = {
  title: "Luxury Apartment in the City",
  description: "A beautiful luxury apartment located in the heart of the city.",
  location: "New York, NY",
  price: 250,
  availableFrom: new Date("2024-01-01"),
  availableTo: new Date("2024-12-31"),
  capacity: 4,
  numberOfRooms: 2,
  numberOfBathrooms: 1,
  amenities: ["Wi-Fi", "Air Conditioning", "Gym"],
  status: "available",
  rating: 4.5,
  categories: "60c72b2f9b1d4c45d6a232d1", // example category ID
  host: "60c72b2f9b1d4c45d6a232d2", // example host ID
};

export const addListing = async (req, res) => {
  try {
    const listingData = req.body; // Extract the listing data from the request body
    console.log(listingData);
    const listing = addListinginDB(newListingData);

    // Send a response with the saved listing
    res.status(201).json({
      message: "Listing added successfully",
      listing: listing,
    });
  } catch (error) {
    console.error("Error adding listing:", error);
    res.status(500).json({
      message: "Error adding listing",
      error: error.message,
    });
  }
};
