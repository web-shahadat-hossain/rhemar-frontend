"use client";

import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Tag,
  ShoppingBag,
  Truck,
  Users,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Sidebar() {
  const router = useRouter();
  const path = usePathname();
  const { logout, user } = useAuth();
  console.log(user);
  const navItem = (icon: any, label: string, route: string) => (
    <button
      onClick={() => router.push(route)}
      className={`flex items-center gap-4 p-4 rounded-2xl text-xs uppercase tracking-widest font-bold transition ${
        path === route ? "bg-gold text-black" : "text-gray-400 hover:text-gold"
      }`}
    >
      {icon}
      {label}
    </button>
  );

  return (
    // <aside className="w-72 bg-black text-white p-10">
    //   <h1 className="text-gold font-bold mb-12 tracking-widest">ADMIN</h1>

    //   <div className="flex flex-col gap-4">
    //     {navItem(<LayoutDashboard size={18} />, "Dashboard", "/admin")}
    //     {navItem(<Tag size={18} />, "Categories", "/admin/categories")}
    //     {navItem(<ShoppingBag size={18} />, "Products", "/admin/products")}
    //     {navItem(<Truck size={18} />, "Orders", "/admin/orders")}
    //     {navItem(<Users size={18} />, "Users", "/admin/users")}
    //   </div>
    // </aside>
    <aside className="w-80 bg-black text-white p-10 flex flex-col sticky top-0 h-screen shrink-0">
      <div
        className="cursor-pointer group flex flex-col items-start mb-24"
        onClick={() => router.push("/")}
      >
        <span className="text-2xl font-bold tracking-[0.5em] text-gold uppercase">
          RHEMAR
        </span>
        <span className="font-serif-luxury italic text-[9px] tracking-[0.4em] text-white/40 uppercase mt-2">
          atelier console
        </span>
      </div>

      <nav className="flex flex-col gap-4 flex-1">
        {/* <button onClick={() => setActiveTab('dashboard')} className={`flex items-center gap-6 p-6 rounded-3xl transition-all duration-500 font-bold uppercase text-[10px] tracking-[0.4em] ${activeTab === 'dashboard' ? 'bg-gold text-black shadow-2xl' : 'text-gray-400 hover:text-gold hover:bg-white/5'}`}>
            <LayoutDashboard size={18} strokeWidth={1.5} /> Dashboard
          </button>
          <button onClick={() => setActiveTab('categories')} className={`flex items-center gap-6 p-6 rounded-3xl transition-all duration-500 font-bold uppercase text-[10px] tracking-[0.4em] ${activeTab === 'categories' ? 'bg-gold text-black shadow-2xl' : 'text-gray-400 hover:text-gold hover:bg-white/5'}`}>
            <Tag size={18} strokeWidth={1.5} /> Categories
          </button>
          <button onClick={() => setActiveTab('products')} className={`flex items-center gap-6 p-6 rounded-3xl transition-all duration-500 font-bold uppercase text-[10px] tracking-[0.4em] ${activeTab === 'products' ? 'bg-gold text-black shadow-2xl' : 'text-gray-400 hover:text-gold hover:bg-white/5'}`}>
            <ShoppingBag size={18} strokeWidth={1.5} /> Products
          </button>
          <button onClick={() => setActiveTab('orders')} className={`flex items-center gap-6 p-6 rounded-3xl transition-all duration-500 font-bold uppercase text-[10px] tracking-[0.4em] ${activeTab === 'orders' ? 'bg-gold text-black shadow-2xl' : 'text-gray-400 hover:text-gold hover:bg-white/5'}`}>
            <Truck size={18} strokeWidth={1.5} /> Order Stream
          </button>
          <button onClick={() => setActiveTab('users')} className={`flex items-center gap-6 p-6 rounded-3xl transition-all duration-500 font-bold uppercase text-[10px] tracking-[0.4em] ${activeTab === 'users' ? 'bg-gold text-black shadow-2xl' : 'text-gray-400 hover:text-gold hover:bg-white/5'}`}>
            <Users size={18} strokeWidth={1.5} /> Client Base
          </button> */}
        {navItem(<LayoutDashboard size={18} />, "Dashboard", "/admin")}
        {navItem(<Tag size={18} />, "Categories", "/admin/categories")}
        {navItem(<ShoppingBag size={18} />, "Products", "/admin/products")}
        {navItem(<Truck size={18} />, "Orders", "/admin/orders")}
        {navItem(<Users size={18} />, "Users", "/admin/users")}
      </nav>

      <div className="pt-10 border-t border-white/5">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold font-bold">
            A
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-white">
              {user?.name || "Admin User"}
            </p>
            <p className="text-[9px] text-gray-500 uppercase tracking-widest">
              {user?.role === "admin" ? "Administrator" : "Client"}
            </p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-4 text-red-400 font-bold uppercase text-[9px] tracking-[0.4em] hover:text-red-300 transition-colors"
        >
          <LogOut size={16} /> Exit Atelier
        </button>
      </div>
    </aside>
  );
}
