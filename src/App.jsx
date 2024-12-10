import { Routes, Route, BrowserRouter } from "react-router-dom";

import "./App.css";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import ListingPage from "./pages/ListingPage";
import BookingPage from "./pages/BookingPage";

import {
  ROOT_URL,
  LOGIN_URL,
  SIGNUP_URL,
  Listing_URL,
  BOOKING_URL,
} from "./routes";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path={ROOT_URL} element={<HomePage />} />
        <Route path={LOGIN_URL} element={<LoginPage />} />
        <Route path={SIGNUP_URL} element={<SignupPage />} />
        <Route path={Listing_URL} element={<ListingPage />} />
        <Route path={BOOKING_URL} element={<BookingPage />} />
      </Routes>
      <Footer />
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
