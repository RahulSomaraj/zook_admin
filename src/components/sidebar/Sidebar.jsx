import { NavLink, useNavigate } from "react-router-dom";  
import { useAuthStore } from "../../features/auth/store/authStore";
import { logoutRequest } from "../../features/auth/api/authApi";

const navSections = [
  {
    label: "OVERVIEW",
    items: [
      { id: "dashboard", icon: "📊", label: "Dashboard", path: "/dashboard" },
      { id: "analytics", icon: "📈", label: "Analytics", path: "/analytics" },
    ],
  },
  {
    label: "VENDORS",
    items: [
      { id: "all-vendors", icon: "👥", label: "All Vendors", path: "/all-vendors" },
      { id: "kyc-review", icon: "🪪", label: "KYC Review", path: "/kyc-review", badge: 4, badgeColor: "bg-yellow-400 text-black" },
      { id: "strike-management", icon: "⚠️", label: "Strike Management", path: "/strike-management" },
    ],
  },
  {
    label: "LISTINGS & C2C",
    items: [
      {
        id: "all-listings",
        icon: "🏷️",
        label: "All Listings",
        path: "/all-listings",
      },
      {
        id: "c2c-drafts",
        icon: "✅",
        label: "C2C Drafts",
        path: "/c2c-drafts",
        badge: 3,
        badgeColor: "bg-orange-500 text-white",
      },
      {
        id: "product-catalog",
        icon: "📦",
        label: "Product Catalog",
        path: "/product-catalog",
      },
      {
        id: "categories",
        icon: "📂",
        label: "Categories",
        path: "/categories",
      },
      {
        id: "brands",
        icon: "🏷️",
        label: "Brands",
        path: "/brands",
      },
    ],
  },

  {
    label: "ORDERS",
    items: [
      { id: "all-orders", icon: "🛒", label: "All Orders", path: "/all-orders" },
      { id: "fraud-review", icon: "🖼️", label: "Fraud Review", path: "/fraud-review", badge: 2, badgeColor: "bg-orange-500 text-white" },
    ],
  },
  {
    label: "ACCOUNT",
    items: [
      { id: "notifications", icon: "🔔", label: "Notifications", path: "/notifications", badge: 7, badgeColor: "bg-orange-500 text-white" },
      { id: "settings", icon: "⚙️", label: "Settings", path: "/settings" },
    ],
  },
];

export default function Sidebar({ mobileOpen = false, onClose = () => {} }) {
  const clearAuth = useAuthStore((s) => s.clearAuth);
const navigate = useNavigate();

const handleLogout = async () => {
  try {
    await logoutRequest();
  } finally {
    clearAuth();
    navigate("/login", { replace: true });
  }
};
  return (
    <>
      {/* Backdrop — mobile only */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-30 bg-black/50 md:hidden transition-opacity duration-200 ${
          mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      <div
        className={`w-64 bg-black flex flex-col select-none
          fixed inset-y-0 left-0 z-40 transform transition-transform duration-200
          md:static md:z-auto md:min-h-screen md:translate-x-0 md:transition-none
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
      {/* Logo */}
      <div className="px-5 pt-6 pb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-orange-600 font-black text-2xl tracking-widest">ZOOK</span>
          <span className="bg-orange-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full tracking-widest">
            ADMIN
          </span>
        </div>
        {/* Close button — mobile only */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="md:hidden p-1 text-gray-400 hover:text-white"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
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
            {section.items.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) => `
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
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* Log out */}
      <div className="px-2 pb-5">
        <div className="mx-2 border-t border-white/10 mb-3" />
        <button 
        onClick={handleLogout}
        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-gray-400 border-l-[3px] border-transparent hover:bg-white/5 hover:text-white transition-all duration-150">
          <span className="text-base">🚪</span>
          <span>Log out</span>
        </button>
      </div>
      </div>
    </>
  );
}