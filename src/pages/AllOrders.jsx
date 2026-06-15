import { Download, Bell, Search } from "lucide-react";

export default function AllOrders() {
  return (
<div className="bg-slate-50 min-h-screen p-6 font-sans">      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            All Orders
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Export Button */}
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-lg">
            Export
          </button>

          {/* Bell Icon */}
          <button className="w-10 h-10 bg-white rounded-lg border border-slate-200 flex items-center justify-center">
            🔔
          </button>

          {/* Profile */}
            <div className="w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
              ZA
            </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div>
      <div className="grid grid-cols-5 gap-3 mb-5">
        <div className="bg-white rounded-xl p-4 border border-slate-300">
          <p className="text-[10px] text-slate-400 font-bold">
            TOTAL TODAY
          </p>
          <h2 className="text-2xl font-bold mt-1">43</h2>
          <p className="text-green-500 text-xs">
            ↑ 11 vs yesterday
          </p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-300">
          <p className="text-[10px] text-slate-400 font-bold">
            CONFIRMED
          </p>
          <h2 className="text-2xl font-bold mt-1">12</h2>
          <p className="text-xs text-slate-500">
            Awaiting packing
          </p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-300">
          <p className="text-[10px] text-slate-400 font-bold">
            IN TRANSIT
          </p>
          <h2 className="text-2xl font-bold mt-1">18</h2>
          <p className="text-xs text-slate-500">
            With couriers
          </p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-300">
          <p className="text-[10px] text-slate-400 font-bold">
            DELIVERED
          </p>
          <h2 className="text-2xl font-bold mt-1">9</h2>
          <p className="text-green-500 text-xs">
            Today
          </p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-300">
          <p className="text-[10px] text-slate-400 font-bold">
            CANCELLED
          </p>
          <h2 className="text-2xl font-bold mt-1">4</h2>
          <p className="text-red-500 text-xs">
            Today
          </p>
        </div>
      </div>

      {/* Status + Filters Row */}
      <div className="flex items-center gap-3 flex-wrap mb-5">
        <div className="bg-white rounded-xl p-4 border border-slate-200">
        <button className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium">
          All
        </button>

        <button className="bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm">
          Confirmed
        </button>

        <button className="bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm">
          Preparing
        </button>

        <button className="bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm">
          Shipped
        </button>

        <button className="bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm">
          Delivered
        </button>

        <button className="bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm">
          Cancelled
        </button>
        </div>

        {/* Search */}
        <div className="relative ml-3">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Order Id,product,vendor..."
            className="pl-9 pr-3 py-2 border border-slate-200 rounded-lg bg-white text-sm w-40 outline-none"
          />
        </div>

        {/* Vendor */}
        <select className="border border-slate-200 rounded-lg px-3 py-2 bg-white text-sm">
          <option>All Vendors</option>
        </select>

        {/* Courier */}
        <select className="border border-slate-200 rounded-lg px-3 py-2 bg-white text-sm">
          <option>All Couriers</option>
        </select>

        {/* Date */}
        <select className="border border-slate-200 rounded-lg px-3 py-2 bg-white text-sm">
          <option>Today</option>
        </select>
      </div>
    </div>
    </div>
  );
}