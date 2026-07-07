import {
  useBrands,
  useCreateBrand,
  useUpdateBrand,
  useDeleteBrand,
  useRestoreBrand,
} from "../features/catalog/hooks/useCatalog";

import { useState } from "react";

export default function Brands() {
  const { data, isLoading, isError, error } = useBrands({
    includeDeleted: true,
  });

const [showModal, setShowModal] = useState(false);
const [formData, setFormData] = useState({
  name: "",
  slug: "",
  logoUrl: "",
  isActive: true,
  sortOrder: 0,
});

const [editingBrand, setEditingBrand] = useState(null);

const createBrand = useCreateBrand();
const updateBrand = useUpdateBrand();
const deleteBrand = useDeleteBrand();
const restoreBrand = useRestoreBrand();

const handleSave = () => {
  const payload = { ...formData };

  if (!payload.logoUrl) {
    delete payload.logoUrl;
  }

  if (editingBrand) {
    updateBrand.mutate(
      {
        id: editingBrand.id,
        payload,
      },
      {
        onSuccess: () => {
          alert("Brand updated successfully!");

          setShowModal(false);
          setEditingBrand(null);

          setFormData({
            name: "",
            slug: "",
            logoUrl: "",
            isActive: true,
            sortOrder: 0,
          });
        },

        onError: (error) => {
          alert(
            error?.response?.data?.message ||
              "Failed to update brand."
          );
        },
      }
    );
  } else {
    createBrand.mutate(payload, {
      onSuccess: () => {
        alert("Brand created successfully!");

        setShowModal(false);

        setFormData({
          name: "",
          slug: "",
          logoUrl: "",
          isActive: true,
          sortOrder: 0,
        });
      },

      onError: (error) => {
        alert(
          error?.response?.data?.message ||
            "Failed to create brand."
        );
      },
    });
  }
};

  if (isLoading) {
    return (
      <div className="p-6">
        <p>Loading brands...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6">
        <p className="text-red-600">
          {error?.response?.data?.message || "Failed to load brands."}
        </p>
      </div>
    );
  }

  const brands = data?.data?.items || [];
  const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this brand?"
  );

  if (!confirmDelete) return;

  try {
    await deleteBrand.mutateAsync(id);
    alert("Brand deleted successfully.");
  } catch (error) {
    alert(
      error?.response?.data?.message ||
      "Failed to delete brand."
    );
  }
};
const handleRestore = async (id) => {
  try {
    await restoreBrand.mutateAsync(id);
    alert("Brand restored successfully.");
  } catch (error) {
    alert(
      error?.response?.data?.message ||
      "Failed to restore brand."
    );
  }
};

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Brands</h1>
          <button onClick={() => {setEditingBrand(null);
            setFormData({
              name: "",
              slug: "",
              logoUrl: "",
              isActive: true,
              sortOrder: 0,
              });
            setShowModal(true);
            }}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg">
             + Add Brand
          </button>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="min-w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Slug</th>
              <th className="px-4 py-3 text-left">Logo</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Sort Order</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {brands.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                  No brands found.
                </td>
              </tr>
            ) : (
              brands.map((brand) => (
                <tr
                  key={brand.id}
                  className={`border-t ${
                    brand.deletedAt
                      ? "bg-gray-100 text-gray-400"
                      : "hover:bg-slate-50"
                  }`}
                >
                  <td className="px-4 py-3">{brand.name}</td>
                  <td className="px-4 py-3">{brand.slug}</td>
                  <td className="px-4 py-3">{brand.logoUrl || "No Logo"}</td>
                  <td className="px-4 py-3">
                    {brand.deletedAt
                      ? "Deleted"
                      : brand.isActive
                      ? "Active"
                      : "Inactive"}
                  </td>
                  <td className="px-4 py-3">{brand.sortOrder}</td>
                  <td className="px-4 py-3">{brand.deletedAt ? (
                  <button
                    onClick={() => handleRestore(brand.id)}
                    className="text-green-600">
                      Restore
                  </button>
                    ) : (
                      <>
                  <button onClick={() => {
                    setEditingBrand(brand);
                    setFormData({
                      name: brand.name,
                      slug: brand.slug,
                      logoUrl: brand.logoUrl || "",
                      isActive: brand.isActive,
                      sortOrder: brand.sortOrder,
                      });
                    setShowModal(true);
                    }}
                    className="text-blue-600">
                    Edit
                  </button>

                  <button onClick={() => handleDelete(brand.id)}
                    className="text-red-600 ml-3">
                    Delete
                  </button>
                    </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {showModal && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
    <div className="bg-white rounded-xl p-6 w-[420px]">

      <h2 className="text-xl font-bold mb-4">
        {editingBrand ? "Edit Brand" : "Add Brand"}
      </h2>

      <div className="space-y-3">

        <input
          className="w-full border rounded-lg p-2"
          placeholder="Brand Name"
          value={formData.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value,
            })
          }
        />

        <input
          className="w-full border rounded-lg p-2"
          placeholder="Slug"
          value={formData.slug}
          onChange={(e) =>
            setFormData({
              ...formData,
              slug: e.target.value,
            })
          }
        />

        <input
          className="w-full border rounded-lg p-2"
          placeholder="Logo URL"
          value={formData.logoUrl}
          onChange={(e) =>
            setFormData({
              ...formData,
              logoUrl: e.target.value,
            })
          }
        />

        <input
          type="number"
          className="w-full border rounded-lg p-2"
          placeholder="Sort Order"
          value={formData.sortOrder}
          onChange={(e) =>
            setFormData({
              ...formData,
              sortOrder: Number(e.target.value),
            })
          }
        />

      </div>

      <div className="flex justify-end gap-3 mt-6">

        <button
          onClick={() => setShowModal(false)}
          className="border px-4 py-2 rounded-lg"
        >
          Cancel
        </button>

        <button
          onClick={handleSave}
          disabled={createBrand.isPending}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg disabled:opacity-50">
          {createBrand.isPending || updateBrand.isPending
            ? "Saving..."
            : editingBrand
            ? "Update"
            : "Save"}
        </button>

      </div>

    </div>
  </div>
)}
    </div>
  );
}