import React, { useState } from 'react';

export default function AllOrders() {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Metrics Data matching the top card row exactly
  const summaryMetrics = [
    { label: 'TOTAL TODAY', value: '43', subtext: '↑ 11 vs yesterday', subtextColor: 'text-emerald-600' },
    { label: 'CONFIRMED', value: '12', subtext: 'Awaiting packing', subtextColor: 'text-slate-400' },
    { label: 'IN TRANSIT', value: '18', subtext: 'With couriers', subtextColor: 'text-slate-400' },
    { label: 'DELIVERED', value: '9', subtext: 'Today', subtextColor: 'text-emerald-600' },
    { label: 'CANCELLED', value: '4', subtext: 'Today', subtextColor: 'text-red-500' }
  ];

  // Filtering Tabs matching pills layout
  const tabs = [
    { name: 'All', count: '43' },
    { name: 'Confirmed', count: '12' },
    { name: 'Preparing', count: '8' },
    { name: 'Shipped', count: '18' },
    { name: 'Delivered', count: '9' },
    { name: 'Cancelled', count: '4' }
  ];

  // Complete orders data table from Screenshot 2026-06-17 050128.png and Screenshot 2026-06-17 050145.png
  const ordersData = [
    {
      subOrder: '#SUB-082',
      ordId: 'ORD-041',
      productName: 'iPhone 13 Mini 128GB',
      vendor: 'Al Turath Electronics',
      productIcon: '📱',
      courier: 'Porter.ae',
      awb: 'PRT-00193842',
      status: 'Shipped',
      statusClass: 'bg-indigo-50 text-indigo-600 border-indigo-100',
      salePrice: 'AED 850',
      payout: 'AED 749.45',
      time: '6 min ago',
      isFlagged: false,
      hasBox: true
    },
    {
      subOrder: '#SUB-081',
      ordId: 'ORD-040',
      productName: 'PlayStation 5 Console',
      vendor: 'TechBay Dubai',
      productIcon: '🎮',
      courier: 'Jeebly',
      awb: 'JBY-00291847',
      status: 'Confirmed',
      statusClass: 'bg-blue-50 text-blue-600 border-blue-100',
      salePrice: 'AED 1,800',
      payout: 'AED 1,609.70',
      time: '14 min ago',
      isFlagged: false,
      hasBox: false
    },
    {
      subOrder: '#SUB-080',
      ordId: 'ORD-039',
      productName: 'MacBook Air M2 256GB',
      vendor: 'Smart Gadgets LLC',
      productIcon: '💻',
      courier: 'Porter.ae',
      awb: 'Pending pickup',
      awbClass: 'text-amber-600 font-medium italic',
      status: 'Preparing',
      statusClass: 'bg-amber-50 text-amber-600 border-amber-100',
      salePrice: 'AED 3,200',
      payout: 'AED 2,877.20',
      time: '32 min ago',
      isFlagged: true,
      hasBox: false
    },
    {
      subOrder: '#SUB-079',
      ordId: 'ORD-038',
      productName: 'Sony Alpha A7 IV',
      vendor: 'Al Turath Electronics',
      productIcon: '📷',
      courier: 'Porter.ae',
      awb: 'PRT-00183720',
      status: 'Shipped',
      statusClass: 'bg-indigo-50 text-indigo-600 border-indigo-100',
      salePrice: 'AED 6,200',
      payout: 'AED 5,420.80',
      time: '1 hr ago',
      isFlagged: false,
      hasBox: false
    },
    {
      subOrder: '#SUB-078',
      ordId: 'ORD-037',
      productName: 'AirPods Pro 2nd Gen',
      vendor: 'TechBay Dubai',
      productIcon: '🎧',
      courier: 'Jeebly',
      awb: 'JBY-00291211',
      status: 'Delivered',
      statusClass: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      salePrice: 'AED 320',
      payout: 'AED 284.00',
      time: '2 hrs ago',
      isFlagged: false,
      hasBox: false
    },
    {
      subOrder: '#SUB-077',
      ordId: 'ORD-036',
      productName: 'Apple Watch Series 9',
      vendor: 'Digital First Trading',
      productIcon: '⌚',
      courier: 'Porter.ae',
      awb: 'PRT-00183600',
      status: 'Shipped',
      statusClass: 'bg-indigo-50 text-indigo-600 border-indigo-100',
      salePrice: 'AED 750',
      payout: 'AED 659.25',
      time: '3 hrs ago',
      isFlagged: true,
      hasBox: false
    },
    {
      subOrder: '#SUB-076',
      ordId: 'ORD-035',
      productName: 'Samsung 27" 4K Monitor',
      vendor: 'Smart Gadgets LLC',
      productIcon: '🖥️',
      courier: '—',
      awb: '',
      status: 'Cancelled',
      statusClass: 'bg-red-50 text-red-500 border-red-100',
      salePrice: 'AED 1,050',
      payout: 'Refunded',
      payoutClass: 'text-slate-400 font-normal',
      salePriceClass: 'text-slate-400 font-normal line-through',
      time: '4 hrs ago',
      isFlagged: false,
      hasBox: false
    },
    {
      subOrder: '#SUB-075',
      ordId: 'ORD-034',
      productName: 'Logitech MX Master 3S',
      vendor: 'Gulf Electronics',
      productIcon: '🖱️',
      courier: 'Jeebly',
      awb: 'JBY-00290983',
      status: 'Delivered',
      statusClass: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      salePrice: 'AED 210',
      payout: 'AED 183.91',
      time: '5 hrs ago',
      isFlagged: false,
      hasBox: false
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 text-xs font-sans p-6 space-y-6">
      
      {/* HEADER SECTION */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-slate-900">All Orders</h1>
        <div className="flex items-center gap-4">
          {/* Export Action */}
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 font-medium transition shadow-sm">
            <span>📥</span>
            <span>Export</span>
          </button>
          {/* Notification Button */}
          <button className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm text-slate-600 hover:bg-slate-50 transition relative">
            <span>🔔</span>
            <div className="absolute top-1 right-1.5 w-2 h-2 bg-orange-500 rounded-full border border-white" />
          </button>
          {/* Avatar User */}
          <div className="w-8 h-8 rounded-full bg-orange-600 text-white font-bold flex items-center justify-center text-xs shadow-sm">
            ZA
          </div>
        </div>
      </div>

      {/* SUMMARY STATS METRIC ROW */}
      <div className="grid grid-cols-5 gap-4">
        {summaryMetrics.map((metric, idx) => (
          <div key={idx} className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm space-y-1">
            <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">{metric.label}</span>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">{metric.value}</h2>
            <p className={`${metric.subtextColor} text-[11px] font-medium`}>{metric.subtext}</p>
          </div>
        ))}
      </div>

      {/* FILTER CONTROL BAR */}
      <div className="flex justify-between items-center bg-transparent pt-2">
        {/* Left Side Status Tabs */}
        <div className="flex gap-2">
          {tabs.map((tab) => {
            const isActive = tab.name === activeTab;
            return (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 ${
                  isActive 
                    ? 'bg-orange-500 text-white shadow-sm' 
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>{tab.name}</span>
                <span className={`text-[10px] px-1 py-0.2 rounded font-bold ${isActive ? 'bg-orange-600 text-orange-100' : 'bg-slate-100 text-slate-400'}`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Side Query Fields */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="absolute left-3.5 top-2.5 text-slate-400">🔍</span>
            <input 
              type="text" 
              placeholder="Order ID, product, vendor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-orange-100 w-52 text-slate-800 placeholder-slate-400 shadow-sm"
            />
          </div>
          
          <div className="relative">
            <select className="pl-3 pr-8 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-600 appearance-none focus:outline-none cursor-pointer shadow-sm">
              <option>All vendors</option>
            </select>
            <span className="absolute right-3 top-2.5 pointer-events-none text-[10px] text-slate-400">▼</span>
          </div>

          <div className="relative">
            <select className="pl-3 pr-8 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-600 appearance-none focus:outline-none cursor-pointer shadow-sm">
              <option>All couriers</option>
            </select>
            <span className="absolute right-3 top-2.5 pointer-events-none text-[10px] text-slate-400">▼</span>
          </div>

          <div className="relative">
            <select className="pl-3 pr-8 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-600 appearance-none focus:outline-none cursor-pointer shadow-sm">
              <option>Today</option>
            </select>
            <span className="absolute right-3 top-2.5 pointer-events-none text-[10px] text-slate-400">▼</span>
          </div>

          <span className="text-slate-400 text-xs font-medium ml-1">43 orders</span>
        </div>
      </div>

      {/* CORE DATA LEDGER TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/70 text-slate-400 text-[10px] uppercase font-bold border-b border-slate-100 tracking-wider">
              <th className="py-3 px-5 font-bold">Sub-Order</th>
              <th className="py-3 px-4 font-bold">Product</th>
              <th className="py-3 px-4 font-bold">Courier / AWB</th>
              <th className="py-3 px-4 font-bold">Status</th>
              <th className="py-3 px-4 font-bold text-right">Sale Price</th>
              <th className="py-3 px-4 font-bold text-right">Payout</th>
              <th className="py-3 px-4 font-bold">Time</th>
              <th className="py-3 px-5 text-center font-bold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {ordersData.map((order, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                
                {/* Sub-order & Main Order ID */}
                <td className="py-4 px-5 align-middle whitespace-nowrap">
                  <div className="font-bold text-slate-800">{order.subOrder}</div>
                  <div className="text-[10px] text-slate-400 font-medium mt-0.5">{order.ordId}</div>
                </td>

                {/* Product Detail & Vendor Badge */}
                <td className="py-4 px-4 align-middle">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-slate-50 rounded-xl flex items-center justify-center text-sm border border-slate-100 shadow-sm flex-shrink-0">
                      {order.productIcon}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 leading-tight">{order.productName}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5 font-medium">{order.vendor}</div>
                    </div>
                  </div>
                </td>

                {/* Courier and AWB metadata column */}
                <td className="py-4 px-4 align-middle whitespace-nowrap">
                  <div className="text-slate-500 font-medium">{order.courier}</div>
                  {order.awb && (
                    <div className={`text-[10px] mt-0.5 tracking-wide ${order.awbClass ? order.awbClass : 'text-slate-400 uppercase font-semibold'}`}>
                      {order.awb}
                    </div>
                  )}
                </td>

                {/* Status custom micro badge */}
                <td className="py-4 px-4 align-middle whitespace-nowrap">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${order.statusClass}`}>
                    <span className="w-1 h-1 rounded-full bg-current" />
                    {order.status}
                  </span>
                </td>

                {/* Sale Price alignment matrix */}
                <td className={`py-4 px-4 align-middle text-right font-bold text-slate-900 whitespace-nowrap ${order.salePriceClass || ''}`}>
                  {order.salePrice}
                </td>

                {/* Payout metrics column */}
                <td className={`py-4 px-4 align-middle text-right font-bold text-slate-700 whitespace-nowrap ${order.payoutClass || ''}`}>
                  {order.payout}
                </td>

                {/* Dynamic/Relative Time stamps */}
                <td className="py-4 px-4 align-middle text-slate-400 whitespace-nowrap font-medium">
                  {order.time}
                </td>

                {/* Direct Action triggers inside rows */}
                <td className="py-4 px-5 align-middle">
                  <div className="flex items-center justify-center gap-1.5">
                    {/* Inline view eye icon trigger */}
                    <button className="w-7 h-7 bg-white border border-slate-200 rounded-lg flex items-center justify-center hover:bg-slate-50 transition shadow-sm text-slate-500">
                      <span>👁️</span>
                    </button>
                    {/* Conditional warning siren box notification icon */}
                    {order.isFlagged && (
                      <div className="w-7 h-7 bg-red-50 border border-red-100 rounded-lg flex items-center justify-center text-xs animate-pulse">
                        🚨
                      </div>
                    )}
                    {/* Parcel box history tracking layout flag */}
                    {order.hasBox && (
                      <div className="w-7 h-7 bg-amber-50 border border-amber-100 rounded-lg flex items-center justify-center text-xs">
                        📦
                      </div>
                    )}
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FOOTER PAGINATION SYSTEM */}
      <div className="flex justify-between items-center pt-2 text-slate-400 text-xs">
        <span className="font-medium">Showing 8 of 43 orders</span>
        <div className="flex items-center gap-1.5 font-semibold">
          <button className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition shadow-sm text-slate-600">
            ←
          </button>
          <button className="w-8 h-8 rounded-xl bg-orange-500 text-white flex items-center justify-center transition shadow-sm">
            1
          </button>
          <button className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition shadow-sm text-slate-600">
            2
          </button>
          <button className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition shadow-sm text-slate-600">
            3
          </button>
          <button className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition shadow-sm text-slate-600">
            4
          </button>
          <button className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition shadow-sm text-slate-600">
            →
          </button>
        </div>
      </div>

    </div>
  );
}