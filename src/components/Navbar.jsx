import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SearchBar from "@/components/SearchBar";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <a href="/" className="text-gray-800">
            Logo
          </a>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <a href="/" className="text-gray-600 hover:text-gray-800">
            Home
          </a>
          <a href="/experiences" className="text-gray-600 hover:text-gray-800">
            Experiences
          </a>
          <a
            href="/online-experiences"
            className="text-gray-600 hover:text-gray-800"
          >
            Online Experiences
          </a>
        </div>

        {/* User Menu */}
        <div className="flex items-center space-x-4">
          <SearchBar />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <a href="/login">Login</a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a href="/signup">Sign Up</a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
