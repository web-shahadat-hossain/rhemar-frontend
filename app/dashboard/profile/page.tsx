// "use client";

// import React, { useState, useEffect } from "react";

// import {
//   User as UserIcon,
//   Package,
//   MapPin,
//   LogOut,
//   ChevronRight,
//   MessageCircle,
//   Clock,
//   CheckCircle,
//   CreditCard,
//   Download,
//   X,
//   FileText,
//   Phone,
//   ArrowRight,
// } from "lucide-react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import { Order, User } from "@/types/types";

// interface ProfileProps {
//   user?: User;
//   auth?: any;
//   setAuth?: any;
// }

// const Profile: React.FC<ProfileProps> = ({ user: propUser, auth, setAuth }) => {
//   const router = useRouter();
//   const [activeTab, setActiveTab] = useState<"profile" | "orders" | "support">(
//     "profile",
//   );
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [profileForm, setProfileForm] = useState<User | null>(null);
//   const [showToast, setShowToast] = useState(false);

//   return (
//     <div className="max-w-[1600px] mx-auto px-8 md:px-16 py-20 bg-[#fdfdfd]">
//       {showToast && (
//         <div className="fixed top-32 right-12 z-[100] bg-black text-gold px-8 py-4 rounded-full shadow-2xl flex items-center gap-4 animate-fade-up border border-gold/20">
//           <CheckCircle size={20} />
//           <span className="text-[10px] font-bold uppercase tracking-[0.4em]">
//             Profile Updated Legacy
//           </span>
//         </div>
//       )}

//       <div className="flex flex-col lg:flex-row gap-20">
//         {/* Sidebar */}
//         <aside className="lg:w-80 space-y-12 shrink-0">
//           <div className="flex flex-col items-center lg:items-start space-y-6">
//             <div className="w-32 h-32 rounded-full bg-gray-900 border-4 border-gold/10 overflow-hidden group relative cursor-pointer shadow-2xl">
//               <Image
//                 src={`https://api.dicebear.com/7.x/initials/svg?seed=${"Shahadat"}&backgroundColor=0a0a0a&fontFamily=Montserrat`}
//                 alt={"Shahadat"}
//                 width={128}
//                 height={128}
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//                 <UserIcon className="text-gold" size={24} />
//               </div>
//             </div>
//             <div className="text-center lg:text-left">
//               <h2 className="text-3xl font-heading tracking-tight mb-2">
//                 {"Shahadat"}
//               </h2>
//               <p className="text-[10px] text-gold font-bold uppercase tracking-[0.5em]">
//                 Maison Patron
//               </p>
//             </div>
//           </div>

//           <nav className="flex flex-col gap-4">
//             <button
//               onClick={() => setActiveTab("profile")}
//               className={`flex items-center gap-6 p-6 rounded-3xl transition-all duration-500 font-bold uppercase text-[10px] tracking-[0.4em] ${
//                 activeTab === "profile"
//                   ? "bg-black text-gold shadow-2xl"
//                   : "text-gray-400 hover:text-black hover:bg-gray-50"
//               }`}
//             >
//               <UserIcon size={18} /> My Profile
//             </button>
//             <button
//               onClick={() => setActiveTab("orders")}
//               className={`flex items-center gap-6 p-6 rounded-3xl transition-all duration-500 font-bold uppercase text-[10px] tracking-[0.4em] ${
//                 activeTab === "orders"
//                   ? "bg-black text-gold shadow-2xl"
//                   : "text-gray-400 hover:text-black hover:bg-gray-50"
//               }`}
//             >
//               <Package size={18} /> Order Archive
//             </button>
//             <button
//               onClick={() => setActiveTab("support")}
//               className={`flex items-center gap-6 p-6 rounded-3xl transition-all duration-500 font-bold uppercase text-[10px] tracking-[0.4em] ${
//                 activeTab === "support"
//                   ? "bg-black text-gold shadow-2xl"
//                   : "text-gray-400 hover:text-black hover:bg-gray-50"
//               }`}
//             >
//               <MessageCircle size={18} /> Support Desk
//             </button>
//             <div className="h-px bg-gray-100 my-6" />
//             <button className="flex items-center gap-6 p-6 rounded-3xl transition-all duration-500 font-bold uppercase text-[10px] tracking-[0.4em] text-red-400 hover:bg-red-50">
//               <LogOut size={18} /> Abandon Session
//             </button>
//           </nav>
//         </aside>

//         {/* Content Area */}
//         <main className="flex-1">
//           {activeTab === "profile" && (
//             <section className="space-y-12 animate-fade-up">
//               <div className="flex justify-between items-end border-b border-black/5 pb-10">
//                 <div className="space-y-4">
//                   <span className="text-gold font-bold text-[10px] uppercase tracking-[0.6em]">
//                     Identification
//                   </span>
//                   <h3 className="text-5xl font-heading tracking-tight">
//                     Identity Profile
//                   </h3>
//                 </div>
//                 {!isEditing && (
//                   <button
//                     onClick={() => setIsEditing(true)}
//                     className="text-[10px] font-bold uppercase tracking-[0.4em] border-b border-gold/40 pb-2 text-gold hover:text-black transition-colors"
//                   >
//                     Edit Archive
//                   </button>
//                 )}
//               </div>

//               {isEditing ? (
//                 <form className="max-w-2xl space-y-8 bg-white p-12 rounded-[3rem] border border-gray-100 shadow-sm">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                     <div className="space-y-3">
//                       <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
//                         Full Legal Name
//                       </label>
//                       <input
//                         type="text"
//                         value={profileForm.name}
//                         onChange={(e) =>
//                           setProfileForm({
//                             ...profileForm,
//                             name: e.target.value,
//                           })
//                         }
//                         className="w-full bg-gray-50 border-b border-gray-100 p-4 text-sm font-medium outline-none focus:border-gold transition-colors"
//                       />
//                     </div>
//                     <div className="space-y-3">
//                       <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
//                         Phone Frequency
//                       </label>
//                       <input
//                         type="tel"
//                         value={profileForm.phone}
//                         onChange={(e) =>
//                           setProfileForm({
//                             ...profileForm,
//                             phone: e.target.value,
//                           })
//                         }
//                         className="w-full bg-gray-50 border-b border-gray-100 p-4 text-sm font-medium outline-none focus:border-gold transition-colors"
//                       />
//                     </div>
//                   </div>
//                   <div className="space-y-3">
//                     <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
//                       Digital Address (Email)
//                     </label>
//                     <input
//                       type="email"
//                       value={profileForm.email}
//                       onChange={(e) =>
//                         setProfileForm({
//                           ...profileForm,
//                           email: e.target.value,
//                         })
//                       }
//                       className="w-full bg-gray-50 border-b border-gray-100 p-4 text-sm font-medium outline-none focus:border-gold transition-colors"
//                     />
//                   </div>
//                   <div className="space-y-3">
//                     <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
//                       Delivery Residence
//                     </label>
//                     <textarea
//                       value={profileForm.address}
//                       onChange={(e) =>
//                         setProfileForm({
//                           ...profileForm,
//                           address: e.target.value,
//                         })
//                       }
//                       className="w-full bg-gray-50 border-b border-gray-100 p-4 text-sm font-medium outline-none focus:border-gold transition-colors h-32"
//                     />
//                   </div>
//                   <div className="flex gap-4 pt-8">
//                     <button
//                       type="submit"
//                       className="flex-1 bg-black text-white py-5 rounded-2xl font-bold uppercase text-[10px] tracking-[0.4em] hover:bg-gold hover:text-black transition-all"
//                     >
//                       Save Changes
//                     </button>
//                     <button
//                       type="button"
//                       onClick={() => setIsEditing(false)}
//                       className="flex-1 border border-gray-100 py-5 rounded-2xl font-bold uppercase text-[10px] tracking-[0.4em] hover:bg-gray-50 transition-all"
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </form>
//               ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
//                   <div className="bg-white p-12 rounded-[3rem] border border-gray-100 shadow-sm space-y-8">
//                     <div className="flex items-center gap-6">
//                       <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gold">
//                         <UserIcon size={24} strokeWidth={1.5} />
//                       </div>
//                       <div>
//                         <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">
//                           Account Holder
//                         </p>
//                         <p className="font-bold text-gray-900">{"Shahadat"}</p>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-6">
//                       <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gold">
//                         <Phone size={24} strokeWidth={1.5} />
//                       </div>
//                       <div>
//                         <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">
//                           Contact Line
//                         </p>
//                         <p className="font-bold text-gray-900">
//                           {"01711000000"}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-6">
//                       <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gold">
//                         <CreditCard size={24} strokeWidth={1.5} />
//                       </div>
//                       <div>
//                         <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">
//                           Maison Tier
//                         </p>
//                         <p className="font-bold text-gray-900 uppercase tracking-tighter">
//                           Signature Member
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="bg-black p-12 rounded-[3rem] shadow-2xl space-y-8 text-white">
//                     <div className="flex justify-between items-start">
//                       <div className="space-y-4">
//                         <span className="text-gold font-bold text-[10px] uppercase tracking-[0.6em]">
//                           Presence
//                         </span>
//                         <h4 className="text-3xl font-heading italic font-light tracking-tight">
//                           Saved Address
//                         </h4>
//                       </div>
//                       <MapPin
//                         className="text-gold/40"
//                         size={32}
//                         strokeWidth={1}
//                       />
//                     </div>
//                     <p className="text-white/60 font-serif-luxury text-2xl leading-relaxed italic border-l border-gold/20 pl-8">
//                       {"123 Main Street, Dhaka, Bangladesh" ||
//                         "No address archived yet."}
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </section>
//           )}

//           {activeTab === "orders" && (
//             <section className="space-y-12 animate-fade-up">
//               <div className="flex justify-between items-end border-b border-black/5 pb-10">
//                 <div className="space-y-4">
//                   <span className="text-gold font-bold text-[10px] uppercase tracking-[0.6em]">
//                     Archives
//                   </span>
//                   <h3 className="text-5xl font-heading tracking-tight">
//                     Purchase Legacy
//                   </h3>
//                 </div>
//                 <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400">
//                   {orders.length} Records Found
//                 </p>
//               </div>

//               {orders.length > 0 ? (
//                 <div className="space-y-6">
//                   {orders.map((order, idx) => (
//                     <div
//                       key={order.id}
//                       className="group bg-white p-8 md:p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-700 flex flex-col md:flex-row items-center gap-10"
//                       style={{ animationDelay: `${idx * 100}ms` }}
//                     >
//                       <div className="w-20 h-20 bg-gray-50 rounded-[1.5rem] flex items-center justify-center text-gold group-hover:bg-black group-hover:text-gold transition-colors duration-700 shrink-0">
//                         <Package size={32} strokeWidth={1.5} />
//                       </div>
//                       <div className="flex-1 space-y-4 text-center md:text-left">
//                         <div className="flex flex-wrap justify-center md:justify-start gap-4">
//                           <span className="text-[10px] font-bold text-black uppercase tracking-widest">
//                             {order.id}
//                           </span>
//                           <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
//                             •
//                           </span>
//                           <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
//                             {order.date}
//                           </span>
//                         </div>
//                         <h4 className="text-xl font-bold tracking-tight">
//                           ৳{order.total.toLocaleString()}
//                         </h4>
//                       </div>
//                       <div className="flex items-center gap-12 w-full md:w-auto justify-center md:justify-end">
//                         <div className="flex flex-col items-center md:items-end gap-2">
//                           <span
//                             className={`text-[9px] font-black uppercase tracking-[0.3em] px-4 py-2 rounded-full ring-1 ${
//                               order.status === "Delivered"
//                                 ? "bg-green-50 text-green-600 ring-green-100"
//                                 : "bg-gold/5 text-gold ring-gold/20"
//                             }`}
//                           >
//                             {order.status}
//                           </span>
//                         </div>
//                         <button
//                           onClick={() => setSelectedOrder(order)}
//                           className="w-14 h-14 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:border-gold hover:text-gold hover:scale-110 transition-all duration-700"
//                         >
//                           <ChevronRight size={24} />
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="py-32 text-center bg-gray-50/50 rounded-[3rem] border border-dashed border-gray-100">
//                   <Package
//                     className="mx-auto text-gray-200 mb-8"
//                     size={64}
//                     strokeWidth={1}
//                   />
//                   <h4 className="text-2xl font-heading mb-4">
//                     No archives found
//                   </h4>
//                   <p className="text-gray-400 italic font-serif-luxury text-xl">
//                     Your collection journey begins with your first order.
//                   </p>
//                   <button
//                     onClick={() => router.push("/shop")}
//                     className="mt-12 bg-black text-white px-12 py-5 rounded-full text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-gold transition-all"
//                   >
//                     Begin Exploration
//                   </button>
//                 </div>
//               )}
//             </section>
//           )}

//           {activeTab === "support" && (
//             <section className="space-y-12 animate-fade-up">
//               <div className="flex justify-between items-end border-b border-black/5 pb-10">
//                 <div className="space-y-4">
//                   <span className="text-gold font-bold text-[10px] uppercase tracking-[0.6em]">
//                     Assistance
//                   </span>
//                   <h3 className="text-5xl font-heading tracking-tight">
//                     The Support Desk
//                   </h3>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
//                 <div className="bg-black p-12 rounded-[3rem] shadow-2xl text-white space-y-12 flex flex-col justify-between">
//                   <div className="space-y-6">
//                     <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center text-gold">
//                       <MessageCircle size={32} strokeWidth={1.5} />
//                     </div>
//                     <h4 className="text-4xl font-heading italic font-light">
//                       Instant Artisan Help
//                     </h4>
//                     <p className="text-white/40 font-serif-luxury text-2xl italic leading-relaxed">
//                       Our concierge is available via WhatsApp for immediate
//                       tailoring or delivery queries.
//                     </p>
//                   </div>
//                   <button className="w-full bg-[#25D366] text-white py-6 rounded-2xl font-bold uppercase text-[10px] tracking-[0.4em] flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-95 transition-all">
//                     Connect to WhatsApp <ArrowRight size={16} />
//                   </button>
//                 </div>

//                 <div className="bg-white p-12 rounded-[3rem] border border-gray-100 shadow-sm space-y-12">
//                   <div className="space-y-6">
//                     <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-gold">
//                       <Clock size={32} strokeWidth={1.5} />
//                     </div>
//                     <h4 className="text-3xl font-heading tracking-tight">
//                       Office Presence
//                     </h4>
//                     <div className="space-y-4">
//                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
//                         Sunday — Thursday
//                       </p>
//                       <p className="font-bold text-gray-900">
//                         10:00 AM — 08:00 PM
//                       </p>
//                       <div className="h-px bg-gray-100 w-12" />
//                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
//                         Digital Mail
//                       </p>
//                       <p className="font-bold text-gray-900">
//                         maison@rhemarsignature.com
//                       </p>
//                     </div>
//                   </div>
//                   <button className="w-full border border-black/5 py-6 rounded-2xl font-bold uppercase text-[10px] tracking-[0.4em] hover:bg-black hover:text-gold transition-all">
//                     Common Queries (FAQ)
//                   </button>
//                 </div>
//               </div>
//             </section>
//           )}
//         </main>
//       </div>

//       {/* Order Detail Modal */}
//       {selectedOrder && (
//         <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
//           <div
//             className="absolute inset-0 bg-black/90 backdrop-blur-xl"
//             onClick={() => setSelectedOrder(null)}
//           />
//           <div className="relative z-10 w-full max-w-4xl bg-white rounded-[3rem] overflow-hidden shadow-2xl animate-fade-up max-h-[90vh] flex flex-col">
//             <div className="p-10 md:p-12 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
//               <div className="space-y-2">
//                 <span className="text-gold font-bold text-[9px] uppercase tracking-[0.4em]">
//                   Record Details
//                 </span>
//                 <h3 className="text-2xl font-heading">
//                   Order {selectedOrder.id}
//                 </h3>
//               </div>
//               <button
//                 onClick={() => setSelectedOrder(null)}
//                 className="p-4 hover:bg-black/5 rounded-full transition-colors text-gray-400"
//               >
//                 <X size={24} />
//               </button>
//             </div>

//             <div className="flex-1 overflow-y-auto p-10 md:p-12">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
//                 <div className="space-y-12">
//                   {/* Product List */}
//                   <div className="space-y-8">
//                     <h5 className="text-[10px] font-bold uppercase tracking-[0.4em] text-gold border-b border-gold/10 pb-4">
//                       Manifest
//                     </h5>
//                     {selectedOrder.items.map((item) => (
//                       <div
//                         key={`${item.id}-${item.selectedSize}`}
//                         className="flex gap-6"
//                       >
//                         <Image
//                           src={item.images[0]}
//                           alt={item.name}
//                           width={80}
//                           height={112}
//                           className="w-20 h-28 object-cover rounded-2xl shadow-sm"
//                         />
//                         <div className="flex flex-col justify-center">
//                           <h6 className="font-bold text-gray-900 tracking-tight">
//                             {item.name}
//                           </h6>
//                           <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
//                             Size {item.selectedSize} × {item.quantity}
//                           </p>
//                           <p className="font-bold mt-2 text-gold">
//                             ৳
//                             {(
//                               (item.discountPrice || item.price) * item.quantity
//                             ).toLocaleString()}
//                           </p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   {/* Status Timeline */}
//                   <div className="space-y-8">
//                     <h5 className="text-[10px] font-bold uppercase tracking-[0.4em] text-gold border-b border-gold/10 pb-4">
//                       Lifecycle
//                     </h5>
//                     <div className="space-y-6">
//                       <div className="flex items-center gap-6">
//                         <div className="w-10 h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
//                           <CheckCircle size={18} />
//                         </div>
//                         <div>
//                           <p className="text-[10px] font-bold uppercase tracking-widest text-gray-900">
//                             Archive Initiated
//                           </p>
//                           <p className="text-[9px] text-gray-400 uppercase tracking-widest">
//                             {selectedOrder.date}
//                           </p>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-6">
//                         <div className="w-10 h-10 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center ring-1 ring-gray-100">
//                           <Clock size={18} />
//                         </div>
//                         <div>
//                           <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
//                             Atelier Processing
//                           </p>
//                           <p className="text-[9px] text-gray-300 uppercase tracking-widest">
//                             In Queue
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="space-y-12">
//                   {/* Shipping Info */}
//                   <div className="space-y-8">
//                     <h5 className="text-[10px] font-bold uppercase tracking-[0.4em] text-gold border-b border-gold/10 pb-4">
//                       Residence
//                     </h5>
//                     <div className="bg-gray-50 p-8 rounded-3xl space-y-4">
//                       <p className="font-serif-luxury text-xl italic leading-relaxed text-gray-600">
//                         {selectedOrder.address}
//                       </p>
//                       <div className="flex items-center gap-4 text-gray-400">
//                         <CreditCard size={16} />
//                         <span className="text-[9px] font-bold uppercase tracking-widest">
//                           {selectedOrder.paymentMethod}
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Summary */}
//                   <div className="space-y-8">
//                     <h5 className="text-[10px] font-bold uppercase tracking-[0.4em] text-gold border-b border-gold/10 pb-4">
//                       Valuation
//                     </h5>
//                     <div className="space-y-4">
//                       <div className="flex justify-between text-sm">
//                         <span className="text-gray-400 uppercase tracking-widest text-[10px] font-bold">
//                           Subtotal Value
//                         </span>
//                         <span className="font-bold">
//                           ৳{selectedOrder.subtotal.toLocaleString()}
//                         </span>
//                       </div>
//                       <div className="flex justify-between text-sm">
//                         <span className="text-gray-400 uppercase tracking-widest text-[10px] font-bold">
//                           Delivery Protocol
//                         </span>
//                         <span className="font-bold">
//                           ৳{selectedOrder.deliveryCharge.toLocaleString()}
//                         </span>
//                       </div>
//                       <div className="h-px bg-gray-100 my-4" />
//                       <div className="flex justify-between items-center">
//                         <span className="text-gray-900 uppercase tracking-[0.2em] font-bold">
//                           Total Valuation
//                         </span>
//                         <span className="text-3xl font-heading text-gold">
//                           ৳{selectedOrder.total.toLocaleString()}
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Actions */}
//                   <div className="flex gap-4 pt-6">
//                     <button className="flex-1 bg-black text-white py-5 rounded-2xl font-bold uppercase text-[10px] tracking-[0.4em] flex items-center justify-center gap-4 hover:bg-gold hover:text-black transition-all group">
//                       <Download
//                         size={18}
//                         className="group-hover:-translate-y-1 transition-transform"
//                       />{" "}
//                       Download Invoice
//                     </button>
//                     <button className="w-14 h-14 bg-gray-50 text-gray-400 rounded-2xl flex items-center justify-center hover:bg-black hover:text-gold transition-all">
//                       <FileText size={20} />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profile;
import React from "react";

export default function page() {
  return <div>page</div>;
}
