/**
 * Single source of truth for route paths.
 * Reference ROUTES.productCatalog instead of hardcoding "/product-catalog"
 * so renaming a route is a one-line change.
 */
export const ROUTES = {
  login: "/login",
  dashboard: "/dashboard",
  overview: "/overview",
  productCatalog: "/product-catalog",
  fraudReview: "/fraud-review",
  allOrders: "/all-orders",
  c2cDrafts: "/c2c-drafts",
  kycReview: "/kyc-review",
  strikeManagement: "/strike-management",
};
