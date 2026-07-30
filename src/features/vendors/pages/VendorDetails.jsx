import React, { useState, useRef } from "react";
import { ROUTES } from "../../../app/router/routes";
import {
  ArrowLeft,
  Pencil,
  Trash2,
  Store,
  User,
  Mail,
  Phone,
  BadgeCheck,
  FileText,
  Building2,
  IdCard,
} from "lucide-react";
import {
  useVendor,
  useVendorProducts,
  useDeleteVendor,
  useApproveVendorProduct,
  useRejectVendorProduct,
} from "../hooks/useVendors";
import Button from "../../../components/ui/Button";
import Badge from "../../../components/ui/Badge";
import Card from "../../../components/ui/Card";
import { useProduct } from "../../catalog/hooks/useCatalog";
import EditVendorDrawer from "../components/EditVendorDrawer";
import DeleteVendorModal from "../components/DeleteVendorModal";

import { useParams, useNavigate } from "react-router-dom";
export default function VendorDetails() {

  const [selectedProductId, setSelectedProductId] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [editOpen, setEditOpen] = useState(false);
  const deleteVendor = useDeleteVendor();
  const approveProduct = useApproveVendorProduct();
  const rejectProduct = useRejectVendorProduct();
  const [deleteOpen, setDeleteOpen] = useState(false);

  const profileRef = useRef(null);
  const kycRef = useRef(null);
  const productsRef = useRef(null);
  const scrollToSection = (ref) => {
  ref.current?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

  const {
  data,
  isLoading,
  error,
  } = useVendor(id);

  const {
  data: productsData,
  isLoading: productsLoading,
  } = useVendorProducts(id);

  const {
    data: productDetails,
    isLoading: productLoading,
  } = useProduct(selectedProductId);


  const vendorData = data?.data || data;
  const products = productsData?.data || [];

    console.log("Vendor Details:", vendorData);
    console.log("Vendor Products:", products);
    console.log("Selected Product Details:", productDetails);

    if (isLoading) {
      return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <div className="flex min-h-[60vh] items-center justify-center text-light">
  Loading vendor details...
</div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <div className="flex min-h-[60vh] items-center justify-center text-error font-semibold">
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
      return "bg-primary-pale text-orange-700";

    case "rejected":
    case "suspended":
      return "bg-red-50 text-red-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
};
const handleDelete = () => {
  deleteVendor.mutate(id, {
    onSuccess: () => {
      setDeleteOpen(false);
      navigate("/vendors");
    },
    onError: (error) => {
      alert(
        error?.response?.data?.message || "Failed to archive vendor."
      );
    },
  });
};

    return (
    <>
      {/* Drawer */}
      <div className="min-h-screen bg-surface">

        {/* Header */}
        <div className="sticky top-0 z-40 flex items-start justify-between border-b border-border bg-white px-8 py-6 shadow-sm">

  <div>
    <button
  onClick={() => navigate(ROUTES.allVendors)}
  className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-1 py-1.5 text-xs font-semibold text-mid shadow-sm transition-all duration-200 hover:border-primary hover:bg-primary-pale hover:text-primary"
>
  <ArrowLeft size={15} />
  Back to Vendors
</button>

    <div className="mt-3">
  <h1 className="text-2xl font-bold text-black">
    Vendor Details
  </h1>
</div>

  </div>

  <div className="flex items-center gap-2">

    <Button
  size="sm"
  variant="secondary"
  onClick={() => setEditOpen(true)}
>
  <Pencil size={15} />
  Edit
</Button>

    <Button
  size="sm"
  variant="danger"
  onClick={() => setDeleteOpen(true)}
>
  <Trash2 size={16} />
  Delete
</Button>

  </div>
</div>

        {/* Navigation Tabs */}
        <div className="sticky top-0 z-30 flex gap-8 overflow-x-auto border-b border-border bg-white px-8 shadow-sm">
          <div
  onClick={() => scrollToSection(profileRef)}
  className="py-3 text-sm font-medium text-primary border-b-2 border-primary whitespace-nowrap cursor-pointer">
  Profile
</div>
          <div
  onClick={() => scrollToSection(kycRef)}
  className="py-3 text-sm font-medium text-mid border-b-2 border-transparent whitespace-nowrap cursor-pointer hover:text-dark">
  KYC & Documents
</div>
          <div onClick={() => scrollToSection(productsRef)} 
            className="py-3 text-sm font-medium text-mid border-b-2 border-transparent whitespace-nowrap cursor-pointer hover:text-dark">
            Products & Listings
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 flex-1">

          {/* Vendor Profile Card */}
          <div ref={profileRef}>
          <Card className="overflow-hidden">
            {/* Top Section */}
            <div className="border-b border-border bg-white px-6 py-2">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-pale text-xl font-bold text-primary">
                  {vendorData?.storeName?.charAt(0)?.toUpperCase() || "V"}
                </div>
                <div>
                  <h3 className="text-1.5xl font-bold text-black">
                    {vendorData?.storeName || "Tech Galaxy Store"}
                  </h3>
                  <p className="mt-1 text-xs text-light">
                    Owner: {vendorData?.user?.fullName}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Metadata Section */}
            <div className="space-y-4 p-6 text-[15px]">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2 text-light font-medium">
  <Store size={16} className="text-primary" />
  <span className="text-sm font-medium">
Store
</span>
</div>
                <span className="font-medium text-dark">{vendorData?.storeName || "Test111"}</span>
              </div>
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2 text-light font-medium">
  <User size={16} className="text-primary" />
  <span className="text-sm font-medium">
Owner
</span>
</div>
                <span className="font-medium text-dark">{vendorData?.user?.fullName}</span>
              </div>
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2 text-light font-medium">
  <Mail size={16} className="text-primary" />
  <span className="text-sm font-medium">
Email
</span>
</div>
                <a href={`mailto:${vendorData?.user?.email}`} className="font-medium text-blue-600 hover:underline">
                  {vendorData?.user?.email}
                </a>
              </div>
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2 text-light font-medium">
  <Phone size={16} className="text-primary" />
  <span className="text-sm font-medium">
Phone</span>
</div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-dark">{vendorData?.user?.phone}</span>
                  
                </div>
              </div>
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2 text-light font-medium">
  <BadgeCheck size={16} className="text-primary" />
  <span className="text-sm font-medium">
KYC Status</span>
</div>
                <div className="flex items-center gap-2">
                  
                  <Badge variant={(vendorData?.status || "approved").toLowerCase()}>
  {vendorData?.status || "Approved"}
</Badge>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-light font-medium">Member Since</span>
                <span className="font-medium text-dark">{vendorData?.createdAt
  ? new Date(vendorData.createdAt).toLocaleDateString()
  : "-"}</span>
              </div>
            </div>
          </Card>
          </div>

          {/* KYC Details Card */}
          <div ref={kycRef}>
          <Card className="p-6">
            <div className="mb-6 flex items-start justify-between">
  <div>
    <h3 className="text-xl font-semibold text-black">
      KYC & Documents
    </h3>
  </div>

  <Badge
    variant={(vendorData?.kyc?.[0]?.status || "pending").toLowerCase()}
  >
    {vendorData?.kyc?.[0]?.status || "Pending"}
  </Badge>
</div>

            <div className="space-y-4 text-sm">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-3">
  <Building2 size={18} className="text-primary" />

  <div>
    <p className="text-sm font-medium text-dark">
      GST Number
    </p>

    <p className="mt-1 text-sm text-light">
      ************
    </p>
  </div>
</div>
                <Badge variant="approved">
  Verified
</Badge>
              </div>

              <div className="flex items-center justify-between border-b border-border py-4">
  <div className="flex items-center gap-3">
    <IdCard size={18} className="text-primary" />

    <div>
      <p className="text-sm font-medium text-dark">
        PAN Number
      </p>

      <p className="mt-1 text-sm text-light">
        ************
      </p>
    </div>
  </div>

  <Badge variant="approved">
    Verified
  </Badge>
</div>

              <div className="flex items-center gap-3">
  <FileText size={18} className="text-primary" />

  <div>
    <p className="text-sm font-medium text-dark">
      Trade License
    </p>

    <p className="mt-1 text-sm text-light">
      {vendorData?.kyc?.[0]?.tradeLicenseUrl
        ? "Uploaded"
        : "Not Uploaded"}
    </p>
  </div>
</div>

<Badge
  variant={vendorData?.kyc?.[0]?.tradeLicenseUrl ? "approved" : "pending"}>
  {vendorData?.kyc?.[0]?.tradeLicenseUrl ? "Verified" : "Not Uploaded"}
</Badge>
            </div>
          </Card>
          </div>

          {/* Products Card */}
          <div ref={productsRef}>
          <Card className="p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-xl font-semibold text-black">
  Products & Listings
</h3>

<p className="mt-1 text-sm text-light">
  Review and manage all products submitted by this vendor.
</p>
              </div>

              <span className="rounded-full bg-surface px-3 py-1 text-xs font-semibold text-dark">
                {vendorData?._count?.products ?? 0} Products
              </span>
            </div>
            {products.length === 0 ? (
  <div className="rounded-xl border border-dashed border-border py-12 text-center text-light">
  No products found for this vendor.
</div>
) : (
  <div className="space-y-3">

    {products.map((product) => (
      <div
  key={product.id}
  onClick={() => setSelectedProductId(product.id)}
  className="flex cursor-pointer items-center justify-between rounded-2xl border border-border bg-white px-5 py-4 transition-all duration-200 hover:border-primary hover:shadow-md"
>

        <div>
          <h4 className="text-base font-semibold text-black">
            {product.name || product.model || "Unnamed Product"}
          </h4>

          <p className="mt-1 text-sm text-light">
            {product.category?.name || "-"}
          </p>

          <p className="mt-2 text-sm font-semibold text-primary">
            AED {product.price || "-"}
          </p>
        </div>
        <div className="flex items-center gap-2">
  <Badge variant={(product.status || "pending").toLowerCase()}>
  {product.status || "Pending"}
</Badge>

  {product.status === "pending" && (
  <>
    <Button
  variant="success"
  size="sm"
  onClick={(e) => {
    e.stopPropagation();
    approveProduct.mutate(product.id);
  }}
  disabled={approveProduct.isPending}
>
  {approveProduct.isPending ? "Approving..." : "Approve"}
</Button>

    <Button
  variant="danger"
  size="sm"
  onClick={(e) => {
    e.stopPropagation();

    const reason = prompt("Enter rejection reason:");
    if (!reason) return;

    rejectProduct.mutate({
      productId: product.id,
      reason,
    });
  }}
  disabled={rejectProduct.isPending}
>
  {rejectProduct.isPending ? "Rejecting..." : "Reject"}
</Button>
  </>
)}
</div>

      </div>
    ))}
  </div>
)}
{/* Product Details */}

{productLoading && (
  <div className="text-sm text-light mt-4">
    Loading product details...
  </div>
)}


{productDetails?.data && (
  <Card className="mt-5 border border-border bg-white p-6">

    <div className="mb-5">
  <h4 className="text-lg font-semibold text-black">
    Product Details
  </h4>

  <p className="mt-1 text-sm text-light">
    Detailed information about the selected product.
  </p>
</div>

    <div className="space-y-2 text-sm">

      <div className="flex items-center justify-between border-b border-border py-3">
  <span className="text-sm font-medium text-light">
    Name
  </span>

  <span className="text-sm font-medium text-dark">
    {productDetails.data.name || "-"}
  </span>
</div>

      <div className="flex items-center justify-between border-b border-border py-3">
  <span className="text-sm font-medium text-light">
    Model
  </span>

  <span className="text-sm font-medium text-dark">
    {productDetails.data.name || "-"}
  </span>
</div>

      <div className="flex items-center justify-between border-b border-border py-3">
  <span className="text-sm font-medium text-light">
    Price
  </span>

  <span className="text-sm font-medium text-dark">
    {productDetails.data.name || "-"}
  </span>
</div>

      <div className="flex items-center justify-between border-b border-border py-3">
  <span className="text-sm font-medium text-light">
    Condition
  </span>

  <span className="text-sm font-medium text-dark">
    {productDetails.data.name || "-"}
  </span>
</div>

      <div className="flex items-center justify-between border-b border-border py-3">
  <span className="text-sm font-medium text-light">
    Status
  </span>

  <span className="text-sm font-medium text-dark">
    {productDetails.data.name || "-"}
  </span>
</div>

    </div>

  </Card>
)}
          </Card>
          </div>

        </div>
          <EditVendorDrawer
            open={editOpen}
            onClose={() => setEditOpen(false)}
            vendor={vendorData}/>
          <DeleteVendorModal
  open={deleteOpen}
  vendor={vendorData}
  onClose={() => setDeleteOpen(false)}
  onDelete={handleDelete}
/>
      </div>
    </>
  );
}