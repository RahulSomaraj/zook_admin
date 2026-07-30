
import { useState } from "react";
export default function Variants() {
    const [openModal, setOpenModal] = useState(false);
  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Product Specifications
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage product specifications like Color, RAM, Storage, etc.
          </p>
        </div>

        <button
  onClick={() => setOpenModal(true)}
  className="rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-orange-600 transition"
>
  + Add New Specification
</button>
      </div>

      {/* Table Card */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Specification Name
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td
                colSpan={2}
                className="px-6 py-10 text-center text-sm text-gray-500"
              >
                No specifications added yet.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {openModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
      <h2 className="text-xl font-semibold text-gray-900">
        Add New Specification
      </h2>

      <div className="mt-5">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Specification Name
        </label>

        <input
          type="text"
          placeholder="Enter specification name"
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-orange-500 focus:outline-none"
        />
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={() => setOpenModal(false)}
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
  );
}