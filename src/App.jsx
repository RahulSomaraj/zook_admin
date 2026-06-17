import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import KycReview from "./pages/KycReview";
import ProductCatalog from "./pages/ProductCatalog";
import FraudReview from "./pages/FraudReview";
import AllOrders from "./pages/AllOrders";
import C2CDrafts from "./pages/C2CDrafts";
import StrikeManagement from "./pages/StrikeManagement";
import Overview from "./pages/Overview";
<Route path="/dashboard" element={<Overview />} />

export default function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/product-catalog" replace />} />
        <Route path="/product-catalog" element={<ProductCatalog />} />
        <Route path="/fraud-review" element={<FraudReview />} />
        <Route path="/all-orders" element={<AllOrders />} />
        <Route path="/c2c-drafts" element={<C2CDrafts />} />
        <Route path="/kyc-review" element={<KycReview />} />
        <Route path="/strike-management" element={<StrikeManagement />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/dashboard" element={<Overview />} />
      </Routes>
    </MainLayout>
  );
}