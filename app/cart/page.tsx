"use client";
// Extend window interface for fbq
declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

import React, { useEffect, useRef } from "react";

import { useRouter } from "next/navigation";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Zap,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

const FREE_DELIVERY_THRESHOLD = 5000;

export default function CartPage() {
  const router = useRouter();

  const { cartItems, increaseQty, decreaseQty, removeFromCart } = useCart();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.discountPrice || item.price) * item.quantity,
    0,
  );

  const delivery = subtotal > FREE_DELIVERY_THRESHOLD ? 0 : 80;
  const total = subtotal;
  const remainingForFreeDelivery = Math.max(
    0,
    FREE_DELIVERY_THRESHOLD - subtotal,
  );
  const hasFired = useRef(false);
  useEffect(() => {
    if (hasFired.current) return;
    if (cartItems.length === 0) return;

    hasFired.current = true;

    const eventId = crypto.randomUUID();

    // Browser Pixel
    window.fbq?.(
      "track",
      "ViewCart",
      {
        value: subtotal,
        currency: "BDT",
      },
      { eventID: eventId },
    );

    // Server Event
    fetch("/api/meta", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_name: "ViewCart",
        event_id: eventId,
        value: subtotal,
        userAgent: navigator.userAgent,
        url: window.location.href,
      }),
    });
  }, [cartItems]);

  if (cartItems.length === 0) {
    return (
      <div className="bg-[#fdfdfd] text-[#1a1a1a] py-20">
        <div className="max-w-2xl mx-auto px-4 md:px-8 py-32 text-center">
          <div className="bg-white rounded-3xl p-12 shadow-sm border border-gray-100">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={40} className="text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              Your cart is empty
            </h2>
            <button
              onClick={() => router.push("/shop")}
              className="bg-black text-white px-10 py-4 rounded-2xl font-bold uppercase tracking-[0.2em] hover:bg-[#d4af37] hover:text-black transition-all inline-flex items-center gap-2"
            >
              Start Shopping <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fdfdfd] text-[#1a1a1a] py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-20">
        <h1 className="text-4xl font-bold mb-12 text-gray-900 flex items-center gap-4">
          Shopping Cart
          <span className="text-sm font-normal text-gray-400 bg-gray-100 px-4 py-2 rounded-full">
            {cartItems.length} item{cartItems.length !== 1 ? "s" : ""}
          </span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, idx) => (
              <div
                key={`${item._id}-${item.selectedSize}`}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex gap-6 hover:shadow-md transition-shadow"
              >
                {/* Image */}
                <div className="flex-shrink-0">
                  <button
                    onClick={() => router.push(`/products/${item._id}`)}
                    className="w-24 h-32 rounded-xl bg-gray-100 overflow-hidden"
                  >
                    <img
                      src={item.images?.[0]?.url || item.images?.[0]}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </button>
                </div>

                {/* Info */}
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-xs text-gold font-bold uppercase mb-1">
                        {item.category}
                      </p>
                      <button
                        onClick={() => router.push(`/products/${item._id}`)}
                        className="text-lg font-bold text-gray-900 hover:text-gold"
                      >
                        {item.name}
                      </button>
                    </div>

                    <button
                      onClick={() =>
                        removeFromCart(item._id, item.selectedSize)
                      }
                      className="text-gray-400 hover:text-red-500 p-2"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>

                  {/* Size & Price */}
                  <div className="flex items-center gap-6 mb-4 text-sm">
                    <div>
                      <p className="text-xs text-gray-500">Size</p>
                      <p className="font-bold">{item.selectedSize}</p>
                    </div>
                    <div className="h-8 w-px bg-gray-200" />
                    <div>
                      <p className="text-xs text-gray-500">Price</p>
                      <p className="font-bold">
                        ৳{(item.discountPrice || item.price).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center border border-gray-200 rounded-full overflow-hidden h-10">
                      <button
                        onClick={() => decreaseQty(item._id, item.selectedSize)}
                        className="px-3 hover:bg-gray-100"
                      >
                        <Minus size={16} />
                      </button>

                      <span className="w-8 text-center text-sm font-bold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQty(item._id, item.selectedSize)}
                        className="px-3 hover:bg-gray-100"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <p className="text-lg font-bold">
                      ৳
                      {(
                        (item.discountPrice || item.price) * item.quantity
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 sticky top-32 space-y-6">
              {delivery > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-amber-900">
                    <Zap size={18} />
                    <p className="text-sm font-bold">
                      Add ৳{remainingForFreeDelivery.toLocaleString()}
                      {/* for FREE
                      delivery! */}
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>৳{subtotal.toLocaleString()}</span>
                </div>
                {/* <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>{delivery === 0 ? "FREE" : `৳${delivery}`}</span>
                </div> */}
              </div>

              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-[#d4af37]">
                  ৳{total.toLocaleString()}
                </span>
              </div>

              <button
                onClick={() => {
                  const eventId = crypto.randomUUID();

                  // Browser Pixel
                  window.fbq?.(
                    "track",
                    "InitiateCheckout",
                    {
                      value: total,
                      currency: "BDT",
                    },
                    { eventID: eventId },
                  );

                  // Server Event
                  fetch("/api/meta", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      event_name: "InitiateCheckout",
                      event_id: eventId,
                      value: total,
                      userAgent: navigator.userAgent,
                      url: window.location.href,
                    }),
                  });

                  router.push("/checkout");
                }}
                className="w-full bg-black text-white py-4 rounded-2xl font-bold uppercase tracking-[0.2em] hover:bg-[#d4af37] hover:text-black transition-all"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
