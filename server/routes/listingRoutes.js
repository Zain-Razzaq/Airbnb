import { getAllListings, addListing } from "../controllers/Listing.js";

import express from "express";

const router = express.Router();

router.get("/all", getAllListings);
router.post("/add", addListing);

export default router;
