import { useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";

export default function MainLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSpecificationModal, setOpenSpecificationModal] = useState(false);
  const [specificationName, setSpecificationName] = useState("");

  return (
    <div className="flex h-screen overflow-hidden bg-[#0d0e12]">
      <Sidebar
  mobileOpen={mobileOpen}
  onClose={() => setMobileOpen(false)}
  onAddNewItem={() => setOpenSpecificationModal(true)}
/>

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
        {openSpecificationModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
      <h2 className="text-xl font-semibold text-gray-900">
        Add New Specification
      </h2>

      <div className="mt-5">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          New Specification Name
        </label>

        <input
  type="text"
  value={specificationName}
  onChange={(e) => setSpecificationName(e.target.value)}
  placeholder="Enter specification name"
  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-orange-500 focus:outline-none"
/>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={() => {
  setOpenSpecificationModal(false);
  setSpecificationName("");
}}
          className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          className="rounded-lg bg-orange-500 px-5 py-2 text-white hover:bg-orange-600"
        >
          Create
        </button>
      </div>
    </div>
  </div>
)}
      </div>
    </div>
  );
}
