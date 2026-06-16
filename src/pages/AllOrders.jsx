import { Bell, Search } from "lucide-react";
import ordersData from "../data/ordersData";

export default function AllOrders() {
  return (
<div className="bg-slate-50 min-h-screen p-6 font-sans">      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 tracking-tight">
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
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            TOTAL TODAY
          </p>
          <h2 className="text-3xl font-semibold text-slate-900 mt-2">43</h2>
          <p className="text-green-500 text-xs">
            ↑ 11 vs yesterday
          </p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-300">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            CONFIRMED
          </p>
          <h2 className="text-3xl font-semibold text-slate-900 mt-2">12</h2>
          <p className="text-xs text-slate-500">
            Awaiting packing
          </p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-300">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            IN TRANSIT
          </p>
          <h2 className="text-3xl font-semibold text-slate-900 mt-2">18</h2>
          <p className="text-xs text-slate-500">
            With couriers
          </p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-300">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            DELIVERED
          </p>
          <h2 className="text-3xl font-semibold text-slate-900 mt-2">9</h2>
          <p className="text-green-500 text-xs">
            Today
          </p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-300">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            CANCELLED
          </p>
          <h2 className="text-3xl font-semibold text-slate-900 mt-2">4</h2>
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
      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr className="text-left text-sm text-slate-500">
              <th className="p-4">Sub Order</th>
              <th className="p-4">Product</th>
              <th className="p-4">Courier / AWB</th>
              <th className="p-4">Status</th>
              <th className="p-4">Sale Price</th>
              <th className="p-4">Payout</th>
              <th className="p-4">Time</th>
            </tr>
          </thead>

          <tbody>
            {ordersData.map((order) => (
              <tr
                key={order.subOrderId}
                className="border-t border-slate-200"
              >
                <td className="p-4">
                  <div className="font-semibold">
                    {order.subOrderId}
                  </div>
                  <div className="text-xs text-slate-500">
                    {order.orderId}
                  </div>
                </td>

                <td className="p-4">
                  <div className="font-medium">
                    {order.product}
                  </div>
                  <div className="text-xs text-slate-500">
                    {order.vendor}
                  </div>
                </td>

                <td className="p-4">
                  <div>{order.courier}</div>
                  <div className="text-xs text-slate-500">
                    {order.awb}
                  </div>
                </td>

                <td className="p-4">
                  {order.status}
                </td>

                <td className="p-4">
                  AED {order.salePrice}
                </td>

                <td className="p-4">
                  AED {order.payout}
                </td>

                <td className="p-4">
                  {order.time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}