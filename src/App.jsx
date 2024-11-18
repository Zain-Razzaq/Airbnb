import { Routes, Route, BrowserRouter } from "react-router-dom";

import "./App.css";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ListingPage from "./pages/ListingPage";
import BookingPage from "./pages/BookingPage";
import { Toaster } from "@/components/ui/toaster"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/listing/:id" element={<ListingPage />} />
        <Route path="/booking/:id" element={<BookingPage />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
