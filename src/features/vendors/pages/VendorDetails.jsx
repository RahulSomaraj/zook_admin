import React, { useState } from "react";
import {
  ArrowLeft,
  Pencil,
  Trash2,
  Store,
  User,
  Mail,
  Phone,
  BadgeCheck,
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
        <div className="flex items-center justify-between border-b border-border bg-white px-8 py-6">

  <div>
    <button
      onClick={() => navigate("/vendors")}
      className="mb-2 flex items-center gap-2 text-sm text-mid transition hover:text-primary"
    >
      <ArrowLeft size={16} />
      Back to Vendors
    </button>

    <h2 className="text-2xl font-bold text-black">
      Vendor Details
    </h2>

  </div>

  <div className="flex items-center gap-3">

    <Button
  variant="secondary"
  onClick={() => setEditOpen(true)}
>
  <Pencil size={16} />
  Edit
</Button>

    <Button
  variant="danger"
  onClick={() => setDeleteOpen(true)}
>
  <Trash2 size={16} />
  Delete
</Button>

  </div>
</div>

        {/* Navigation Tabs */}
        <div className="flex gap-8 overflow-x-auto border-b border-border bg-white px-8">
          <div className="py-3 text-sm font-medium text-primary
 border-b-2 border-primary whitespace-nowrap cursor-pointer">
            Profile
          </div>
          <div className="py-3 text-sm font-medium text-mid border-b-2 border-transparent whitespace-nowrap cursor-pointer hover:text-dark">
            KYC & Documents
          </div>
          <div className="py-3 text-sm font-medium text-mid border-b-2 border-transparent whitespace-nowrap cursor-pointer hover:text-dark">
            Products & Listings
          </div>
          <div className="py-3 text-sm font-medium text-mid border-b-2 border-transparent whitespace-nowrap cursor-pointer hover:text-dark">
            Financials
          </div>
          <div className="py-3 text-sm font-medium text-mid border-b-2 border-transparent whitespace-nowrap cursor-pointer hover:text-dark">
            Activity Log
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 flex-1">

          {/* Vendor Profile Card */}
          <Card className="overflow-hidden">
            {/* Top Section */}
            <div className="bg-gradient-to-r from-primary to-primary-dark px-6 py-4">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-xl font-bold text-primary shadow-card">
                  {vendorData?.storeName?.charAt(0)?.toUpperCase() || "V"}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {vendorData?.storeName || "Tech Galaxy Store"}
                  </h3>
                  <p className="mt-1 text-sm text-white/80">
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
  <span>Store</span>
</div>
                <span className="font-medium text-dark">{vendorData?.storeName || "Test111"}</span>
              </div>
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2 text-light font-medium">
  <User size={16} className="text-primary" />
  <span>Owner</span>
</div>
                <span className="font-medium text-dark">{vendorData?.user?.fullName}</span>
              </div>
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2 text-light font-medium">
  <Mail size={16} className="text-primary" />
  <span>Email</span>
</div>
                <a href={`mailto:${vendorData?.user?.email}`} className="font-medium text-blue-600 hover:underline">
                  {vendorData?.user?.email}
                </a>
              </div>
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2 text-light font-medium">
  <Phone size={16} className="text-primary" />
  <span>Phone</span>
</div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-dark">{vendorData?.user?.phone}</span>
                  
                </div>
              </div>
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2 text-light font-medium">
  <BadgeCheck size={16} className="text-primary" />
  <span>KYC Status</span>
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

          {/* KYC Details Card */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-black">
                KYC & Documents
              </h3>
              <Badge variant={(vendorData?.kyc?.[0]?.status || "pending").toLowerCase()}>
  {vendorData?.kyc?.[0]?.status || "Pending"}
</Badge>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div>
                  <p className="text-xs text-light font-medium">GST Number</p>
                  <p className="font-medium text-dark mt-0.5">************</p>
                </div>
                <span className="text-success font-semibold text-xs flex items-center gap-1">
                  ✓ Verified
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div>
                  <p className="text-xs text-light font-medium">PAN Number</p>
                  <p className="font-medium text-dark mt-0.5">************</p>
                </div>
                <span className="text-success font-semibold text-xs flex items-center gap-1">
                  ✓ Verified
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-light font-medium">Trade License</p>
                  <p className="font-medium text-dark mt-0.5">{vendorData?.kyc?.[0]?.tradeLicenseUrl
  ? "Uploaded"
  : "Not Uploaded"}</p>
                </div>
                <span className="text-success font-semibold text-xs flex items-center gap-1">
                  ✓ Verified
                </span>
              </div>
            </div>
          </Card>

          {/* Products Card */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-lg font-semibold text-black">
                  Products
                </h3>
                <p className="text-xs text-light mt-0.5">
                  Products listed by this vendor
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
      <div key={product.id}
        onClick={() => setSelectedProductId(product.id)}
        className="flex cursor-pointer items-center justify-between rounded-xl border border-border p-4 transition hover:bg-surface">

        <div>
          <h4 className="font-semibold text-dark">
            {product.name || product.model || "Unnamed Product"}
          </h4>

          <p className="text-sm text-light">
            {product.category?.name || "-"}
          </p>

          <p className="text-sm font-medium text-primary mt-1">
            AED {product.price || "-"}
          </p>
        </div>
        <div className="flex items-center gap-3">
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
  <Card className="mt-5 bg-surface p-5">

    <h4 className="font-semibold text-dark mb-3">
      Product Details
    </h4>

    <div className="space-y-2 text-sm">

      <p>
        <span className="text-light">
          Name:
        </span>{" "}
        {productDetails.data.name || "-"}
      </p>

      <p>
        <span className="text-light">
          Model:
        </span>{" "}
        {productDetails.data.model || "-"}
      </p>

      <p>
        <span className="text-light">
          Price:
        </span>{" "}
        AED {productDetails.data.price || "-"}
      </p>

      <p>
  <span className="text-light">
    Condition:
  </span>{" "}
  {productDetails.data.conditionGrade || "-"}
</p>

      <p>
        <span className="text-light">
          Status:
        </span>{" "}
        {productDetails.data.status || "-"}
      </p>

    </div>

  </Card>
)}
          </Card>

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