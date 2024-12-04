import { getAllCategories , createCategory } from "../controllers/Categorie.js"

import express from "express";

const router = express.Router();

router.get("/all", getAllCategories);
router.post("/add", createCategory);

export default router;
