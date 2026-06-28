import {
  useVendors,
  useUpdateVendorStatus,
} from "../hooks/useVendors";

export default function VendorList() {
  const {
    data,
    isLoading,
    isError,
  } = useVendors();

  const {
    mutate: updateStatus,
  } = useUpdateVendorStatus();

  const handleApprove = (id) => {
  updateStatus({
    id,
    status: "approved",
  });
};

  const handleReject = (id) => {
    updateStatus({
      id,
      status: "suspended",
    });
  };

  if (isLoading) {
    return <div className="p-6">Loading vendors...</div>;
  }

  if (isError) {
    return (
      <div className="p-6 text-red-500">
        Failed to load vendors.
      </div>
    );
  }

  const vendors = data?.items || [];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Vendor List
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Store Name</th>
              <th className="p-3 text-left">Owner</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Commission</th>
              <th className="p-3 text-left">Products</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {vendors.map((vendor) => (
              <tr
                key={vendor.id}
                className="border-t"
              >
                <td className="p-3">
                  {vendor.storeName}
                </td>

                <td className="p-3">
                  {vendor.user?.fullName}
                </td>

                <td className="p-3">
                  {vendor.user?.email}
                </td>

                <td className="p-3">
                  {vendor.user?.phone}
                </td>

                <td className="p-3">
                  {vendor.commissionRate}%
                </td>

                <td className="p-3">
                  {vendor._count?.products}
                </td>

                <td className="p-3">
                  {vendor.status}
                </td>

                <td className="p-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApprove(vendor.id)}
                      className="px-3 py-1 bg-green-600 text-white rounded"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => handleReject(vendor.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded"
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}