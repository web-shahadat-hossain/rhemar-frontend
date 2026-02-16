/* eslint-disable react/no-unescaped-entities */
// import React, { useState, useMemo, useEffect } from "react";

// import {
//   Filter,
//   ChevronDown,
//   SlidersHorizontal,
//   Search as SearchIcon,
//   X,
// } from "lucide-react";
// import ProductCard from "@/components/UI/ProductCard";
// import { PRODUCTS } from "@/data/constants";

// interface ShopProps {
//   onProductClick: (id: string) => void;
//   initialCategory?: string;
//   initialSearch?: string;
//   categories: string[];
// }

// const Shop: React.FC<ShopProps> = ({
//   onProductClick,
//   initialCategory,
//   initialSearch,
//   categories,
// }) => {
//   const [selectedCategory, setSelectedCategory] = useState<string>(
//     initialCategory || "All",
//   );
//   const [priceRange, setPriceRange] = useState<number>(10000);
//   const [sortBy, setSortBy] = useState<string>("newest");
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState<string>(initialSearch || "");

//   // Update when props change (e.g. from header navigate)
//   useEffect(() => {
//     if (initialCategory) setSelectedCategory(initialCategory);
//     if (initialSearch !== undefined) setSearchTerm(initialSearch);
//   }, [initialCategory, initialSearch]);

//   const filteredProducts = useMemo(() => {
//     let result = [...PRODUCTS];

//     // Category Filter
//     if (selectedCategory !== "All") {
//       result = result.filter((p) => p.category === selectedCategory);
//     }

//     // Search Term Filter
//     if (searchTerm.trim()) {
//       const q = searchTerm.toLowerCase();
//       result = result.filter(
//         (p) =>
//           p.name.toLowerCase().includes(q) ||
//           p.category.toLowerCase().includes(q),
//       );
//     }

//     // Price Filter
//     result = result.filter((p) => (p.discountPrice || p.price) <= priceRange);

//     // Sort
//     if (sortBy === "low")
//       result.sort(
//         (a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price),
//       );
//     if (sortBy === "high")
//       result.sort(
//         (a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price),
//       );

//     return result;
//   }, [selectedCategory, priceRange, sortBy, searchTerm]);

//   return (
//     <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-42 ">
//       {/* Page Header */}
//       <div className="text-center mb-16 space-y-4">
//         <h1 className="text-4xl md:text-5xl font-heading font-medium tracking-tight">
//           The Collection
//         </h1>
//         {searchTerm ? (
//           <div className="flex items-center justify-center gap-4 text-gold">
//             <span className="text-sm font-bold uppercase tracking-[0.4em]">
//               Search Results for:
//             </span>
//             <span className="font-serif-luxury italic text-2xl">
//               "{searchTerm}"
//             </span>
//             <button
//               onClick={() => setSearchTerm("")}
//               className="p-1 hover:bg-black/5 rounded-full transition-colors"
//               title="Clear search"
//             >
//               <X size={20} />
//             </button>
//           </div>
//         ) : (
//           <p className="text-gray-400 max-w-2xl mx-auto italic font-serif-luxury text-xl">
//             "Refinement in every thread, luxury in every detail."
//           </p>
//         )}
//       </div>

//       <div className="flex flex-col lg:flex-row gap-12">
//         {/* Desktop Sidebar / Mobile Drawer Overlay */}
//         <aside
//           className={`lg:w-64 space-y-10 shrink-0 ${isFilterOpen ? "fixed inset-0 z-50 bg-white p-8 lg:static lg:bg-transparent lg:p-0" : "hidden lg:block"}`}
//         >
//           <div className="flex justify-between items-center lg:hidden mb-10">
//             <h2 className="text-xl font-bold">FILTERS</h2>
//             <button
//               onClick={() => setIsFilterOpen(false)}
//               className="font-bold text-gold"
//             >
//               APPLY
//             </button>
//           </div>

//           {/* Search in Sidebar */}
//           <div className="relative group">
//             <SearchIcon
//               size={16}
//               className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-gold transition-colors"
//             />
//             <input
//               type="text"
//               placeholder="Refine Search..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 pl-12 pr-4 text-sm outline-none focus:border-gold transition-all"
//             />
//           </div>

//           {/* Categories */}
//           <div>
//             <h3 className="font-bold text-xs uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
//               <Filter size={14} className="text-gold" /> Categories
//             </h3>
//             <div className="flex flex-col gap-4">
//               <button
//                 onClick={() => setSelectedCategory("All")}
//                 className={`text-sm text-left font-medium transition-colors ${selectedCategory === "All" ? "text-gold" : "text-gray-400 hover:text-black"}`}
//               >
//                 All Collections
//               </button>
//               {categories.map((cat) => (
//                 <button
//                   key={cat}
//                   onClick={() => setSelectedCategory(cat)}
//                   className={`text-sm text-left font-medium transition-colors ${selectedCategory === cat ? "text-gold" : "text-gray-400 hover:text-black"}`}
//                 >
//                   {cat}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Price Range */}
//           <div>
//             <h3 className="font-bold text-xs uppercase tracking-[0.2em] mb-6 text-gray-900">
//               Price Range
//             </h3>
//             <input
//               type="range"
//               min="0"
//               max="10000"
//               step="500"
//               value={priceRange}
//               onChange={(e) => setPriceRange(parseInt(e.target.value))}
//               className="w-full h-1 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-gold"
//             />
//             <div className="flex justify-between mt-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
//               <span>৳0</span>
//               <span>Under ৳{priceRange.toLocaleString()}</span>
//             </div>
//           </div>
//         </aside>

//         {/* Product Grid Area */}
//         <main className="flex-1">
//           {/* Controls Bar */}
//           <div className="flex justify-between items-center mb-10 border-b border-gray-50 pb-8">
//             <div className="lg:hidden">
//               <button
//                 onClick={() => setIsFilterOpen(true)}
//                 className="flex items-center gap-3 font-bold text-[10px] uppercase tracking-[0.2em] bg-gray-50 px-6 py-3 rounded-full"
//               >
//                 <SlidersHorizontal size={16} /> Filters
//               </button>
//             </div>
//             <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em]">
//               Signature Inventory: {filteredProducts.length}
//             </p>
//             <div className="flex items-center gap-4">
//               <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest hidden sm:inline">
//                 Sort By:
//               </span>
//               <div className="relative">
//                 <select
//                   value={sortBy}
//                   onChange={(e) => setSortBy(e.target.value)}
//                   className="appearance-none bg-transparent font-bold text-xs uppercase tracking-widest pr-8 py-1 outline-none cursor-pointer text-gray-900"
//                 >
//                   <option value="newest">Newest Arrivals</option>
//                   <option value="low">Price: Low to High</option>
//                   <option value="high">Price: High to Low</option>
//                 </select>
//                 <ChevronDown
//                   size={14}
//                   className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gold"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Grid */}
//           {filteredProducts.length > 0 ? (
//             <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-10 md:gap-14 animate-fade-up">
//               {filteredProducts.map((product) => (
//                 <ProductCard
//                   key={product.id}
//                   product={product}
//                   onClick={onProductClick}
//                 />
//               ))}
//             </div>
//           ) : (
//             <div className="py-32 text-center bg-gray-50/50 rounded-[3rem] border border-dashed border-gray-100 animate-fade-up">
//               <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
//                 <SearchIcon size={32} className="text-gray-200" />
//               </div>
//               <h3 className="text-2xl font-heading mb-4">No results found</h3>
//               <p className="text-gray-400 max-w-sm mx-auto font-serif-luxury italic text-xl">
//                 "Try adjusting your filters or refining your signature search to
//                 discover what you desire."
//               </p>
//               <button
//                 onClick={() => {
//                   setSelectedCategory("All");
//                   setSearchTerm("");
//                   setPriceRange(10000);
//                 }}
//                 className="mt-10 text-gold font-bold uppercase text-[10px] tracking-[0.4em] border-b border-gold/20 pb-2 hover:border-gold transition-all"
//               >
//                 Reset Atelier
//               </button>
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Shop;
"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Filter,
  ChevronDown,
  SlidersHorizontal,
  Search as SearchIcon,
  X,
} from "lucide-react";
import ProductCard from "@/components/UI/ProductCard";

interface Product {
  _id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  discountPrice?: number;
  images: { url: string }[];
  createdAt: string;
}

interface ShopProps {
  onProductClick: (slug: string) => void;
  initialCategory?: string;
  initialSearch?: string;
  categories: string[];
  products: Product[];
}

const Shop: React.FC<ShopProps> = ({
  onProductClick,
  initialCategory,
  initialSearch,
  categories,
  products,
}) => {
  const [selectedCategory, setSelectedCategory] = useState(
    initialCategory || "All",
  );
  const [priceRange, setPriceRange] = useState(10000);
  const [sortBy, setSortBy] = useState("newest");
  const [searchTerm, setSearchTerm] = useState(initialSearch || "");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];
    console.log(result);
    // Category Filter (SAFE lowercase match)
    if (selectedCategory !== "All") {
      result = result.filter(
        (p) =>
          p.category &&
          p.category.toLowerCase() === selectedCategory.toLowerCase(),
      );
    }

    // Search Filter
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q),
      );
    }

    // Price Filter
    result = result.filter((p) => (p.discountPrice || p.price) <= priceRange);

    // Sort
    if (sortBy === "newest") {
      result.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    }

    if (sortBy === "low") {
      result.sort(
        (a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price),
      );
    }

    if (sortBy === "high") {
      result.sort(
        (a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price),
      );
    }

    return result;
  }, [selectedCategory, priceRange, sortBy, searchTerm, products]);
  console.log(filteredProducts);
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-42 ">
      {/* Page Header */}
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-4xl md:text-5xl font-heading font-medium tracking-tight">
          The Collection
        </h1>
        {searchTerm ? (
          <div className="flex items-center justify-center gap-4 text-gold">
            <span className="text-sm font-bold uppercase tracking-[0.4em]">
              Search Results for:
            </span>
            <span className="font-serif-luxury italic text-2xl">
              "{searchTerm}"
            </span>
            <button
              onClick={() => setSearchTerm("")}
              className="p-1 hover:bg-black/5 rounded-full transition-colors"
              title="Clear search"
            >
              <X size={20} />
            </button>
          </div>
        ) : (
          <p className="text-gray-400 max-w-2xl mx-auto italic font-serif-luxury text-xl">
            "Refinement in every thread, luxury in every detail."
          </p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Desktop Sidebar / Mobile Drawer Overlay */}
        <aside
          className={`lg:w-64 space-y-10 shrink-0 ${isFilterOpen ? "fixed inset-0 z-50 bg-white p-8 lg:static lg:bg-transparent lg:p-0" : "hidden lg:block"}`}
        >
          <div className="flex justify-between items-center lg:hidden mb-10">
            <h2 className="text-xl font-bold">FILTERS</h2>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="font-bold text-gold"
            >
              APPLY
            </button>
          </div>

          {/* Search in Sidebar */}
          <div className="relative group">
            <SearchIcon
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-gold transition-colors"
            />
            <input
              type="text"
              placeholder="Refine Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 pl-12 pr-4 text-sm outline-none focus:border-gold transition-all"
            />
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-bold text-xs uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <Filter size={14} className="text-gold" /> Categories
            </h3>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => setSelectedCategory("All")}
                className={`text-sm text-left font-medium transition-colors ${selectedCategory === "All" ? "text-gold" : "text-gray-400 hover:text-black"}`}
              >
                All Collections
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-sm text-left font-medium transition-colors ${selectedCategory === cat ? "text-gold" : "text-gray-400 hover:text-black"}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="font-bold text-xs uppercase tracking-[0.2em] mb-6 text-gray-900">
              Price Range
            </h3>
            <input
              type="range"
              min="0"
              max="10000"
              step="500"
              value={priceRange}
              onChange={(e) => setPriceRange(parseInt(e.target.value))}
              className="w-full h-1 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-gold"
            />
            <div className="flex justify-between mt-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              <span>৳0</span>
              <span>Under ৳{priceRange.toLocaleString()}</span>
            </div>
          </div>
        </aside>

        {/* Product Grid Area */}
        <main className="flex-1">
          {/* Controls Bar */}
          <div className="flex justify-between items-center mb-10 border-b border-gray-50 pb-8">
            <div className="lg:hidden">
              <button
                onClick={() => setIsFilterOpen(true)}
                className="flex items-center gap-3 font-bold text-[10px] uppercase tracking-[0.2em] bg-gray-50 px-6 py-3 rounded-full"
              >
                <SlidersHorizontal size={16} /> Filters
              </button>
            </div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em]">
              Signature Inventory: {filteredProducts.length}
            </p>
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest hidden sm:inline">
                Sort By:
              </span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-transparent font-bold text-xs uppercase tracking-widest pr-8 py-1 outline-none cursor-pointer text-gray-900"
                >
                  <option value="newest">Newest Arrivals</option>
                  <option value="low">Price: Low to High</option>
                  <option value="high">Price: High to Low</option>
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gold"
                />
              </div>
            </div>
          </div>

          {/* Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-10 md:gap-14 animate-fade-up">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onClick={onProductClick}
                />
              ))}
            </div>
          ) : (
            <div className="py-32 text-center bg-gray-50/50 rounded-[3rem] border border-dashed border-gray-100 animate-fade-up">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
                <SearchIcon size={32} className="text-gray-200" />
              </div>
              <h3 className="text-2xl font-heading mb-4">No results found</h3>
              <p className="text-gray-400 max-w-sm mx-auto font-serif-luxury italic text-xl">
                "Try adjusting your filters or refining your signature search to
                discover what you desire."
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchTerm("");
                  setPriceRange(10000);
                }}
                className="mt-10 text-gold font-bold uppercase text-[10px] tracking-[0.4em] border-b border-gold/20 pb-2 hover:border-gold transition-all"
              >
                Reset Atelier
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Shop;
