"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Package,
  Search,
  Eye,
  ChevronDown,
  X,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CreditCard,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import { api } from "@/lib/services/api";

const ITEMS_PER_PAGE = 8;

const statusColors = {
  Pending: "bg-yellow-50 text-yellow-600 border-yellow-200",
  Processing: "bg-blue-50 text-blue-600 border-blue-200",
  Shipped: "bg-purple-50 text-purple-600 border-purple-200",
  Delivered: "bg-green-50 text-green-600 border-green-200",
  Cancelled: "bg-red-50 text-red-600 border-red-200",
};

const statusIcons = {
  Pending: Clock,
  Processing: Package,
  Shipped: Truck,
  Delivered: CheckCircle,
  Cancelled: AlertCircle,
};

export default function OrdersManager() {
  const [orders, setOrders] = useState<any[]>([]);
  const [orderSearchQuery, setOrderSearchQuery] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [statusUpdateLoading, setStatusUpdateLoading] = useState<string | null>(
    null,
  );

  // 🔥 Fetch Orders
  useEffect(() => {
    fetchOrders();
  }, [currentPage]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await api(
        `/orders?page=${currentPage}&limit=${ITEMS_PER_PAGE}&populate=products`,
      );
      setOrders(data.orders);
      setTotalPages(data.totalPages);
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔎 Filter (client side)
  const filteredOrders = useMemo(() => {
    let result = [...orders];

    if (orderStatusFilter !== "All") {
      result = result.filter((o) => o.status === orderStatusFilter);
    }

    if (orderSearchQuery.trim()) {
      const q = orderSearchQuery.toLowerCase();
      result = result.filter(
        (o) =>
          o.orderId?.toLowerCase().includes(q) ||
          o.customerName?.toLowerCase().includes(q) ||
          o.phoneNumber?.toLowerCase().includes(q) ||
          o.email?.toLowerCase().includes(q),
      );
    }

    return result;
  }, [orders, orderSearchQuery, orderStatusFilter]);

  // 🔥 Status Update
  const handleUpdateOrderStatus = async (id: string, newStatus: string) => {
    if (
      !window.confirm(
        `Are you sure you want to mark this order as ${newStatus}?`,
      )
    )
      return;

    try {
      setStatusUpdateLoading(id);
      await api(`/orders/${id}`, {
        method: "PUT",
        body: JSON.stringify({ status: newStatus }),
      });
      await fetchOrders(); // refresh
    } catch (error: any) {
      alert(error.message);
    } finally {
      setStatusUpdateLoading(null);
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-12 animate-fade-up">
      {/* Header */}
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-5xl font-heading tracking-tight">
            Orders Management
          </h1>
          <p className="text-gray-500 mt-2">
            Manage and track all customer orders
          </p>
        </div>
      </header>

      {/* Container */}
      <div className="bg-white rounded-[3rem] border border-black/5 shadow-sm overflow-hidden">
        {/* Search and Filter */}
        <div className="p-8 flex flex-wrap gap-4 justify-between items-center bg-gray-50/50">
          <div className="relative w-full max-w-md">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by name, phone, email or order ID..."
              className="w-full border rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-black/5"
              value={orderSearchQuery}
              onChange={(e) => {
                setOrderSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className="flex items-center gap-4">
            <select
              className="border rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-black/5"
              value={orderStatusFilter}
              onChange={(e) => {
                setOrderStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Showing {filteredOrders.length} Orders
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-8 py-6 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Order Info
                </th>
                <th className="px-8 py-6 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-8 py-6 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Products
                </th>
                <th className="px-8 py-6 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-8 py-6 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-8 py-6 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-8 py-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-black/5">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-20 text-center">
                    <div className="flex justify-center items-center gap-2">
                      <div className="w-2 h-2 bg-black rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-black rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-2 h-2 bg-black rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => {
                  const StatusIcon =
                    statusIcons[order.status as keyof typeof statusIcons] ||
                    Package;

                  return (
                    <tr
                      key={order._id}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-8 py-6">
                        <div className="space-y-1">
                          <p className="font-medium">{order.orderId}</p>
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <Calendar size={14} />
                            {formatDate(order.createdAt)}
                          </p>
                        </div>
                      </td>

                      <td className="px-8 py-6">
                        <div className="space-y-2">
                          <p className="font-medium">{order.customerName}</p>
                          <div className="space-y-1 text-sm text-gray-500">
                            <p className="flex items-center gap-1">
                              <Phone size={14} />
                              {order.phoneNumber}
                            </p>
                            {order.email && (
                              <p className="flex items-center gap-1">
                                <Mail size={14} />
                                {order.email}
                              </p>
                            )}
                            {order.address && (
                              <p className="flex items-center gap-1">
                                <MapPin size={14} />
                                {order.address}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="px-8 py-6">
                        <div className="space-y-2">
                          {order.products?.map(
                            (product: any, index: number) => (
                              <div key={index} className="text-sm">
                                <p className="font-medium">{product.name}</p>
                                <p className="text-gray-500">
                                  Qty: {product.quantity} × ৳
                                  {product.price?.toLocaleString()}
                                </p>
                                {product.variant && (
                                  <p className="text-xs text-gray-400">
                                    {product.variant}
                                  </p>
                                )}
                              </div>
                            ),
                          )}
                        </div>
                      </td>

                      <td className="px-8 py-6">
                        <p className="font-bold text-lg">
                          ৳{order.total?.toLocaleString()}
                        </p>
                        {order.subtotal && (
                          <p className="text-xs text-gray-400">
                            Subtotal: ৳{order.subtotal.toLocaleString()}
                          </p>
                        )}
                      </td>

                      <td className="px-8 py-6">
                        <div className="space-y-1">
                          <p className="flex items-center gap-1 text-sm">
                            <CreditCard size={14} />
                            {order.paymentMethod}
                          </p>
                          {order.paymentStatus && (
                            <p
                              className={`text-xs px-2 py-1 rounded-full inline-block ${
                                order.paymentStatus === "Paid"
                                  ? "bg-green-50 text-green-600"
                                  : "bg-yellow-50 text-yellow-600"
                              }`}
                            >
                              {order.paymentStatus}
                            </p>
                          )}
                        </div>
                      </td>

                      <td className="px-8 py-6">
                        <div className="relative group">
                          <button
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm ${statusColors[order.status as keyof typeof statusColors] || "bg-gray-50 text-gray-600"}`}
                            disabled={statusUpdateLoading === order._id}
                          >
                            <StatusIcon size={14} />
                            {order.status}
                            <ChevronDown
                              size={14}
                              className="group-hover:rotate-180 transition-transform"
                            />
                          </button>

                          {/* Status Dropdown */}
                          <div className="absolute left-0 mt-1 w-40 bg-white rounded-xl shadow-lg border py-1 hidden group-hover:block z-10">
                            {[
                              "Pending",
                              "Processing",
                              "Shipped",
                              "Delivered",
                              "Cancelled",
                            ].map((status) => (
                              <button
                                key={status}
                                onClick={() =>
                                  handleUpdateOrderStatus(order._id, status)
                                }
                                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                                disabled={status === order.status}
                              >
                                {status}
                              </button>
                            ))}
                          </div>
                        </div>
                      </td>

                      <td className="px-8 py-6 text-right">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-2 hover:bg-black/5 rounded-xl transition-colors"
                        >
                          <Eye size={18} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {!loading && filteredOrders.length === 0 && (
          <div className="py-32 text-center">
            <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
              <Package size={40} className="text-gray-400" />
            </div>
            <p className="text-xl font-medium text-gray-600">No orders found</p>
            <p className="text-gray-400 mt-2">
              Try adjusting your search or filter
            </p>
          </div>
        )}

        {/* Pagination */}
        <div className="p-8 flex justify-between items-center border-t border-black/5">
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-xl border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            <ChevronLeft size={18} />
            Previous
          </button>

          <span className="text-sm bg-gray-100 px-4 py-2 rounded-full">
            Page {currentPage} of {totalPages}
          </span>

          <button
            className="flex items-center gap-2 px-4 py-2 rounded-xl border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-black/5 p-8 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-heading">Order Details</h2>
                <p className="text-gray-500">
                  Order ID: {selectedOrder.orderId}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 hover:bg-black/5 rounded-xl transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8 space-y-8">
              {/* Customer Information */}
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="font-bold text-gray-700">
                    Customer Information
                  </h3>
                  <div className="space-y-3">
                    <p>
                      <span className="text-gray-500">Name:</span>{" "}
                      {selectedOrder.customerName}
                    </p>
                    <p>
                      <span className="text-gray-500">Phone:</span>{" "}
                      {selectedOrder.phoneNumber}
                    </p>
                    {selectedOrder.email && (
                      <p>
                        <span className="text-gray-500">Email:</span>{" "}
                        {selectedOrder.email}
                      </p>
                    )}
                    {selectedOrder.address && (
                      <p>
                        <span className="text-gray-500">Address:</span>{" "}
                        {selectedOrder.address}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-gray-700">Order Summary</h3>
                  <div className="space-y-3">
                    <p>
                      <span className="text-gray-500">Order Date:</span>{" "}
                      {formatDate(selectedOrder.createdAt)}
                    </p>
                    <p>
                      <span className="text-gray-500">Payment Method:</span>{" "}
                      {selectedOrder.paymentMethod}
                    </p>
                    <p>
                      <span className="text-gray-500">Payment Status:</span>
                      <span
                        className={`ml-2 px-2 py-1 rounded-full text-xs ${
                          selectedOrder.paymentStatus === "Paid"
                            ? "bg-green-50 text-green-600"
                            : "bg-yellow-50 text-yellow-600"
                        }`}
                      >
                        {selectedOrder.paymentStatus || "Pending"}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Products List */}
              <div>
                <h3 className="font-bold text-gray-700 mb-4">Products</h3>
                <div className="border rounded-2xl overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500">
                          Product
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500">
                          Variant
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500">
                          Quantity
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500">
                          Price
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {selectedOrder.products?.map(
                        (product: any, index: number) => (
                          <tr key={index}>
                            <td className="px-6 py-4">{product.name}</td>
                            <td className="px-6 py-4 text-gray-500">
                              {product.variant || "-"}
                            </td>
                            <td className="px-6 py-4">{product.quantity}</td>
                            <td className="px-6 py-4">
                              ৳{product.price?.toLocaleString()}
                            </td>
                            <td className="px-6 py-4">
                              ৳
                              {(
                                product.price * product.quantity
                              ).toLocaleString()}
                            </td>
                          </tr>
                        ),
                      )}
                    </tbody>
                    <tfoot className="bg-gray-50">
                      <tr>
                        <td
                          colSpan={4}
                          className="px-6 py-4 text-right font-bold"
                        >
                          Subtotal:
                        </td>
                        <td className="px-6 py-4 font-bold">
                          ৳{selectedOrder.subtotal?.toLocaleString()}
                        </td>
                      </tr>
                      {selectedOrder.discount > 0 && (
                        <tr>
                          <td
                            colSpan={4}
                            className="px-6 py-4 text-right text-green-600"
                          >
                            Discount:
                          </td>
                          <td className="px-6 py-4 text-green-600">
                            -৳{selectedOrder.discount?.toLocaleString()}
                          </td>
                        </tr>
                      )}
                      <tr>
                        <td
                          colSpan={4}
                          className="px-6 py-4 text-right font-bold text-lg"
                        >
                          Total:
                        </td>
                        <td className="px-6 py-4 font-bold text-lg">
                          ৳{selectedOrder.total?.toLocaleString()}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* Notes */}
              {selectedOrder.notes && (
                <div>
                  <h3 className="font-bold text-gray-700 mb-2">Order Notes</h3>
                  <p className="text-gray-600 bg-gray-50 p-4 rounded-2xl">
                    {selectedOrder.notes}
                  </p>
                </div>
              )}

              {/* Status Timeline */}
              <div>
                <h3 className="font-bold text-gray-700 mb-4">Order Timeline</h3>
                <div className="space-y-4">
                  {selectedOrder.timeline?.map((event: any, index: number) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            event.status === "Delivered"
                              ? "bg-green-500"
                              : event.status === "Cancelled"
                                ? "bg-red-500"
                                : "bg-blue-500"
                          }`}
                        />
                      </div>
                      <div>
                        <p className="font-medium">{event.status}</p>
                        <p className="text-sm text-gray-500">
                          {formatDate(event.date)}
                        </p>
                        {event.note && (
                          <p className="text-sm text-gray-600 mt-1">
                            {event.note}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
