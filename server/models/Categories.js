import mongoose from "mongoose";

const categoriesSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
});

const CategoriesModel = mongoose.model("categories", categoriesSchema);

export default CategoriesModel;
