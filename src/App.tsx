import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import ProductPage from "./pages/ProductPage";
import { Toaster } from "@/components/ui/sonner";
import Category from "./pages/Category";
import { CartProvider } from "./contexts/CartContext";
import Footer from "./components/Footer";
import MobileNav from "./components/MobileNav";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Toaster expand={true} closeButton position="top-right" />
        <MobileNav />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/category/:id" element={<Category />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
