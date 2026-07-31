import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import {
  useVendorKycList,
  useApproveVendorKyc,
  useRejectVendorKyc,
  useActivateVendor,
} from "../features/vendors/hooks/useVendors";

// ─── Dummy Data ───────────────────────────────────────────────────────────────
const REJECTION_REASONS = [
  "Trade license expired",
  "Document unclear / unreadable",
  "Name mismatch",
  "Invalid license number",
  "Missing Emirates ID",
];

// ─── Helpers ──────────────────────────────────────────────────────────────────


function DetailRow({ label, value }) {
  const isObj = value !== null && typeof value === "object";
  const display = isObj ? value.value : value;
  const cls = isObj && value.ok
    ? "text-[#22C55E] font-bold"
    : isObj && value.warn
    ? "text-[#F59E0B] font-bold"
    : "font-bold text-[#333]";
  const monoClass = isObj && value.mono ? "font-mono" : "";

  return (
    <div className="flex justify-between items-baseline py-[7px] border-b border-[#EBEBEB] last:border-b-0 text-[13px]">
      <span className="text-[#666]">{label}</span>
      <span className={`${cls} ${monoClass}`}>{display}</span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function KycReview() {
  const { data, isLoading, error } = useVendorKycList();

  const { mutate: approveKyc } = useApproveVendorKyc();
  const { mutate: rejectKyc } = useRejectVendorKyc();
  const { mutate: activateVendor } = useActivateVendor();

  console.log("FIRST KYC ITEM:", data?.items?.[0]);
  console.log("KYC DATA:", data);
  console.log("KYC ITEMS:", data?.items);

  const [activeId, setActiveId] = useState(null);
  const [search, setSearch] = useState("");
  const [note, setNote] = useState("");
  const [selectedReason, setSelectedReason] = useState(null);

  const handleApprove = () => {
  approveKyc(activeId);
  };

  const handleApproveStore = () => {
    console.log("Vendor ID:", vendor.vendor.id);
    activateVendor(vendor.vendor.id);
  };

  const handleReject = () => {
    rejectKyc({
      id: activeId,
      reason: note || selectedReason || "Rejected by admin",
    });
  };
  const handlePrevious = () => {
  const currentIndex = filtered.findIndex(
    (item) => item.id === activeId
  );

  if (currentIndex > 0) {
    setActiveId(filtered[currentIndex - 1].id);
    setNote("");
    setSelectedReason(null);
    }
  };

  const kycItems = data?.items || [];

  const filtered = kycItems.filter((item) =>
    (item.vendor?.storeName || "")
      .toLowerCase()
      .includes(search.toLowerCase())
    );

  useEffect(() => {
    if (kycItems.length === 0) {
      setActiveId(null);
      return;
    }

    const exists = kycItems.some(item => item.id === activeId);

    if (!exists) {
      setActiveId(kycItems[0].id);
    }
  }, [kycItems, activeId]);

  const vendor = kycItems.find((item) => item.id === activeId);
  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  if (error) {
    return <div className="p-6">Something went wrong.</div>;
  }

  if (!vendor) {
  return (
    <div className="flex flex-1 overflow-hidden bg-[#F7F7F5]">
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <header className="h-[60px] bg-white border-b border-[#EBEBEB] flex items-center px-7 gap-3.5 flex-shrink-0">
           <div className="text-[18px] font-extrabold text-[#0A0A0A]">KYC Review</div>
           <div className="text-[13px] text-[#999]">0 applications pending</div>
           <div className="flex items-center gap-2 ml-auto">
               <button className="w-9 h-9 rounded-[10px] flex items-center justify-center bg-white border border-[#EBEBEB] text-base cursor-pointer relative hover:bg-[#F7F7F5] transition">
                  🔔
                  <span className="absolute top-[6px] right-[6px] w-[7px] h-[7px] bg-[#FF4500] rounded-full border-[1.5px] border-white" />
               </button>
                 <div className="w-9 h-9 rounded-full bg-[#FF4500] flex items-center justify-center text-[13px] font-bold text-white cursor-pointer flex-shrink-0">
                  ZA
                </div>
          </div>
</header>
        <div className="flex-1 flex items-center justify-center h-full min-h-[calc(100vh-60px)]">
          <div className="text-center">
            <div className="w-[72px] h-[72px] rounded-full bg-[#F0FDF4] border-2 border-[#22C55E] flex items-center justify-center mx-auto mb-5">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div className="text-[18px] font-extrabold text-[#0A0A0A] mb-2">All caught up!</div>
            <div className="text-[13px] text-[#999] max-w-[240px] mx-auto leading-relaxed">
              No pending KYC applications at the moment. New submissions will appear here.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

  return (
    <div className="flex flex-1 overflow-hidden bg-[#F7F7F5]">
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">

        {/* ── Topbar ── */}
        <header className="h-[60px] bg-white border-b border-[#EBEBEB] flex items-center px-7 gap-3.5 flex-shrink-0">
          <div className="text-[18px] font-extrabold text-[#0A0A0A]">KYC Review</div>
          <div className="text-[13px] text-[#999]">
          {kycItems.length} applications pending
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <button className="w-9 h-9 rounded-[10px] flex items-center justify-center bg-white border border-[#EBEBEB] text-base cursor-pointer relative hover:bg-[#F7F7F5] transition">
              🔔
              <span className="absolute top-[6px] right-[6px] w-[7px] h-[7px] bg-[#FF4500] rounded-full border-[1.5px] border-white" />
            </button>
            <div className="w-9 h-9 rounded-full bg-[#FF4500] flex items-center justify-center text-[13px] font-bold text-white cursor-pointer flex-shrink-0">
              ZA
            </div>
          </div>
        </header>

        {/* ── Content ── */}
        <div className="flex flex-col lg:flex-row flex-1 overflow-y-auto lg:overflow-hidden">

          {/* ── Queue Panel ── */}
          <div className="w-full lg:w-[320px] lg:min-w-[320px] max-h-[60vh] lg:max-h-none border-r border-[#EBEBEB] bg-white flex flex-col overflow-hidden lg:flex-shrink-0">
            {/* Queue Header */}
            <div className="px-[18px] py-4 border-b border-[#EBEBEB] flex-shrink-0">
              <div className="text-[14px] font-extrabold text-[#0A0A0A] mb-2.5">Pending Applications</div>
              <div className="relative">
                <Search size={13} className="absolute left-[11px] top-1/2 -translate-y-1/2 text-[#999] pointer-events-none" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search vendor..."
                  className="w-full py-2 pl-[30px] pr-3 text-[13px] text-[#333] bg-[#F7F7F5] border border-[#EBEBEB] rounded-full outline-none focus:border-[#FF4500] focus:bg-white transition"
                />
              </div>
            </div>

            {/* Queue List */}
            <div className="flex-1 overflow-y-auto">
              {filtered.map((q) => {
                const isActive = activeId === q.id;
                return (
                  <div
                    key={q.id}
                    onClick={() => { setActiveId(q.id); setNote(""); setSelectedReason(null); }}
                    className={`flex items-start gap-3 px-[18px] py-3.5 border-b border-[#EBEBEB] cursor-pointer transition-colors relative
                      ${isActive
                        ? "bg-[#FFF0EB] border-l-[3px] border-l-[#FF4500]"
                        : "hover:bg-[#F7F7F5] border-l-[3px] border-l-transparent"
                      }`}
                  >
                    <div
                      className="w-[38px] h-[38px] rounded-[6px] flex items-center justify-center text-[14px] font-extrabold text-white flex-shrink-0"
                      style={{ backgroundColor: "#7C3AED" }}
                    >
                      {(q.vendor?.storeName || "")
                        .split(" ")
                        .map(word => word[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-bold text-[#0A0A0A] truncate">{q.vendor?.storeName || "N/A"}</div>
                      <div className="text-[11px] text-orange-500 font-bold mt-1">
                        {q.status || "Pending"}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Detail Panel ── */}
          <div className="flex-1 overflow-y-auto px-8 py-7 bg-[#F7F7F5]">

            {/* Detail Header */}
            <div className="flex items-start justify-between mb-[22px]">
              <div>
                <h2 className="text-[22px] font-extrabold text-[#0A0A0A] mb-1">{vendor?.vendor?.storeName}</h2>
                <p className="text-[13px] text-[#666]">{vendor.vendor?.user?.fullName || "N/A"}</p>
              </div>
              <div className="flex gap-2.5 flex-shrink-0">
                <button onClick={handlePrevious}
                  className="inline-flex items-center gap-1.5 ..."> ← Previous
                </button>
                <button onClick={handleReject}
                  className="inline-flex items-center gap-1.5 font-bold text-[13px] rounded-full bg-[#EF4444] text-white px-5 py-2.5 hover:bg-[#DC2626] transition whitespace-nowrap">
                  ✕ Reject
                </button>
                <button onClick={handleApprove}
                  className="inline-flex items-center gap-1.5 font-bold text-[13px] rounded-full bg-[#22C55E] text-white px-5 py-2.5 hover:bg-[#16A34A] transition shadow-[0_3px_10px_rgba(34,197,94,0.25)] whitespace-nowrap">
                  ✓ Approve
                </button>
              </div>
            </div>

            {/* DED Verify Banner */}
            <div className="bg-[#EFF6FF] border border-[rgba(59,130,246,0.2)] rounded-[10px] px-4 py-3 flex items-center gap-3 text-[13px] text-[#1D4ED8] mb-4">
              <span>🔗</span>
              <span>Verify trade license{" "}<strong>{vendor?.tradeLicenseNumber || "N/A"}</strong>{" "}
                  on the DED portal before approving
              </span>

              <button className="ml-auto bg-[#3B82F6] text-white border-none rounded-full px-3.5 py-1.5 text-[12px] font-bold cursor-pointer hover:bg-[#2563EB] transition whitespace-nowrap">
                Open DED Portal →
              </button>
            </div>

            {/* Store + License Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
              {/* Store Info */}
              <div className="bg-white border border-[#EBEBEB] rounded-[14px] px-5 py-[18px]">
                <div className="text-[12px] font-bold uppercase tracking-[0.07em] text-[#999] mb-3.5">Store Information</div>
                <DetailRow
                  label="Store Name"
                  value={vendor?.vendor?.storeName || "N/A"}/>
                <DetailRow
                    label="Owner"
                    value={vendor?.vendor?.user?.fullName || "N/A"}/>
                <DetailRow
                    label="Status"
                    value={vendor?.status || "Pending"}/>
              </div>
              {/* Trade License */}
              <div className="bg-white border border-[#EBEBEB] rounded-[14px] px-5 py-[18px]">
                <div className="text-[12px] font-bold uppercase tracking-[0.07em] text-[#999] mb-3.5">Trade License</div>
                  <DetailRow
                    label="Trade License"
                    value={vendor?.tradeLicenseNumber || "N/A"}/>
                  <DetailRow
                    label="Expiry Date"
                    value={
                    vendor?.tradeLicenseExpiryDate
                    ? new Date(vendor.tradeLicenseExpiryDate).toLocaleDateString("en-GB")
                    : "N/A"
                    }/>
              </div>
            </div>

            {/* Documents */}
            <div className="bg-white border border-[#EBEBEB] rounded-[14px] overflow-hidden mb-4">
              <div className="px-[18px] py-3.5 border-b border-[#EBEBEB] flex items-center justify-between">
                <div className="text-[13px] font-extrabold text-[#0A0A0A]">📎 Uploaded Documents</div>
                <span className="text-[12px] text-[#999]">Click any document to view full size</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 p-4">
                <div className="p-4 text-gray-500">No documents available.
                </div>
              </div>
            </div>

            {/* Rejection Reason + Notes */}
            <div className="bg-white border border-[#EBEBEB] rounded-[14px] px-5 py-[18px] mb-4">
              <div className="text-[13px] font-bold text-[#333] mb-2">Rejection reason (if rejecting)</div>
              <div className="flex flex-wrap gap-2 mb-2.5">
                {REJECTION_REASONS.map((r) => (
                  <button
                    key={r}
                    onClick={() => setSelectedReason(selectedReason === r ? null : r)}
                    className={`px-3.5 py-[6px] border-[1.5px] rounded-full text-[12px] font-semibold cursor-pointer transition-all
                      ${selectedReason === r
                        ? "border-[#EF4444] text-[#EF4444] bg-[#FEF2F2]"
                        : "border-[#EBEBEB] text-[#666] bg-white hover:border-[#EF4444] hover:text-[#EF4444] hover:bg-[#FEF2F2]"
                      }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add a note for the vendor (shown in their rejection email)…"
                className="w-full border-[1.5px] border-[#EBEBEB] rounded-[10px] px-3.5 py-2.5 text-[13px] text-[#333] outline-none resize-y min-h-[80px] focus:border-[#FF4500] transition placeholder:text-[#999]"
              />
            </div>

            {/* Final Actions */}
            <div className="flex gap-3 justify-end">
              <button className="inline-flex items-center gap-1.5 font-bold text-[13px] rounded-full border border-[#EBEBEB] bg-white text-[#333] px-5 py-3 hover:bg-[#F7F7F5] transition whitespace-nowrap">
                Skip — review later
              </button>
              <button onClick={handleReject}
                className="inline-flex items-center gap-1.5 font-bold text-[14px] rounded-full bg-[#EF4444] text-white px-7 py-3 hover:bg-[#DC2626] transition whitespace-nowrap">
                ✕ Reject with reason
              </button>
              <button onClick={handleApproveStore}
                className="inline-flex items-center gap-1.5 font-bold text-[14px] rounded-full bg-[#22C55E] text-white px-7 py-3 hover:bg-[#16A34A] transition shadow-[0_3px_10px_rgba(34,197,94,0.25)] whitespace-nowrap">
                ✓ Approve store
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}