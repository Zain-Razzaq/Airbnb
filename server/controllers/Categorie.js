import {
  createCategoryInDB,
  getCategoriesFromDB,
} from "../database/categorieData.js";

// Create a new category
export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const newCategory = await createCategoryInDB({ name, description });

    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Get all categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await getCategoriesFromDB();

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
