import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { getAllCategories } from "../api/categorie.js";

const Categories = ({ selectedCategory, setSelectedCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="overflow-x-auto py-4">
      <div className="flex space-x-4 px-4">
        <Button
          variant="outline"
          onClick={() => setSelectedCategory("All")}
          className={`whitespace-nowrap ${
            selectedCategory == "All" && "bg-slate-300"
          }`}
        >
          All
        </Button>
        {categories.map((category) => (
          <Button
            key={category._id}
            variant={selectedCategory === category ? "" : "outline"}
            onClick={() => setSelectedCategory(category._id)}
            className={`whitespace-nowrap ${
              selectedCategory === category._id && "bg-slate-400"
            }`}
          >
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Categories;
