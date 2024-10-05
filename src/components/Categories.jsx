// src/components/Categories.jsx
import React from "react";
import { Button } from "@/components/ui/button";

const categories = [
  "All",
  "Cabins",
  "Trending",
  "Luxury",
  "Family",
  "Pet-Friendly",
  "Unique Stays",
  "Budget",
  "Romantic",
  "Adventure",
  "City",
  "Mountain",
  "Desert",
  "Forest",
];

const Categories = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <div className="overflow-x-auto py-4">
      <div className="flex space-x-4 px-4">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className="whitespace-nowrap"
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Categories;
