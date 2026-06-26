import React from 'react';

export default function Overview() {
  return (
    <div className="flex-1 bg-slate-50 min-h-screen text-slate-800 text-xs font-sans p-3 sm:p-6 space-y-6 overflow-y-auto">
      
      {/* TOP ACTIONS BAR / HEADER */}
      <div className="flex justify-between items-center">
        <div className="flex items-baseline gap-4">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
          <p className="text-slate-400 font-medium text-xs">Saturday, 7 June 2026</p>
        </div>
        
        {/* Right Admin Icons */}
        <div className="flex items-center gap-3">
          <button className="w-8 h-8 rounded-full bg-blue-50/50 border border-slate-100 flex items-center justify-center shadow-sm text-slate-600 hover:bg-slate-100 transition">
            🔍
          </button>
          <button className="w-8 h-8 rounded-full bg-orange-50/50 border border-slate-100 flex items-center justify-center shadow-sm text-slate-600 hover:bg-slate-100 transition relative">
            🔔
            <div className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-orange-500 rounded-full" />
          </button>
          <div className="w-8 h-8 rounded-full bg-orange-600 text-white font-bold flex items-center justify-center text-xs shadow-sm">
            ZA
          </div>
        </div>
      </div>

      {/* ALERT ROW CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {/* KYC Pending Application Card */}
        <div className="bg-amber-50/40 border border-amber-100 rounded-2xl p-5 shadow-sm flex justify-between items-start">
          <div className="space-y-1">
            <div className="text-xl p-1.5 bg-amber-100/50 rounded-xl w-fit">🪪</div>
            <div className="pt-1">
              <span className="text-3xl font-extrabold text-amber-600 tracking-tight">4</span>
              <h3 className="font-bold text-amber-900 mt-0.5">KYC applications pending</h3>
              <p className="text-amber-600/70 text-[11px] font-medium mt-0.5">Oldest: 2 days ago</p>
            </div>
          </div>
          <span className="text-slate-400 font-semibold text-sm">→</span>
        </div>

        {/* C2C Drafts Card */}
        <div className="bg-blue-50/40 border border-blue-100 rounded-2xl p-5 shadow-sm flex justify-between items-start">
          <div className="space-y-1">
            <div className="text-xl p-1.5 bg-blue-100/50 rounded-xl w-fit">✅</div>
            <div className="pt-1">
              <span className="text-3xl font-extrabold text-blue-600 tracking-tight">3</span>
              <h3 className="font-bold text-blue-900 mt-0.5">C2C drafts ready to publish</h3>
              <p className="text-blue-500/70 text-[11px] font-medium mt-0.5">Inspector approved · awaiting pricing</p>
            </div>
          </div>
          <span className="text-slate-400 font-semibold text-sm">→</span>
        </div>

        {/* Fraud Flags Card */}
        <div className="bg-red-50/40 border border-red-100 rounded-2xl p-5 shadow-sm flex justify-between items-start">
          <div className="space-y-1">
            <div className="text-xl p-1.5 bg-red-100/50 rounded-xl w-fit">🚨</div>
            <div className="pt-1">
              <span className="text-3xl font-extrabold text-red-600 tracking-tight">2</span>
              <h3 className="font-bold text-red-900 mt-0.5">Fraud flags to review</h3>
              <p className="text-red-400/80 text-[11px] font-medium mt-0.5">Packing photos reported suspicious</p>
            </div>
          </div>
          <span className="text-slate-400 font-semibold text-sm">→</span>
        </div>
      </div>

      {/* METRIC ROW BANNER CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">GMV Today</span>
            <h2 className="text-xl font-black text-slate-900">AED 18,240</h2>
            <p className="text-emerald-500 text-[11px] font-semibold">↑ 24% vs yesterday</p>
          </div>
          <div className="p-2 bg-orange-50/60 rounded-xl text-base">💰</div>
        </div>

        <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Orders Today</span>
            <h2 className="text-xl font-black text-slate-900">43</h2>
            <p className="text-emerald-500 text-[11px] font-semibold">↑ 11 vs yesterday</p>
          </div>
          <div className="p-2 bg-blue-50/60 rounded-xl text-base">🛒</div>
        </div>

        <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Active Vendors</span>
            <h2 className="text-xl font-black text-slate-900">128</h2>
            <p className="text-emerald-500 text-[11px] font-semibold">↑ 6 new this week</p>
          </div>
          <div className="p-2 bg-purple-50/60 rounded-xl text-base">🏪</div>
        </div>

        <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Active Listings</span>
            <h2 className="text-xl font-black text-slate-900">1,847</h2>
            <p className="text-slate-400 text-[11px] font-medium">+34 today</p>
          </div>
          <div className="p-2 bg-amber-50/60 rounded-xl text-base">📱</div>
        </div>
      </div>

      {/* PLATFORM REVENUE & LIVE ACTIVITY SPAN GROUP */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* PLATFORM REVENUE COMPONENT */}
        <div className="col-span-1 lg:col-span-8 bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex flex-col justify-between h-[360px]">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-slate-900 text-sm">Platform Revenue</h3>
            <select className="border border-slate-200 bg-white text-slate-600 rounded-lg px-2.5 py-1 text-[11px] font-medium outline-none">
              <option>Last 7 days</option>
            </select>
          </div>

          <div className="flex justify-between items-end mt-2">
            <div>
              <h2 className="text-2xl font-black text-slate-900">AED 84,920</h2>
              <p className="text-slate-400 text-[11px] mt-0.5">Zook commission earnings · 7 day total</p>
            </div>
            <span className="text-emerald-500 text-[11px] font-bold">↑ 18% this week</span>
          </div>

          {/* Core Custom Dynamic Graph Bar Items */}
          <div className="flex items-end gap-3 h-32 mt-4 px-1">
            {[
              { label: 'Mon', h: 'h-12', current: false },
              { label: 'Tue', h: 'h-16', current: false },
              { label: 'Wed', h: 'h-14', current: false },
              { label: 'Thu', h: 'h-24', current: false },
              { label: 'Fri', h: 'h-20', current: false },
              { label: 'Today', h: 'h-28', current: true },
              { label: 'Sun', h: 'h-8', current: false }
            ].map((bar, index) => (
              <div key={index} className="flex-1 flex flex-col items-center group">
                <div className={`w-full rounded-t-sm transition-all duration-150 ${bar.current ? 'bg-orange-600' : 'bg-orange-100/70 hover:bg-orange-200'} ${bar.h}`} />
                <span className={`text-[10px] mt-2 font-bold uppercase tracking-wider ${bar.current ? 'text-orange-600 font-extrabold' : 'text-slate-400'}`}>
                  {bar.label}
                </span>
              </div>
            ))}
          </div>

          {/* Bottom Triple Breakdowns Section */}
          <div className="grid grid-cols-3 pt-4 border-t border-slate-100 mt-4 text-left">
            <div>
              <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold block">Commission</span>
              <span className="text-sm font-extrabold text-slate-900 block mt-0.5">AED 8,492</span>
              <span className="text-emerald-500 text-[10px] font-semibold">10% avg rate</span>
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold block">Verification Fees</span>
              <span className="text-sm font-extrabold text-slate-900 block mt-0.5">AED 980</span>
              <span className="text-emerald-500 text-[10px] font-semibold">14 C2C inspections</span>
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold block">GMV</span>
              <span className="text-sm font-extrabold text-slate-900 block mt-0.5">AED 84,920</span>
              <span className="text-emerald-500 text-[10px] font-semibold">↑ 18% WoW</span>
            </div>
          </div>
        </div>

        {/* LIVE ACTIVITY COMPONENT */}
        <div className="col-span-1 lg:col-span-4 bg-white border border-slate-100 rounded-2xl shadow-sm h-[360px] flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0">
            <h3 className="font-bold text-slate-900 text-sm">Live Activity</h3>
            <button className="text-orange-600 font-bold text-[11px] hover:underline">View all</button>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-50">
            {/* Log Item 1 */}
            <div className="p-3.5 flex items-start justify-between gap-2">
              <div>
                <p className="text-slate-800 font-medium leading-tight">
                  <span className="font-bold text-slate-900">Al Turath Electronics</span> submitted KYC application
                </p>
                <span className="text-slate-400 text-[10px] block mt-1">2 min ago</span>
              </div>
              <button className="text-orange-600 font-bold text-[11px] whitespace-nowrap">Review →</button>
            </div>
            {/* Log Item 2 */}
            <div className="p-3.5 flex items-start justify-between gap-2">
              <div>
                <p className="text-slate-800 font-medium leading-tight">
                  Order <span className="font-bold text-slate-900">#SUB-082</span> placed — <span className="font-semibold text-slate-700">AED 850</span>
                </p>
                <span className="text-slate-400 text-[10px] block mt-1">6 min ago</span>
              </div>
              <button className="text-slate-500 font-bold text-[11px] whitespace-nowrap">View</button>
            </div>
            {/* Log Item 3 */}
            <div className="p-3.5 flex items-start justify-between gap-2">
              <div>
                <p className="text-slate-800 font-medium leading-tight">
                  Inspector passed <span className="font-bold text-slate-900">iPhone 14 Pro</span> — ready to publish
                </p>
                <span className="text-slate-400 text-[10px] block mt-1">14 min ago</span>
              </div>
              <button className="text-orange-600 font-bold text-[11px] whitespace-nowrap">Publish →</button>
            </div>
            {/* Log Item 4 */}
            <div className="p-3.5 flex items-start justify-between gap-2">
              <div>
                <p className="text-slate-800 font-medium leading-tight">
                  <span className="font-bold text-red-600">Packing photo flagged</span> — Order #SUB-079
                </p>
                <span className="text-slate-400 text-[10px] block mt-1">32 min ago</span>
              </div>
              <button className="text-orange-600 font-bold text-[11px] whitespace-nowrap">Review →</button>
            </div>
          </div>
        </div>
      </div>

      {/* LOWER ROW SPLIT GRID (KYC QUEUE, TOP VENDORS, SALES CATEGORIES) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* KYC QUEUE COMPONENT */}
        <div className="col-span-1 lg:col-span-5 bg-white border border-slate-100 rounded-2xl p-4 shadow-sm space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-slate-900 text-sm">KYC Queue</h3>
            <button className="text-orange-600 font-bold text-[11px]">View all →</button>
          </div>

          <div className="w-full text-left">
            <div className="grid grid-cols-12 text-[10px] uppercase font-bold text-slate-400 tracking-wider pb-2 border-b border-slate-100">
              <span className="col-span-6">Vendor</span>
              <span className="col-span-3">Submitted</span>
              <span className="col-span-3 text-right">Action</span>
            </div>

            <div className="divide-y divide-slate-50">
              {/* Row 1 */}
              <div className="grid grid-cols-12 items-center py-3">
                <div className="col-span-6 flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-purple-600 text-white font-bold flex items-center justify-center text-[11px]">AT</div>
                  <div>
                    <h4 className="font-bold text-slate-900">Al Turath</h4>
                    <p className="text-slate-400 text-[10px]">Company</p>
                  </div>
                </div>
                <span className="col-span-3 text-slate-500 font-medium">2 min ago</span>
                <div className="col-span-3 text-right">
                  <button className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-2.5 py-1 rounded-lg font-bold transition">Review</button>
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-12 items-center py-3">
                <div className="col-span-6 flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 font-bold flex items-center justify-center text-[11px]">SG</div>
                  <div>
                    <h4 className="font-bold text-slate-900">Smart Gadgets</h4>
                    <p className="text-slate-400 text-[10px]">Individual</p>
                  </div>
                </div>
                <span className="col-span-3 text-orange-500 font-semibold">1 day ago</span>
                <div className="col-span-3 text-right">
                  <button className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-2.5 py-1 rounded-lg font-bold transition">Review</button>
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-12 items-center py-3">
                <div className="col-span-6 flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center text-[11px]">TB</div>
                  <div>
                    <h4 className="font-bold text-slate-900">TechBay Dubai</h4>
                    <p className="text-slate-400 text-[10px]">Company</p>
                  </div>
                </div>
                <span className="col-span-3 text-red-400 font-semibold">2 days ago</span>
                <div className="col-span-3 text-right">
                  <button className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-2.5 py-1 rounded-lg font-bold transition">Review</button>
                </div>
              </div>

              {/* Row 4 */}
              <div className="grid grid-cols-12 items-center py-3">
                <div className="col-span-6 flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-orange-600 text-white font-bold flex items-center justify-center text-[11px]">DF</div>
                  <div>
                    <h4 className="font-bold text-slate-900">Digital First</h4>
                    <p className="text-slate-400 text-[10px]">Individual</p>
                  </div>
                </div>
                <span className="col-span-3 text-red-400 font-semibold">2 days ago</span>
                <div className="col-span-3 text-right">
                  <button className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-2.5 py-1 rounded-lg font-bold transition">Review</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TOP VENDORS COMPONENT */}
        <div className="col-span-1 lg:col-span-3 bg-white border border-slate-100 rounded-2xl p-4 shadow-sm space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-slate-900 text-sm">Top Vendors</h3>
            <span className="text-orange-600 font-bold text-[11px]">This month</span>
          </div>

          <div className="space-y-3 pt-1">
            {[
              { id: 'TB', name: 'TechBay Dubai', value: 'AED 18,400', color: 'bg-amber-500', rank: '#1', width: 'w-2/3' },
              { id: 'AT', name: 'Al Turath Elec.', value: 'AED 14,320', color: 'bg-blue-500', rank: '#2', width: 'w-1/2' },
              { id: 'SG', name: 'Smart Gadgets', value: 'AED 10,680', color: 'bg-emerald-500', rank: '#3', width: 'w-1/3' },
              { id: 'DF', name: 'Digital First', value: 'AED 7,740', color: 'bg-purple-600', rank: '#4', width: 'w-1/4' },
              { id: 'GM', name: 'Gulf Motors', value: 'AED 5,880', color: 'bg-pink-500', rank: '#5', width: 'w-1/5' }
            ].map((vendor, idx) => (
              <div key={idx} className="flex items-center justify-between gap-2 text-[11px]">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-slate-400 font-bold w-4 text-[10px]">{vendor.rank}</span>
                  <div className={`w-6 h-6 rounded flex items-center justify-center text-white font-bold text-[10px] shrink-0 ${vendor.color}`}>
                    {vendor.id}
                  </div>
                  <span className="font-bold text-slate-900 truncate">{vendor?.vendor?.storeName}</span>
                </div>
                
                <div className="flex items-center gap-2 shrink-0">
                  <div className="w-12 bg-slate-100 h-1.5 rounded-full overflow-hidden hidden sm:block">
                    <div className={`bg-orange-600 h-full rounded-full ${vendor.width}`} />
                  </div>
                  <span className="font-extrabold text-slate-900 text-right w-16">{vendor.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SALES BY CATEGORY COMPONENT */}
        <div className="col-span-1 lg:col-span-4 bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex flex-col justify-between h-[285px]">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-slate-900 text-sm">Sales by Category</h3>
              <span className="text-orange-600 font-bold text-[11px]">This month</span>
            </div>

            <div className="space-y-2">
              {[
                { name: 'Electronics', pct: '72%', fill: 'w-[72%]', color: 'bg-orange-600' },
                { name: 'Gaming', pct: '14%', fill: 'w-[14%]', color: 'bg-blue-600' },
                { name: 'Computers', pct: '8%', fill: 'w-[8%]', color: 'bg-emerald-500' },
                { name: 'Furniture', pct: '4%', fill: 'w-[4%]', color: 'bg-amber-500' },
                { name: 'Other', pct: '2%', fill: 'w-[2%]', color: 'bg-slate-300' }
              ].map((cat, idx) => (
                <div key={idx} className="flex items-center justify-between text-[11px]">
                  <span className="w-20 font-semibold text-slate-700">{cat.name}</span>
                  <div className="flex-1 mx-3 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className={`${cat.color} h-full rounded-full ${cat.fill}`} />
                  </div>
                  <span className="w-8 text-right font-bold text-slate-500">{cat.pct}</span>
                </div>
              ))}
            </div>
          </div>

          {/* LOWER DECK GRAPH TEXT OVERVIEW FOOTER BOX */}
          <div className="bg-slate-950 text-white rounded-xl p-3.5 mt-2 space-y-1 shadow-inner">
            <span className="text-[9px] uppercase font-bold tracking-widest text-slate-500 block">Total GMV · June 2026</span>
            <div className="flex items-baseline gap-2">
              <h2 className="text-xl font-black text-white tracking-tight">AED 284,920</h2>
              <span className="text-emerald-400 text-[10px] font-bold">↑ 31% vs May</span>
            </div>
            <p className="text-slate-400 text-[10px] font-medium pt-0.5">Across 128 vendors · 1,847 listings</p>
          </div>
        </div>

      </div>

    </div>
  );
}