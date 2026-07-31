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
  Bell,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";
import {
  useVendors,
  useUpdateVendorStatus,
  useDeleteVendor,
} from "../hooks/useVendors";
import Badge from "../../../components/ui/Badge";
import ViewVendorDrawer from "./ViewVendorDrawer";
import EditVendorDrawer from "./EditVendorDrawer";
import DeleteVendorModal from "./DeleteVendorModal";
import { useNavigate } from "react-router-dom";

export default function VendorList() {
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [vendorToDelete, setVendorToDelete] = useState(null);

  const { data, isLoading, isError } = useVendors();
  const { mutate: updateStatus } = useUpdateVendorStatus();
  
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const navigate = useNavigate();
  const deleteVendor = useDeleteVendor();

  const vendors = data?.items || [];

  // Filter Logic
  const filteredVendors = useMemo(() => {
    return vendors.filter((vendor) => {
      const storeName = vendor.storeName || "";
      const owner = vendor.user?.fullName || "";
      const email = vendor.user?.email || "";

      const matchesSearch =
        storeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
        email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTab = activeTab === "All" 
        ? true 
        : (vendor.status || "").toLowerCase() === activeTab.toLowerCase();

      const matchesDropdown = statusFilter === "All" 
        ? true 
        : (vendor.status || "").toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesTab && matchesDropdown;
    });
  }, [vendors, searchQuery, activeTab, statusFilter]);

  // Stat Counters
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

  // Status Action Triggers
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


  // Safe Guard Condition Rendering placed correctly
  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen text-mid font-medium">
        Loading vendors...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen text-rose-500 font-semibold">
        Failed to load vendors. Please check backend response or hooks.
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFC] min-h-screen font-sans antialiased text-dark">
      
      {/* --- INTEGRATED PROFILE HEADER ZONE --- */}
      <div className="flex justify-between items-center p-8 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-black">
  Vendor List
</h1>

<p className="mt-1 text-[15px] text-light">
  {pendingVendors} vendors pending verification
</p>
        </div>
        
        {/* Top Right Corner Profile Actions */}
        <div className="flex items-center gap-4">
          {/* Notification Bell Badge Wrapper */}
           <button className="relative flex h-10 w-10 items-center justify-center rounded-md border border-border bg-white text-dark transition hover:bg-surface">
                  🔔
                  <span className="absolute top-[6px] right-[6px] w-[7px] h-[7px] bg-[#FF4500] rounded-full border-[1.5px] border-white" />
            </button>
             <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                  ZA
              </div>
        </div>
      </div>

      <div className="p-8 pt-2">
        {/* --- STATS CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Pending Vendors */}
          <div className="flex items-start justify-between rounded-xl border border-border bg-white p-6 shadow-card transition-all hover:shadow-hover">
            <div>
              <p className="text-[11px] font-bold text-light uppercase tracking-wider">Pending Vendors</p>
              <h3 className="text-3xl font-bold text-black mt-1">{pendingVendors}</h3>
              <p className="text-xs text-green-600 font-semibold mt-2 flex items-center">Awaiting approval</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl text-light">
              <AlertCircle size={22} className="stroke-[1.75]" />
            </div>
          </div>
          {/* Approved Vendors */}
          <div className="flex items-start justify-between rounded-xl border border-border bg-white p-6 shadow-card transition-all hover:shadow-hover">
            <div>
              <p className="text-[11px] font-bold text-light uppercase tracking-wider">Approved Vendors</p>
              <h3 className="text-3xl font-bold text-black mt-1">{approvedVendors}</h3>
              <p className="text-xs text-green-600 font-semibold mt-2 flex items-center">Active stores</p>
            </div>
            <div className="p-3 bg-emerald-50 rounded-xl text-emerald-500">
              <CheckCircle size={22} className="stroke-[1.75]" />
            </div>
          </div>
          {/* Suspended Vendors */}
          <div className="flex items-start justify-between rounded-xl border border-border bg-white p-6 shadow-card transition-all hover:shadow-hover">
            <div>
              <p className="text-[11px] font-bold text-light uppercase tracking-wider">Suspended Vendors</p>
              <h3 className="text-3xl font-bold text-black mt-1">{suspendedVendors}</h3>
              <p className="text-xs text-green-600 font-semibold mt-2 flex items-center">Access restricted</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl text-light">
              <Ban size={22} className="stroke-[1.75]" />
            </div>
          </div>
          {/* Total Vendors */}
          <div className="flex items-start justify-between rounded-xl border border-border bg-white p-6 shadow-card transition-all hover:shadow-hover">
            <div>
              <p className="text-[11px] font-bold text-light uppercase tracking-wider">Total Vendors</p>
              <h3 className="text-3xl font-bold text-black mt-1">{totalVendors}</h3>
              <p className="text-xs text-green-600 font-semibold mt-2 flex items-center gap-1">↑ 11 vs yesterday</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl text-light">
              <Users size={22} className="stroke-[1.75]" />
            </div>
          </div>
        </div>

        {/* --- CONTROLS SECTION --- */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          {/* Status Pills Tabs */}
          <div className="flex items-center gap-1 rounded-xl border border-border bg-white p-1 shadow-card">
            {['All', 'Approved', 'Suspended', 'Pending'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-lg px-5 py-2 text-[15px] font-semibold transition-all duration-200 ${
  activeTab === tab
    ? "bg-primary text-white shadow-primary"
    : "text-mid hover:bg-primary-pale hover:text-primary"
}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search Input and Select Dropdowns */}
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:flex-none">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-light" size={16} />
              <input
                type="text"
                placeholder="Vendor name, email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-border bg-white py-3 pl-10 pr-4 text-[15px] text-dark placeholder:text-light focus:border-primary focus:outline-none"
              />
            </div>
            
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-white border-border rounded-xl text-sm font-semibold text-dark focus:outline-none focus:border-primary appearance-none pr-8 relative cursor-pointer"
              style={{ backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%2394a3b8\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '14px' }}
            >
              <option value="All">Status</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
            </select>

            <button className="flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-3 text-[15px] font-semibold text-dark transition hover:bg-surface">
              Date Joined <ChevronDown size={14} className="text-light" />
            </button>
          </div>
        </div>

        {/* --- MAIN DATA TABLE CONTAINER --- */}
        <div className="overflow-hidden rounded-xl border border-border bg-white shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-surface text-[11px] font-bold uppercase tracking-[0.08em] text-light">
                  <th className="py-4 px-6">Vendor</th>
                  <th className="py-4 px-4">Owner</th>
                  <th className="py-4 px-4">Email</th>
                  <th className="py-4 px-4">Phone</th>
                  <th className="py-4 px-4">Commission</th>
                  <th className="py-4 px-4">Delivery Fee</th>
                  <th className="py-4 px-4">Products</th>
                  <th className="py-4 px-4 text-center">KYC Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-[13px] text-dark">
                {filteredVendors.map((vendor) => (
                  <tr key={vendor.id}
                    onClick={() => {
                      navigate(`/vendors/${vendor.id}`);
                      }}
                      className="cursor-pointer transition-colors duration-200 hover:bg-primary-pale/40">
                    {/* Vendor Name & Circle Initial Badge */}
                    <td className="py-3.5 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary-pale text-primary flex items-center justify-center font-bold text-xs uppercase border border-primary/10">
                          {vendor.user?.fullName
                            ? vendor.user.fullName.split(" ").map((w) => w[0]).join("").slice(0, 2)
                            : "NA"}
                        </div>
                        <span className="text-black font-bold">{vendor.storeName || "-"}</span>
                      </div>
                    </td>
                    
                    {/* Clean Owner Column */}
                    <td className="py-3.5 px-4 text-dark font-semibold">
                      {vendor.user?.fullName || "-"}
                    </td>
                    
                    {/* Clean Email Column */}
                    <td className="py-3.5 px-4 text-mid font-normal">{vendor.user?.email || "-"}</td>
                    
                    {/* Phone Column */}
                    <td className="py-3.5 px-4 text-mid font-normal">{vendor.user?.phone || "-"}</td>
                    
                    {/* Commission */}
                    <td className="py-3.5 px-4 font-semibold text-dark">
                      {vendor.commissionRate !== undefined ? `${vendor.commissionRate}%` : "-"}
                    </td>
                    {/* Delivery Fee */}
                    <td className="py-3.5 px-4 font-semibold text-dark">
                      AED 50
                    </td>
                    
                    {/* Products Total */}
                    <td className="py-3.5 px-4 font-semibold text-dark">{vendor._count?.products || 0}</td>
                    
                    {/* Visual Status Pills */}
                    <td className="py-3.5 px-4 text-center">
                      <Badge variant={(vendor.status || "pending").toLowerCase()}>
  {vendor.status || "Pending"}
</Badge>
                    </td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* --- PAGINATION CONTROLS --- */}
          <div className="border-t border-slate-100 px-6 py-4 flex items-center justify-between text-light text-xs font-semibold">
            <div>
              Showing <span className="text-dark font-bold">{filteredVendors.length}</span> of{" "}
              <span className="text-dark font-bold">{totalVendors}</span> vendors
            </div>
            
            <div className="flex items-center gap-1">
              <button className="p-2 border border-border rounded-lg hover:bg-slate-50 text-light">
                <ChevronsLeft size={14} />
              </button>
              <button className="p-2 border border-border rounded-lg hover:bg-slate-50 text-light">
                <ChevronLeft size={14} />
              </button>
              
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-white font-bold shadow-card">
                1
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-border hover:bg-slate-50 text-slate-600">
                2
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-border hover:bg-slate-50 text-slate-600">
                3
              </button>
              
              <button className="p-2 border border-border rounded-lg hover:bg-slate-50 text-slate-600">
                <ChevronRight size={14} />
              </button>
              <button className="p-2 border border-border rounded-lg hover:bg-slate-50 text-slate-600">
                <ChevronsRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <EditVendorDrawer
        open={editOpen}
        onClose={() => setEditOpen(false)}
        vendor={selectedVendor}/>
      <DeleteVendorModal
        open={deleteOpen}
        vendor={vendorToDelete}
        onClose={() => setDeleteOpen(false)}
        onDelete={() => {
          console.log("Delete Vendor:", vendorToDelete?.id);
        setDeleteOpen(false);
        }}/>
    </div>
  );
}