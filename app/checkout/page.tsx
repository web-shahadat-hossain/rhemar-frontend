"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle,
  Truck,
  CreditCard,
  ChevronLeft,
  ChevronDown,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { api } from "@/lib/services/api";

interface CheckoutPageProps {
  params?: Record<string, string>;
  searchParams?: Record<string, string>;
}

export default function CheckoutPage({}: CheckoutPageProps) {
  const router = useRouter();
  const { cartItems, clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "Dhaka",
    deliveryArea: "",
    note: "",
    payment: "COD",
  });
  console.log(cartItems);
  const [isOrdered, setIsOrdered] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if cart empty
  useEffect(() => {
    if (cartItems.length === 0 && !isOrdered) {
      router.push("/cart");
    }
  }, [cartItems, isOrdered, router]);

  // Redirect after order
  useEffect(() => {
    if (isOrdered) {
      const timer = setTimeout(() => {
        router.push("/success");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isOrdered, router]);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.discountPrice || item.price) * item.quantity,
    0,
  );

  const getDeliveryCharge = () => {
    if (formData.deliveryArea === "inside") return 80;
    if (formData.deliveryArea === "outside") return 120;
    return 0;
  };

  const delivery = getDeliveryCharge();
  const total = subtotal + delivery;

  const isFormValid =
    formData.name &&
    formData.phone &&
    formData.address &&
    formData.deliveryArea;

  const handleSubmit = async () => {
    if (!isFormValid) return;

    try {
      setIsLoading(true);

      const formattedItems = cartItems.map((item) => ({
        productId: item._id,
        name: item.name,
        size: item.selectedSize,
        quantity: item.quantity,
        price: item.discountPrice || item.price,
      }));

      const orderData = {
        customerName: formData.name,
        phoneNumber: formData.phone,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        deliveryArea: formData.deliveryArea,
        paymentMethod:
          formData.payment === "COD" ? "Cash on Delivery" : "Online Payment",
        note: formData.note,
        items: formattedItems,
        subtotal,
        deliveryCharge: delivery,
        total,
      };

      const data = await api("/orders", {
        method: "POST",
        body: JSON.stringify(orderData),
      });

      clearCart();
      setOrderId(data._id);
      setIsOrdered(true);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 text-center pt-32">
        <div className="font-serif-luxury text-gold text-2xl animate-pulse">
          Loading...
        </div>
      </div>
    );
  }

  // Loading Screen - Before redirecting to success page
  if (isOrdered) {
    return (
      <div className="bg-[#fdfdfd] text-[#1a1a1a] py-20">
        <div className="max-w-xl mx-auto px-4 py-32 text-center pt-32">
          <div className="bg-white rounded-3xl p-12 shadow-xl border border-gray-100 flex flex-col items-center animate-fadeIn">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
              <CheckCircle size={40} className="text-green-600" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Order Placed!</h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Thank you for choosing Rhemar Signature. Your order has been
              successfully placed and is now being processed.
            </p>
            <div className="bg-gray-50 w-full p-4 rounded-xl mb-8 text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Order ID:</span>
                <span className="font-bold font-mono">#{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Status:</span>
                <span className="text-[#d4af37] font-bold">Processing</span>
              </div>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
              <div className="bg-green-500 h-full animate-pulse" />
            </div>
            <p className="text-gray-400 text-xs mt-6">
              Preparing your order details...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Checkout Form
  return (
    <div className="bg-[#fdfdfd] text-[#1a1a1a] py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-20">
        <button
          onClick={() => router.push("/cart")}
          className="flex items-center gap-2 text-gray-500 hover:text-black mb-10 font-bold transition-colors"
        >
          <ChevronLeft size={20} /> Back to Cart
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Form Section */}
          <div className="space-y-12">
            {/* Delivery Details */}
            <section>
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-black text-white text-sm flex items-center justify-center">
                  1
                </span>
                Delivery Details
              </h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-[#d4af37]/20 focus:border-[#d4af37] transition-all"
                      placeholder="E.g. Tanvir Ahmed"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-[#d4af37]/20 focus:border-[#d4af37] transition-all"
                      placeholder="017XXXXXXXX"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                      Delivery Area *
                    </label>
                    <div className="relative">
                      <select
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-[#d4af37]/20 focus:border-[#d4af37] transition-all appearance-none cursor-pointer"
                        value={formData.deliveryArea}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            deliveryArea: e.target.value,
                          })
                        }
                        required
                      >
                        <option value="" disabled>
                          Select delivery area
                        </option>
                        <option value="inside">Inside Dhaka (৳80)</option>
                        <option value="outside">Outside Dhaka (৳120)</option>
                      </select>
                      <ChevronDown
                        size={18}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-[#d4af37]/20 focus:border-[#d4af37] transition-all"
                      placeholder="E.g. Dhaka"
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-[#d4af37]/20 focus:border-[#d4af37] transition-all"
                    placeholder="tanvir@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                    Detailed Address *
                  </label>
                  <textarea
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-[#d4af37]/20 focus:border-[#d4af37] transition-all h-32"
                    placeholder="House, Road, Area details..."
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-[#d4af37]/20 focus:border-[#d4af37] transition-all h-24"
                    placeholder="Any special instructions..."
                    value={formData.note}
                    onChange={(e) =>
                      setFormData({ ...formData, note: e.target.value })
                    }
                  />
                </div>
              </form>
            </section>

            {/* Payment Method */}
            <section>
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-black text-white text-sm flex items-center justify-center">
                  2
                </span>
                Payment Method
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => setFormData({ ...formData, payment: "COD" })}
                  className={`p-6 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                    formData.payment === "COD"
                      ? "border-[#d4af37] bg-[#d4af37]/5 shadow-md"
                      : "border-gray-100 hover:border-gray-300"
                  }`}
                  type="button"
                >
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      formData.payment === "COD"
                        ? "border-[#d4af37]"
                        : "border-gray-300"
                    }`}
                  >
                    {formData.payment === "COD" && (
                      <div className="w-3 h-3 bg-[#d4af37] rounded-full" />
                    )}
                  </div>
                  <div className="text-left">
                    <p className="font-bold flex items-center gap-2">
                      <Truck size={18} /> Cash on Delivery
                    </p>
                    <p className="text-xs text-gray-500">
                      Pay when you receive the order
                    </p>
                  </div>
                </button>

                {/* <button
                  onClick={() =>
                    setFormData({ ...formData, payment: "ONLINE" })
                  }
                  className={`p-6 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                    formData.payment === "ONLINE"
                      ? "border-[#d4af37] bg-[#d4af37]/5 shadow-md"
                      : "border-gray-100 hover:border-gray-300"
                  }`}
                  type="button"
                >
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      formData.payment === "ONLINE"
                        ? "border-[#d4af37]"
                        : "border-gray-300"
                    }`}
                  >
                    {formData.payment === "ONLINE" && (
                      <div className="w-3 h-3 bg-[#d4af37] rounded-full" />
                    )}
                  </div>
                  <div className="text-left">
                    <p className="font-bold flex items-center gap-2">
                      <CreditCard size={18} /> Online Payment
                    </p>
                    <p className="text-xs text-gray-500">
                      bKash, Nagad or Cards
                    </p>
                  </div>
                </button> */}
              </div>
            </section>
          </div>

          {/* Order Preview - Sticky */}
          <div>
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 sticky top-32">
              <h2 className="text-xl font-bold mb-8 uppercase tracking-widest text-sm text-[#d4af37]">
                Your Order
              </h2>

              {/* Items List */}
              <div className="max-h-[300px] overflow-y-auto pr-2 mb-8 space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={`${item._id}-${item.selectedSize}`}
                    className="flex gap-4"
                  >
                    <img
                      src={item.images?.[0]?.url || item.images?.[0]}
                      alt={item.name}
                      className="w-16 h-20 object-cover rounded-lg bg-gray-100"
                    />
                    <div className="flex-1">
                      <h4 className="font-bold text-sm text-gray-900 line-clamp-1">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-500">
                        Size: {item.selectedSize} | Qty: {item.quantity}
                      </p>
                      <p className="text-sm font-bold mt-1 text-black">
                        ৳
                        {(
                          (item.discountPrice || item.price) * item.quantity
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="space-y-4 pt-6 border-t border-gray-100">
                <div className="flex justify-between text-gray-600">
                  <span className="text-sm">Subtotal</span>
                  <span className="font-medium text-black">
                    ৳{subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600 transition-all duration-500">
                  <span className="text-sm">Delivery Charge</span>
                  <span
                    className={`font-bold transition-colors ${
                      formData.deliveryArea ? "text-[#d4af37]" : "text-gray-400"
                    }`}
                  >
                    {formData.deliveryArea
                      ? `৳${delivery.toLocaleString()}`
                      : "—"}
                  </span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-4 border-t border-gray-100">
                  <span>Grand Total</span>
                  <span
                    className={`transition-all duration-700 ${
                      formData.deliveryArea
                        ? "text-[#d4af37] scale-105 origin-right"
                        : "text-gray-900"
                    }`}
                  >
                    ৳{total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="mt-10 space-y-4">
                <button
                  onClick={handleSubmit}
                  disabled={!isFormValid}
                  className={`w-full py-5 rounded-full font-bold transition-all shadow-lg active:scale-95
                  ${
                    isFormValid
                      ? "bg-black text-white hover:bg-[#d4af37] hover:text-black cursor-pointer"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                  }
                `}
                >
                  PLACE ORDER NOW
                </button>

                {!formData.deliveryArea && (
                  <p className="text-[10px] text-red-400 font-bold uppercase tracking-widest text-center animate-pulse">
                    Please select a delivery area
                  </p>
                )}
              </div>

              <p className="text-[10px] text-gray-400 text-center mt-6 uppercase tracking-widest leading-relaxed">
                By placing the order you agree to our <br /> Terms of Service &
                Refund Policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
