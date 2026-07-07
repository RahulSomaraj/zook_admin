import {
  useCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
  useRestoreCategory,
} from "../features/catalog/hooks/useCatalog";

import { useState } from "react";

export default function Categories() {

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    icon: "",
    isActive: true,
    sortOrder: 0,
  });

const createCategory = useCreateCategory();
const [editingCategory, setEditingCategory] = useState(null);
const updateCategory = useUpdateCategory();
const handleSave = () => {
  if (editingCategory) {
    updateCategory.mutate({
      id: editingCategory.id,
      payload: formData,
      },
      {
        onSuccess: () => {
          alert("Category updated successfully!");

          setShowModal(false);
          setEditingCategory(null);

          setFormData({
            name: "",
            slug: "",
            icon: "",
            isActive: true,
            sortOrder: 0,
          });
        },

        onError: (error) => {
          alert(
            error?.response?.data?.message ||
              "Failed to update category."
          );
        },
      }
    );
  } else {
    createCategory.mutate(formData, {
      onSuccess: () => {
        alert("Category created successfully!");

        setShowModal(false);

        setFormData({
          name: "",
          slug: "",
          icon: "",
          isActive: true,
          sortOrder: 0,
        });
      },

      onError: (error) => {
        alert(
          error?.response?.data?.message ||
            "Failed to create category."
        );
      },
    });
  }
};

const restoreCategory = useRestoreCategory();
const handleRestore = async (id) => {
  try {
    await restoreCategory.mutateAsync(id);
    alert("Category restored successfully.");
  } catch (error) {
    alert(
      error.response?.data?.message ||
      "Failed to restore category."
    );
  }
};
const deleteCategory = useDeleteCategory();
  const {
    data,
    isLoading,
    isError,
    error,
    } = useCategories({
    includeDeleted: true,
  });

  if (isLoading) {
    return (
      <div className="p-6">
        <p>Loading categories...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6">
        <p className="text-red-600">
          {error?.response?.data?.message || "Failed to load categories."}
        </p>
      </div>
    );
  }

  const categories = data?.data?.items || [];
  const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this category?"
  );

  if (!confirmDelete) return;

  try {
    await deleteCategory.mutateAsync(id);
    alert("Category deleted successfully.");
  } catch (error) {
    alert(
      error.response?.data?.message || "Failed to delete category."
    );
  }
};

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>

        <button onClick={() => {
          setEditingCategory(null);
          setFormData({
            name: "",
            slug: "",
            icon: "",
            isActive: true,
            sortOrder: 0,
          });
          setShowModal(true);
          }}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg">
            + Add Category
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="min-w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Slug</th>
              <th className="px-4 py-3 text-left">Icon</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Sort Order</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-8 text-center text-gray-500"
                >
                  No categories found.
                </td>
              </tr>
            ) : (
              categories.map((category) => (
                <tr
                  key={category.id}
                  className={`border-t ${
                  category.deletedAt
                  ? "bg-gray-100 text-gray-400"
                  : "hover:bg-slate-50"
                  }`}>
                  <td className="px-4 py-3">{category.name}</td>
                  <td className="px-4 py-3">{category.slug}</td>
                  <td className="px-4 py-3">{category.icon}</td>
                  <td className="px-4 py-3">
                    {category.deletedAt
                      ? "Deleted"
                      : category.isActive
                      ? "Active"
                      : "Inactive"}
                  </td>
                  <td className="px-4 py-3">{category.sortOrder}</td>
                  
                  <td className="px-4 py-3">{category.deletedAt ? (
                    <button onClick={() => handleRestore(category.id)}
                      className="text-green-600">
                        Restore
                    </button>
                      ) : (
                      <>
                    <button onClick={() => {
                      setEditingCategory(category);
                      setFormData({
                        name: category.name,
                        slug: category.slug,
                        icon: category.icon,
                        isActive: category.isActive,
                        sortOrder: category.sortOrder,
                        });
                      setShowModal(true);
                      }}
                      className="text-blue-600 mr-3">
                      Edit
                    </button>

                    <button onClick={() => handleDelete(category.id)}
                      className="text-red-600">
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
        {editingCategory ? "Edit Category" : "Add Category"}
      </h2>

      <div className="space-y-3">

        <input
          className="w-full border rounded-lg p-2"
          placeholder="Category Name"
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
          placeholder="Icon (📱)"
          value={formData.icon}
          onChange={(e) =>
            setFormData({
              ...formData,
              icon: e.target.value,
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
          onClick={() => {
            setShowModal(false);
            setEditingCategory(null);
            setFormData({
              name: "",
              slug: "",
              icon: "",
              isActive: true,
              sortOrder: 0,
            });
          }}
          className="border px-4 py-2 rounded-lg">
          Cancel
        </button>

        <button onClick={handleSave}
          disabled={createCategory.isPending}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg disabled:opacity-50">
          {createCategory.isPending || updateCategory.isPending
            ? "Saving..."
            : editingCategory
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