import React, { useMemo, useState } from "react";
import { 
  Users, 
  CheckCircle, 
  Ban, 
  AlertCircle, 
  Search, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight,
  Eye,
  Edit2,
  MessageSquare
} from 'lucide-react';
import {
  useVendors,
  useUpdateVendorStatus,
} from "../hooks/useVendors";

export default function VendorList() {

  const { data, isLoading, isError } = useVendors();

  const { mutate: updateStatus } = useUpdateVendorStatus();
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const vendors = data?.items || [];
  const filteredVendors = useMemo(() => {
  return vendors.filter((vendor) => {
    const storeName = vendor.storeName || "";
    const owner = vendor.user?.fullName || "";
    const email = vendor.user?.email || "";

    const matchesSearch =
      storeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTab = activeTab === "All"? true : (vendor.status || "").toLowerCase() === activeTab.toLowerCase();

    const matchesDropdown = statusFilter === "All" ? true : (vendor.status || "").toLowerCase() ===
      statusFilter.toLowerCase();

    return matchesSearch && matchesTab && matchesDropdown;
  });
}, [vendors, searchQuery, activeTab, statusFilter]);

const totalVendors = vendors.length;

const approvedVendors = vendors.filter(
  (v) => (v.status || "").toLowerCase() === "approved"
).length;

const suspendedVendors = vendors.filter(
  (v) => (v.status || "").toLowerCase() === "suspended"
).length;

const pendingVendors = vendors.filter(
  (v) => (v.status || "").toLowerCase() === "pending"
).length;

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

if (isLoading) {
  return (
    <div className="p-6">
      Loading vendors...
    </div>
  );
}

if (isError) {
  return (
    <div className="p-6 text-red-500">
      Failed to load vendors.
    </div>
  );
}

const getStatusBadgeClass = (status) => {
  switch ((status || "").toLowerCase()) {
    case "approved":
      return "bg-green-100 text-green-700 font-semibold px-3 py-1 rounded-full text-xs";

    case "pending":
      return "bg-amber-100 text-amber-600 font-semibold px-3 py-1 rounded-full text-xs";

    case "suspended":
      return "bg-orange-100 text-orange-700 font-semibold px-3 py-1 rounded-full text-xs";

    default:
      return "bg-gray-100 text-gray-700 font-semibold px-3 py-1 rounded-full text-xs";
  }
};

  return (
    <div className="p-8 bg-[#F8FAFC] min-h-screen font-sans antialiased text-slate-800">
      
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-[26px] font-bold text-slate-900 tracking-tight">Vendor List</h1>
      </div>

      {/* --- STATS CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {/* Total Vendors */}
        <div className="bg-white p-6 rounded-[20px] border border-slate-100 shadow-sm flex justify-between items-start">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Vendors</p>
            <h3 className="text-3xl font-bold text-slate-900 mt-1">
              {totalVendors}
            </h3>
            <p className="text-xs text-green-600 font-semibold mt-2 flex items-center gap-1">↑ 11 vs yesterday</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl text-slate-400">
            <Users size={22} className="stroke-[1.75]" />
          </div>
        </div>

        {/* Approved Vendors */}
        <div className="bg-white p-6 rounded-[20px] border border-slate-100 shadow-sm flex justify-between items-start">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Approved Vendors</p>
            <h3 className="text-3xl font-bold text-slate-900 mt-1">
              {approvedVendors}
            </h3>
            <p className="text-xs text-slate-400 font-medium mt-2">Approved vendors</p>
          </div>
          <div className="p-3 bg-emerald-50 rounded-xl text-emerald-500">
            <CheckCircle size={22} className="stroke-[1.75]" />
          </div>
        </div>

        {/* Suspended Vendors */}
        <div className="bg-white p-6 rounded-[20px] border border-slate-100 shadow-sm flex justify-between items-start">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Suspended Vendors</p>
            <h3 className="text-3xl font-bold text-slate-900 mt-1">
              {suspendedVendors}
            </h3>
            <p className="text-xs text-slate-400 font-medium mt-2">Suspended vendors</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl text-slate-400">
            <Ban size={22} className="stroke-[1.75]" />
          </div>
        </div>

        {/* Pending Vendors */}
        <div className="bg-white p-6 rounded-[20px] border border-slate-100 shadow-sm flex justify-between items-start">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Pending Vendors</p>
            <h3 className="text-3xl font-bold text-slate-900 mt-1">
              {pendingVendors}
            </h3>
            <p className="text-xs text-slate-400 font-medium mt-2">Pending vendors</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl text-slate-400">
            <AlertCircle size={22} className="stroke-[1.75]" />
          </div>
        </div>
      </div>

      {/* --- CONTROLS SECTION --- */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        {/* Status Pills Tabs */}
        <div className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/40">
          {['All', 'Approved', 'Suspended', 'Pending'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
                activeTab === tab
                  ? 'bg-[#E15A17] text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab === 'All' ? 'All' : tab}
            </button>
          ))}
        </div>

        {/* Search Input and Select Dropdowns */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <div className="relative flex-1 lg:flex-none">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Vendor name, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full lg:w-[280px] rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#E15A17] bg-white"
            />
          </div>
          
          <select value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 focus:outline-none focus:border-[#E15A17]">
              <option value="All">All Status</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
          </select>

          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Date Joined <ChevronDown size={14} className="text-slate-400" />
          </button>
        </div>
      </div>

      {/* --- MAIN DATA TABLE CONTAINER --- */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-[#F8FAFC] text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-4 px-6">Vendor</th>
                <th className="py-4 px-4">Owner</th>
                <th className="py-4 px-4">Email</th>
                <th className="py-4 px-4">Phone</th>
                <th className="py-4 px-4">Commission</th>
                <th className="py-4 px-4">Products</th>
                <th className="py-4 px-4 text-center">Status</th>
                <th className="py-4 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[13px] font-medium text-slate-700">
              {filteredVendors.map((vendor) => (
                <tr key={vendor.id} className="hover:bg-slate-50/40 transition-colors">
                  {/* Vendor Name & Circle Initial Badge */}
                  <td className="py-3.5 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-orange-50 text-[#E15A17] flex items-center justify-center font-bold text-xs uppercase border border-orange-100">
                        {vendor.user?.fullName
                          ?.split(" ")
                          .map((word) => word[0])
                          .join("")
                          .slice(0, 2) || "NA"}
                      </div>
                      <span className="text-slate-900 font-bold">{vendor.storeName}</span>
                    </div>
                  </td>
                  
                  {/* Clean Owner Column */}
                  <td className="py-3.5 px-4 text-slate-800 font-semibold">{vendor.user?.fullName?.split(" ").map((word) => word[0]).join("").slice(0, 2) || "NA"}
                  </td>
                  
                  {/* Clean Email Column */}
                  <td className="py-3.5 px-4 text-slate-500 font-normal">{vendor.user?.email || "-"}</td>
                  
                  {/* Phone Column */}
                  <td className="py-3.5 px-4 text-slate-500 font-normal">{vendor.user?.phone || "-"}</td>
                  
                  {/* Commission */}
                  <td className="py-3.5 px-4 font-semibold text-slate-800">{vendor.commissionRate}%</td>
                  
                  {/* Products Total */}
                  <td className="py-3.5 px-4 font-semibold text-slate-800">{vendor._count?.products || 0}</td>
                  
                  {/* Visual Status Pills */}
                  <td className="py-3.5 px-4 text-center">
                    <span className={`inline-block ${getStatusBadgeClass(vendor.status)}`}>
                      {vendor.status}
                    </span>
                  </td>
                  
                  {/* Target Redesign Actions Container */}
                  <td className="py-3.5 px-6">
                    <div className="flex items-center justify-center gap-1.5">
                      {/* Conditional disabled styling based on design template */}
                      <button
                        onClick={() => handleApprove(vendor.id)}
                        disabled={(vendor.status || "").toLowerCase() === "approved"}
                        className={`px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all ${
                          (vendor.status || "").toLowerCase() === "approved"
                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                            : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                        }`}
                      >
                        Approve
                      </button>
                      
                      <button
                        onClick={() => handleReject(vendor.id)}
                        disabled={(vendor.status || "").toLowerCase() === "suspended"}
                        className={`px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all ${
                        (vendor.status || "").toLowerCase() === "suspended"
                        ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                        : "bg-rose-600 hover:bg-rose-700 text-white shadow-sm"
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

        {/* --- PAGINATION CONTROLS --- */}
        <div className="border-t border-slate-100 px-6 py-4 flex items-center justify-between text-slate-400 text-xs font-semibold">
          <div>
            Showing <span className="text-slate-700 font-bold">{" "}{filteredVendors.length}</span>{" "}of{" "}
                    <span className="text-slate-700 font-bold">{totalVendors}</span>{" "}vendors
          </div>
          
          <div className="flex items-center gap-1">
            <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-400">
              <ChevronsLeft size={14} />
            </button>
            <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-400">
              <ChevronLeft size={14} />
            </button>
            
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#E15A17] text-white font-bold shadow-sm">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600">
              2
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600">
              3
            </button>
            
            <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600">
              <ChevronRight size={14} />
            </button>
            <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600">
              <ChevronsRight size={14} />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}