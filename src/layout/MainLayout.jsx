import { useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";

export default function MainLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#0d0e12]">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0 bg-white">
        {/* Mobile top bar — hidden on desktop (md+) */}
        <header className="md:hidden sticky top-0 z-30 flex items-center gap-3 h-14 px-4 bg-black border-b border-white/10">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="p-1 -ml-1 text-white"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <span className="text-orange-600 font-black text-lg tracking-widest">ZOOK</span>
            <span className="bg-orange-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full tracking-widest">
              ADMIN
            </span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-white">
          {children}
        </main>
      </div>
    </div>
  );
}
