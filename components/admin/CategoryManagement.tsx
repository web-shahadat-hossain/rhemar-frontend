// "use client";
// import { CATEGORIES } from "@/data/constants";
// import { CategoryItem } from "@/types/types";
// import { Edit3, Trash2, X } from "lucide-react";
// import { useState } from "react";
// export default function CategoryManagement() {
//   const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(
//     null,
//   );
//   const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

//   const handleDeleteCategory = (id: string) => {
//     const catToDelete = CATEGORIES.find((c) => c.id === id);
//     if (!catToDelete) return;
//   };
//   return (
//     <>
//       <div className="space-y-12 animate-fade-up">
//         <header className="flex justify-between items-end">
//           <div className="space-y-4">
//             <span className="text-gold font-bold text-[10px] uppercase tracking-[0.6em]">
//               Hierarchy
//             </span>
//             <h1 className="text-5xl font-heading tracking-tight">
//               Maison Collections
//             </h1>
//           </div>
//           <button
//             onClick={() => {
//               setEditingCategory(null);
//               setIsCategoryModalOpen(true);
//             }}
//             className="bg-black text-gold px-12 py-5 rounded-full text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-gold hover:text-black transition-all shadow-xl"
//           >
//             Add Collection
//           </button>
//         </header>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {CATEGORIES.map((cat, i) => (
//             <div
//               key={i}
//               className="bg-white p-10 rounded-[2.5rem] border border-black/5 shadow-sm flex flex-col group transition-all duration-700 hover:shadow-2xl"
//             >
//               <div className="flex justify-between items-start mb-4">
//                 <div className="space-y-2">
//                   <p className="text-[10px] font-bold text-gold uppercase tracking-[0.4em]">
//                     Section
//                   </p>
//                   <h4 className="text-2xl font-heading">Panjabi</h4>
//                 </div>
//                 <span
//                   className={`text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${"Active" === "Active" ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-400"}`}
//                 >
//                   Active
//                 </span>
//               </div>
//               <div className="mt-auto flex justify-between items-center pt-8 border-t border-black/5">
//                 <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">
//                   Slug: /ssdasdf
//                 </p>
//                 <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
//                   <button
//                     onClick={() => {
//                       setEditingCategory(cat);
//                       setIsCategoryModalOpen(true);
//                     }}
//                     className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 hover:text-gold transition-colors"
//                   >
//                     <Edit3 size={16} />
//                   </button>
//                   <button
//                     onClick={() => handleDeleteCategory(cat.id)}
//                     className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors"
//                   >
//                     <Trash2 size={16} />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       {isCategoryModalOpen && (
//         <div className="fixed inset-0 z-[1200] flex items-center justify-center p-8">
//           <div
//             className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
//             onClick={() => setIsCategoryModalOpen(false)}
//           />
//           <div className="relative z-10 w-full max-w-lg bg-white rounded-[3rem] overflow-hidden shadow-3xl animate-fade-up">
//             <header className="p-10 border-b border-black/5 flex justify-between items-center bg-gray-50/50">
//               <div className="space-y-2">
//                 <span className="text-gold font-bold text-[9px] uppercase tracking-[0.6em]">
//                   Collection Protocol
//                 </span>
//                 <h3 className="text-2xl font-heading">
//                   {editingCategory ? "Update Collection" : "New Collection"}
//                 </h3>
//               </div>
//               <button
//                 onClick={() => setIsCategoryModalOpen(false)}
//                 className="p-4 hover:bg-black/5 rounded-full transition-colors"
//               >
//                 <X size={20} />
//               </button>
//             </header>
//             <form className="p-10 space-y-8">
//               <div className="space-y-3">
//                 <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
//                   Collection Name
//                 </label>
//                 <input
//                   required
//                   name="name"
//                   defaultValue={editingCategory?.name}
//                   className="w-full bg-gray-50 border-b border-gray-100 p-4 text-sm font-medium outline-none focus:border-gold transition-colors"
//                   placeholder="E.g. Heritage Classics"
//                 />
//               </div>
//               <div className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl">
//                 <div className="space-y-1">
//                   <p className="text-[10px] font-bold uppercase tracking-widest">
//                     Visibility Status
//                   </p>
//                   <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">
//                     Publically viewable
//                   </p>
//                 </div>
//                 <label className="relative inline-flex items-center cursor-pointer">
//                   <input
//                     type="checkbox"
//                     name="status"
//                     className="sr-only peer"
//                     defaultChecked={
//                       editingCategory
//                         ? editingCategory.status === "Active"
//                         : true
//                     }
//                   />
//                   <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
//                 </label>
//               </div>
//               <div className="flex gap-4 pt-4">
//                 <button
//                   type="submit"
//                   className="flex-1 bg-black text-gold py-5 rounded-2xl font-bold uppercase text-[10px] tracking-[0.4em] hover:bg-gold hover:text-black transition-all"
//                 >
//                   Save Collection
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
"use client";

import { Edit3, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "@/lib/services/api";

interface CategoryItem {
  _id: string;
  name: string;
  slug: string;
  status: "active" | "hidden";
}

export default function CategoryManagement() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(
    null,
  );
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // ================== FETCH ==================
  const fetchCategories = async () => {
    try {
      const data = await api("/categories", { method: "GET" });
      setCategories(data);
    } catch (err) {
      console.error("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ================== DELETE ==================
  const handleDeleteCategory = async (id: string) => {
    if (!confirm("Delete this category?")) return;

    try {
      await api(`/categories/${id}`, { method: "DELETE" });
      fetchCategories();
    } catch (err) {
      alert("Delete failed");
    }
  };

  // ================== SUBMIT (CREATE + UPDATE) ==================
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const name = form.get("name") as string;
    const status = form.get("status") ? "active" : "hidden";

    const payload = {
      name,
      slug: name.toLowerCase().replace(/\s+/g, "-"),
      status,
    };

    try {
      if (editingCategory) {
        await api(`/categories/${editingCategory._id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
      } else {
        await api("/categories", {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }

      setIsCategoryModalOpen(false);
      setEditingCategory(null);
      fetchCategories();
    } catch (err) {
      alert("Save failed");
    }
  };

  if (loading) return <div className="p-10">Loading...</div>;

  return (
    <>
      <div className="space-y-12 animate-fade-up">
        <header className="flex justify-between items-end">
          <div className="space-y-4">
            <span className="text-gold font-bold text-[10px] uppercase tracking-[0.6em]">
              Hierarchy
            </span>
            <h1 className="text-5xl font-heading tracking-tight">
              Maison Collections
            </h1>
          </div>
          <button
            onClick={() => {
              setEditingCategory(null);
              setIsCategoryModalOpen(true);
            }}
            className="bg-black text-gold px-12 py-5 rounded-full text-[10px] font-bold uppercase tracking-[0.4em]"
          >
            Add Collection
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <div
              key={cat._id}
              className="bg-white p-10 rounded-[2.5rem] border border-black/5 shadow-sm flex flex-col group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-gold uppercase tracking-[0.4em]">
                    Section
                  </p>
                  <h4 className="text-2xl font-heading">{cat.name}</h4>
                </div>
                <span
                  className={`text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                    cat.status === "active"
                      ? "bg-green-50 text-green-600"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {cat.status}
                </span>
              </div>

              <div className="mt-auto flex justify-between items-center pt-8 border-t border-black/5">
                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">
                  Slug: /{cat.slug}
                </p>
                <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => {
                      setEditingCategory(cat);
                      setIsCategoryModalOpen(true);
                    }}
                    className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(cat._id)}
                    className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-[1200] flex items-center justify-center p-8">
          <div
            className="absolute inset-0 bg-black/95"
            onClick={() => setIsCategoryModalOpen(false)}
          />
          <div className="relative z-10 w-full max-w-lg bg-white rounded-[3rem] shadow-3xl">
            <header className="p-10 border-b flex justify-between items-center">
              <h3 className="text-2xl font-heading">
                {editingCategory ? "Update Collection" : "New Collection"}
              </h3>
              <button
                onClick={() => setIsCategoryModalOpen(false)}
                className="p-4"
              >
                <X size={20} />
              </button>
            </header>

            <form onSubmit={handleSubmit} className="p-10 space-y-8">
              <div>
                <input
                  required
                  name="name"
                  defaultValue={editingCategory?.name}
                  className="w-full bg-gray-50 border-b p-4"
                  placeholder="Collection Name"
                />
              </div>

              <div className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl">
                <span className="text-[10px] font-bold uppercase">
                  Visibility Status
                </span>
                <input
                  type="checkbox"
                  name="status"
                  defaultChecked={
                    editingCategory ? editingCategory.status === "active" : true
                  }
                />
              </div>

              <button
                type="submit"
                className="w-full bg-black text-gold py-5 rounded-2xl font-bold uppercase text-[10px]"
              >
                Save Collection
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
