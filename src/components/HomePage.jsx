import React from "react";

import Categories from "@/components/Categories";

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  return (
    <>
      <div className="container mx-auto py-8">
        <Categories
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
    </>
  );
};
export default HomePage;
