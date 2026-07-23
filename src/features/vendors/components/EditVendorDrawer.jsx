import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useUpdateVendor } from "../hooks/useVendors";

export default function EditVendorDrawer({
  open,
  onClose,
  vendor,
})
 {
  const [formData, setFormData] = useState({
  storeName: "",
  storeAddress: "",
  commissionRate: "",
});

const { mutate: updateVendor, isPending } = useUpdateVendor();
useEffect(() => {
  if (vendor) {
    setFormData({
      storeName: vendor.storeName || "",
      storeAddress: vendor.storeAddress || "",
      commissionRate: vendor.commissionRate || "",
    });
  }
}, [vendor]);
  if (!open) return null;

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
              Edit Vendor
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Update vendor profile and business information
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

        {/* Navigation Tabs (Static or disabled for edit state styling consistency) */}
        <div className="bg-white border-b border-gray-200 px-6 flex gap-6 overflow-x-auto shrink-0">
          <div className="py-3 text-sm font-medium text-[#ff5500] border-b-2 border-[#ff5500] whitespace-nowrap cursor-pointer">
            Profile & Edit
          </div>
          <div className="py-3 text-sm font-medium text-gray-400 border-b-2 border-transparent whitespace-nowrap cursor-not-allowed">
            KYC & Documents
          </div>
          <div className="py-3 text-sm font-medium text-gray-400 border-b-2 border-transparent whitespace-nowrap cursor-not-allowed">
            Products & Listings
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 flex-1">

          {/* Profile Form Card */}
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            {/* Top Section */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-400 px-6 py-2">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-xl font-bold text-orange-600 shadow-md">
                  {vendor?.storeName?.charAt(0)?.toUpperCase() || "V"}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {vendor?.storeName || "Tech Galaxy Store"}
                  </h3>
                  <p className="text-orange-100 text-sm">
                    Modify vendor core configurations
                  </p>
                </div>
              </div>
            </div>

            {/* Form Inputs Section */}
            <div className="p-6 space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Store Name
                </label>
                <input
                  type="text"
                  value={formData.storeName}
onChange={(e) =>
  setFormData({
    ...formData,
    storeName: e.target.value,
  })
}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-3.5 py-2.5 text-sm text-gray-900 focus:bg-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
  Store Address
</label>

<input
  type="text"
  value={formData.storeAddress}
onChange={(e) =>
  setFormData({
    ...formData,
    storeAddress: e.target.value,
  })
}
  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-3.5 py-2.5 text-sm text-gray-900 focus:bg-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition"
/>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
  Commission Rate (%)
</label>

<input
  type="number"
  value={formData.commissionRate}
onChange={(e) =>
  setFormData({
    ...formData,
    commissionRate: e.target.value,
  })
}
  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-3.5 py-2.5 text-sm text-gray-900 focus:bg-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition"
/>
              </div>

              <div>
                
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <span className="text-gray-500 font-medium">Status</span>
                <span className="rounded-full bg-green-50 px-3 py-0.5 text-xs font-semibold text-green-700 capitalize">
                  {vendor?.status || "Approved"}
                </span>
              </div>
            </div>
          </div>

          {/* KYC Details Card (Read-only consistency) */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-semibold text-gray-900">
                KYC Details
              </h3>
              <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                Verified
              </span>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div>
                  <p className="text-xs text-gray-500 font-medium">GST Number</p>
                  <p className="font-medium text-gray-900 mt-0.5">************</p>
                </div>
                <span className="text-green-600 font-semibold text-xs">✓ Verified</span>
              </div>

              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div>
                  <p className="text-xs text-gray-500 font-medium">PAN Number</p>
                  <p className="font-medium text-gray-900 mt-0.5">************</p>
                </div>
                <span className="text-green-600 font-semibold text-xs">✓ Verified</span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 font-medium">Trade License</p>
                  <p className="font-medium text-gray-900 mt-0.5">Uploaded</p>
                </div>
                <span className="text-green-600 font-semibold text-xs">✓ Verified</span>
              </div>
            </div>
          </div>

          {/* Action Footer Button Group */}
          <div className="flex items-center justify-end gap-3 pt-2 pb-6">
            <button
              onClick={onClose}
              className="rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition shadow-sm"
            >
              Cancel
            </button>
            <button
              disabled={isPending}
              onClick={() => {
  updateVendor(
    {
      id: vendor.id,
      payload: {
        storeName: formData.storeName,
        storeAddress: formData.storeAddress,
        commissionRate: Number(formData.commissionRate),
      },
    },
    {
      onSuccess: () => {
        alert("Vendor updated successfully!");
        onClose();
      },
      onError: (error) => {
        console.error(error);
        alert("Failed to update vendor.");
      },
    }
  );
}}
              className="rounded-xl bg-[#ff5500] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#e04c00] transition shadow-sm"
            >
              {isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>

        </div>

      </div>
    </>
  );
}