import ListingModel from "../models/Listing.js";

export async function fetchAllListings() {
  try {
    const listings = await ListingModel.find();
    return listings;
  } catch (error) {
    console.error("Error fetching listings:", error);
    throw error;
  }
}

export async function addListinginDB(listingData) {
  try {
    // Create a new listing instance with the provided data
    const newListing = new ListingModel(listingData);

    // Save the new listing to the database
    const savedListing = await newListing.save();

    return savedListing; // Return the saved listing document
  } catch (error) {
    console.error('Error adding listing:', error);
    throw error;
  }
}

