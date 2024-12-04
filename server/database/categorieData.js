import CategoriesModel from "../models/Categories.js";

export const createCategoryInDB = async (category) => {
  try {
    const newCategory = new CategoriesModel(category);
    return await newCategory.save();
  } catch (error) {
    console.error(`Error creating category: ${error}`);
    throw error;
  }
};

export const getCategoriesFromDB = async () => {
  try {
    const categories = await CategoriesModel.find();
    return categories;
  } catch (error) {
    console.error(`Error fetching categories: ${error}`);
    throw error;
  }
};
