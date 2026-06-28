import React, { useMemo, useState } from "react";

import {
  Users,
  CheckCircle,
  AlertTriangle,
  Clock,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import {
  useVendors,
  useUpdateVendorStatus,
} from "../hooks/useVendors";

export default function VendorList() {
  const { data, isLoading, isError } = useVendors();

  const { mutate: updateStatus } =
    useUpdateVendorStatus();

  const [activeTab, setActiveTab] =
    useState("All");

  const [searchQuery, setSearchQuery] =
    useState("");
  
  const vendors = data?.items || [];

  const handleApprove = (id) => {
    updateStatus({
      id,
      status: "approved",
    });
  };

  const handleReject = (id) => {
    updateStatus({
      id,
      status: "suspended",
    });
  };

  const getStatusBadgeClass = (status) => {
    switch ((status || "").toLowerCase()) {
      case "approved":
        return "bg-green-50 text-green-700 border border-green-200";

      case "pending":
        return "bg-amber-50 text-amber-700 border border-amber-200";

      case "suspended":
        return "bg-orange-50 text-orange-700 border border-orange-200";

      default:
        return "bg-gray-50 text-gray-700 border border-gray-200";
    }
  };

  const filteredVendors = useMemo(() => {
    return vendors.filter((vendor) => {
      const storeName =
        vendor.storeName || "";

      const owner =
        vendor.user?.fullName || "";

      const email =
        vendor.user?.email || "";

      const matchesSearch =
        storeName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        owner
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        email
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      const matchesStatus =
        activeTab === "All"
          ? true
          : (vendor.status || "").toLowerCase() ===
            activeTab.toLowerCase();

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [vendors, searchQuery, activeTab]);

  const totalVendors =
    vendors.length;

  const approvedVendors =
    vendors.filter(
      (v) =>
        (v.status || "").toLowerCase() ===
        "approved"
    ).length;

  const pendingVendors =
    vendors.filter(
      (v) =>
        (v.status || "").toLowerCase() ===
        "pending"
    ).length;

  const suspendedVendors =
    vendors.filter(
      (v) =>
        (v.status || "").toLowerCase() ===
        "suspended"
    ).length;

  if (isLoading) {
  return (
    <div className="p-6 text-blue-600">
      Loading...
    </div>
  );
}

if (isError) {
  console.log("Vendor API Error:", data);

  return (
    <div className="p-6 text-red-600">
      Vendor API Error
    </div>
  );
}

  return (
    <div className="p-6 bg-slate-50 min-h-screen font-sans text-slate-800">

      {/* Page Heading */}

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">
          Vendor List
        </h1>

        <p className="text-sm text-slate-500 mt-1">
          Manage, review and monitor all vendors
          across the platform.
        </p>
      </div>
            {/* --- STATS CARDS --- */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">

        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex justify-between items-start">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase">
              Total Vendors
            </p>

            <h3 className="text-2xl font-bold mt-1">
              {totalVendors}
            </h3>

            <p className="text-xs text-slate-500 mt-2">
              Registered vendors
            </p>
          </div>

          <div className="p-2.5 bg-slate-50 rounded-lg">
            <Users size={20} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex justify-between items-start">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase">
              Approved
            </p>

            <h3 className="text-2xl font-bold mt-1">
              {approvedVendors}
            </h3>

            <p className="text-xs text-slate-500 mt-2">
              Approved vendors
            </p>
          </div>

          <div className="p-2.5 bg-green-50 rounded-lg text-green-600">
            <CheckCircle size={20} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex justify-between items-start">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase">
              Suspended
            </p>

            <h3 className="text-2xl font-bold mt-1">
              {suspendedVendors}
            </h3>

            <p className="text-xs text-slate-500 mt-2">
              Suspended vendors
            </p>
          </div>

          <div className="p-2.5 bg-orange-50 rounded-lg text-orange-600">
            <AlertTriangle size={20} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex justify-between items-start">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase">
              Pending
            </p>

            <h3 className="text-2xl font-bold mt-1">
              {pendingVendors}
            </h3>

            <p className="text-xs text-slate-500 mt-2">
              Pending vendors
            </p>
          </div>

          <div className="p-2.5 bg-amber-50 rounded-lg text-amber-600">
            <Clock size={20} />
          </div>
        </div>

      </div>

      {/* --- FILTERS --- */}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5">

        <div className="flex bg-slate-100 p-1 rounded-xl">

          {["All", "Approved", "Suspended", "Pending"].map((tab) => (

            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm transition ${
                activeTab === tab
                  ? "bg-[#E15A17] text-white"
                  : "text-slate-600"
              }`}
            >
              {tab}
            </button>

          ))}

        </div>

        <div className="relative w-full sm:w-72">

          <Search
            size={16}
            className="absolute left-3 top-3 text-slate-400"
          />

          <input
            value={searchQuery}
            onChange={(e) =>
              setSearchQuery(e.target.value)
            }
            placeholder="Search vendor..."
            className="w-full pl-9 pr-4 py-2 border rounded-xl focus:outline-none focus:border-[#E15A17]"
          />

        </div>

      </div>

      {/* --- TABLE --- */}

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="bg-slate-50 border-b">

                <th className="px-6 py-4 text-left">
                  Vendor
                </th>

                <th className="px-4 py-4 text-left">
                  Owner
                </th>

                <th className="px-4 py-4 text-left">
                  Email
                </th>

                <th className="px-4 py-4 text-left">
                  Phone
                </th>

                <th className="px-4 py-4 text-left">
                  Commission
                </th>

                <th className="px-4 py-4 text-left">
                  Products
                </th>

                <th className="px-4 py-4 text-center">
                  Status
                </th>

                <th className="px-6 py-4 text-center">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>
                          {filteredVendors.map((vendor) => (
                <tr
                  key={vendor.id}
                  className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                >
                  {/* Vendor */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-xs uppercase">
                        {vendor.user?.fullName
                          ?.split(" ")
                          .map((word) => word[0])
                          .join("")
                          .slice(0, 2) || "NA"}
                      </div>

                      <div>
                        <p className="font-semibold text-slate-900">
                          {vendor.storeName}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Owner */}
                  <td className="px-4 py-4">
                    {vendor.user?.fullName || "-"}
                  </td>

                  {/* Email */}
                  <td className="px-4 py-4">
                    {vendor.user?.email || "-"}
                  </td>

                  {/* Phone */}
                  <td className="px-4 py-4">
                    {vendor.user?.phone || "-"}
                  </td>

                  {/* Commission */}
                  <td className="px-4 py-4">
                    {vendor.commissionRate}%
                  </td>

                  {/* Products */}
                  <td className="px-4 py-4">
                    {vendor._count?.products || 0}
                  </td>

                  {/* Status */}
                  <td className="px-4 py-4 text-center">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(
                        vendor.status
                      )}`}
                    >
                      {vendor.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">

                      <button
                        onClick={() =>
                          handleApprove(vendor.id)
                        }
                        disabled={
                          (vendor.status || "").toLowerCase() ===
                          "approved"
                        }
                        className={`px-3 py-1 rounded text-xs font-bold transition ${
                          (vendor.status || "").toLowerCase() ===
                          "approved"
                            ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700 text-white"
                        }`}
                      >
                        Approve
                      </button>

                      <button
                        onClick={() =>
                          handleReject(vendor.id)
                        }
                        disabled={
                          (vendor.status || "").toLowerCase() ===
                          "suspended"
                        }
                        className={`px-3 py-1 rounded text-xs font-bold transition ${
                          (vendor.status || "").toLowerCase() ===
                          "suspended"
                            ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                            : "bg-red-600 hover:bg-red-700 text-white"
                        }`}
                      >
                        Reject
                      </button>

                    </div>
                  </td>

                </tr>
              ))}
                          </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="border-t border-slate-100 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">

          <div className="text-slate-500">
            Showing
            <span className="font-semibold text-slate-800">
              {" "}
              {filteredVendors.length}
            </span>{" "}
            of
            <span className="font-semibold text-slate-800">
              {" "}
              {totalVendors}
            </span>{" "}
            vendors
          </div>

          <div className="flex items-center gap-2">

            <button className="p-2 border rounded-md hover:bg-slate-50">
              <ChevronsLeft size={16} />
            </button>

            <button className="p-2 border rounded-md hover:bg-slate-50">
              <ChevronLeft size={16} />
            </button>

            <button className="w-8 h-8 rounded-md bg-[#E15A17] text-white">
              1
            </button>

            <button className="p-2 border rounded-md hover:bg-slate-50">
              <ChevronRight size={16} />
            </button>

            <button className="p-2 border rounded-md hover:bg-slate-50">
              <ChevronsRight size={16} />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}
