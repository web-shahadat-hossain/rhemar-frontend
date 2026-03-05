// "use client";

// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import {
//   CheckCircle,
//   Truck,
//   CreditCard,
//   ChevronLeft,
//   ChevronDown,
// } from "lucide-react";
// import { useCart } from "@/context/CartContext";
// import { api } from "@/lib/services/api";
// import { useRef } from "react";
// interface CheckoutPageProps {
//   params?: Record<string, string>;
//   searchParams?: Record<string, string>;
// }

// export default function CheckoutPage({}: CheckoutPageProps) {
//   const router = useRouter();
//   const { cartItems, clearCart } = useCart();

//   const hasFiredCheckout = useRef(false);

//   useEffect(() => {
//     if (hasFiredCheckout.current) return;
//     if (cartItems.length === 0) return;

//     hasFiredCheckout.current = true;

//     const eventId = crypto.randomUUID();

//     // Browser Pixel
//     window.fbq?.(
//       "track",
//       "InitiateCheckout",
//       {
//         value: total,
//         currency: "BDT",
//       },
//       { eventID: eventId },
//     );

//     // Server Event
//     fetch("/api/meta", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         event_name: "InitiateCheckout",
//         event_id: eventId,
//         value: total,
//         userAgent: navigator.userAgent,
//         url: window.location.href,
//       }),
//     });
//   }, []);
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     address: "",
//     city: "Dhaka",
//     deliveryArea: "",
//     note: "",
//     payment: "COD",
//   });
//   console.log(cartItems);
//   const [isOrdered, setIsOrdered] = useState(false);
//   const [orderId, setOrderId] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   // Redirect if cart empty
//   useEffect(() => {
//     if (cartItems.length === 0 && !isOrdered) {
//       router.push("/cart");
//     }
//   }, [cartItems, isOrdered, router]);

//   // Redirect after order
//   useEffect(() => {
//     if (isOrdered) {
//       const timer = setTimeout(() => {
//         router.push("/success");
//       }, 2000);
//       return () => clearTimeout(timer);
//     }
//   }, [isOrdered, router]);

//   const subtotal = cartItems.reduce(
//     (sum, item) => sum + (item.discountPrice || item.price) * item.quantity,
//     0,
//   );

//   const getDeliveryCharge = () => {
//     if (formData.deliveryArea === "inside") return 80;
//     if (formData.deliveryArea === "outside") return 120;
//     return 0;
//   };

//   const delivery = getDeliveryCharge();
//   const total = subtotal + delivery;

//   const isFormValid =
//     formData.name &&
//     formData.phone &&
//     formData.address &&
//     formData.deliveryArea;

//   const handleSubmit = async () => {
//     if (!isFormValid) return;

//     try {
//       setIsLoading(true);

//       const formattedItems = cartItems.map((item) => ({
//         productId: item._id,
//         name: item.name,
//         size: item.selectedSize,
//         quantity: item.quantity,
//         price: item.discountPrice || item.price,
//       }));

//       const orderData = {
//         customerName: formData.name,
//         phoneNumber: formData.phone,
//         email: formData.email,
//         address: formData.address,
//         city: formData.city,
//         deliveryArea: formData.deliveryArea,
//         paymentMethod:
//           formData.payment === "COD" ? "Cash on Delivery" : "Online Payment",
//         note: formData.note,
//         items: formattedItems,
//         subtotal,
//         deliveryCharge: delivery,
//         total,
//       };

//       const data = await api("/orders", {
//         method: "POST",
//         body: JSON.stringify(orderData),
//       });

//       // 🔥 🔥 🔥 PURCHASE EVENT এখানেই বসাবে

//       const eventId = crypto.randomUUID();

//       // Browser Purchase
//       window.fbq?.(
//         "track",
//         "Purchase",
//         {
//           value: total,
//           currency: "BDT",
//         },
//         { eventID: eventId },
//       );

//       // Server Purchase
//       fetch("/api/meta", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           event_name: "Purchase",
//           event_id: eventId,
//           value: total,

//           email: formData.email,
//           phone: formData.phone,
//           name: formData.name,
//           city: formData.city,

//           contents: cartItems.map((item) => ({
//             id: item._id,
//             quantity: item.quantity,
//             item_price: item.discountPrice || item.price,
//           })),

//           userAgent: navigator.userAgent,
//           url: window.location.href,
//         }),
//       });

//       // তারপর cart clear করবে
//       clearCart();
//       setOrderId(data._id);
//       setIsOrdered(true);
//     } catch (error: any) {
//       alert(error.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 text-center pt-32">
//         <div className="font-serif-luxury text-gold text-2xl animate-pulse">
//           Loading...
//         </div>
//       </div>
//     );
//   }

//   // Loading Screen - Before redirecting to success page
//   if (isOrdered) {
//     return (
//       <div className="bg-[#fdfdfd] text-[#1a1a1a] py-20">
//         <div className="max-w-xl mx-auto px-4 py-32 text-center pt-32">
//           <div className="bg-white rounded-3xl p-12 shadow-xl border border-gray-100 flex flex-col items-center animate-fadeIn">
//             <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
//               <CheckCircle size={40} className="text-green-600" />
//             </div>
//             <h2 className="text-3xl font-bold mb-4">Order Placed!</h2>
//             <p className="text-gray-500 mb-8 leading-relaxed">
//               Thank you for choosing Rhemar Signature. Your order has been
//               successfully placed and is now being processed.
//             </p>
//             <div className="bg-gray-50 w-full p-4 rounded-xl mb-8 text-sm space-y-2">
//               <div className="flex justify-between">
//                 <span className="text-gray-400">Order ID:</span>
//                 <span className="font-bold font-mono">#{orderId}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-400">Status:</span>
//                 <span className="text-[#d4af37] font-bold">Processing</span>
//               </div>
//             </div>
//             <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
//               <div className="bg-green-500 h-full animate-pulse" />
//             </div>
//             <p className="text-gray-400 text-xs mt-6">
//               Preparing your order details...
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Checkout Form
//   return (
//     <div className="bg-[#fdfdfd] text-[#1a1a1a] py-20">
//       <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-20">
//         <button
//           onClick={() => router.push("/cart")}
//           className="flex items-center gap-2 text-gray-500 hover:text-black mb-10 font-bold transition-colors"
//         >
//           <ChevronLeft size={20} /> Back to Cart
//         </button>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
//           {/* Form Section */}
//           <div className="space-y-12">
//             {/* Delivery Details */}
//             <section>
//               <h2 className="text-2xl font-bold mb-8 flex items-center gap-4">
//                 <span className="w-8 h-8 rounded-full bg-black text-white text-sm flex items-center justify-center">
//                   1
//                 </span>
//                 Delivery Details
//               </h2>
//               <form className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
//                       Full Name *
//                     </label>
//                     <input
//                       type="text"
//                       className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-[#d4af37]/20 focus:border-[#d4af37] transition-all"
//                       placeholder="E.g. Tanvir Ahmed"
//                       value={formData.name}
//                       onChange={(e) =>
//                         setFormData({ ...formData, name: e.target.value })
//                       }
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
//                       Phone Number *
//                     </label>
//                     <input
//                       type="tel"
//                       className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-[#d4af37]/20 focus:border-[#d4af37] transition-all"
//                       placeholder="017XXXXXXXX"
//                       value={formData.phone}
//                       onChange={(e) =>
//                         setFormData({ ...formData, phone: e.target.value })
//                       }
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
//                       Delivery Area *
//                     </label>
//                     <div className="relative">
//                       <select
//                         className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-[#d4af37]/20 focus:border-[#d4af37] transition-all appearance-none cursor-pointer"
//                         value={formData.deliveryArea}
//                         onChange={(e) =>
//                           setFormData({
//                             ...formData,
//                             deliveryArea: e.target.value,
//                           })
//                         }
//                         required
//                       >
//                         <option value="" disabled>
//                           Select delivery area
//                         </option>
//                         <option value="inside">Inside Dhaka (৳80)</option>
//                         <option value="outside">Outside Dhaka (৳120)</option>
//                       </select>
//                       <ChevronDown
//                         size={18}
//                         className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
//                       City
//                     </label>
//                     <input
//                       type="text"
//                       className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-[#d4af37]/20 focus:border-[#d4af37] transition-all"
//                       placeholder="E.g. Dhaka"
//                       value={formData.city}
//                       onChange={(e) =>
//                         setFormData({ ...formData, city: e.target.value })
//                       }
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
//                     Email Address (Optional)
//                   </label>
//                   <input
//                     type="email"
//                     className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-[#d4af37]/20 focus:border-[#d4af37] transition-all"
//                     placeholder="tanvir@example.com"
//                     value={formData.email}
//                     onChange={(e) =>
//                       setFormData({ ...formData, email: e.target.value })
//                     }
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
//                     Detailed Address *
//                   </label>
//                   <textarea
//                     className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-[#d4af37]/20 focus:border-[#d4af37] transition-all h-32"
//                     placeholder="House, Road, Area details..."
//                     value={formData.address}
//                     onChange={(e) =>
//                       setFormData({ ...formData, address: e.target.value })
//                     }
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
//                     Additional Notes (Optional)
//                   </label>
//                   <textarea
//                     className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-[#d4af37]/20 focus:border-[#d4af37] transition-all h-24"
//                     placeholder="Any special instructions..."
//                     value={formData.note}
//                     onChange={(e) =>
//                       setFormData({ ...formData, note: e.target.value })
//                     }
//                   />
//                 </div>
//               </form>
//             </section>

//             {/* Payment Method */}
//             <section>
//               <h2 className="text-2xl font-bold mb-8 flex items-center gap-4">
//                 <span className="w-8 h-8 rounded-full bg-black text-white text-sm flex items-center justify-center">
//                   2
//                 </span>
//                 Payment Method
//               </h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <button
//                   onClick={() => setFormData({ ...formData, payment: "COD" })}
//                   className={`p-6 rounded-2xl border-2 transition-all flex items-center gap-4 ${
//                     formData.payment === "COD"
//                       ? "border-[#d4af37] bg-[#d4af37]/5 shadow-md"
//                       : "border-gray-100 hover:border-gray-300"
//                   }`}
//                   type="button"
//                 >
//                   <div
//                     className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
//                       formData.payment === "COD"
//                         ? "border-[#d4af37]"
//                         : "border-gray-300"
//                     }`}
//                   >
//                     {formData.payment === "COD" && (
//                       <div className="w-3 h-3 bg-[#d4af37] rounded-full" />
//                     )}
//                   </div>
//                   <div className="text-left">
//                     <p className="font-bold flex items-center gap-2">
//                       <Truck size={18} /> Cash on Delivery
//                     </p>
//                     <p className="text-xs text-gray-500">
//                       Pay when you receive the order
//                     </p>
//                   </div>
//                 </button>

//                 {/* <button
//                   onClick={() =>
//                     setFormData({ ...formData, payment: "ONLINE" })
//                   }
//                   className={`p-6 rounded-2xl border-2 transition-all flex items-center gap-4 ${
//                     formData.payment === "ONLINE"
//                       ? "border-[#d4af37] bg-[#d4af37]/5 shadow-md"
//                       : "border-gray-100 hover:border-gray-300"
//                   }`}
//                   type="button"
//                 >
//                   <div
//                     className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
//                       formData.payment === "ONLINE"
//                         ? "border-[#d4af37]"
//                         : "border-gray-300"
//                     }`}
//                   >
//                     {formData.payment === "ONLINE" && (
//                       <div className="w-3 h-3 bg-[#d4af37] rounded-full" />
//                     )}
//                   </div>
//                   <div className="text-left">
//                     <p className="font-bold flex items-center gap-2">
//                       <CreditCard size={18} /> Online Payment
//                     </p>
//                     <p className="text-xs text-gray-500">
//                       bKash, Nagad or Cards
//                     </p>
//                   </div>
//                 </button> */}
//               </div>
//             </section>
//           </div>

//           {/* Order Preview - Sticky */}
//           <div>
//             <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 sticky top-32">
//               <h2 className="text-xl font-bold mb-8 uppercase tracking-widest text-sm text-[#d4af37]">
//                 Your Order
//               </h2>

//               {/* Items List */}
//               <div className="max-h-[300px] overflow-y-auto pr-2 mb-8 space-y-4">
//                 {cartItems.map((item) => (
//                   <div
//                     key={`${item._id}-${item.selectedSize}`}
//                     className="flex gap-4"
//                   >
//                     <img
//                       src={item.images?.[0]?.url || item.images?.[0]}
//                       alt={item.name}
//                       className="w-16 h-20 object-cover rounded-lg bg-gray-100"
//                     />
//                     <div className="flex-1">
//                       <h4 className="font-bold text-sm text-gray-900 line-clamp-1">
//                         {item.name}
//                       </h4>
//                       <p className="text-xs text-gray-500">
//                         Size: {item.selectedSize} | Qty: {item.quantity}
//                       </p>
//                       <p className="text-sm font-bold mt-1 text-black">
//                         ৳
//                         {(
//                           (item.discountPrice || item.price) * item.quantity
//                         ).toLocaleString()}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Order Summary */}
//               <div className="space-y-4 pt-6 border-t border-gray-100">
//                 <div className="flex justify-between text-gray-600">
//                   <span className="text-sm">Subtotal</span>
//                   <span className="font-medium text-black">
//                     ৳{subtotal.toLocaleString()}
//                   </span>
//                 </div>
//                 <div className="flex justify-between text-gray-600 transition-all duration-500">
//                   <span className="text-sm">Delivery Charge</span>
//                   <span
//                     className={`font-bold transition-colors ${
//                       formData.deliveryArea ? "text-[#d4af37]" : "text-gray-400"
//                     }`}
//                   >
//                     {formData.deliveryArea
//                       ? `৳${delivery.toLocaleString()}`
//                       : "—"}
//                   </span>
//                 </div>
//                 <div className="flex justify-between text-xl font-bold pt-4 border-t border-gray-100">
//                   <span>Grand Total</span>
//                   <span
//                     className={`transition-all duration-700 ${
//                       formData.deliveryArea
//                         ? "text-[#d4af37] scale-105 origin-right"
//                         : "text-gray-900"
//                     }`}
//                   >
//                     ৳{total.toLocaleString()}
//                   </span>
//                 </div>
//               </div>

//               {/* CTA Button */}
//               <div className="mt-10 space-y-4">
//                 <button
//                   onClick={handleSubmit}
//                   disabled={!isFormValid}
//                   className={`w-full py-5 rounded-full font-bold transition-all shadow-lg active:scale-95
//                   ${
//                     isFormValid
//                       ? "bg-black text-white hover:bg-[#d4af37] hover:text-black cursor-pointer"
//                       : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
//                   }
//                 `}
//                 >
//                   PLACE ORDER NOW
//                 </button>

//                 {!formData.deliveryArea && (
//                   <p className="text-[10px] text-red-400 font-bold uppercase tracking-widest text-center animate-pulse">
//                     Please select a delivery area
//                   </p>
//                 )}
//               </div>

//               <p className="text-[10px] text-gray-400 text-center mt-6 uppercase tracking-widest leading-relaxed">
//                 By placing the order you agree to our <br /> Terms of Service &
//                 Refund Policy
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle,
  Truck,
  ChevronLeft,
  ChevronDown,
  Tag,
  X,
  Loader2,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { api } from "@/lib/services/api";

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, clearCart } = useCart();
  const hasFiredCheckout = useRef(false);

  // ── Form state ───────────────────────────────────────────────
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

  // ── Promo state ──────────────────────────────────────────────
  const [promoInput, setPromoInput] = useState("");
  const [promoStatus, setPromoStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [promoMessage, setPromoMessage] = useState("");
  const [discount, setDiscount] = useState(0);
  const [appliedPromo, setAppliedPromo] = useState("");

  // ── Order state ──────────────────────────────────────────────
  const [isOrdered, setIsOrdered] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // ── Calculations ─────────────────────────────────────────────
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
  const total = subtotal + delivery - discount;

  // ── Fire InitiateCheckout pixel once ─────────────────────────
  useEffect(() => {
    if (hasFiredCheckout.current || cartItems.length === 0) return;
    hasFiredCheckout.current = true;

    const eventId = crypto.randomUUID();
    window.fbq?.(
      "track",
      "InitiateCheckout",
      { value: total, currency: "BDT" },
      { eventID: eventId },
    );
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
  }, []);

  // ── Redirect if cart empty ────────────────────────────────────
  useEffect(() => {
    if (cartItems.length === 0 && !isOrdered) router.push("/cart");
  }, [cartItems, isOrdered, router]);

  // ── Redirect after order ──────────────────────────────────────
  useEffect(() => {
    if (!isOrdered) return;
    const timer = setTimeout(() => router.push("/success"), 2000);
    return () => clearTimeout(timer);
  }, [isOrdered, router]);

  // ── Reset promo when delivery area changes (total changes) ───
  useEffect(() => {
    if (appliedPromo) handleRemovePromo();
  }, [formData.deliveryArea]);

  // ── Apply promo ───────────────────────────────────────────────
  const handleApplyPromo = async () => {
    if (!promoInput.trim()) return;
    setPromoStatus("loading");
    setPromoMessage("");

    try {
      // Use raw fetch (public endpoint — no auth needed)
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/promos/validate`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            code: promoInput.trim(),
            orderAmount: subtotal,
          }),
        },
      );
      const data = await res.json();

      if (!res.ok) {
        setPromoStatus("error");
        setPromoMessage(data.message || "Invalid promo code");
        setDiscount(0);
        setAppliedPromo("");
      } else {
        setPromoStatus("success");
        setPromoMessage(data.message);
        setDiscount(data.discountAmount);
        setAppliedPromo(promoInput.trim().toUpperCase());
      }
    } catch {
      setPromoStatus("error");
      setPromoMessage("Something went wrong. Please try again.");
    }
  };

  const handleRemovePromo = () => {
    setPromoInput("");
    setPromoStatus("idle");
    setPromoMessage("");
    setDiscount(0);
    setAppliedPromo("");
  };

  // ── Form validation ───────────────────────────────────────────
  const isFormValid = !!(
    formData.name &&
    formData.phone &&
    formData.address &&
    formData.deliveryArea
  );

  // ── Submit order ──────────────────────────────────────────────
  const handleSubmit = async () => {
    if (!isFormValid) return;
    setIsLoading(true);

    try {
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
        promoCode: appliedPromo || null, // ✅ server calculates actual discount
        total,
      };

      const data = await api("/orders", {
        method: "POST",
        body: JSON.stringify(orderData),
      });

      // Purchase pixel
      const eventId = crypto.randomUUID();
      window.fbq?.(
        "track",
        "Purchase",
        { value: total, currency: "BDT" },
        { eventID: eventId },
      );
      fetch("/api/meta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_name: "Purchase",
          event_id: eventId,
          value: total,
          email: formData.email,
          phone: formData.phone,
          name: formData.name,
          city: formData.city,
          contents: cartItems.map((item) => ({
            id: item._id,
            quantity: item.quantity,
            item_price: item.discountPrice || item.price,
          })),
          userAgent: navigator.userAgent,
          url: window.location.href,
        }),
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

  // ── Loading spinner ───────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fdfdfd]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 size={40} className="animate-spin text-[#d4af37]" />
          <p className="text-gray-500 font-medium">Placing your order...</p>
        </div>
      </div>
    );
  }

  // ── Order success screen ──────────────────────────────────────
  if (isOrdered) {
    return (
      <div className="bg-[#fdfdfd] text-[#1a1a1a] min-h-screen flex items-center justify-center">
        <div className="max-w-xl w-full mx-auto px-4">
          <div className="bg-white rounded-3xl p-12 shadow-xl border border-gray-100 flex flex-col items-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
              <CheckCircle size={40} className="text-green-600" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Order Placed!</h2>
            <p className="text-gray-500 mb-8 leading-relaxed text-center">
              Thank you for choosing Rhemar Signature. Your order has been
              successfully placed and is now being processed.
            </p>
            <div className="bg-gray-50 w-full p-4 rounded-xl mb-8 text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Order ID:</span>
                <span className="font-bold font-mono">#{orderId}</span>
              </div>
              {appliedPromo && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Promo Applied:</span>
                  <span className="font-bold text-green-600">
                    {appliedPromo} (-৳{discount})
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-400">Total Paid:</span>
                <span className="font-bold text-[#d4af37]">
                  ৳{total.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Status:</span>
                <span className="text-[#d4af37] font-bold">Processing</span>
              </div>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
              <div className="bg-green-500 h-full w-full animate-pulse" />
            </div>
            <p className="text-gray-400 text-xs mt-6">Redirecting you now...</p>
          </div>
        </div>
      </div>
    );
  }

  // ── Main checkout form ────────────────────────────────────────
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
          {/* ── Left: Form ── */}
          <div className="space-y-12">
            {/* Delivery Details */}
            <section>
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-black text-white text-sm flex items-center justify-center">
                  1
                </span>
                Delivery Details
              </h2>
              <div className="space-y-6">
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
              </div>
            </section>

            {/* Payment Method */}
            <section>
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-black text-white text-sm flex items-center justify-center">
                  2
                </span>
                Payment Method
              </h2>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, payment: "COD" })}
                className="w-full md:w-auto p-6 rounded-2xl border-2 border-[#d4af37] bg-[#d4af37]/5 shadow-md transition-all flex items-center gap-4"
              >
                <div className="w-6 h-6 rounded-full border-2 border-[#d4af37] flex items-center justify-center">
                  <div className="w-3 h-3 bg-[#d4af37] rounded-full" />
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
            </section>
          </div>

          {/* ── Right: Order Summary Sticky ── */}
          <div>
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 sticky top-32">
              <h2 className="text-sm font-bold mb-8 uppercase tracking-widest text-[#d4af37]">
                Your Order
              </h2>

              {/* Cart items */}
              <div className="max-h-[280px] overflow-y-auto pr-2 mb-8 space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={`${item._id}-${item.selectedSize}`}
                    className="flex gap-4"
                  >
                    <img
                      src={item.images?.[0]?.url || item.images?.[0]}
                      alt={item.name}
                      className="w-16 h-20 object-cover rounded-lg bg-gray-100 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm text-gray-900 truncate">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Size: {item.selectedSize} &nbsp;|&nbsp; Qty:{" "}
                        {item.quantity}
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

              {/* Summary lines */}
              <div className="space-y-4 pt-6 border-t border-gray-100">
                <div className="flex justify-between text-gray-600">
                  <span className="text-sm">Subtotal</span>
                  <span className="font-medium text-black">
                    ৳{subtotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span className="text-sm">Delivery Charge</span>
                  <span
                    className={`font-bold transition-colors ${formData.deliveryArea ? "text-[#d4af37]" : "text-gray-400"}`}
                  >
                    {formData.deliveryArea
                      ? `৳${delivery.toLocaleString()}`
                      : "—"}
                  </span>
                </div>

                {/* ── Promo Code ── */}
                <div className="pt-1">
                  {!appliedPromo ? (
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Tag
                            size={14}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                          />
                          <input
                            type="text"
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#d4af37]/20 focus:border-[#d4af37] uppercase tracking-widest transition-all"
                            placeholder="PROMO CODE"
                            value={promoInput}
                            onChange={(e) => {
                              setPromoInput(e.target.value.toUpperCase());
                              if (promoStatus !== "idle") {
                                setPromoStatus("idle");
                                setPromoMessage("");
                              }
                            }}
                            onKeyDown={(e) =>
                              e.key === "Enter" && handleApplyPromo()
                            }
                          />
                        </div>
                        <button
                          type="button"
                          onClick={handleApplyPromo}
                          disabled={
                            promoStatus === "loading" || !promoInput.trim()
                          }
                          className="px-4 py-3 bg-black text-white text-xs font-bold rounded-xl hover:bg-[#d4af37] hover:text-black transition-all disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
                        >
                          {promoStatus === "loading" ? (
                            <Loader2 size={14} className="animate-spin" />
                          ) : (
                            "APPLY"
                          )}
                        </button>
                      </div>

                      {promoMessage && (
                        <p
                          className={`text-xs font-semibold pl-1 ${promoStatus === "error" ? "text-red-500" : "text-green-600"}`}
                        >
                          {promoMessage}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle
                          size={15}
                          className="text-green-600 shrink-0"
                        />
                        <span className="text-sm font-bold text-green-700">
                          {appliedPromo}
                        </span>
                        <span className="text-xs text-green-600">
                          — saving ৳{discount.toLocaleString()}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleRemovePromo}
                        className="p-1 hover:bg-green-100 rounded-lg transition-colors"
                      >
                        <X size={13} className="text-red-400" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Discount line */}
                {discount > 0 && (
                  <div className="flex justify-between text-green-600 font-bold">
                    <span className="text-sm">Discount</span>
                    <span>-৳{discount.toLocaleString()}</span>
                  </div>
                )}

                {/* Grand total */}
                <div className="flex justify-between text-xl font-bold pt-4 border-t border-gray-100">
                  <span>Grand Total</span>
                  <span
                    className={`transition-all duration-500 ${formData.deliveryArea ? "text-[#d4af37]" : "text-gray-900"}`}
                  >
                    ৳{total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-10 space-y-3">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!isFormValid}
                  className={`w-full py-5 rounded-full font-bold transition-all shadow-lg active:scale-95 ${
                    isFormValid
                      ? "bg-black text-white hover:bg-[#d4af37] hover:text-black cursor-pointer"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                  }`}
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
