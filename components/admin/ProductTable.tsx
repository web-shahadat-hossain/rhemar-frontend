"use client";

import {
  Edit3,
  Plus,
  Search,
  Trash2,
  X,
  Upload,
  Package,
  DollarSign,
  Tag,
  Image as ImageIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Product {
  _id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  discountPrice?: number;
  description: string;
  featured: boolean;
  sizes: { size: string; stock: number }[];
  images: { url: string }[];
}

interface Category {
  _id: string;
  name: string;
  slug: string;
  productCount?: number;
}

export default function ProductTable() {
  const [localProducts, setLocalProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);

  const token =
    typeof window !== "undefined"
      ? document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1]
      : null;

  // ================= FETCH PRODUCTS =================
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/products");
      const data = await res.json();
      setLocalProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // ================= FETCH CATEGORIES =================
  const fetchCategories = async () => {
    setIsCategoriesLoading(true);
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/categories");
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setIsCategoriesLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // ================= DELETE =================
  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this signature item?"))
      return;

    try {
      await fetch(process.env.NEXT_PUBLIC_API_URL + `/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchProducts();
      fetchCategories(); // Refresh categories to update product counts
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.currentTarget;
    const formData = new FormData();

    formData.append(
      "name",
      (form.elements.namedItem("name") as HTMLInputElement).value,
    );
    formData.append(
      "slug",
      (form.elements.namedItem("name") as HTMLInputElement).value
        .toLowerCase()
        .replace(/\s+/g, "-"),
    );
    formData.append(
      "category",
      (form.elements.namedItem("category") as HTMLSelectElement).value,
    );
    formData.append(
      "price",
      (form.elements.namedItem("price") as HTMLInputElement).value,
    );
    formData.append(
      "discountPrice",
      (form.elements.namedItem("discountPrice") as HTMLInputElement).value ||
        "",
    );
    formData.append(
      "description",
      (form.elements.namedItem("description") as HTMLTextAreaElement).value,
    );

    ["S", "M", "L", "XL"].forEach((size, i) => {
      const stock = (
        form.elements.namedItem(`stock-${size}`) as HTMLInputElement
      ).value;
      if (stock) {
        formData.append(`sizes[${i}][size]`, size);
        formData.append(`sizes[${i}][stock]`, stock);
      }
    });

    const fileInput = form.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;

    if (fileInput?.files?.length) {
      Array.from(fileInput.files).forEach((file) => {
        formData.append("images", file);
      });
    }

    try {
      if (editingProduct) {
        await fetch(
          process.env.NEXT_PUBLIC_API_URL + `/products/${editingProduct._id}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          },
        );
      } else {
        await fetch(process.env.NEXT_PUBLIC_API_URL + "/products", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
      }

      setIsProductModalOpen(false);
      setEditingProduct(null);
      setImagePreview(null);
      fetchProducts();
      fetchCategories(); // Refresh categories to update product counts
    } catch (error) {
      console.error("Error saving product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter products based on search and category
  const filteredProducts = localProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get category stats
  const getCategoryProductCount = (categoryName: string) => {
    return localProducts.filter((p) => p.category === categoryName).length;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const previews: string[] = [];

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        previews.push(reader.result as string);

        if (previews.length === files.length) {
          setImagePreview(previews);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Handle new category creation
  const [newCategory, setNewCategory] = useState("");
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);

  const handleAddNewCategory = async () => {
    if (!newCategory.trim()) return;

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: newCategory }),
      });

      if (res.ok) {
        fetchCategories();
        setNewCategory("");
        setShowNewCategoryInput(false);
      }
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  return (
    <>
      <div className="space-y-8 animate-fade-up p-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              The Archive Vault
            </h1>
            <p className="text-gray-500 mt-2">
              Manage your signature collection
            </p>
          </div>

          <button
            onClick={() => {
              setEditingProduct(null);
              setImagePreview(null);
              setIsProductModalOpen(true);
            }}
            className="group bg-gradient-to-r from-gray-900 to-gray-800 text-white px-8 py-4 rounded-2xl text-sm font-semibold flex items-center gap-3 hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Plus
              size={20}
              className="group-hover:rotate-90 transition-transform"
            />
            Add New Product
          </button>
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-900/20 transition-all"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-6 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-900/20 bg-white min-w-[250px] appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 1rem center",
              backgroundSize: "1.5rem",
            }}
          >
            <option value="all">
              🏷️ All Categories ({localProducts.length})
            </option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name} ({getCategoryProductCount(cat.name)})
              </option>
            ))}
          </select>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl">
            <Package className="text-blue-600 mb-3" size={24} />
            <p className="text-2xl font-bold">{localProducts.length}</p>
            <p className="text-gray-600">Total Products</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl">
            <Tag className="text-green-600 mb-3" size={24} />
            <p className="text-2xl font-bold">{categories.length}</p>
            <p className="text-gray-600">Categories</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl">
            <DollarSign className="text-purple-600 mb-3" size={24} />
            <p className="text-2xl font-bold">
              ৳
              {localProducts
                .reduce((sum, p) => sum + p.price, 0)
                .toLocaleString()}
            </p>
            <p className="text-gray-600">Total Value</p>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl">
            <Package className="text-orange-600 mb-3" size={24} />
            <p className="text-2xl font-bold">
              {localProducts.reduce(
                (sum, p) =>
                  sum + p.sizes.reduce((s, size) => s + size.stock, 0),
                0,
              )}
            </p>
            <p className="text-gray-600">Total Stock</p>
          </div>
        </div>

        {/* Category Distribution */}
        {categories.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="font-semibold mb-4">Category Distribution</h3>
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => {
                const count = getCategoryProductCount(cat.name);
                const percentage = (count / localProducts.length) * 100 || 0;
                return (
                  <div
                    key={cat._id}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                    onClick={() => setSelectedCategory(cat.name)}
                  >
                    <span className="text-sm font-medium">{cat.name}</span>
                    <span className="text-xs bg-white px-2 py-1 rounded-full">
                      {count}
                    </span>
                    <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-gray-700 to-gray-900 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Products Table */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-8 py-6 text-left text-sm font-semibold text-gray-600">
                      Product
                    </th>
                    <th className="px-8 py-6 text-left text-sm font-semibold text-gray-600">
                      Category
                    </th>
                    <th className="px-8 py-6 text-left text-sm font-semibold text-gray-600">
                      Price
                    </th>
                    <th className="px-8 py-6 text-left text-sm font-semibold text-gray-600">
                      Stock
                    </th>
                    <th className="px-8 py-6 text-right text-sm font-semibold text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredProducts.map((product) => (
                    <tr
                      key={product._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-8 py-6">
                        <div className="flex gap-4 items-center">
                          <div className="relative w-16 h-20 rounded-xl overflow-hidden bg-gray-100">
                            {product.images?.[0]?.url ? (
                              <Image
                                src={product.images[0].url}
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <ImageIcon
                                  size={24}
                                  className="text-gray-400"
                                />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">
                              {product.name}
                            </p>
                            <p className="text-xs text-gray-400 font-mono mt-1">
                              ID: {product._id.slice(-8)}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div>
                          <span className="font-semibold">
                            ৳{product.price}
                          </span>
                          {product.discountPrice && (
                            <span className="ml-2 text-sm text-gray-400 line-through">
                              ৳{product.discountPrice}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex gap-2">
                          {product.sizes.map((s) => (
                            <span
                              key={s.size}
                              className={`px-2 py-1 rounded-lg text-xs font-medium ${
                                s.stock > 0
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {s.size}:{s.stock}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button
                          onClick={() => {
                            setEditingProduct(product);
                            setImagePreview(product.images?.[0]?.url || null);
                            setIsProductModalOpen(true);
                          }}
                          className="p-2 hover:bg-gray-100 rounded-xl transition-colors mr-2"
                          title="Edit"
                        >
                          <Edit3 size={18} className="text-gray-600" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product._id)}
                          className="p-2 hover:bg-red-50 rounded-xl transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} className="text-red-500" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredProducts.length === 0 && (
                <div className="text-center py-20">
                  <Package size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">No products found</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Product Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h2>
              <button
                onClick={() => {
                  setIsProductModalOpen(false);
                  setEditingProduct(null);
                  setImagePreview(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Image Upload */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Product Image
                </label>
                <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center">
                  {imagePreview ? (
                    <div className="relative w-32 h-32 mx-auto">
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        fill
                        className="object-cover rounded-xl"
                      />
                    </div>
                  ) : (
                    <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="..."
                  />
                </div>
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Product Name
                  </label>
                  <input
                    name="name"
                    defaultValue={editingProduct?.name}
                    className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-gray-900/20"
                    placeholder="Enter product name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <div className="relative">
                    <select
                      name="category"
                      defaultValue={editingProduct?.category || ""}
                      className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-gray-900/20 appearance-none bg-white"
                      required
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 1rem center",
                        backgroundSize: "1.5rem",
                      }}
                    >
                      <option value="">Select a category</option>
                      {categories.map((cat) => (
                        <option key={cat._id} value={cat.name}>
                          {cat.name}
                        </option>
                      ))}
                    </select>

                    {!editingProduct && (
                      <button
                        type="button"
                        onClick={() =>
                          setShowNewCategoryInput(!showNewCategoryInput)
                        }
                        className="absolute right-10 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700"
                      >
                        + New
                      </button>
                    )}
                  </div>

                  {showNewCategoryInput && (
                    <div className="mt-2 flex gap-2">
                      <input
                        type="text"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="New category name"
                        className="flex-1 border border-gray-200 rounded-xl p-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/20"
                      />
                      <button
                        type="button"
                        onClick={handleAddNewCategory}
                        className="px-4 py-2 bg-gray-900 text-white rounded-xl text-sm hover:bg-gray-800 transition-colors"
                      >
                        Add
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowNewCategoryInput(false)}
                        className="px-4 py-2 border border-gray-200 rounded-xl text-sm hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Pricing */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Price (৳)
                  </label>
                  <input
                    name="price"
                    type="number"
                    defaultValue={editingProduct?.price}
                    className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-gray-900/20"
                    placeholder="0"
                    required
                    min="0"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Discount Price (৳)
                  </label>
                  <input
                    name="discountPrice"
                    type="number"
                    defaultValue={editingProduct?.discountPrice}
                    className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-gray-900/20"
                    placeholder="0"
                    min="0"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  defaultValue={editingProduct?.description}
                  rows={4}
                  className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-gray-900/20"
                  placeholder="Enter product description"
                  required
                />
              </div>

              {/* Sizes and Stock */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Sizes & Stock
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {["S", "M", "L", "XL"].map((size) => (
                    <div key={size} className="space-y-1">
                      <label className="text-xs text-gray-500">
                        Size {size}
                      </label>
                      <input
                        name={`stock-${size}`}
                        type="number"
                        defaultValue={
                          editingProduct?.sizes.find((s) => s.size === size)
                            ?.stock || 0
                        }
                        className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-gray-900/20"
                        placeholder="0"
                        min="0"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="sticky bottom-0 bg-white pt-4 border-t border-gray-100">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading
                    ? "Saving..."
                    : editingProduct
                      ? "Update Product"
                      : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
