import React from "react";
import LoginPage from "./LoginPage";
import { Routes, Route } from "react-router-dom";
import ProductsPage from "./products";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/products" element={<ProductsPage />} />
    </Routes>
  );
};

export default App;
