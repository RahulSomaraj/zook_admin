import { useState } from "react";

const FRAUD_CASES = [
  {
    id: "#SUB-079",
    flaggedAgo: "32 min ago",
    badgeLabel: "🤖 OCR Detected",
    badgeType: "error",
    vendor: { initials: "TB", name: "TechBay Dubai", meta: "Strike 1 of 3 · First offence", color: "#FF4500" },
    order: { product: "MacBook Air M2 256GB", amount: "AED 3,200", payout: "AED 2,877.20", held: false },
    beforeIcon: "💻",
    afterIcon: "💻",
    afterStyle: "error",
    alert: {
      type: "ocr",
      text: "OCR detected phone number in after-packing photo:",
      code: "+971 50 XXX XXXX",
    },
    actions: ["warn", "hold", "suspend", "clear"],
  },
  {
    id: "#SUB-076",
    flaggedAgo: "1 hr ago",
    badgeLabel: "👤 Customer Report",
    badgeType: "warning",
    vendor: { initials: "DF", name: "Digital First Trading", meta: "Strike 2 of 3 · Previous warning issued", color: "#7C3AED" },
    order: { product: "Apple Watch Series 9", amount: "AED 750", payout: "AED 659.25", held: false },
    beforeIcon: "⌚",
    afterIcon: "⌚",
    afterStyle: "warning",
    alert: {
      type: "report",
      text: 'Found a paper inside packaging with a WhatsApp number and Instagram handle. "Contact me directly for better prices."',
    },
    actions: ["hold", "suspend", "viewPhotos", "clear"],
  },
];

const HISTORY_ROWS = [
  {
    order: "#SUB-062",
    vendor: "Smart Gadgets LLC",
    status: "warned",
    action: "Instagram handle in photo",
    date: "1 Jun 2026",
  },
  {
    order: "#SUB-041",
    vendor: "Digital First Trading",
    status: "warned",
    action: "Phone number in box label",
    date: "22 May 2026",
  },
  {
    order: "#SUB-033",
    vendor: "Gulf Electronics Co.",
    status: "cleared",
    action: "False positive — watermark on box",
    date: "18 May 2026",
  },
  {
    order: "#SUB-019",
    vendor: "Al Noor Trading",
    status: "suspended",
    action: "3rd strike — account suspended",
    date: "10 May 2026",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusBadge({ status }) {
  const map = {
    warned: {
      dot: "bg-amber-500",
      text: "text-amber-700",
      bg: "bg-amber-50",
      label: "⚠️ Warning issued",
    },
    cleared: {
      dot: "bg-green-500",
      text: "text-green-700",
      bg: "bg-green-50",
      label: "✓ Cleared",
    },
    suspended: {
      dot: "bg-red-500",
      text: "text-red-700",
      bg: "bg-red-50",
      label: "🚫 Suspended",
    },
  };
  const s = map[status];
  return (
    <span className={`inline-flex items-center gap-1 px-[9px] py-[3px] rounded-full text-[11px] font-bold ${s.bg} ${s.text}`}>
      <span className={`w-[5px] h-[5px] rounded-full flex-shrink-0 ${s.dot}`} />
      {s.label}
    </span>
  );
}

function ActionButton({ type }) {
  const map = {
    warn: { label: "⚠️ Issue warning", cls: "bg-amber-500 text-white" },
    hold: { label: "💰 Hold payout", cls: "bg-amber-50 text-amber-700 border border-amber-300" },
    suspend: { label: "🚫 Suspend vendor", cls: "bg-red-500 text-white" },
    clear: { label: "✓ Clear — false positive", cls: "bg-green-50 text-green-700 border border-green-200" },
    viewPhotos: { label: "🖼️ View full photos", cls: "bg-[#F7F7F5] text-[#666] border border-[#EBEBEB]" },
  };
  const { label, cls } = map[type];
  return (
    <button
      className={`inline-flex items-center gap-1.5 font-bold text-[12px] rounded-full px-4 py-2 whitespace-nowrap transition-all duration-150 cursor-pointer ${cls}`}
    >
      {label}
    </button>
  );
}

function FraudCard({ c }) {
  return (
    <div className="bg-white border-[1.5px] border-red-200 rounded-[14px] overflow-hidden hover:shadow-lg transition-shadow duration-150">
      {/* Header */}
      <div className="flex items-center gap-2.5 px-[18px] py-3.5 bg-red-50 border-b border-red-100">
        <span className="font-mono text-[12px] font-bold text-red-800">{c.id}</span>
        <span className="text-[12px] text-red-700">{c.flaggedAgo}</span>
        <span
          className={`ml-auto text-white text-[10px] font-bold px-[9px] py-[3px] rounded-full ${
            c.badgeType === "warning" ? "bg-amber-500" : "bg-red-500"
          }`}
        >
          {c.badgeLabel}
        </span>
      </div>

      {/* Body */}
      <div className="p-[18px]">
        {/* Vendor */}
        <div className="flex items-center gap-2.5 mb-3.5">
          <div
            className="w-8 h-8 rounded-md flex items-center justify-center text-[12px] font-extrabold text-white flex-shrink-0"
            style={{ backgroundColor: c.vendor.color }}
          >
            {c.vendor.initials}
          </div>
          <div>
            <div className="text-[13px] font-bold text-[#0A0A0A]">{c.vendor.name}</div>
            <div className="text-[11px] text-[#999]">{c.vendor.meta}</div>
          </div>
        </div>

        {/* Order info */}
        <div className="text-[13px] text-[#666] mb-3">
          Order: <strong className="text-[#333]">{c.order.product}</strong> · {c.order.amount}
          <br />
          Payout: <strong className="text-[#333]">{c.order.payout}</strong> · Currently not held
        </div>

        {/* Photo comparison */}
        <div className="grid grid-cols-2 gap-2.5 mb-3.5">
          <div className="rounded-[10px] overflow-hidden border border-[#EBEBEB]">
            <div className="h-[120px] flex items-center justify-center text-[40px] bg-gradient-to-br from-[#FFF0EB] to-[#FFD4C2]">
              {c.beforeIcon}
            </div>
            <div className="px-2.5 py-[7px] text-[11px] font-bold uppercase tracking-[0.06em] text-[#999] bg-[#F7F7F5] border-t border-[#EBEBEB]">
              Before packing
            </div>
          </div>
          <div
            className={`rounded-[10px] overflow-hidden border ${
              c.afterStyle === "error" ? "border-red-400" : "border-amber-300"
            }`}
          >
            <div
              className={`h-[120px] flex items-center justify-center text-[40px] ${
                c.afterStyle === "error"
                  ? "bg-gradient-to-br from-red-50 to-red-100"
                  : "bg-gradient-to-br from-amber-50 to-amber-200"
              }`}
            >
              {c.afterIcon}
            </div>
            <div
              className={`px-2.5 py-[7px] text-[11px] font-bold uppercase tracking-[0.06em] bg-[#F7F7F5] border-t border-[#EBEBEB] ${
                c.afterStyle === "error" ? "text-red-500" : "text-amber-500"
              }`}
            >
              ⚠️ After packing — {c.afterStyle === "error" ? "flagged" : "reported"}
            </div>
          </div>
        </div>

        {/* Alert */}
        {c.alert.type === "ocr" ? (
          <div className="bg-red-50 border border-red-200 rounded-[10px] px-3.5 py-2.5 text-[12px] text-red-700 mb-3.5 flex items-start gap-2">
            <span>🤖</span>
            <span>
              {c.alert.text}{" "}
              <span className="font-mono font-bold bg-red-100 px-1.5 py-0.5 rounded">{c.alert.code}</span>
            </span>
          </div>
        ) : (
          <div className="bg-amber-50 border border-amber-200 rounded-[10px] px-3.5 py-2.5 text-[12px] text-amber-800 mb-3.5 flex items-start gap-2">
            <span>👤</span>
            <span>
              <strong>Customer report:</strong> {c.alert.text}
            </span>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 flex-wrap">
          {c.actions.map((a) => (
            <ActionButton key={a} type={a} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function FraudReview() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden min-w-0 font-['Manrope',sans-serif] bg-[#F7F7F5] text-[#333]">
        {/* Topbar */}
        <header className="h-[60px] bg-white border-b border-[#EBEBEB] flex items-center px-7 gap-3.5 flex-shrink-0">
          <div className="text-[18px] font-extrabold text-[#0A0A0A]">Fraud Review</div>
          <div className="text-[13px] text-red-500 font-bold">2 active flags requiring action</div>
          <div className="flex items-center gap-2 ml-auto">
            <button className="w-9 h-9 rounded-[10px] flex items-center justify-center bg-none border border-[#EBEBEB] text-base cursor-pointer relative">
              🔔
              <span className="absolute top-1.5 right-1.5 w-[7px] h-[7px] bg-[#FF4500] rounded-full border-[1.5px] border-white" />
            </button>
            <div className="w-9 h-9 rounded-full bg-[#FF4500] flex items-center justify-center text-[13px] font-bold text-white cursor-pointer">
              ZA
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-7 px-8">

          {/* Alert Banner */}
          <div className="bg-red-50 border-[1.5px] border-red-300/50 rounded-[14px] p-5 flex items-start gap-3.5 mb-6">
            <span className="text-2xl flex-shrink-0">🚨</span>
            <div>
              <div className="text-[15px] font-extrabold text-red-900 mb-1">Packaging photo fraud detected</div>
              <div className="text-[13px] text-red-700">
                2 orders have been flagged — possible vendor contact details found in packing photos. Review and take
                action. Payouts are not affected until you act.
              </div>
            </div>
          </div>

          {/* Fraud Cards */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {FRAUD_CASES.map((c) => (
              <FraudCard key={c.id} c={c} />
            ))}
          </div>

          {/* History Table */}
          <div className="bg-white border border-[#EBEBEB] rounded-[14px] overflow-hidden">
            <div className="flex items-center justify-between px-[18px] py-3.5 border-b border-[#EBEBEB]">
              <div className="text-[14px] font-extrabold text-[#0A0A0A]">Recent Fraud Actions</div>
              <span className="text-[12px] text-[#999]">Last 30 days</span>
            </div>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  {["Order", "Vendor", "Flag type", "Action taken", "Date"].map((h) => (
                    <th
                      key={h}
                      className="text-left px-[18px] py-[9px] text-[10px] font-bold uppercase tracking-[0.06em] text-[#999] border-b border-[#EBEBEB] bg-[#F7F7F5]"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {HISTORY_ROWS.map((row, i) => (
                  <tr key={i} className={i !== HISTORY_ROWS.length - 1 ? "border-b border-[#EBEBEB]" : ""}>
                    <td className="px-[18px] py-[11px] font-mono text-[11px] font-bold text-[#999]">{row.order}</td>
                    <td className="px-[18px] py-[11px] text-[12px] font-semibold text-[#333]">{row.vendor}</td>
                    <td className="px-[18px] py-[11px]">
                      <StatusBadge status={row.status} />
                    </td>
                    <td className="px-[18px] py-[11px] text-[12px] text-[#666]">{row.action}</td>
                    <td className="px-[18px] py-[11px] text-[12px] text-[#999]">{row.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
    </div>
  );
}