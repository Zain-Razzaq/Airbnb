import {
  fetchAllListings,
  addListinginDB,
  getListingByIdFromDB,
  deleteListingByIdFromDB,
} from "../database/listingData.js";

import { validateAdminToken, validateHost } from "./userTokenValidation.js";

export const getAllListings = async (req, res) => {
  try {
    const listings = await fetchAllListings();
    res.status(200).json(listings);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const addListing = async (req, res) => {
  try {
    // Check if the user is authenticated and has the required role
    const host = validateHost(req, res) || validateAdminToken(req, res);
    if (!host) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    const listingData = req.body;
    const listing = addListinginDB(listingData);

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

export const getListingById = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch the listing by its ID and populate related fields
    const listing = await getListingByIdFromDB(id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    // Return the found listing in the response
    return res.status(200).json(listing);
  } catch (error) {
    console.error("Error fetching listing details:", error);
    return res.status(500).json({
      message: "Error fetching listing details",
      error: error.message,
    });
  }
};

export const deleteListingById = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the user is authenticated and has the required role
    const host = validateAdminToken(req, res);

    // if not admin
    if (!host) {
      const host = validateHost(req, res);
      if (!host) {
        return res.status(401).json({ message: "Unauthorized access" });
      }
      const listing = await getListingByIdFromDB();
      if (!listing) {
        return res.status(404).json({ message: "Listing not found" });
      }
      // Only allow deletion if the listing belongs to the authenticated user
      if (listing.hostId.toString() !== host.id.toString()) {
        return res.status(403).json({ message: "Forbidden access" });
      }
    }

    const deletedListing = await deleteListingByIdFromDB(id);

    if (!deletedListing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    // Return the deleted listing in the response
    return res.status(200).json({
      message: "Listing deleted successfully",
      listing: deletedListing,
    });
  } catch (e) {
    console.error("Error deleting listing:", e);
    return res.status(500).json({
      message: "Error deleting listing",
      error: e.message,
    });
  }
};
