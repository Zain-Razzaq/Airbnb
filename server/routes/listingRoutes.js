import {
  getAllListings,
  addListing,
  getListingById,
} from "../controllers/Listing.js";

import express from "express";

const router = express.Router();

router.get("/all", getAllListings);
router.post("/add", addListing);
router.get("/:id", getListingById);

export default router;
