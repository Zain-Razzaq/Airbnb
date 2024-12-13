import {
  getAllListings,
  addListing,
  getListingById,
  deleteListingById,
  getListingsOfSpecificUser,
} from "../controllers/Listing.js";

import express from "express";

const router = express.Router();

router.get("/all", getAllListings);
router.post("/add", addListing);
router.get("/:id", getListingById);
router.delete("/delete/:id", deleteListingById);
router.get("/user/:id", getListingsOfSpecificUser);

export default router;
