import React, { useState } from "react";
import { X, Store, User, Mail, Phone, BadgeCheck } from "lucide-react";
import { useVendor, useVendorProducts } from "../hooks/useVendors";
import { useProduct } from "../../catalog/hooks/useCatalog";


export default function ViewVendorDrawer({
  open,
  onClose,
  vendor,
}) {

  const [selectedProductId, setSelectedProductId] = useState(null);

  const {
    data,
    isLoading,
    error,
  } = useVendor(vendor?.id);

  const {
    data: productsData,
    isLoading: productsLoading,
  } = useVendorProducts(vendor?.id);

  const {
    data: productDetails,
    isLoading: productLoading,
  } = useProduct(selectedProductId);


  const vendorData = data?.data || data;
  const products = productsData?.data || [];

    console.log("Vendor Details:", vendorData);
    console.log("Vendor Products:", products);
    console.log("Selected Product Details:", productDetails);

    if (!open) return null;
    if (isLoading) {
      return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <div className="bg-white p-6 rounded-lg">
            Loading vendor details...
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <div className="bg-white p-6 rounded-lg text-red-600">
            Failed to load vendor details.
          </div>
        </div>
      );
    }
    if (!vendorData) {
      return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <div className="bg-white p-6 rounded-lg">
             No vendor data found.
          </div>
        </div>
      );
    }
    const getKycStatusClass = (status) => {
  switch ((status || "").toLowerCase()) {
    case "approved":
      return "bg-green-50 text-green-700";

    case "pending":
      return "bg-orange-50 text-orange-700";

    case "rejected":
    case "suspended":
      return "bg-red-50 text-red-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
};

    return (
    <>
      {/* Background Overlay */}
      <div
        className="fixed inset-0 bg-black/30 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-[640px] max-w-full bg-[#f9fafb] shadow-2xl z-50 overflow-y-auto flex flex-col">

        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-5 shadow-sm flex items-center justify-between">
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold text-gray-900">
              Vendor Details
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              View vendor profile and business information
            </p>
          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 bg-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition"
            aria-label="Close drawer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white border-b border-gray-200 px-6 flex gap-6 overflow-x-auto shrink-0">
          <div className="py-3 text-sm font-medium text-[#ff5500] border-b-2 border-[#ff5500] whitespace-nowrap cursor-pointer">
            Profile
          </div>
          <div className="py-3 text-sm font-medium text-gray-500 border-b-2 border-transparent whitespace-nowrap cursor-pointer hover:text-gray-900">
            KYC & Documents
          </div>
          <div className="py-3 text-sm font-medium text-gray-500 border-b-2 border-transparent whitespace-nowrap cursor-pointer hover:text-gray-900">
            Products & Listings
          </div>
          <div className="py-3 text-sm font-medium text-gray-500 border-b-2 border-transparent whitespace-nowrap cursor-pointer hover:text-gray-900">
            Financials
          </div>
          <div className="py-3 text-sm font-medium text-gray-500 border-b-2 border-transparent whitespace-nowrap cursor-pointer hover:text-gray-900">
            Activity Log
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 flex-1">

          {/* Vendor Profile Card */}
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            {/* Top Section */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-400 px-6 py-2">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-xl font-bold text-orange-600 shadow-md">
                  {vendorData?.storeName?.charAt(0)?.toUpperCase() || "V"}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {vendorData?.storeName || "Tech Galaxy Store"}
                  </h3>
                  <p className="text-orange-100 text-sm">
                    Owner: {vendorData?.user?.fullName}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Metadata Section */}
            <div className="p-6 space-y-4 text-sm">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2 text-gray-500 font-medium">
  <Store size={16} className="text-orange-500" />
  <span>Store</span>
</div>
                <span className="font-medium text-gray-900">{vendorData?.storeName || "Test111"}</span>
              </div>
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2 text-gray-500 font-medium">
  <User size={16} className="text-orange-500" />
  <span>Owner</span>
</div>
                <span className="font-medium text-gray-900">{vendorData?.user?.fullName}</span>
              </div>
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2 text-gray-500 font-medium">
  <Mail size={16} className="text-orange-500" />
  <span>Email</span>
</div>
                <a href={`mailto:${vendorData?.user?.email}`} className="font-medium text-blue-600 hover:underline">
                  {vendorData?.user?.email}
                </a>
              </div>
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2 text-gray-500 font-medium">
  <Phone size={16} className="text-orange-500" />
  <span>Phone</span>
</div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">{vendorData?.user?.phone}</span>
                  <a
  href={`tel:${vendorData?.user?.phone}`}
  className="text-orange-500 hover:text-orange-600"
  title="Call"
>
  <Phone size={15} />
</a>
                </div>
              </div>
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2 text-gray-500 font-medium">
  <BadgeCheck size={16} className="text-orange-500" />
  <span>Status</span>
</div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700">
                    Professional
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${
                      vendorData?.status === "approved" || !vendorData?.status
                        ? "bg-green-50 text-green-700"
                        : vendorData?.status === "pending"
                        ? "bg-orange-50 text-orange-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {vendorData?.status || "Approved"}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 font-medium">Member Since</span>
                <span className="font-medium text-gray-900">{vendorData?.createdAt
  ? new Date(vendorData.createdAt).toLocaleDateString()
  : "-"}</span>
              </div>
            </div>
          </div>

          {/* KYC Details Card */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-semibold text-gray-900">
                KYC & Documents
              </h3>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${getKycStatusClass(
                vendorData?.kyc?.[0]?.status
                )}`}>
                {vendorData?.kyc?.[0]?.status || "Pending"}
              </span>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div>
                  <p className="text-xs text-gray-500 font-medium">GST Number</p>
                  <p className="font-medium text-gray-900 mt-0.5">************</p>
                </div>
                <span className="text-green-600 font-semibold text-xs flex items-center gap-1">
                  ✓ Verified
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div>
                  <p className="text-xs text-gray-500 font-medium">PAN Number</p>
                  <p className="font-medium text-gray-900 mt-0.5">************</p>
                </div>
                <span className="text-green-600 font-semibold text-xs flex items-center gap-1">
                  ✓ Verified
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 font-medium">Trade License</p>
                  <p className="font-medium text-gray-900 mt-0.5">{vendorData?.kyc?.[0]?.tradeLicenseUrl
  ? "Uploaded"
  : "Not Uploaded"}</p>
                </div>
                <span className="text-green-600 font-semibold text-xs flex items-center gap-1">
                  ✓ Verified
                </span>
              </div>
            </div>
          </div>

          {/* Products Card */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-base font-semibold text-gray-900">
                  Products
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Products listed by this vendor
                </p>
              </div>

              <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-700">
                {vendorData?._count?.products ?? 0} Products
              </span>
            </div>
            {products.length === 0 ? (
  <div className="text-center py-10 text-gray-500">
    No products found.
  </div>
) : (
  <div className="space-y-3">

    {products.map((product) => (
      <div key={product.id}
        onClick={() => setSelectedProductId(product.id)}
        className="flex items-center justify-between border rounded-xl p-4 cursor-pointer hover:bg-gray-50">

        <div>
          <h4 className="font-semibold text-gray-900">
            {product.name || product.model || "Unnamed Product"}
          </h4>

          <p className="text-sm text-gray-500">
            {product.category?.name || "-"}
          </p>

          <p className="text-sm font-medium text-orange-600 mt-1">
            AED {product.price || "-"}
          </p>
        </div>


        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            product.status === "approved"
              ? "bg-green-50 text-green-700"
              : product.status === "pending"
              ? "bg-orange-50 text-orange-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {product.status || "Pending"}
        </span>

      </div>
    ))}
  </div>
)}
{/* Product Details */}

{productLoading && (
  <div className="text-sm text-gray-500 mt-4">
    Loading product details...
  </div>
)}


{productDetails?.data && (
  <div className="mt-5 rounded-xl border border-gray-200 bg-gray-50 p-5">

    <h4 className="font-semibold text-gray-900 mb-3">
      Product Details
    </h4>

    <div className="space-y-2 text-sm">

      <p>
        <span className="text-gray-500">
          Name:
        </span>{" "}
        {productDetails.data.name || "-"}
      </p>

      <p>
        <span className="text-gray-500">
          Model:
        </span>{" "}
        {productDetails.data.model || "-"}
      </p>

      <p>
        <span className="text-gray-500">
          Price:
        </span>{" "}
        AED {productDetails.data.price || "-"}
      </p>

      <p>
  <span className="text-gray-500">
    Condition:
  </span>{" "}
  {productDetails.data.conditionGrade || "-"}
</p>

      <p>
        <span className="text-gray-500">
          Status:
        </span>{" "}
        {productDetails.data.status || "-"}
      </p>

    </div>

  </div>
)}
          </div>

        </div>

      </div>
    </>
  );
}