import { useState } from "react";
import { Search } from "lucide-react";

// ─── Dummy Data ───────────────────────────────────────────────────────────────

const QUEUE = [
  {
    id: 1,
    initials: "AT",
    avatarColor: "#7C3AED",
    name: "Al Turath Electronics",
    type: "Registered company · Electronics",
    submittedLabel: "Submitted 2 min ago",
    ageClass: "fresh",
  },
  {
    id: 2,
    initials: "SG",
    avatarColor: "#3B82F6",
    name: "Smart Gadgets LLC",
    type: "Individual · Electronics",
    submittedLabel: "Submitted 1 day ago",
    ageClass: "warn",
  },
  {
    id: 3,
    initials: "TB",
    avatarColor: "#22C55E",
    name: "TechBay Dubai",
    type: "Registered company · Gaming",
    submittedLabel: "Submitted 2 days ago ⚠️",
    ageClass: "old",
  },
  {
    id: 4,
    initials: "DF",
    avatarColor: "#FF4500",
    name: "Digital First Trading",
    type: "Individual · Computers",
    submittedLabel: "Submitted 2 days ago ⚠️",
    ageClass: "old",
  },
];

const VENDOR_DETAILS = {
  1: {
    name: "Al Turath Electronics",
    subtitle: "Registered company · Electronics · Submitted 6 Jun 2026, 9:14 AM",
    ded: "DED-20245823",
    store: {
      "Store name": "Al Turath Electronics",
      "Business type": "Registered company",
      Category: "Electronics",
      "Pickup zone": "Deira, Dubai",
      "Courier coverage": { value: "✓ Porter.ae available", ok: true },
    },
    license: {
      "License number": { value: "DED-20245823", mono: true },
      "Expiry date": { value: "31 Dec 2026", ok: true },
      "Issuing authority": "Dubai DED",
      Status: { value: "✓ Active", ok: true },
      "Owner name": "Ahmed Hassan",
    },
    documents: [
      { icon: "📄", name: "Trade License", file: "trade-license-2024.jpg · 2.8 MB" },
      { icon: "🪪", name: "Emirates ID — Front", file: "eid-front.jpg · 1.4 MB" },
      { icon: "🪪", name: "Emirates ID — Back", file: "eid-back.jpg · 1.2 MB" },
    ],
  },
  2: {
    name: "Smart Gadgets LLC",
    subtitle: "Individual · Electronics · Submitted 5 Jun 2026, 3:42 PM",
    ded: "DED-20241102",
    store: {
      "Store name": "Smart Gadgets LLC",
      "Business type": "Individual",
      Category: "Electronics",
      "Pickup zone": "Sharjah",
      "Courier coverage": { value: "✓ Porter.ae available", ok: true },
    },
    license: {
      "License number": { value: "DED-20241102", mono: true },
      "Expiry date": { value: "30 Jun 2026", ok: true },
      "Issuing authority": "Sharjah DED",
      Status: { value: "✓ Active", ok: true },
      "Owner name": "Sara Al Mansouri",
    },
    documents: [
      { icon: "📄", name: "Trade License", file: "trade-license.jpg · 3.1 MB" },
      { icon: "🪪", name: "Emirates ID — Front", file: "eid-front.jpg · 1.6 MB" },
      { icon: "🪪", name: "Emirates ID — Back", file: "eid-back.jpg · 1.3 MB" },
    ],
  },
  3: {
    name: "TechBay Dubai",
    subtitle: "Registered company · Gaming · Submitted 4 Jun 2026, 11:20 AM",
    ded: "DED-20239847",
    store: {
      "Store name": "TechBay Dubai",
      "Business type": "Registered company",
      Category: "Gaming",
      "Pickup zone": "JLT, Dubai",
      "Courier coverage": { value: "⚠️ Limited coverage", warn: true },
    },
    license: {
      "License number": { value: "DED-20239847", mono: true },
      "Expiry date": { value: "15 Aug 2026", ok: true },
      "Issuing authority": "Dubai DED",
      Status: { value: "✓ Active", ok: true },
      "Owner name": "Khalid Al Rashidi",
    },
    documents: [
      { icon: "📄", name: "Trade License", file: "trade-license.pdf · 4.2 MB" },
      { icon: "🪪", name: "Emirates ID — Front", file: "eid-front.jpg · 1.1 MB" },
      { icon: "🪪", name: "Emirates ID — Back", file: "eid-back.jpg · 0.9 MB" },
    ],
  },
  4: {
    name: "Digital First Trading",
    subtitle: "Individual · Computers · Submitted 4 Jun 2026, 8:55 AM",
    ded: "DED-20243301",
    store: {
      "Store name": "Digital First Trading",
      "Business type": "Individual",
      Category: "Computers",
      "Pickup zone": "Abu Dhabi",
      "Courier coverage": { value: "✓ Porter.ae available", ok: true },
    },
    license: {
      "License number": { value: "DED-20243301", mono: true },
      "Expiry date": { value: "31 Mar 2026", warn: true },
      "Issuing authority": "Abu Dhabi DED",
      Status: { value: "⚠️ Expiring soon", warn: true },
      "Owner name": "Mohammed Al Farsi",
    },
    documents: [
      { icon: "📄", name: "Trade License", file: "trade-license.jpg · 2.4 MB" },
      { icon: "🪪", name: "Emirates ID — Front", file: "eid-front.jpg · 1.8 MB" },
      { icon: "🪪", name: "Emirates ID — Back", file: "eid-back.jpg · 1.5 MB" },
    ],
  },
};

const REJECTION_REASONS = [
  "Trade license expired",
  "Document unclear / unreadable",
  "Name mismatch",
  "Invalid license number",
  "Missing Emirates ID",
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const ageColor = {
  fresh: "text-[#22C55E]",
  warn:  "text-[#F59E0B]",
  old:   "text-[#EF4444]",
};

function DetailRow({ label, value }) {
  const isObj = typeof value === "object";
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
  const [activeId, setActiveId] = useState(1);
  const [search, setSearch] = useState("");
  const [note, setNote] = useState("");
  const [selectedReason, setSelectedReason] = useState(null);

  const filtered = QUEUE.filter((q) =>
    q.name.toLowerCase().includes(search.toLowerCase())
  );

  const vendor = VENDOR_DETAILS[activeId];

  return (
    <div className="flex flex-1 overflow-hidden bg-[#F7F7F5]">
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">

        {/* ── Topbar ── */}
        <header className="h-[60px] bg-white border-b border-[#EBEBEB] flex items-center px-7 gap-3.5 flex-shrink-0">
          <div className="text-[18px] font-extrabold text-[#0A0A0A]">KYC Review</div>
          <div className="text-[13px] text-[#999]">4 applications pending</div>
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
        <div className="flex flex-1 overflow-hidden">

          {/* ── Queue Panel ── */}
          <div className="w-[320px] min-w-[320px] border-r border-[#EBEBEB] bg-white flex flex-col overflow-hidden flex-shrink-0">
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
                      style={{ backgroundColor: q.avatarColor }}
                    >
                      {q.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-bold text-[#0A0A0A] truncate">{q.name}</div>
                      <div className="text-[11px] text-[#999] mt-[1px]">{q.type}</div>
                      <div className={`text-[11px] font-bold mt-1 ${ageColor[q.ageClass]}`}>{q.submittedLabel}</div>
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
                <h2 className="text-[22px] font-extrabold text-[#0A0A0A] mb-1">{vendor.name}</h2>
                <p className="text-[13px] text-[#666]">{vendor.subtitle}</p>
              </div>
              <div className="flex gap-2.5 flex-shrink-0">
                <button className="inline-flex items-center gap-1.5 font-bold text-[13px] rounded-full border border-[#EBEBEB] bg-white text-[#333] px-5 py-2.5 hover:bg-[#F7F7F5] transition whitespace-nowrap">
                  ← Previous
                </button>
                <button className="inline-flex items-center gap-1.5 font-bold text-[13px] rounded-full bg-[#EF4444] text-white px-5 py-2.5 hover:bg-[#DC2626] transition whitespace-nowrap">
                  ✕ Reject
                </button>
                <button className="inline-flex items-center gap-1.5 font-bold text-[13px] rounded-full bg-[#22C55E] text-white px-5 py-2.5 hover:bg-[#16A34A] transition shadow-[0_3px_10px_rgba(34,197,94,0.25)] whitespace-nowrap">
                  ✓ Approve
                </button>
              </div>
            </div>

            {/* DED Verify Banner */}
            <div className="bg-[#EFF6FF] border border-[rgba(59,130,246,0.2)] rounded-[10px] px-4 py-3 flex items-center gap-3 text-[13px] text-[#1D4ED8] mb-4">
              <span>🔗</span>
              <span>Verify trade license <strong>{vendor.ded}</strong> on the DED portal before approving</span>
              <button className="ml-auto bg-[#3B82F6] text-white border-none rounded-full px-3.5 py-1.5 text-[12px] font-bold cursor-pointer hover:bg-[#2563EB] transition whitespace-nowrap">
                Open DED Portal →
              </button>
            </div>

            {/* Store + License Cards */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* Store Info */}
              <div className="bg-white border border-[#EBEBEB] rounded-[14px] px-5 py-[18px]">
                <div className="text-[12px] font-bold uppercase tracking-[0.07em] text-[#999] mb-3.5">Store Information</div>
                {Object.entries(vendor.store).map(([k, v]) => (
                  <DetailRow key={k} label={k} value={v} />
                ))}
              </div>
              {/* Trade License */}
              <div className="bg-white border border-[#EBEBEB] rounded-[14px] px-5 py-[18px]">
                <div className="text-[12px] font-bold uppercase tracking-[0.07em] text-[#999] mb-3.5">Trade License</div>
                {Object.entries(vendor.license).map(([k, v]) => (
                  <DetailRow key={k} label={k} value={v} />
                ))}
              </div>
            </div>

            {/* Documents */}
            <div className="bg-white border border-[#EBEBEB] rounded-[14px] overflow-hidden mb-4">
              <div className="px-[18px] py-3.5 border-b border-[#EBEBEB] flex items-center justify-between">
                <div className="text-[13px] font-extrabold text-[#0A0A0A]">📎 Uploaded Documents</div>
                <span className="text-[12px] text-[#999]">Click any document to view full size</span>
              </div>
              <div className="grid grid-cols-3 gap-3.5 p-4">
                {vendor.documents.map((doc, i) => (
                  <div key={i} className="border border-[#EBEBEB] rounded-[10px] overflow-hidden cursor-pointer transition-all hover:border-[#FF4500] hover:shadow-[0_3px_12px_rgba(255,69,0,0.12)]">
                    <div className="h-[100px] flex items-center justify-center text-[36px] bg-[#F7F7F5]">
                      {doc.icon}
                    </div>
                    <div className="px-3 py-2 bg-white">
                      <div className="text-[11px] font-bold text-[#333]">{doc.name}</div>
                      <div className="text-[10px] text-[#999] mt-[1px]">{doc.file}</div>
                      <div className="text-[10px] text-[#FF4500] font-bold mt-[2px] cursor-pointer">🔍 View full size</div>
                    </div>
                  </div>
                ))}
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
              <button className="inline-flex items-center gap-1.5 font-bold text-[14px] rounded-full bg-[#EF4444] text-white px-7 py-3 hover:bg-[#DC2626] transition whitespace-nowrap">
                ✕ Reject with reason
              </button>
              <button className="inline-flex items-center gap-1.5 font-bold text-[14px] rounded-full bg-[#22C55E] text-white px-7 py-3 hover:bg-[#16A34A] transition shadow-[0_3px_10px_rgba(34,197,94,0.25)] whitespace-nowrap">
                ✓ Approve store
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}