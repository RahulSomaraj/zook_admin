import React, { useState } from 'react';

export default function StrikeManagement() {
  const [activeTab, setActiveTab] = useState('All vendors (128)');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All categories');

  // Unified vendor ledger dataset compiled from Screenshot 2026-06-17 044252_2.png, Screenshot 2026-06-17 044313_2.png, and Screenshot 2026-06-17 044417_2.png
  const vendorsData = [
    {
      id: 1,
      name: 'Digital First Trading',
      initials: 'DF',
      avatarBg: 'bg-indigo-600',
      category: 'Electronics',
      joined: 'Member since Mar 2025',
      orders: '34 orders total',
      status: 'Payout held',
      statusClass: 'text-amber-700 bg-amber-50 border-amber-200',
      statusBadge: '💰 Payout held',
      strikeLabel: 'Strike 2 of 3',
      dots: [true, true, false],
      borderColor: 'border-l-4 border-l-orange-500',
      history: [
        {
          num: 1,
          title: 'Warning issued – contact details in photo',
          detail: 'Phone number found in after-packing photo · Order #SUB-041',
          meta: '22 May 2026 · Admin: Zook Admin',
          isRedCircle: false
        },
        {
          num: 2,
          title: 'Payout held – WhatsApp number on paper slip',
          detail: 'Customer reported paper inside packaging with WhatsApp & Instagram · Order #SUB-076',
          meta: '7 Jun 2026 · Admin: Zook Admin',
          isRedCircle: false
        }
      ],
      actions: [
        { label: '🛑 Issue Strike 3 – Suspend', style: 'border border-red-200 bg-red-50 text-red-600 hover:bg-red-100/70 font-semibold' },
        { label: '💰 Release payout hold', style: 'border border-emerald-200 bg-emerald-50 text-emerald-600 hover:bg-emerald-100/70 font-semibold' },
        { label: '📦 View flagged orders', style: 'border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100' }
      ],
      hasInput: true,
      placeholder: 'Add a note to this action...'
    },
    {
      id: 2,
      name: 'TechBay Dubai',
      initials: 'TB',
      avatarBg: 'bg-emerald-600',
      category: 'Electronics',
      joined: 'Member since Dec 2024',
      orders: '89 orders total',
      status: 'Warning',
      statusClass: 'text-amber-600 bg-amber-50 border-amber-200',
      statusBadge: '⚠️ Warned',
      strikeLabel: 'Strike 1 of 3',
      dots: [true, false, false],
      borderColor: 'border-l-4 border-l-amber-500',
      history: [
        {
          num: 1,
          title: 'Warning issued – Instagram handle detected by OCR',
          detail: 'OCR scan found "@techbay_dxb" text in packing photo · Order #SUB-079',
          meta: '7 Jun 2026 · Auto-flagged by OCR · Confirmed by Zook Admin',
          isRedCircle: false
        }
      ],
      actions: [
        { label: '💰 Escalate — Hold payout', style: 'border border-orange-200 bg-orange-50 text-orange-600 hover:bg-orange-100/70 font-semibold' },
        { label: '🛑 Escalate — Suspend', style: 'border border-red-200 bg-red-50 text-red-600 hover:bg-red-100/70 font-semibold' },
        { label: '✓ Clear this strike', style: 'border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100' },
        { label: '📦 View flagged orders', style: 'border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100' }
      ],
      hasInput: false
    },
    {
      id: 3,
      name: 'Al Noor Trading',
      initials: 'AN',
      avatarBg: 'bg-red-600',
      category: 'Furniture',
      joined: 'Member since Nov 2024',
      orders: '22 orders total',
      status: 'Suspended',
      statusClass: 'text-red-600 bg-red-50 border-red-200',
      statusBadge: '🛑 Suspended',
      strikeLabel: 'Strike 3 of 3',
      dots: [true, true, true],
      borderColor: 'border-l-4 border-l-red-500',
      banner: '🛑 Account suspended – all listings paused, no new orders accepted',
      history: [
        {
          num: 1,
          title: 'Warning – phone number on product label',
          detail: 'Order #SUB-012',
          meta: '2 Apr 2026',
          isRedCircle: false
        },
        {
          num: 2,
          title: 'Payout held – customer reported email address on box',
          detail: 'Order #SUB-018',
          meta: '28 Apr 2026',
          isRedCircle: false
        },
        {
          num: 3,
          title: 'Account suspended – repeated offence',
          detail: 'QR code found linking to external shop · Order #SUB-019',
          meta: '10 May 2026',
          isRedCircle: true
        }
      ],
      actions: [
        { label: '✓ Reinstate account', style: 'border border-emerald-200 bg-emerald-50 text-emerald-600 hover:bg-emerald-100/70 font-semibold' },
        { label: '📦 View all history', style: 'border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100' }
      ],
      hasInput: true,
      placeholder: 'Reason for reinstatement...'
    },
    {
      id: 4,
      name: 'Smart Gadgets LLC',
      initials: 'SG',
      avatarBg: 'bg-blue-600',
      category: 'Electronics',
      joined: 'Member since Jan 2025',
      orders: '61 orders total',
      status: 'Warning',
      statusClass: 'text-amber-600 bg-amber-50 border-amber-200',
      statusBadge: '⚠️ Warned',
      strikeLabel: 'Strike 1 of 3',
      dots: [true, false, false],
      borderColor: 'border-l-4 border-l-amber-500',
      history: [
        {
          num: 1,
          title: 'Warning issued – social media handle in photo',
          detail: 'OCR detected "@smartgadgets.ae" on packaging tape · Order #SUB-062',
          meta: '1 Jun 2026 · Auto-flagged by OCR',
          isRedCircle: false
        }
      ],
      actions: [
        { label: '💰 Escalate — Hold payout', style: 'border border-orange-200 bg-orange-50 text-orange-600 hover:bg-orange-100/70 font-semibold' },
        { label: '🛑 Escalate — Suspend', style: 'border border-red-200 bg-red-50 text-red-600 hover:bg-red-100/70 font-semibold' },
        { label: '✓ Clear this strike', style: 'border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100' },
        { label: '📦 View flagged orders', style: 'border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100' }
      ],
      hasInput: false
    },
    {
      id: 5,
      name: 'Al Turath Electronics',
      initials: 'AT',
      avatarBg: 'bg-amber-500',
      category: 'Electronics',
      joined: 'Member since Jan 2025',
      orders: '127 orders total',
      status: 'Clean',
      statusClass: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      statusBadge: '✓ Clean',
      strikeLabel: 'No strikes',
      dots: [false, false, false],
      borderColor: 'border-l-4 border-l-emerald-500',
      history: [],
      actions: [
        { label: '⚠️ Issue Strike 1 – Warning', style: 'border border-amber-200 bg-amber-50 text-amber-600 hover:bg-amber-100/70 font-semibold' },
        { label: '📦 View order history', style: 'border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100' }
      ],
      hasInput: false
    }
  ];

  return (
    <div className="flex-1 bg-slate-50 min-h-screen text-slate-800 text-xs font-sans p-3 sm:p-6 space-y-6 overflow-y-auto">
      
      {/* SCREEN TOP HEADER */}
      <div className="flex flex-wrap gap-3 justify-between items-center">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-slate-900">Strike Management</h1>
            <span className="text-slate-400 text-xs font-normal">Vendor-level strike ledger</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm text-slate-600 hover:bg-slate-50 transition relative">
            <span>🔔</span>
            <div className="absolute top-1 right-1.5 w-2 h-2 bg-orange-500 rounded-full border border-white" />
          </button>
          <div className="w-8 h-8 rounded-full bg-orange-600 text-white font-bold flex items-center justify-center text-xs shadow-sm">
            ZA
          </div>
        </div>
      </div>

      {/* STRATEGIC MILESTONE MATRIX CARD FEED */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm space-y-1">
          <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Clean Vendors</span>
          <h2 className="text-2xl font-black text-slate-900">121</h2>
          <p className="text-emerald-600 text-[11px] font-medium">0 strikes</p>
        </div>
        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm space-y-1">
          <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Strike 1 — Warned</span>
          <h2 className="text-2xl font-black text-slate-900">4</h2>
          <p className="text-amber-500 text-[11px] font-medium">Warning issued</p>
        </div>
        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm space-y-1">
          <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Strike 2 — Payout Held</span>
          <h2 className="text-2xl font-black text-slate-900">2</h2>
          <p className="text-red-500 text-[11px] font-medium">Payout frozen</p>
        </div>
        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm space-y-1">
          <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Suspended</span>
          <h2 className="text-2xl font-black text-slate-900">1</h2>
          <p className="text-red-600 text-[11px] font-medium">Strike 3 · Account locked</p>
        </div>
      </div>

      {/* CONTROLSBAR & ALIGNMENT CRITERIA */}
      <div className="flex flex-wrap gap-3 justify-between items-center bg-transparent pt-1">
        {/* Navigation Pills */}
        <div className="flex flex-wrap gap-2">
          {['All vendors (128)', 'Strikes only (7)', 'Strike 1 (4)', 'Strike 2 (2)', 'Suspended (1)'].map((tab) => {
            const isActive = tab === activeTab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                  isActive 
                    ? 'bg-orange-500 text-white shadow-sm' 
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Input Parameters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <span className="absolute left-3.5 top-2.5 text-slate-400">🔍</span>
            <input 
              type="text" 
              placeholder="Search vendor name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-slate-300 w-52 text-slate-800 placeholder-slate-400 shadow-sm"
            />
          </div>
          
          <div className="relative">
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-3 pr-8 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-600 appearance-none focus:outline-none cursor-pointer shadow-sm"
            >
              <option>All categories</option>
            </select>
            <span className="absolute right-3 top-2.5 pointer-events-none text-[10px] text-slate-400">▼</span>
          </div>
          <span className="text-slate-400 text-xs font-medium ml-1">Showing 5 of 128</span>
        </div>
      </div>

      {/* LEDGER CARD STACK FEED */}
      <div className="space-y-6">
        {vendorsData.map((vendor) => (
          <div 
            key={vendor.id} 
            className={`bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm ${vendor.borderColor}`}
          >
            {/* Structural Suspended State Callout Alert Banner */}
            {vendor.banner && (
              <div className="bg-red-50 border-b border-red-100 text-red-600 px-5 py-2.5 font-semibold text-xs flex items-center gap-2">
                <span>🛑</span> {vendor.banner}
              </div>
            )}

            {/* Vendor Profile Top Summary Section */}
            <div className="p-5 flex justify-between items-start border-b border-slate-50">
              <div className="flex gap-4 items-center">
                <div className={`w-11 h-11 ${vendor.avatarBg} text-white font-bold rounded-xl flex items-center justify-center text-sm shadow-sm`}>
                  {vendor.initials}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{vendor?.vendor?.storeName}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {vendor.category} · {vendor.joined} · {vendor.orders}
                  </p>
                </div>
              </div>

              {/* Status score mapping nodes */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  {vendor.dots.map((filled, dIdx) => (
                    <div 
                      key={dIdx} 
                      className={`w-3 h-3 rounded-full ${filled ? 'bg-orange-500' : 'bg-slate-200'}`} 
                    />
                  ))}
                  <span className="text-xs font-bold text-slate-800 ml-1.5">{vendor.strikeLabel}</span>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${vendor.statusClass}`}>
                  {vendor.statusBadge}
                </span>
              </div>
            </div>

            {/* Split Screen Grid Layout splitting Timeline History vs Panel Controls */}
            <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-100 min-h-[160px]">

              {/* Timeline Records Area (9 Col Wide) */}
              <div className="col-span-1 lg:col-span-9 p-5 space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Strike History</span>
                
                {vendor.history.length === 0 ? (
                  <div className="text-slate-400 italic text-xs py-2 font-medium">
                    No strikes recorded. Vendor is in good standing.
                  </div>
                ) : (
                  <div className="space-y-5 relative pl-2">
                    {/* Inline continuous timeline path rule */}
                    <div className="absolute left-[13px] top-4 bottom-4 w-px bg-slate-100" />
                    
                    {vendor.history.map((item, index) => (
                      <div key={index} className="flex gap-4 items-start relative z-10">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 text-white ${
                          item.isRedCircle ? 'bg-red-500' : 'bg-orange-500'
                        }`}>
                          {item.num}
                        </div>
                        <div className="space-y-0.5 flex-1">
                          <h4 className="font-bold text-slate-900 text-xs">{item.title}</h4>
                          {item.detail && <p className="text-slate-500 font-medium leading-relaxed">{item.detail}</p>}
                          <p className="text-[11px] text-slate-400">{item.meta}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Admin Actions Box Section (3 Col Wide) */}
              <div className="col-span-1 lg:col-span-3 p-5 space-y-3 bg-slate-50/40">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Actions</span>
                
                <div className="space-y-2">
                  {vendor.actions.map((btn, bIdx) => (
                    <button 
                      key={bIdx} 
                      className={`w-full text-left px-4 py-2 rounded-xl text-xs transition shadow-sm ${btn.style}`}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>

                {vendor.hasInput && (
                  <div className="pt-1">
                    <input 
                      type="text" 
                      placeholder={vendor.placeholder} 
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-300 shadow-inner"
                    />
                  </div>
                )}
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* STEPPER PAGINATION FOOTER MODULE */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-200 text-slate-400 text-xs">
        <span className="font-medium">Showing 5 of 128 vendors</span>
        <div className="flex items-center gap-1.5 font-semibold">
          <button className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition shadow-sm text-slate-600 font-bold">
            ←
          </button>
          <button className="w-8 h-8 rounded-xl bg-orange-500 text-white flex items-center justify-center transition shadow-sm font-bold">
            1
          </button>
          <button className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition shadow-sm text-slate-600 font-bold">
            2
          </button>
          <button className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition shadow-sm text-slate-600 font-bold">
            3
          </button>
          <button className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition shadow-sm text-slate-600 font-bold">
            →
          </button>
        </div>
      </div>

    </div>
  );
}