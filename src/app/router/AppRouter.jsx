import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "./routes";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../../layout/MainLayout";
import { LoginPage } from "../../features/auth";

// Pages (still in src/pages for now — see ARCHITECTURE.md for the migration
// path into feature folders).
import Overview from "../../pages/Overview";
import ProductCatalog from "../../pages/ProductCatalog";
import FraudReview from "../../pages/FraudReview";
import AllOrders from "../../pages/AllOrders";
import C2CDrafts from "../../pages/C2CDrafts";
import KycReview from "../../pages/KycReview";
import StrikeManagement from "../../pages/StrikeManagement";
import VendorList from "../../features/vendors/components/VendorList";
import VendorDetails from "../../features/vendors/pages/VendorDetails";
import Categories from "../../pages/Categories";
import Brands from "../../pages/Brands";

/**
 * Two route groups:
 *  1. Public  → /login
 *  2. Private → everything else, wrapped in ProtectedRoute + MainLayout.
 *     MainLayout renders <Outlet /> where the matched page goes.
 */
export default function AppRouter() {
  return (
    <Routes>
      <Route path={ROUTES.login} element={<LoginPage />} />

      <Route
        element={
          <ProtectedRoute>
            <MainLayout>
              <Outlet />
            </MainLayout>
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to={ROUTES.overview} replace />} />
        <Route path={ROUTES.dashboard} element={<Overview />} />
        <Route path={ROUTES.overview} element={<Overview />} />
        <Route path={ROUTES.productCatalog} element={<ProductCatalog />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/brands" element={<Brands />} />
        <Route path={ROUTES.fraudReview} element={<FraudReview />} />
        <Route path={ROUTES.allOrders} element={<AllOrders />} />
        <Route path={ROUTES.c2cDrafts} element={<C2CDrafts />} />
        <Route path={ROUTES.kycReview} element={<KycReview />} />
        <Route path={ROUTES.strikeManagement} element={<StrikeManagement />} />
        <Route path={ROUTES.allVendors} element={<VendorList />} />
        <Route path="/vendors/:id" element={<VendorDetails />} />
      </Route>

      <Route path="*" element={<Navigate to={ROUTES.productCatalog} replace />} />
    </Routes>
  );
}
