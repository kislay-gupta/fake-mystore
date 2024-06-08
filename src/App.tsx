import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import ProductPage from "./pages/ProductPage";
import { Toaster } from "@/components/ui/sonner";
import Category from "./pages/Category";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />

      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/category/:id" element={<Category />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
