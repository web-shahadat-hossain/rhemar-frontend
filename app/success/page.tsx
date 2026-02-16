"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, Package, Truck, Clock, ArrowRight } from "lucide-react";

interface SuccessPageProps {
  orderId?: string;
  totalAmount?: number;
}

export default function SuccessPage({ orderId }: SuccessPageProps) {
  const router = useRouter();
  const [displayOrderId, setDisplayOrderId] = useState(orderId || "");
  const [countdown, setCountdown] = useState(5);
  const [confetti, setConfetti] = useState<any[]>([]);

  // Get order details from localStorage if not passed as props
  useEffect(() => {
    if (!displayOrderId) {
      const savedOrders = localStorage.getItem("rhemar_orders");
      if (savedOrders) {
        try {
          const orders = JSON.parse(savedOrders);
          if (orders.length > 0) {
            setDisplayOrderId(orders[0].id);
          }
        } catch (error) {
          console.error("Failed to load order:", error);
        }
      }
    }
  }, [displayOrderId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden pt-24">
      {/* Confetti Animation */}
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="fixed pointer-events-none animate-fall"
          style={{
            left: `${piece.left}%`,
            top: "-10px",
            animation: `fall ${piece.duration}s linear forwards`,
            animationDelay: `${piece.delay}s`,
          }}
        >
          <div
            className="w-2 h-2 rounded-full"
            style={{
              backgroundColor: ["#d4af37", "#ffd700", "#ffed4e", "#d4af37"][
                Math.floor(Math.random() * 4)
              ],
              boxShadow: "0 0 4px currentColor",
            }}
          />
        </div>
      ))}

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 md:px-8 py-20 relative z-10">
        {/* Success Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            {/* Animated rings */}
            <div className="absolute inset-0 w-24 h-24 bg-gold/20 rounded-full animate-ping" />
            <div className="absolute inset-2 w-20 h-20 bg-gold/30 rounded-full animate-pulse" />

            {/* Main icon */}
            <div className="relative w-24 h-24 bg-gradient-to-br from-gold to-yellow-400 rounded-full flex items-center justify-center shadow-2xl">
              <CheckCircle size={56} className="text-black animate-bounce" />
            </div>
          </div>
        </div>

        {/* Main Message */}
        <div className="text-center space-y-6 mb-12">
          <h1 className="text-4xl md:text-5xl font-serif-luxury font-bold text-white animate-fadeInUp">
            Order Confirmed!
          </h1>
          <p
            className="text-lg text-gray-300 leading-relaxed animate-fadeInUp"
            style={{ animationDelay: "0.1s" }}
          >
            Thank you for choosing Signature Rhemar. Your order has been
            successfully placed and is being processed by our boutique team.
          </p>
        </div>

        {/* Order Details Card */}
        <div
          className="bg-white/10 backdrop-blur-md border border-gold/30 rounded-3xl p-8 mb-12 space-y-6 animate-fadeInUp"
          style={{ animationDelay: "0.2s" }}
        >
          {/* Order ID */}

          {/* Status Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Status 1: Confirmed */}
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle size={20} className="text-green-400" />
                <span className="text-green-400 font-semibold text-sm">
                  Confirmed
                </span>
              </div>
              <p className="text-gray-400 text-xs">Order placed successfully</p>
            </div>

            {/* Status 2: Processing */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <Package size={20} className="text-blue-400 animate-bounce" />
                <span className="text-blue-400 font-semibold text-sm">
                  Processing
                </span>
              </div>
              <p className="text-gray-400 text-xs">Preparing your items</p>
            </div>

            {/* Status 3: Shipping */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <Truck size={20} className="text-amber-400" />
                <span className="text-amber-400 font-semibold text-sm">
                  Shipping Soon
                </span>
              </div>
              <p className="text-gray-400 text-xs">Delivery within 2-3 days</p>
            </div>
          </div>

          {/* Estimated Delivery */}
          <div className="bg-gray-800/50 rounded-xl p-4 flex items-center gap-3 border border-gray-700">
            <Clock size={20} className="text-gold" />
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wider">
                Estimated Delivery
              </p>
              <p className="text-white font-semibold">
                {new Date(
                  Date.now() + 3 * 24 * 60 * 60 * 1000,
                ).toLocaleDateString("en-GB", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>

        {/* What's Next */}
        <div
          className="bg-gradient-to-r from-gold/10 to-yellow-400/10 border border-gold/30 rounded-3xl p-8 mb-12 animate-fadeInUp"
          style={{ animationDelay: "0.3s" }}
        >
          <h2 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
            <span className="text-gold text-2xl">→</span> What's Next?
          </h2>
          <ol className="space-y-4">
            <li className="flex gap-4 items-start">
              <div className="w-6 h-6 rounded-full bg-gold text-black flex items-center justify-center font-bold text-sm flex-shrink-0">
                1
              </div>
              <div>
                <p className="text-white font-semibold">Confirmation Email</p>
                <p className="text-gray-400 text-sm">
                  You'll receive an email with order details shortly
                </p>
              </div>
            </li>
            <li className="flex gap-4 items-start">
              <div className="w-6 h-6 rounded-full bg-gold text-black flex items-center justify-center font-bold text-sm flex-shrink-0">
                2
              </div>
              <div>
                <p className="text-white font-semibold">Tracking Updates</p>
                <p className="text-gray-400 text-sm">
                  We'll send you tracking information as soon as your order
                  ships
                </p>
              </div>
            </li>
            <li className="flex gap-4 items-start">
              <div className="w-6 h-6 rounded-full bg-gold text-black flex items-center justify-center font-bold text-sm flex-shrink-0">
                3
              </div>
              <div>
                <p className="text-white font-semibold">Delivery & Returns</p>
                <p className="text-gray-400 text-sm">
                  7-day easy returns available after delivery
                </p>
              </div>
            </li>
          </ol>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="fixed bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-50" />

      {/* Styles for animations */}
      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) translateX(30px);
            opacity: 0;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-bounce {
          animation: bounce 1s infinite;
        }

        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        .animate-ping {
          animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </div>
  );
}
