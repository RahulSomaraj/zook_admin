import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { useCategorySpecifications,
        useDeleteCategorySpecification,
       } from "../hooks/useCatalog";

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
const inputCls =
  "w-full border border-slate-200 rounded-lg px-2.5 py-2 text-[13px] text-slate-900 bg-white outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition";

export default function EditCategoryPanel({
  category,
  onClose,
  onSave,
  isPending,
}) {
  const [form, setForm] = useState({
    name: category.name,
    slug: category.slug,
    icon: category.icon || "",
    isActive: category.isActive,
    sortOrder: category.sortOrder,
  });
  const [specifications, setSpecifications] = useState([]);
  const { data: specificationData } = useCategorySpecifications(category?.id);
  const deleteSpecification = useDeleteCategorySpecification();

  useEffect(() => {
    setForm({
      name: category.name,
      slug: category.slug,
      icon: category.icon || "",
      isActive: category.isActive,
      sortOrder: category.sortOrder,
    });
  }, [category]);

  useEffect(() => {
  if (specificationData?.data?.items) {
    setSpecifications(
      specificationData.data.items.map((item) => ({
        id: item.id,
        label: item.label,
      }))
    );
  }
}, [specificationData]);

  return (
    <div className="w-full lg:w-[340px] lg:min-w-[320px] lg:max-w-[360px] lg:flex-shrink-0 bg-white border-l border-slate-100 flex flex-col overflow-y-auto max-h-screen">
      <div className="px-5 pt-6 pb-4">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-[15px] font-bold">
            {category.id ? "Edit Category" : "Add Category"}
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600">
            ✕
          </button>
        </div>
        <SectionLabel>BASIC DETAILS</SectionLabel>
        <FormField label="Category Name">
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
            }/>
        </FormField>
        <FormField label="Icon">
          <input
            className={inputCls}
            value={form.icon}
            onChange={(e) =>
              setForm({ ...form, icon: e.target.value })
            }/>
        </FormField>
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
        <div className="mb-4">
  <label className="block text-xs font-semibold text-gray-700 mb-2">
    Specifications
  </label>
  {specifications.map((spec, index) => (
  <div key={index} className="flex items-center gap-2 mb-2">
  <input
    type="text"
    placeholder="Enter specification"
    value={spec.label}
    onChange={(e) => {
      const updated = [...specifications];
      updated[index].label = e.target.value;
      setSpecifications(updated);
    }}
    className={inputCls}
  />

  <button
    type="button"
    onClick={async () => {
  const spec = specifications[index];

  try {
    if (spec.id) {
      await deleteSpecification.mutateAsync(spec.id);
    }

    setSpecifications(
      specifications.filter((_, i) => i !== index)
    );
  } catch (error) {
    alert(
      error?.response?.data?.message ||
      "Failed to delete specification."
    );
  }
}}
    className="w-9 h-9 rounded-lg border border-slate-200 hover:bg-red-50 hover:text-red-600"
  >
    ✕
  </button>
</div>
))}

  <button
  type="button"
  disabled={specifications.length >= 6}
  onClick={() => {
    if (specifications.length < 6) {
      setSpecifications([
        ...specifications,
        { label: "" },
      ]);
    }
  }}
  className={`flex items-center gap-2 ${
    specifications.length >= 6
      ? "text-gray-400 cursor-not-allowed"
      : "text-orange-500 hover:text-orange-600"
  }`}
>
  <Plus size={16} />
  <span className="text-sm font-medium">
    Add Specification
  </span>
</button>
</div>
        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="border px-4 py-2 rounded-lg">
            Cancel
          </button>
          <button
            onClick={() => onSave(form, specifications)}
            disabled={isPending}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg">
            {isPending
              ? "Saving..."
              : category.id
              ? "Save Changes"
              : "Create Category"}
          </button>
        </div>
      </div>
    </div>
  );
}