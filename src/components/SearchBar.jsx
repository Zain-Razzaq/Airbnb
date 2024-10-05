import React, { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SearchBar = () => {
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", location);
    setLocation("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") handleSearch();
  };

  return (
    <div className="flex items-center space-x-2">
      <Input
        type="text"
        placeholder="Enter location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        onKeyPress={handleKeyPress}
        className="flex-1"
      />
      <Button onClick={handleSearch} className="flex items-center space-x-1">
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
