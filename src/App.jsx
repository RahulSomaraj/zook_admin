import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";

import ProductCatalog from "./pages/ProductCatalog";
import FraudReview from "./pages/FraudReview";
import AllOrders from "./pages/AllOrders";

export default function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/product-catalog" replace />} />
        <Route path="/product-catalog" element={<ProductCatalog />} />
        <Route path="/fraud-review" element={<FraudReview />} />
        <Route path="/all-orders" element={<AllOrders />} />
      </Routes>
    </MainLayout>
  );
}