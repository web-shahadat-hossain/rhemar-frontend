"use client";

import {
  Plus,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Tag,
  Percent,
  DollarSign,
  Copy,
  Check,
  X,
  AlertCircle,
  TrendingUp,
  Clock,
  Users,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "@/lib/services/api"; // ✅ your shared api utility

interface PromoCode {
  _id: string;
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minOrderAmount: number;
  maxUses: number | null;
  usedCount: number;
  isActive: boolean;
  expiresAt: string | null;
  createdAt: string;
}

const PRESET_CODES = ["SAVE10", "WELCOME20", "FLASH50", "VIP100", "RHEMAR15"];

export default function PromoCodesPanel() {
  const [promos, setPromos] = useState<PromoCode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    code: "",
    discountType: "percentage" as "percentage" | "fixed",
    discountValue: "",
    minOrderAmount: "",
    maxUses: "",
    expiresAt: "",
  });

  // ── Fetch ────────────────────────────────────────────────────
  const fetchPromos = async () => {
    setIsLoading(true);
    try {
      const data = await api("/promos");
      setPromos(data);
    } catch {
      console.error("Failed to fetch promo codes");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPromos();
  }, []);

  // ── Create ───────────────────────────────────────────────────
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.code.trim() || !form.discountValue) {
      setError("Code and discount value are required.");
      return;
    }

    setIsSubmitting(true);
    try {
      await api("/promos", {
        method: "POST",
        body: JSON.stringify({
          code: form.code.trim().toUpperCase(),
          discountType: form.discountType,
          discountValue: Number(form.discountValue),
          minOrderAmount: form.minOrderAmount ? Number(form.minOrderAmount) : 0,
          maxUses: form.maxUses ? Number(form.maxUses) : null,
          expiresAt: form.expiresAt || null,
        }),
      });
      setIsModalOpen(false);
      resetForm();
      fetchPromos();
    } catch (err: any) {
      setError(err.message || "Failed to create promo code");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Toggle ───────────────────────────────────────────────────
  const handleToggle = async (id: string) => {
    try {
      await api(`/promos/${id}/toggle`, { method: "PATCH" });
      fetchPromos();
    } catch {
      console.error("Failed to toggle");
    }
  };

  // ── Delete ───────────────────────────────────────────────────
  const handleDelete = async (id: string) => {
    try {
      await api(`/promos/${id}`, { method: "DELETE" });
      setDeleteConfirm(null);
      fetchPromos();
    } catch {
      console.error("Failed to delete");
    }
  };

  // ── Copy ─────────────────────────────────────────────────────
  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const resetForm = () => {
    setForm({
      code: "",
      discountType: "percentage",
      discountValue: "",
      minOrderAmount: "",
      maxUses: "",
      expiresAt: "",
    });
    setError("");
  };

  // ── Helpers ──────────────────────────────────────────────────
  const isExpired = (expiresAt: string | null) =>
    expiresAt ? new Date() > new Date(expiresAt) : false;

  const getStatusBadge = (promo: PromoCode) => {
    if (!promo.isActive)
      return (
        <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs font-bold rounded-full">
          Inactive
        </span>
      );
    if (isExpired(promo.expiresAt))
      return (
        <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs font-bold rounded-full">
          Expired
        </span>
      );
    if (promo.maxUses !== null && promo.usedCount >= promo.maxUses)
      return (
        <span className="px-2 py-0.5 bg-orange-100 text-orange-600 text-xs font-bold rounded-full">
          Exhausted
        </span>
      );
    return (
      <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded-full">
        Active
      </span>
    );
  };

  const activeCount = promos.filter(
    (p) =>
      p.isActive &&
      !isExpired(p.expiresAt) &&
      (p.maxUses === null || p.usedCount < p.maxUses),
  ).length;
  const totalUsed = promos.reduce((s, p) => s + p.usedCount, 0);

  // ── Render ───────────────────────────────────────────────────
  return (
    <>
      <div className="space-y-8 animate-fade-up p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Promo Codes
            </h1>
            <p className="text-gray-500 mt-2">
              Create and manage discount codes
            </p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setIsModalOpen(true);
            }}
            className="group bg-gradient-to-r from-gray-900 to-gray-800 text-white px-8 py-4 rounded-2xl text-sm font-semibold flex items-center gap-3 hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Plus
              size={20}
              className="group-hover:rotate-90 transition-transform"
            />
            Create Promo Code
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl">
            <Tag className="text-blue-600 mb-3" size={24} />
            <p className="text-2xl font-bold">{promos.length}</p>
            <p className="text-gray-600 text-sm">Total Codes</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl">
            <Zap className="text-green-600 mb-3" size={24} />
            <p className="text-2xl font-bold">{activeCount}</p>
            <p className="text-gray-600 text-sm">Active Codes</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl">
            <Users className="text-purple-600 mb-3" size={24} />
            <p className="text-2xl font-bold">{totalUsed}</p>
            <p className="text-gray-600 text-sm">Total Uses</p>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl">
            <TrendingUp className="text-orange-600 mb-3" size={24} />
            <p className="text-2xl font-bold">
              {promos.length > 0 ? Math.round(totalUsed / promos.length) : 0}
            </p>
            <p className="text-gray-600 text-sm">Avg Uses / Code</p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
            </div>
          ) : promos.length === 0 ? (
            <div className="text-center py-20">
              <Tag size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 font-medium">No promo codes yet</p>
              <p className="text-gray-400 text-sm mt-1">
                Create your first promo code to get started
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-8 py-5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Code
                    </th>
                    <th className="px-8 py-5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Discount
                    </th>
                    <th className="px-8 py-5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Min Order
                    </th>
                    <th className="px-8 py-5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Usage
                    </th>
                    <th className="px-8 py-5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Expires
                    </th>
                    <th className="px-8 py-5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-8 py-5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {promos.map((promo) => (
                    <tr
                      key={promo._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      {/* Code */}
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-gray-900 text-base tracking-widest">
                            {promo.code}
                          </span>
                          <button
                            onClick={() => copyCode(promo.code)}
                            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Copy code"
                          >
                            {copiedCode === promo.code ? (
                              <Check size={14} className="text-green-500" />
                            ) : (
                              <Copy size={14} className="text-gray-400" />
                            )}
                          </button>
                        </div>
                      </td>

                      {/* Discount */}
                      <td className="px-8 py-5">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl font-bold text-sm ${
                            promo.discountType === "percentage"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-emerald-100 text-emerald-700"
                          }`}
                        >
                          {promo.discountType === "percentage" ? (
                            <>
                              <Percent size={13} />
                              {promo.discountValue}% off
                            </>
                          ) : (
                            <>৳{promo.discountValue} off</>
                          )}
                        </span>
                      </td>

                      {/* Min Order */}
                      <td className="px-8 py-5">
                        <span className="text-gray-600 text-sm">
                          {promo.minOrderAmount > 0
                            ? `৳${promo.minOrderAmount}`
                            : "—"}
                        </span>
                      </td>

                      {/* Usage */}
                      <td className="px-8 py-5">
                        <div className="space-y-1">
                          <span className="text-sm font-medium text-gray-700">
                            {promo.usedCount}
                            {promo.maxUses !== null && (
                              <span className="text-gray-400">
                                {" "}
                                / {promo.maxUses}
                              </span>
                            )}
                          </span>
                          {promo.maxUses !== null && (
                            <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-gray-600 to-gray-900 rounded-full"
                                style={{
                                  width: `${Math.min((promo.usedCount / promo.maxUses) * 100, 100)}%`,
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Expires */}
                      <td className="px-8 py-5">
                        {promo.expiresAt ? (
                          <div className="flex items-center gap-1.5 text-sm">
                            <Clock
                              size={13}
                              className={
                                isExpired(promo.expiresAt)
                                  ? "text-red-400"
                                  : "text-gray-400"
                              }
                            />
                            <span
                              className={
                                isExpired(promo.expiresAt)
                                  ? "text-red-500 font-medium"
                                  : "text-gray-600"
                              }
                            >
                              {new Date(promo.expiresAt).toLocaleDateString(
                                "en-GB",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                },
                              )}
                            </span>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">Never</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="px-8 py-5">{getStatusBadge(promo)}</td>

                      {/* Actions */}
                      <td className="px-8 py-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleToggle(promo._id)}
                            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                            title={promo.isActive ? "Deactivate" : "Activate"}
                          >
                            {promo.isActive ? (
                              <ToggleRight
                                size={20}
                                className="text-green-500"
                              />
                            ) : (
                              <ToggleLeft size={20} className="text-gray-400" />
                            )}
                          </button>

                          {deleteConfirm === promo._id ? (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleDelete(promo._id)}
                                className="px-3 py-1.5 bg-red-500 text-white text-xs font-bold rounded-lg hover:bg-red-600 transition-colors"
                              >
                                Delete
                              </button>
                              <button
                                onClick={() => setDeleteConfirm(null)}
                                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                              >
                                <X size={14} className="text-gray-500" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirm(promo._id)}
                              className="p-2 hover:bg-red-50 rounded-xl transition-colors"
                              title="Delete"
                            >
                              <Trash2 size={18} className="text-red-400" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* ── Create Modal ── */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-8 py-6 flex justify-between items-center z-10 rounded-t-3xl">
              <div>
                <h2 className="text-2xl font-bold">Create Promo Code</h2>
                <p className="text-sm text-gray-400 mt-0.5">
                  Fill in the details below
                </p>
              </div>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  resetForm();
                }}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreate} className="p-8 space-y-6">
              {/* Error banner */}
              {error && (
                <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                  <AlertCircle size={16} className="text-red-500 shrink-0" />
                  <p className="text-sm text-red-600 font-medium">{error}</p>
                </div>
              )}

              {/* Code */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Promo Code *
                </label>
                <input
                  type="text"
                  value={form.code}
                  onChange={(e) =>
                    setForm({ ...form, code: e.target.value.toUpperCase() })
                  }
                  className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-gray-900/20 font-mono font-bold tracking-widest uppercase"
                  placeholder="E.G. SAVE20"
                  required
                />
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs text-gray-400 self-center">
                    Quick:
                  </span>
                  {PRESET_CODES.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setForm({ ...form, code: preset })}
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-mono font-bold transition-colors"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Discount Type */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Discount Type *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {(["percentage", "fixed"] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setForm({ ...form, discountType: type })}
                      className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 font-semibold text-sm transition-all ${
                        form.discountType === type
                          ? "border-gray-900 bg-gray-900 text-white"
                          : "border-gray-200 hover:border-gray-300 text-gray-600"
                      }`}
                    >
                      {type === "percentage" ? (
                        <>
                          <Percent size={16} /> Percentage
                        </>
                      ) : (
                        <>
                          <DollarSign size={16} /> Fixed (৳)
                        </>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Discount Value */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Discount Value *{" "}
                  <span className="text-gray-400 font-normal">
                    (
                    {form.discountType === "percentage"
                      ? "e.g. 20 = 20% off"
                      : "e.g. 100 = ৳100 off"}
                    )
                  </span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">
                    {form.discountType === "percentage" ? "%" : "৳"}
                  </span>
                  <input
                    type="number"
                    value={form.discountValue}
                    onChange={(e) =>
                      setForm({ ...form, discountValue: e.target.value })
                    }
                    className="w-full border border-gray-200 rounded-xl p-3 pl-8 focus:outline-none focus:ring-2 focus:ring-gray-900/20"
                    placeholder="0"
                    min="1"
                    max={form.discountType === "percentage" ? "100" : undefined}
                    required
                  />
                </div>
              </div>

              {/* Min Order & Max Uses */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Min Order (৳){" "}
                    <span className="text-gray-400 font-normal">optional</span>
                  </label>
                  <input
                    type="number"
                    value={form.minOrderAmount}
                    onChange={(e) =>
                      setForm({ ...form, minOrderAmount: e.target.value })
                    }
                    className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-gray-900/20"
                    placeholder="0"
                    min="0"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Max Uses{" "}
                    <span className="text-gray-400 font-normal">optional</span>
                  </label>
                  <input
                    type="number"
                    value={form.maxUses}
                    onChange={(e) =>
                      setForm({ ...form, maxUses: e.target.value })
                    }
                    className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-gray-900/20"
                    placeholder="Unlimited"
                    min="1"
                  />
                </div>
              </div>

              {/* Expiry Date */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Expiry Date{" "}
                  <span className="text-gray-400 font-normal">
                    optional — leave blank for no expiry
                  </span>
                </label>
                <input
                  type="date"
                  value={form.expiresAt}
                  onChange={(e) =>
                    setForm({ ...form, expiresAt: e.target.value })
                  }
                  className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-gray-900/20"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              {/* Live Preview */}
              {form.code && form.discountValue && (
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-5 border border-gray-200">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                    Preview
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
                        <Tag size={18} className="text-white" />
                      </div>
                      <div>
                        <p className="font-mono font-bold text-gray-900 tracking-widest">
                          {form.code}
                        </p>
                        <p className="text-xs text-gray-500">
                          {form.discountType === "percentage"
                            ? `${form.discountValue}% off`
                            : `৳${form.discountValue} off`}
                          {form.minOrderAmount
                            ? ` · Min ৳${form.minOrderAmount}`
                            : ""}
                          {form.maxUses
                            ? ` · ${form.maxUses} uses max`
                            : " · Unlimited uses"}
                        </p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                      Active
                    </span>
                  </div>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white py-4 rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Creating..." : "Create Promo Code"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
