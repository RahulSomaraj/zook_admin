import {
  useCatalogProducts,
  useCatalogProduct,
  useCategories,
  useBrands,
  useCreateCatalogProduct,
  useUpdateCatalogProduct,
  useDeleteCatalogProduct,
  useRestoreCatalogProduct,
} from "../features/catalog/hooks/useCatalog";

import {
  getSignedUploadUrl,
  getSignedDownloadUrl,
  uploadFile,
} from "../features/storage/api/storageApi";

import { useState, useEffect } from "react";
import {Search,ChevronDown,Plus,Eye,Pencil,Trash2,X,Lock,ChevronLeft,ChevronRight,Bell,
} from "lucide-react";

// ─── Dummy Data ───────────────────────────────────────────────────────────────
const PRODUCTS = [
  {
    id: 1,
    brand: "Apple",
    model: "iPhone 14 Pro",
    category: "Smartphones",
    year: 2022,
    //priceRange: "₹80,000 - ₹1,20,000",
    variants: ["128GB", "256GB", "512GB", "1TB"],
    colours: ["Deep Purple", "Gold", "Silver", "Space Black"],
    activeListings: 14,
    status: "Active",
    specs: ["A16 Bionic", '6.1" ProMotion', "48MP camera", "ProRes video"],
    description:
      "The iPhone 14 Pro features Apple's A16 Bionic chip, a 48MP main camera, and the new Dynamic Island notch design. Available in 128GB, 256GB, 512GB and 1TB storage options.",
    image: null,
  },
  {
    id: 2,
    brand: "Apple",
    model: "iPhone 13 Mini",
    category: "Smartphones",
    year: 2021,
    variants: ["128GB", "256GB", "512GB"],
    colours: ["Midnight", "Starlight", "Red"],
    activeListings: 8,
    status: "Active",
    specs: ["A15 Bionic", '5.4" Super Retina', "Dual camera"],
    description:
      "The iPhone 13 Mini packs the powerful A15 Bionic chip into a compact 5.4-inch design, featuring dual cameras and all-day battery life.",
    image: null,
  },
  {
    id: 3,
    brand: "Sony",
    model: "PlayStation 5 Console",
    category: "Gaming",
    year: 2020,
    variants: ["Standard", "Digital Edition", "Slim"],
    colours: ["White", "Black"],
    activeListings: 22,
    status: "Active",
    specs: ["AMD Zen 2", "10.28 TFLOPS GPU", "825GB SSD", "4K 120fps"],
    description:
      "The PlayStation 5 delivers next-gen gaming with ultra-high-speed SSD, ray tracing, 4K resolution, and the innovative DualSense controller.",
    image: null,
  },
  {
    id: 4,
    brand: "Apple",
    model: "MacBook Air M2",
    category: "Laptops",
    year: 2022,
    variants: ["256GB", "512GB", "1TB"],
    colours: ["Midnight", "Starlight", "Space Grey", "Silver"],
    activeListings: 6,
    status: "Active",
    specs: ["Apple M2", "8-core CPU", "10-core GPU", "MagSafe charging"],
    description:
      "The MacBook Air with M2 chip features a redesigned fanless design, a 13.6-inch Liquid Retina display, and up to 18 hours of battery life.",
    image: null,
  },
  {
    id: 5,
    brand: "Sony",
    model: "Sony Alpha A7 IV",
    category: "Cameras",
    year: 2021,
    variants: ["Body only", "Kit (28-70mm)"],
    colours: ["Black"],
    activeListings: 3,
    status: "Active",
    specs: ["33MP BSI sensor", "4K 60fps", "759-point AF", "5-axis IBIS"],
    description:
      "The Sony Alpha A7 IV is a full-frame mirrorless camera with a 33MP sensor, advanced autofocus, and professional video capabilities.",
    image: null,
  },
  {
    id: 6,
    brand: "Sony",
    model: "Sony WH-1000XM5",
    category: "Audio",
    year: 2022,
    variants: ["Black", "White"],
    colours: ["Black", "Platinum Silver"],
    activeListings: 5,
    status: "Active",
    specs: ["30hr battery", "ANC", "LDAC", "Multipoint connect"],
    description:
      "Industry-leading noise cancellation with the WH-1000XM5, featuring 30-hour battery life, crystal-clear call quality, and premium audio.",
    image: null,
  },
  {
    id: 7,
    brand: "Apple",
    model: "Apple Watch Series 9",
    category: "Wearables",
    year: 2023,
    variants: ["41mm", "45mm", "GPS", "Cellular"],
    colours: ["Midnight", "Starlight", "Pink", "Red"],
    activeListings: 9,
    status: "Active",
    specs: ["S9 SiP", "Double tap", "Brighter display", "Precision Finding"],
    description:
      "The Apple Watch Series 9 features the new S9 chip, double tap gesture, and a brighter always-on display with advanced health tracking.",
    image: null,
  },
  {
    id: 8,
    brand: "Samsung",
    model: "Samsung Galaxy S25",
    category: "Smartphones",
    year: 2025,
    variants: ["128GB", "256GB"],
    colours: ["Icy Blue", "Mint", "Navy", "Silver Shadow"],
    activeListings: 0,
    status: "Draft",
    specs: ["Snapdragon 8 Elite", "50MP camera", "4K video", "AI features"],
    description:
      "The Samsung Galaxy S25 is powered by Snapdragon 8 Elite with Galaxy AI features, a refined design, and a pro-grade camera system.",
    image: null,
  },
];

const CATEGORIES = [
  "All categories",
  "Smartphones",
  "Gaming",
  "Laptops",
  "Cameras",
  "Audio",
  "Wearables",
];
const BRANDS = ["All brands", "Apple", "Sony", "Samsung"];
const STATUSES = ["All statuses", "Active", "Draft"];

const CATEGORY_COLOURS = {
  Smartphones: "#f97316",
  Gaming: "#8b5cf6",
  Laptops: "#3b82f6",
  Cameras: "#10b981",
  Audio: "#ec4899",
  Wearables: "#f59e0b",
};

const CATEGORY_EMOJI = {
  Smartphones: "📱",
  Gaming: "🎮",
  Laptops: "💻",
  Cameras: "📷",
  Audio: "🎧",
  Wearables: "⌚",
};

// ─── Small reusable atoms ─────────────────────────────────────────────────────

function CategoryBadge({ category }) {
  const color = CATEGORY_COLOURS[category] || "#6b7280";
  return (
    <span
      className="text-xs font-semibold whitespace-nowrap rounded-md px-2.5 py-0.5"
      style={{
        color,
        background: color + "18",
        border: `1px solid ${color}40`,
      }}
    >
      {category}
    </span>
  );
}

function StatusDot({ status }) {
  const active = status === "Active";
  return (
    <span className="flex items-center gap-1.5 text-[13px]">
      <span
        className={`inline-block w-[7px] h-[7px] rounded-full ${
          active ? "bg-green-500" : "bg-slate-400"
        }`}
      />
      <span className={active ? "text-green-500 font-medium" : "text-slate-400 font-medium"}>
        {status}
      </span>
    </span>
  );
}

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

// ─── Tag input ────────────────────────────────────────────────────────────────

function TagInput({ label, values, onChange }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {values.map((v) => (
        <span
          key={v}
          className="flex items-center gap-1 bg-slate-100 border border-slate-200 rounded-md px-2 py-0.5 text-xs"
        >
          {v}
          <button
            onClick={() => onChange(values.filter((x) => x !== v))}
            className="text-slate-400 hover:text-slate-600 flex items-center"
          >
            <X size={10} />
          </button>
        </span>
      ))}
      <button
        onClick={() => {
          const val = window.prompt(`Add ${label}`);
          if (val?.trim()) onChange([...values, val.trim()]);
        }}
        className="text-orange-500 font-semibold text-xs border border-dashed border-slate-300 rounded-md px-2.5 py-0.5 hover:border-orange-400 hover:bg-orange-50 transition"
      >
        + Add
      </button>
    </div>
  );
}

// ─── Edit Product Panel ───────────────────────────────────────────────────────

function EditProductPanel({product,onClose,onSave,brands,categories,}) {
  const [form, setForm] = useState({
    brand: product.brandId,
    model: product.model,
    year: product.year,
    category: product.categoryId,
    variants: product.specs?.storage || [],
    colours: product.specs?.colors || [],
    specs: product.specs?.keySpecs || [],
    description: product.description || "",
    status: product.status,
    activeListings: product._count?.products || 0,

    imageFile: null,
  });

  useEffect(() => {
    setForm({
      brand: product.brandId,
      model: product.model,
      year: product.year,
      category: product.categoryId,
      variants: product.specs?.storage || [],
      colours: product.specs?.colors || [],
      specs: product.specs?.keySpecs || [],
      description: product.description || "",
      status: product.status,
      activeListings: product._count?.products || 0,
      imageFile: null,
    });
  }, [product]);

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  return (
    <div className="w-full lg:w-[340px] lg:min-w-[320px] lg:max-w-[360px] lg:flex-shrink-0 bg-white border-l border-slate-100 flex flex-col overflow-y-auto max-h-screen">
      <div className="px-5 pt-6 pb-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-[15px] font-bold text-slate-900 flex items-center gap-2">
            <Pencil size={14} className="text-orange-500" /> Edit product
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100 transition"
          >
            <X size={16} />
          </button>
        </div>

        {/* Photo */}
        <label className="bg-orange-50 border border-orange-200 rounded-xl flex flex-col items-center justify-center py-6 mb-5 cursor-pointer hover:bg-orange-100 transition">

  <input
    type="file"
    accept="image/*"
    className="hidden"
    onChange={(e) => {
  const file = e.target.files[0];

  if (!file) return;

  setForm((prev) => ({
    ...prev,
    imageFile: file,
  }));
}}
  />

  <div className="w-20 h-20 rounded-lg overflow-hidden bg-slate-100 mb-3">
    <img
      src={
        form.imageFile
    ? URL.createObjectURL(form.imageFile)
    : product.stockImageUrl
      }
      alt={form.model}
      className="w-full h-full object-cover"
    />
  </div>

  <span className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-orange-500 font-semibold flex items-center gap-1">
  <Pencil size={10} />
  Change photo
</span>

  {form.imageFile && (
    <p className="text-xs text-green-600 mt-2">
      {form.imageFile.name}
    </p>
  )}

</label>

        <SectionLabel>BASIC DETAILS</SectionLabel>

        <FormField label="Brand *">
          <div className="relative">
            <select className={inputCls + " appearance-none pr-7 cursor-pointer"}
              value={form.brand}
              onChange={(e) => set("brand", e.target.value)}>
            <option value="">Select...</option>
              {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
            ))}
          </select>

          <ChevronDown
            size={12}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"/>
          </div>
        </FormField>

        <FormField label="Model name *">
          <input
            className={inputCls}
            value={form.model}
            onChange={(e) => set("model", e.target.value)}
          />
        </FormField>

        <div className="grid grid-cols-2 gap-2.5 mb-3">
          <FormField label="Year *">
            <input
              className={inputCls}
              type="number"
              value={form.year}
              onChange={(e) => set("year", +e.target.value)}
            />
          </FormField>
          <FormField label="Category *">
            <div className="relative">
              <select
                className={inputCls + " appearance-none pr-7 cursor-pointer"}
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={12}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
            </div>
          </FormField>
        </div>

        <SectionLabel>VARIANTS (STORAGE / COLOUR OPTIONS)</SectionLabel>

        <FormField label="Storage options">
          <TagInput
            label="storage option"
            values={form.variants}
            onChange={(v) => set("variants", v)}
          />
        </FormField>

        <FormField label="Colour options">
          <TagInput
            label="colour"
            values={form.colours}
            onChange={(v) => set("colours", v)}
          />
        </FormField>

        <SectionLabel>SPECS (SHOWN TO BUYERS)</SectionLabel>

        <FormField label="Key specifications">
          <p className="text-[11px] text-slate-400 mb-1.5">
            Shown in product detail page and inspector checklist
          </p>
          <TagInput
            label="spec"
            values={form.specs}
            onChange={(v) => set("specs", v)}
          />
        </FormField>

        <FormField label="Product description">
          <textarea
            className={inputCls + " h-[88px] resize-y"}
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
          />
        </FormField>

        <SectionLabel>STATUS</SectionLabel>

        <FormField label="Catalog status">
          <div className="relative">
            <select
              className={inputCls + " appearance-none pr-7 cursor-pointer"}
              value={form.status}
              onChange={(e) => set("status", e.target.value)}
            >
              <option value="active"> Active — visible to vendors when listing</option>
              <option value="draft">Draft</option>
            </select>
            <ChevronDown
              size={12}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
          </div>
        </FormField>

        {/* Active listings notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2.5 text-xs text-blue-700 leading-relaxed mb-5">
          <span className="font-bold">🔷 {form.activeListings} active vendor listings</span> are
          using this catalog entry. Editing specs or the stock photo will update all associated
          listings immediately.
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center">
          <button
            onClick={onClose}
            className="border border-slate-200 text-gray-700 font-semibold text-[13px] px-4 py-2 rounded-lg hover:bg-slate-50 transition"
          >
            Discard
          </button>
          <button
  onClick={() => {
    console.log("Selected Image File:", form.imageFile);
    onSave(form);
  }}
  className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-[13px] px-4 py-2 rounded-lg flex items-center gap-1.5 transition"
>
  <Lock size={13} /> Save changes
</button>
        </div>
      </div>
    </div>
  );
}

// ─── Add Product Panel ────────────────────────────────────────────────────────

function AddProductPanel({onClose,categories,brands,}) {
  const { mutate: createProduct, isPending } = useCreateCatalogProduct();
  const [form, setForm] = useState({
    brand: "",
    model: "",
    year: "",
    category: "",
    priceRange:"",
    variants: [],
    colours: [],
    specs: [],
    description: "",
    status: "active",

    stockImageUrl: "",
    imageFile: null,
  });
  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleTagKeyDown = (key, e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      set(key, [...form[key], e.target.value.trim()]);
      e.target.value = "";
      e.preventDefault();
    }
  };

  const handleImageUpload = async () => {
  if (!form.imageFile) return "";

  try {
    // Step 1: Get signed upload URL
    const signResponse = await getSignedUploadUrl({
      bucket: "zook_data",
      filename: form.imageFile.name,
      folder: "catalog_products",
      upsert: false,
    });

    console.log("Signed Upload:", signResponse);

    // Upload image to storage
    await uploadFile(
      signResponse.data.signedUrl,
      form.imageFile
      );

      console.log("Image uploaded successfully!");
      const downloadResponse = await getSignedDownloadUrl({
  bucket: signResponse.data.bucket,
  key: signResponse.data.key,
  expiresIn: 86400,
});

console.log("Download URL:", downloadResponse);
    return downloadResponse.data.signedUrl;
  } catch (error) {
    console.error(error);
    alert("Failed to prepare image upload.");
    return "";
  }
};

  const handleCreate = async (status) => {
  const imageUrl = await handleImageUpload();
    console.log({
      brandId: form.brand,
      categoryId: form.category,
      model: form.model,
      year: Number(form.year),
      //priceRange: form.priceRange,
      stockImageUrl: imageUrl,
      specs: {
        storage: form.variants,
        colors: form.colours,
        keySpecs: form.specs,
      },
      description: form.description,
      status,
    });


    createProduct(
    {
      brandId: form.brand,
      categoryId: form.category,
      model: form.model,
      year: Number(form.year),
      stockImageUrl: imageUrl,
      specs: {
        storage: form.variants,
        colors: form.colours,
        keySpecs: form.specs,
      },
      description: form.description,
      status,
    },
      {
        onSuccess: () => {
        onClose();
        },
      }
    );
  };

  return (
    <div className="w-full lg:w-[340px] lg:min-w-[320px] lg:max-w-[360px] lg:flex-shrink-0 bg-white border-l border-slate-100 flex flex-col overflow-y-auto max-h-screen">
      <div className="px-5 pt-6 pb-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-[15px] font-bold text-slate-900 flex items-center gap-2">
            <Plus size={15} className="text-orange-500" /> Add new product
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100 transition">
            <X size={16} />
          </button>
        </div>
        {/* Upload area */}
<label className="border-2 border-dashed border-orange-200 bg-orange-50 rounded-xl flex flex-col items-center justify-center py-7 mb-5 cursor-pointer hover:bg-orange-100 transition">

  <input
  type="file"
  accept="image/*"
  className="hidden"
  onChange={(e) => {
    const file = e.target.files[0];

    if (!file) return;

    setForm((prev) => ({
      ...prev,
      imageFile: file,
    }));
  }}
/>

  <div className="w-11 h-11 bg-slate-200 rounded-lg flex items-center justify-center text-2xl mb-2.5">
    🖼️
  </div>

  <p className="text-[13px] font-semibold text-slate-900 m-0">
    Upload official stock photo
  </p>

  <p className="text-[11px] text-slate-400 mt-1 m-0">
    This is shown as the hero image on all listings · JPG, PNG
  </p>
  {form.imageFile && (
  <p className="text-xs text-green-600 mt-2 font-medium">
    Selected: {form.imageFile.name}
  </p>
)}

</label>

        <SectionLabel>BASIC DETAILS</SectionLabel>

        <FormField label="Brand *">
          <div className="relative">
            <select className={inputCls + " appearance-none pr-7 cursor-pointer"} value={form.brand}
              onChange={(e) => set("brand", e.target.value)}>
              <option value="">Select...</option>
                {brands.map((brand) => (
              <option
                key={brand.id}
                value={brand.id}>
                {brand.name}
              </option>
              ))}
            </select>

          <ChevronDown size={12}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"/>
          </div>
        </FormField>

        <FormField label="Model name *">
          <input
            className={inputCls}
            placeholder="e.g. iPhone 15 Pro, Galaxy S25 Ultra…"
            value={form.model}
            onChange={(e) => set("model", e.target.value)}
          />
        </FormField>

        <div className="grid grid-cols-2 gap-2.5 mb-3">
          <FormField label="Release year *">
            <input
              className={inputCls}
              type="number"
              placeholder="e.g. 2024"
              value={form.year}
              onChange={(e) => set("year", e.target.value)}
            />
          </FormField>
          <FormField label="Category *">
            <div className="relative">
              <select
                className={inputCls + " appearance-none pr-7 cursor-pointer"}
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
              >
                <option value="">Select…</option>
                {categories.map((category) => (
                  <option key={category.id}value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={12}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
            </div>
          </FormField>
        </div>

        <SectionLabel>VARIANTS</SectionLabel>

        <FormField label="Storage options (optional)">
          <p className="text-[11px] text-slate-400 mb-1.5">Press Enter after each value to add</p>
          <input
            className={inputCls + " mb-1.5"}
            placeholder="e.g. 128GB, 256GB, 512GB…"
            onKeyDown={(e) => handleTagKeyDown("variants", e)}
          />
          <div className="flex flex-wrap gap-1.5 mt-1">
            {form.variants.map((v) => (
              <span
                key={v}
                className="flex items-center gap-1 bg-slate-100 border border-slate-200 rounded-md px-2 py-0.5 text-xs"
              >
                {v}
                <button
                  onClick={() => set("variants", form.variants.filter((x) => x !== v))}
                  className="text-slate-400 hover:text-slate-600 flex items-center"
                >
                  <X size={10} />
                </button>
              </span>
            ))}
          </div>
        </FormField>

        <FormField label="Colour options (optional)">
          <input
            className={inputCls + " mb-1.5"}
            placeholder="e.g. Black, Silver, Titanium…"
            onKeyDown={(e) => handleTagKeyDown("colours", e)}
          />
          <div className="flex flex-wrap gap-1.5 mt-1">
            {form.colours.map((v) => (
              <span
                key={v}
                className="flex items-center gap-1 bg-slate-100 border border-slate-200 rounded-md px-2 py-0.5 text-xs"
              >
                {v}
                <button
                  onClick={() => set("colours", form.colours.filter((x) => x !== v))}
                  className="text-slate-400 hover:text-slate-600 flex items-center"
                >
                  <X size={10} />
                </button>
              </span>
            ))}
          </div>
        </FormField>

        <SectionLabel>SPECS</SectionLabel>

        <FormField label="Key specifications (optional)">
          <p className="text-[11px] text-slate-400 mb-1.5">
            Shown to buyers in the listing · Add one at a time
          </p>
          <input
            className={inputCls}
            placeholder="e.g. A18 chip, 6.3…"
            onKeyDown={(e) => handleTagKeyDown("specs", e)}
          />
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            {form.specs.map((v) => (
              <span
                key={v}
                className="flex items-center gap-1 bg-slate-100 border border-slate-200 rounded-md px-2 py-0.5 text-xs"
              >
                {v}
                <button
                  onClick={() => set("specs", form.specs.filter((x) => x !== v))}
                  className="text-slate-400 hover:text-slate-600 flex items-center"
                >
                  <X size={10} />
                </button>
              </span>
            ))}
          </div>
        </FormField>

        <FormField label="Product description *">
          <textarea
            className={inputCls + " h-[88px] resize-y"}
            placeholder="Write a short description of this product that will appear on all vendor listings using this catalog entry…"
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
          />
        </FormField>

        <SectionLabel>STATUS</SectionLabel>

        <FormField label="Publish status">
          <div className="relative">
            <select
              className={inputCls + " appearance-none pr-7 cursor-pointer"}
              value={form.status}
              onChange={(e) => set("status", e.target.value)}
            >
              <option value="active">Active — visible to vendors when listing</option>
              <option value="draft">Draft</option>
            </select>
            <ChevronDown
              size={12}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
          </div>
        </FormField>

        {/* Warning notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2.5 text-xs text-amber-800 leading-relaxed mb-5">
          ⚠️ Once saved as <strong>Active</strong>, vendors can immediately find and use this
          product when adding new listings. Set to <strong>Draft</strong> first if you need to
          review before publishing.
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center gap-2">
          <button
            onClick={onClose}
            className="border border-slate-200 text-gray-700 font-semibold text-[13px] px-4 py-2 rounded-lg hover:bg-slate-50 transition"
          >
            Discard
          </button>
          <div className="flex gap-2">
            <button onClick={() => handleCreate("draft")}
              disabled={isPending}>Save as draft
            </button>

            <button onClick={() => handleCreate("active")}
              disabled={isPending}>
                {isPending ? "Saving..." : "✓ Add to catalog"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ProductCatalog() {

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All categories");
  const [brandFilter, setBrandFilter] = useState("All brands");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [showArchived, setShowArchived] = useState(false);

  const [panel, setPanel] = useState(null);
  const [page, setPage] = useState(1);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const { mutateAsync: updateProduct } = useUpdateCatalogProduct();
  const { data: categoriesData } = useCategories();
  const { data: brandsData } = useBrands();
  const { data: productData } = useCatalogProduct(selectedProductId);
  const deleteProduct = useDeleteCatalogProduct();
  const restoreProduct = useRestoreCatalogProduct();

  const { data: catalogData, isLoading } = useCatalogProducts({
    page,
    limit: 8,
    search,
    categoryId:
      categoryFilter === "All categories" ? undefined : categoryFilter,
    brandId:
      brandFilter === "All brands" ? undefined : brandFilter,
    status:
      statusFilter === "All statuses" ? undefined : statusFilter,
    includeDeleted: showArchived,
  });

  const products = catalogData?.data?.items || [];
  const filtered = products.filter((product) =>
    showArchived ? product.deletedAt : !product.deletedAt
  );

  console.log("Categories:", categoriesData);
  console.log("Brands:", brandsData);
  console.log("Selected Product:", productData);
  useEffect(() => {
    if (
      productData?.data &&
      selectedProductId &&
      panel?.type !== "edit"
    ) {
      setPanel({
        type: "edit",
        product: productData.data,
      });
    }
  }, [productData, selectedProductId]);

  const categories = categoriesData?.data?.items?.map((c) => c.name) || [];
  const brands = brandsData?.data?.items?.map((b) => b.name) || [];

  const totalPages = catalogData?.data?.meta?.totalPages || 1;
  const paged = filtered;

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct.mutateAsync(id);
      alert("Product deleted successfully");
    } catch (error) {
        console.error(error);
        alert(
        error.response?.data?.message || "Failed to delete product"
        );
      }
  };

  const handleRestore = (id) => {
    if (!window.confirm("Restore this product?")) return;

    restoreProduct.mutate(id, {
      onSuccess: () => {
        alert("Product restored successfully.");
      },
      onError: () => {
        alert("Failed to restore product.");
      },
    });
  };
  const uploadNewImage = async (file) => {
  if (!file) return "";

  const signResponse = await getSignedUploadUrl({
    bucket: "zook_data",
    filename: file.name,
    folder: "catalog_products",
    upsert: false,
  });

  await uploadFile(
    signResponse.data.signedUrl,
    file
  );

  const downloadResponse = await getSignedDownloadUrl({
    bucket: signResponse.data.bucket,
    key: signResponse.data.key,
    expiresIn: 86400,
  });

  return downloadResponse.data.signedUrl;
};

  const handleSaveEdit = async (updatedProduct) => {
  let imageUrl = panel.product.stockImageUrl;

  if (updatedProduct.imageFile) {
    imageUrl = await uploadNewImage(updatedProduct.imageFile);
    console.log("Uploaded URL:", imageUrl);
  }

  console.log("Update Payload", {
    id: panel.product.id,
    payload: {
      brandId: updatedProduct.brand,
      model: updatedProduct.model,
      year: Number(updatedProduct.year),
      categoryId: updatedProduct.category,
      stockImageUrl: imageUrl,
      specs: {
        storage: updatedProduct.variants,
        colors: updatedProduct.colours,
        keySpecs: updatedProduct.specs,
      },
      description: updatedProduct.description,
      status: updatedProduct.status,
    },
  });
  try {
  await updateProduct({
    id: panel.product.id,
    payload: {
      brandId: updatedProduct.brand,
      model: updatedProduct.model,
      year: Number(updatedProduct.year),
      categoryId: updatedProduct.category,
      stockImageUrl: imageUrl,
      specs: {
        storage: updatedProduct.variants,
        colors: updatedProduct.colours,
        keySpecs: updatedProduct.specs,
      },
      description: updatedProduct.description,
      status: updatedProduct.status,
    },
  });

  // Close immediately after successful update
  setPanel(null);
  setSelectedProductId(null);
  } catch (error) {
    console.log("Full Error:", error);
    console.log("Response:", error.response);
    console.log("Response Data:", error.response?.data);
  }
};

  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen lg:h-screen lg:overflow-hidden font-sans">
      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col overflow-hidden bg-slate-50">
        {/* ── Top bar ── */}
        <div className="bg-white border-b border-slate-100 px-8 pt-7 pb-0">
          <div className="flex justify-between items-start mb-5">
            <div>
              <h1 className="text-[22px] font-extrabold text-slate-900 m-0">Product Catalog</h1>
              <p className="text-[13px] text-slate-400 mt-1 m-0">
                Master catalog — vendors search this when adding listings
              </p>
            </div>

            {/* ──  topbar right actions ── */}
            <div className="flex items-center gap-2">
              {/*  icon  notification (Bell) */}
              <button className="w-9 h-9 rounded-[10px] flex items-center justify-center bg-none border border-[#EBEBEB] text-base cursor-pointer relative">
              🔔
              <span className="absolute top-1.5 right-1.5 w-[7px] h-[7px] bg-[#FF4500] rounded-full border-[1.5px] border-white" />
            </button>

              {/* Add Product — pill shape with shadow */}
              {/* Add Product */}
              <button
                onClick={() => setPanel({ type: "add" })}
                className="flex items-center gap-1.5 text-white font-bold text-[13px] px-[18px] py-[9px] rounded-full hover:opacity-90 transition"
                style={{
                  background: "#FF4500",
                  boxShadow: "0 3px 10px rgba(255,69,0,0.22)",
                }}>
                <Plus size={14} /> Add Product
              </button>

              {/* Show Archived */}
              <button onClick={() => setShowArchived(!showArchived)}
                className="border border-slate-300 rounded-lg px-3 py-2 text-sm">
                {showArchived ? "Show Active Products" : "Show Archived Products"}
              </button>
              {/* ZA avatar */}
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[13px] font-bold cursor-pointer select-none flex-shrink-0"
                style={{ background: "#FF4500" }}>
                ZA
              </div>
            </div>
          </div>

          {/* ── Filters ── */}
          <div className="flex gap-2.5 items-center pb-4 flex-wrap">
            {/* Search */}
            <div className="relative">
              <Search
                size={14}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                className="border border-slate-200 rounded-lg py-2 pl-8 pr-3 text-[13px] w-60 text-slate-900 outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition"
                placeholder="Search brand, model, category…"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
            </div>

            {/* Dropdowns */}
            {[
              { val: categoryFilter, setter: setCategoryFilter, opts: ["All categories", ...categories] },
              { val: brandFilter, setter: setBrandFilter, opts: ["All brands", ...brands] },
              { val: statusFilter, setter: setStatusFilter, opts: STATUSES },
            ].map(({ val, setter, opts }, i) => (
              <div key={i} className="relative">
                <select
                  value={val}
                  onChange={(e) => {
                    setter(e.target.value);
                    setPage(1);
                  }}
                  className="border border-slate-200 rounded-lg py-2 pl-3 pr-8 text-[13px] text-gray-700 bg-white appearance-none cursor-pointer outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition"
                >
                  {opts.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
                <ChevronDown
                  size={13}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
              </div>
            ))}

            <span className="ml-auto text-[13px] text-slate-400 font-medium">
              {filtered.length} products
            </span>
          </div>
        </div>

        {/* ── Table ── */}
        <div className="flex-1 overflow-auto px-8 pb-6">
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr className="border-b border-slate-100">
                {[
                  "PRODUCT",
                  "CATEGORY",
                  "YEAR",
                  "PRICE RANGE",
                  "VARIANTS",
                  "ACTIVE LISTINGS",
                  "STATUS",
                  "",
                ].map((h) => (
                  <th
                    key={h}
                    className="py-3.5 text-left text-[11px] font-bold text-slate-400 tracking-[0.06em] whitespace-nowrap pr-4"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paged.map((p) => {
                const isSelected =
                  panel?.type === "edit" && panel?.product?.id === p.id;
                return (
                  <tr
                    key={p.id}
                    className={`border-b border-slate-50 transition-colors ${
                      isSelected ? "bg-orange-50" : "bg-white hover:bg-slate-50"
                    }`}
                  >
                    {/* Product */}
                    <td className="py-3.5 pr-4 min-w-[200px]">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                          <img
                            src={p.stockImageUrl}
                            alt={p.model}
                            className="w-full h-full object-cover"/>
                        </div>
                        <div>
                          <p className="m-0 font-semibold text-[14px] text-slate-900">
                            {p.model}
                          </p>
                          <p className="m-0 text-xs text-slate-400">{p.brand?.name}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 pr-4">
                      <CategoryBadge category={p.category?.name} />
                    </td>

                    <td className="py-3.5 pr-4 text-[13px] text-gray-600">{p.year}</td>
                    <td className="py-3.5 pr-4 text-[13px] text-slate-600">{p.priceRange || "-"}</td>
                    <td className="py-3.5 pr-4 text-xs text-slate-500 max-w-[180px]">
                      {p.specs?.storage?.join(" / ") || "-"}
                    </td>

                    <td className="py-3.5 pr-4 text-[13px] text-slate-900 font-medium">
                      {p._count?.products ?? 0}
                    </td>

                    <td className="py-3.5 pr-4">
                      <StatusDot status={p.status} />
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-0.5">
                        {/* Eye */}
                        <button title="View" onClick={() => setSelectedProductId(p.id)}
                          className="p-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition">
                          <Eye size={15} />
                        </button>
                        {/* Edit */}
                        <button
                          title="Edit"
                          onClick={() => {
                            setSelectedProductId(p.id);
                          }}
                          className={`p-1.5 rounded-md transition hover:bg-slate-100 ${
                            isSelected
                              ? "text-orange-500"
                              : "text-slate-400 hover:text-slate-600"
                          }`}
                        >
                          <Pencil size={15} />
                        </button>
                        {/* Delete */}
                        {showArchived ? (
                          <button
                            title="Restore"
                            onClick={() => handleRestore(p.id)}
                            className="p-1.5 rounded-md text-green-600 hover:bg-green-50">
                            Restore
                          </button>
                        ) : (
                          <button title="Delete"
                            onClick={() => handleDelete(p.id)}
                            className="p-1.5 rounded-md text-red-400 hover:text-red-600 hover:bg-red-50 transition">
                            <Trash2 size={15} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* ── Pagination ── */}
          <div className="flex justify-between items-center mt-4 pb-2">
            <span className="text-xs text-slate-400">
              Showing {paged.length} of {filtered.length} products
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
                      : "border border-slate-200 text-gray-700 hover:bg-slate-50 font-normal"
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
        </div>
      </div>

      {/* ── Side panel ── */}
      {panel?.type === "edit" && (
        <EditProductPanel
          product={panel.product}
          onClose={() => {
          setPanel(null);
          setSelectedProductId(null);
        }}  
        onSave={handleSaveEdit}
        brands={brandsData?.data?.items || []}
        categories={categoriesData?.data?.items || []}
        />
      )}
      {panel?.type === "add" && (
        <AddProductPanel onClose={() => setPanel(null)}
          categories={categoriesData?.data?.items || []}
          brands={brandsData?.data?.items || []}/>
      )}
    </div>
  );
}