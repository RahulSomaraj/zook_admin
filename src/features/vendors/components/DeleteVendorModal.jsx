import React from "react";
import { AlertTriangle, X } from "lucide-react";

export default function DeleteVendorModal({
  open,
  onClose,
  vendor,
  onDelete,
}) {
  if (!open) return null;

  return (
    <>
      {/* Background Overlay */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl border border-gray-100 overflow-hidden transform transition-all">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600 border border-red-100">
                <AlertTriangle size={20} />
              </div>
              <h2 className="text-base font-semibold text-gray-900">
                Delete Vendor
              </h2>
            </div>

            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 bg-transparent text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition"
              aria-label="Close modal"
            >
              <X size={16} />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 space-y-3">
            <p className="text-sm text-gray-600 leading-relaxed">
              Are you sure you want to archive{" "}
              <strong className="font-semibold text-gray-900">
                {vendor?.storeName || "this vendor"}
              </strong>
              ?
            </p>
            <p className="text-xs text-gray-500 leading-normal">
              This action will temporarily deactivate the storefront, listings, and active dashboard permissions. You can restore this account later from your archive logs.
            </p>
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-end gap-3 bg-gray-50/75 border-t border-gray-100 px-6 py-4">
            <button
              onClick={onClose}
              className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition shadow-sm"
            >
              Cancel
            </button>

            <button
              onClick={onDelete}
              className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700 transition shadow-sm"
            >
              Yes, Delete
            </button>
          </div>

        </div>
      </div>
    </>
  );
}