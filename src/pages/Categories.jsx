import {
  useCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
  useRestoreCategory,
  useCreateCategorySpecification,
  useCategorySpecifications,
} from "../features/catalog/hooks/useCatalog";

import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Smartphone,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import EditCategoryPanel from "../features/catalog/components/EditCategoryPanel";

function SectionLabel({ children }) {
  return (
    <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mt-4 mb-2.5">
      {children}
    </p>
  );
}

function FormField({ label, children }) {
  return (
    <div className="mb-3">
      <label className="block text-xs font-semibold text-gray-700 mb-1">{label}</label>
      {children}
    </div>
  );
}

// Shared input / select class
const inputCls =
  "w-full border border-slate-200 rounded-lg px-2.5 py-2 text-[13px] text-slate-900 bg-white outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition";




export default function Categories() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const createCategory = useCreateCategory();
  const createCategorySpecification = useCreateCategorySpecification();
  const [editingCategory, setEditingCategory] = useState(null);
  const emptyCategory = {
    id: null,
    name: "",
    slug: "",
    icon: "",
    isActive: true,
    sortOrder: 0,
  };
  const updateCategory = useUpdateCategory();
  const handleSave = async (form, specifications) => {
  if (editingCategory?.id) {
    updateCategory.mutate({
      id: editingCategory.id,
      payload: form,
      },
      {
        onSuccess: () => {
          alert("Category updated successfully!");
          setEditingCategory(null);
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
  try {
    const response = await createCategory.mutateAsync(form);

    const categoryId = response.data.id;

    for (let i = 0; i < specifications.length; i++) {
  const spec = specifications[i];

  if (!spec.label.trim()) continue;

  await createCategorySpecification.mutateAsync({
    categoryId,
    label: spec.label,
    sortOrder: i,
    isActive: true,
  });
}
alert("Category created successfully!");
setEditingCategory(null);
  } catch (error) {
    alert(
      error?.response?.data?.message ||
        "Failed to create category."
    );
  }
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
  const filtered = categories.filter((category) =>
  category.name.toLowerCase().includes(search.toLowerCase())
);

const itemsPerPage = 10;
const totalPages = Math.max(
  1,
  Math.ceil(filtered.length / itemsPerPage)
);

const paged = filtered.slice(
  (page - 1) * itemsPerPage,
  page * itemsPerPage
);
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
  <div className="flex min-h-screen">
    <div className="flex-1 bg-slate-50 text-slate-700 p-6">

  {/* Header */}
  <header className="flex justify-between items-center mb-8">

    <div>
      <div>
              <h1 className="text-[22px] font-extrabold text-slate-900 m-0">Categories</h1>
              <p className="text-[13px] text-slate-400 mt-1 m-0">
                Create and organize product categories for consistent classification
              </p>
            </div>
    </div>

    <div className="flex items-center gap-2">

  {/* Notification */}
  <button className="w-9 h-9 rounded-[10px] flex items-center justify-center border border-[#EBEBEB] text-base cursor-pointer relative">
    🔔
    <span className="absolute top-1.5 right-1.5 w-[7px] h-[7px] bg-[#FF4500] rounded-full border-[1.5px] border-white" />
  </button>

  {/* ZA Avatar */}
  <div
    className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[13px] font-bold cursor-pointer select-none flex-shrink-0"
    style={{ background: "#FF4500" }}
  >
    ZA
  </div>

</div>

  </header>

{/* Search & Add Button */}
  <div className="flex justify-between items-center mb-6">
    <div className="relative">
      <Search
        size={14}
        className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"/>
        <input
          type="text"
          placeholder="Search categories..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="border border-slate-200 rounded-lg py-2 pl-8 pr-3 text-[13px] w-60 text-slate-900 outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition"/>
    </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => {
          setEditingCategory(emptyCategory);
          }}
          className="flex items-center gap-1.5 text-white font-bold text-[13px] px-[18px] py-[9px] rounded-full hover:opacity-90 transition"
          style={{
            background: "#FF4500",
            boxShadow: "0 3px 10px rgba(255,69,0,0.22)",
            }}>
            <Plus size={14} />Add Category
        </button>
      </div>
  </div>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-semibold tracking-wider uppercase text-slate-400">
                <th className="py-3 px-6">Name</th>
                <th className="py-3 px-6">Slug</th>
                <th className="py-3 px-6 text-center">Icon</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6">Sort Order</th>
                <th className="py-3 px-6 text-right pr-8"> Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-8 text-center text-gray-500">No categories found.
                </td>
              </tr>
              ) : (
              paged.map((category) => (
                <tr
                  key={category.id}
                  className={`border-b border-slate-100 transition-colors ${
                  category.deletedAt
                  ? "bg-gray-50 text-gray-400"
                  : "hover:bg-slate-50/60"
                  }`}>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-600">
                        {category.icon ? (
                        <span className="text-sm">{category.icon}</span>
                        ) : (
                          <Smartphone size={16} />
                          )}
                      </div>
                        <span className="font-medium text-slate-900">
                          {category.name}
                        </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">{category.slug}</td>
                  <td className="py-4 px-6">
                    <div className="flex justify-center">
                      <div className="w-8 h-8 rounded-full bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-600">
                        {category.icon ? (
                        <span className="text-sm">{category.icon}</span>
                          ) : (
                        <Smartphone size={15} />
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">{category.deletedAt ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                      Deleted
                    </span>
                    ) : category.isActive ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                      Active
                    </span>
                    ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
                      Inactive
                    </span>
                    )}
                  </td>
                  <td className="px-4 py-3">{category.sortOrder}</td>
                  
                  <td className="py-4 px-6">{category.deletedAt ? (
                    <button onClick={() => handleRestore(category.id)}
                      className="text-green-600 hover:text-green-700 font-medium">
                        Restore
                    </button>
                      ) : (
                      <div className="flex justify-end gap-2">
                        <button onClick={() => {
                          setEditingCategory(category);
                          }}
                          className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-orange-50 hover:text-orange-600 transition-colors">
                          <Pencil size={15} />
                        </button>
                        <button onClick={() => handleDelete(category.id)}
                          className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-red-50 hover:text-red-600 transition-colors">
                          <Trash2 size={15} />
                        </button>
                      </div>
                      )}
                    </td>
                </tr>
              ))
            )}
            </tbody>
          </table>
        </div>
      </div>
  {/* ── Pagination ── */}
<div className="flex justify-between items-center mt-4 pb-2">
  <span className="text-xs text-slate-400">
    Showing {paged.length} of {filtered.length} brands
  </span>

  <div className="flex gap-1 items-center">
    {/* Prev */}
    <button
      onClick={() => setPage((p) => Math.max(1, p - 1))}
      disabled={page === 1}
      className="border border-slate-200 rounded-lg p-1.5 text-gray-700 hover:bg-slate-50 disabled:text-slate-300 disabled:cursor-not-allowed transition"
    >
      <ChevronLeft size={14} />
    </button>

    {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
      <button
        key={n}
        onClick={() => setPage(n)}
        className={`rounded-lg px-3 py-1.5 text-[13px] transition ${
          n === page
            ? "bg-orange-500 text-white font-bold border-none"
            : "border border-slate-200 text-gray-700 hover:bg-slate-50"
        }`}
      >
        {n}
      </button>
    ))}

    {/* Next */}
    <button
      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
      disabled={page === totalPages}
      className="border border-slate-200 rounded-lg p-1.5 text-gray-700 hover:bg-slate-50 disabled:text-slate-300 disabled:cursor-not-allowed transition"
    >
      <ChevronRight size={14} />
    </button>
  </div>
</div>
    </div>   {/* closes flex-1 */}

{editingCategory && (
  <EditCategoryPanel
    category={editingCategory}
    onClose={() => setEditingCategory(null)}
    onSave={handleSave}
    isPending={
      createCategory.isPending ||
      updateCategory.isPending
    }
  />
)}
  </div>
  );
}