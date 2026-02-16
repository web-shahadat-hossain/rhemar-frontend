"use client";

import { useEffect, useState } from "react";
import { ShoppingBag, Truck, TrendingUp, AlertCircle } from "lucide-react";
import { api } from "@/lib/services/api";

interface OverviewData {
  totalRevenue: number;
  totalOrders: number;
  totalItems: number;
  lowStockCount: number;
}

export default function DashboardStats() {
  const [data, setData] = useState<OverviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const res = await api("/admin/overview", {
          method: "GET",
        });

        setData(res);
      } catch (err: any) {
        setError("Failed to load overview");
      } finally {
        setLoading(false);
      }
    };

    fetchOverview();
  }, []);

  const formatCurrency = (amount: number) => {
    return `৳${amount.toLocaleString()}`;
  };

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-400">Loading overview...</div>
    );
  }

  if (error) {
    return <div className="p-10 text-center text-red-400">{error}</div>;
  }

  return (
    <div className="space-y-12 animate-fade-up">
      <header className="flex justify-between items-end">
        <div className="space-y-4">
          <span className="text-gold font-bold text-[10px] uppercase tracking-[0.6em]">
            Executive View
          </span>
          <h1 className="text-5xl font-heading tracking-tight">
            Atelier Overview
          </h1>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Revenue */}
        <div className="bg-white p-10 rounded-[2.5rem] border border-black/5 shadow-sm space-y-6">
          <div className="w-14 h-14 bg-gold/5 text-gold rounded-2xl flex items-center justify-center">
            <TrendingUp size={28} strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
              Total Revenue
            </p>
            <h4 className="text-3xl font-heading font-medium">
              {formatCurrency(data?.totalRevenue || 0)}
            </h4>
          </div>
        </div>

        {/* Orders */}
        <div className="bg-white p-10 rounded-[2.5rem] border border-black/5 shadow-sm space-y-6">
          <div className="w-14 h-14 bg-gold/5 text-gold rounded-2xl flex items-center justify-center">
            <Truck size={28} strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
              Total Orders
            </p>
            <h4 className="text-3xl font-heading font-medium">
              {data?.totalOrders.toLocaleString()}
            </h4>
          </div>
        </div>

        {/* Items */}
        <div className="bg-white p-10 rounded-[2.5rem] border border-black/5 shadow-sm space-y-6">
          <div className="w-14 h-14 bg-gold/5 text-gold rounded-2xl flex items-center justify-center">
            <ShoppingBag size={28} strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
              Items in Vault
            </p>
            <h4 className="text-3xl font-heading font-medium">
              {data?.totalItems.toLocaleString()}
            </h4>
          </div>
        </div>

        {/* Stock Alerts */}
        <div
          className={`p-10 rounded-[2.5rem] border shadow-sm space-y-6 transition-all ${
            data?.lowStockCount && data.lowStockCount > 0
              ? "bg-black text-gold border-gold/20"
              : "bg-white text-gray-400 border-black/5"
          }`}
        >
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
              data?.lowStockCount && data.lowStockCount > 0
                ? "bg-gold/20 text-gold"
                : "bg-gray-50 text-gray-200"
            }`}
          >
            <AlertCircle size={28} strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest mb-1">
              Stock Alerts
            </p>
            <h4 className="text-3xl font-heading font-medium">
              {data?.lowStockCount || 0}{" "}
              {data?.lowStockCount && data.lowStockCount > 0 ? "Low" : ""}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
