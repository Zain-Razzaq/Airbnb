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
    console.error("Error adding listing:", error);
    throw error;
  }
}

export const getListingByIdFromDB = async (id) => {
  try {
    const listing = await ListingModel.findById(id)
      .populate("category")
      .populate("hostId")
      //   .populate("bookings")
      .exec();
    return listing;
  } catch (error) {
    console.error("Error fetching listing details:", error);
    throw error;
  }
};

export const deleteListingByIdFromDB = async (id) => {
  try {
    const deletedListing = await ListingModel.findByIdAndDelete(id);
    return deletedListing;
  } catch (error) {
    console.error("Error deleting listing:", error);
    throw error;
  }
};
