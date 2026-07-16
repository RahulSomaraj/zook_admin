import {
  useBrands,
  useCreateBrand,
  useUpdateBrand,
  useDeleteBrand,
  useRestoreBrand,
} from "../features/catalog/hooks/useCatalog";

import { useState, useEffect } from "react";
import { uploadNewImage } from "../features/storage/utils/uploadImage";

import {
  Search,
  ChevronDown,
  Plus,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

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

function EditBrandPanel({ brand, onClose, onSave, isPending }) {
  const [form, setForm] = useState({
    name: brand.name,
    slug: brand.slug,
    logoUrl: brand.logoUrl || "",
    isActive: brand.isActive,
    sortOrder: brand.sortOrder,
  });

  useEffect(() => {
    setForm({
      name: brand.name,
      slug: brand.slug,
      logoUrl: brand.logoUrl || "",
      isActive: brand.isActive,
      sortOrder: brand.sortOrder,
    });
  }, [brand]);

  return (
    <div className="w-full lg:w-[340px] lg:min-w-[320px] lg:max-w-[360px] lg:flex-shrink-0 bg-white border-l border-slate-100 flex flex-col overflow-y-auto max-h-screen">
      <div className="px-5 pt-6 pb-4">

        <div className="flex justify-between items-center mb-5">
          <h3 className="text-[15px] font-bold">
            {brand.id ? "Edit Brand" : "Add Brand"}
          </h3>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            ✕
          </button>
        </div>

        <SectionLabel>BASIC DETAILS</SectionLabel>

        <FormField label="Brand Name">
          <input
            className={inputCls}
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
        </FormField>

        <FormField label="Slug">
          <input
            className={inputCls}
            value={form.slug}
            onChange={(e) =>
              setForm({ ...form, slug: e.target.value })
            }
          />
        </FormField>

        <FormField label="Brand Logo">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
            const file = e.target.files[0];

            setForm({
              ...form,
              logoFile: file,
              logoUrl: file ? URL.createObjectURL(file) : form.logoUrl,
              });
            }}/>
        </FormField>
        {form.logoUrl && (
          <img
            src={form.logoUrl}
            alt="Brand Logo"
            className="w-16 h-16 mt-3 rounded-lg border object-contain"/>
        )}

        <FormField label="Sort Order">
          <input
            type="number"
            className={inputCls}
            value={form.sortOrder}
            onChange={(e) =>
              setForm({
                ...form,
                sortOrder: Number(e.target.value),
              })
            }
          />
        </FormField>

        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="border px-4 py-2 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={() => onSave(form)}
            disabled={isPending}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg"
          >
            {isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>

      </div>
    </div>
  );
}

export default function Brands() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error } = useBrands({
    includeDeleted: true,
  });

const [formData, setFormData] = useState({
  name: "",
  slug: "",
  logoUrl: "",
  isActive: true,
  sortOrder: 0,
});

const [editingBrand, setEditingBrand] = useState(null);
const emptyBrand = {
  id: null,
  name: "",
  slug: "",
  logoUrl: "",
  isActive: true,
  sortOrder: 0,
};

const createBrand = useCreateBrand();
const updateBrand = useUpdateBrand();
const deleteBrand = useDeleteBrand();
const restoreBrand = useRestoreBrand();

const handleSave = async (form) => {
  let logoUrl = form.logoUrl;
  if (form.logoFile) {
  logoUrl = await uploadNewImage(
  form.logoFile,
  "brand_logos"
  );
}
  const payload = {
  ...form,
  logoUrl,
  };
  delete payload.logoFile;

  if (editingBrand?.id) {
    updateBrand.mutate(
      {
        id: editingBrand.id,
        payload,
      },
      {
        onSuccess: () => {
          alert("Brand updated successfully!");
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
  const filtered = brands.filter((brand) =>
  brand.name.toLowerCase().includes(search.toLowerCase())
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
    <div className="flex min-h-screen">
     <div className="flex-1 bg-slate-50 text-slate-700 p-6">

  {/* Header */}
  <header className="flex justify-between items-center mb-8">
    <div>
      <div>
              <h1 className="text-[22px] font-extrabold text-slate-900 m-0">Brands</h1>
              <p className="text-[13px] text-slate-400 mt-1 m-0">
                Create and manage brands used in the product catalog
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
      style={{ background: "#FF4500" }}>
        ZA
    </div>
  </div>
</header>

  {/* Search */}
  <div className="flex justify-between items-center mb-6">
    <div className="relative">
      <Search
        size={14}
        className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"/>
        <input
          type="text"
          placeholder="Search brands..."
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
          setEditingBrand(emptyBrand);
          }}
          className="flex items-center gap-1.5 text-white font-bold text-[13px] px-[18px] py-[9px] rounded-full hover:opacity-90 transition"
          style={{
          background: "#FF4500",
          boxShadow: "0 3px 10px rgba(255,69,0,0.22)",
          }}>
          <Plus size={14} />
            Add Brand
      </button>
    </div>
  </div>
  {/* Table */}
  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-100 text-[11px] uppercase text-slate-400">
            <th className="py-3 px-6 text-left">
              Name
            </th>
            <th className="py-3 px-6 text-left">
              Slug
            </th>
            <th className="py-3 px-6 text-center">
              Logo
            </th>
            <th className="py-3 px-6 text-left">
              Status
            </th>
            <th className="py-3 px-6 text-left">
              Sort Order
            </th>
            <th className="py-3 px-6 text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className="py-10 text-center text-gray-500"
              >
                No brands found.
              </td>
            </tr>
          ) : (
            paged.map((brand) => (
              <tr
                key={brand.id}
                className={`border-b border-slate-100 hover:bg-slate-50 ${
                  brand.deletedAt ? "bg-gray-50 text-gray-400" : ""
                }`}>
                {/* Name */}
                <td className="py-4 px-6">
                  <span className="font-medium">
                    {brand.name}
                  </span>
                </td>

                {/* Slug */}
                <td className="py-4 px-6 text-slate-600">
                  {brand.slug}
                </td>

                {/* Logo */}
                <td className="py-4 px-6">
                  <div className="flex justify-center">
                    <div className="w-9 h-9 rounded-full border border-slate-200 bg-white flex items-center justify-center overflow-hidden">
                      {brand.logoUrl ? (
                        <img
                          src={brand.logoUrl}
                          alt={brand.name}
                          className="w-7 h-7 object-contain"
                        />
                      ) : (
                        <span className="text-xs text-slate-400">
                          No Logo
                        </span>
                      )}
                    </div>
                  </div>
                </td>

                {/* Status */}
                <td className="py-4 px-6">
                  {brand.deletedAt ? (
                    <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-medium">
                      Deleted
                    </span>
                  ) : brand.isActive ? (
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                      Active
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">
                      Inactive
                    </span>
                  )}
                </td>

                {/* Sort Order */}
                <td className="py-4 px-6">
                  {brand.sortOrder}
                </td>

                {/* Actions */}
                <td className="py-4 px-6">
                  {brand.deletedAt ? (
                    <button
                      onClick={() => handleRestore(brand.id)}
                      className="text-green-600 hover:text-green-700 font-medium"
                    >
                      Restore
                    </button>
                  ) : (
                    <div className="flex justify-end gap-2">

                      <button onClick={() => {
                        setEditingBrand(brand);
                        setFormData({
                          name: brand.name,
                          slug: brand.slug,
                          logoUrl: brand.logoUrl || "",
                          isActive: brand.isActive,
                          sortOrder: brand.sortOrder,
                          });
                        }}
                        className="p-2 rounded-lg border hover:bg-orange-50 hover:text-orange-600">
                        <Pencil size={15} />
                      </button>

                      <button
                        onClick={() => handleDelete(brand.id)}
                        className="p-2 rounded-lg border hover:bg-red-50 hover:text-red-600"
                      >
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

{editingBrand && (
  <EditBrandPanel
    brand={editingBrand}
    onClose={() => setEditingBrand(null)}
    onSave={handleSave}
    isPending={
      createBrand.isPending ||
      updateBrand.isPending
    }
  />
)}
  </div>
  );
}