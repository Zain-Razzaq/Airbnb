import { Routes, Route, BrowserRouter } from "react-router-dom";

import "./App.css";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ListingPage from "./pages/ListingPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/listing/:id" element={<ListingPage /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
