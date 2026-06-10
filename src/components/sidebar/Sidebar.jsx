import { useState } from "react";

const navSections = [
  {
    label: "OVERVIEW",
    items: [
      { id: "dashboard", icon: "📊", label: "Dashboard" },
      { id: "analytics", icon: "📈", label: "Analytics" },
    ],
  },
  {
    label: "VENDORS",
    items: [
      { id: "all-vendors", icon: "👥", label: "All Vendors" },
      { id: "kyc-review", icon: "🪪", label: "KYC Review", badge: 4, badgeColor: "bg-yellow-400 text-black" },
      { id: "strike-management", icon: "⚠️", label: "Strike Management" },
    ],
  },
  {
    label: "LISTINGS & C2C",
    items: [
      { id: "all-listings", icon: "🏷️", label: "All Listings" },
      { id: "c2c-drafts", icon: "✅", label: "C2C Drafts", badge: 3, badgeColor: "bg-orange-500 text-white" },
      { id: "product-catalog", icon: "📦", label: "Product Catalog" },
    ],
  },
  {
    label: "ORDERS",
    items: [
      { id: "all-orders", icon: "🛒", label: "All Orders" },
      { id: "fraud-review", icon: "🖼️", label: "Fraud Review", badge: 2, badgeColor: "bg-orange-500 text-white" },
    ],
  },
  {
    label: "ACCOUNT",
    items: [
      { id: "notifications", icon: "🔔", label: "Notifications", badge: 7, badgeColor: "bg-orange-500 text-white" },
      { id: "settings", icon: "⚙️", label: "Settings" },
    ],
  },
];

export default function Sidebar() {
  const [active, setActive] = useState("product-catalog");

  return (
    <div className="w-64 min-h-screen bg-black flex flex-col select-none">
      {/* Logo */}
      <div className="px-5 pt-6 pb-5">
        <div className="flex items-center gap-2">
          <span className="text-orange-600 font-black text-2xl tracking-widest">ZOOK</span>
          <span className="bg-orange-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full tracking-widest">
            ADMIN
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-4 border-t border-white/10 mb-4" />

      {/* User profile */}
      <div className="px-4 mb-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-orange-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          ZA
        </div>
        <div>
          <p className="text-white font-semibold text-sm leading-tight">Zook Admin</p>
          <p className="text-gray-400 text-xs mt-0.5">Super admin</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 pb-4 overflow-y-auto">
        {navSections.map((section) => (
          <div key={section.label} className="mb-2">
            {/* Section label */}
            <p className="text-[10px] font-semibold text-gray-500 tracking-widest px-3 py-2 uppercase">
              {section.label}
            </p>

            {/* Items */}
            {section.items.map((item) => {
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActive(item.id)}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-md mb-0.5
                    text-sm font-medium transition-all duration-150 relative
                    ${
                      isActive
                        ? "bg-[#1e1f26] text-orange-600 border-l-[3px] border-orange-500 pl-[9px]"
                        : "text-gray-300 border-l-[3px] border-transparent hover:bg-white/5 hover:text-white"
                    }
                  `}
                >
                  <span className="text-base leading-none">{item.icon}</span>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[11px] font-bold min-w-[20px] h-5 px-1.5 rounded-full flex items-center justify-center ${item.badgeColor}`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Log out */}
      <div className="px-2 pb-5">
        <div className="mx-2 border-t border-white/10 mb-3" />
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-gray-400 border-l-[3px] border-transparent hover:bg-white/5 hover:text-white transition-all duration-150">
          <span className="text-base">🚪</span>
          <span>Log out</span>
        </button>
      </div>
    </div>
  );
}