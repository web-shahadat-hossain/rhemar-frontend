// import React from "react";
// import { Metadata } from "next";
// import Image from "next/image";
// import Link from "next/link";
// export const metadata: Metadata = {
//   title: "Customer Spotlight | Rhemar Signature",
//   description:
//     "Real customers. Real style. Discover how Rhemar Signature is worn with confidence.",
// };

// const customers = [
//   { id: 1, src: "/spotlight/1.jpg" },
//   { id: 2, src: "/spotlight/2.jpg" },
//   { id: 3, src: "/spotlight/3.jpg" },
//   { id: 4, src: "/spotlight/4.jpg" },
//   { id: 5, src: "/spotlight/5.jpg" },
//   { id: 6, src: "/spotlight/6.jpg" },
//   { id: 7, src: "/spotlight/7.jpg" },
//   { id: 8, src: "/spotlight/8.jpg" },
// ];

// export default function page() {
//   return (
//     <div>
//       <div className="min-h-screen bg-primary text-white font-sans">
//         {/* Header Section */}
//         <section className="pt-32 pb-16 text-center px-6 luxury-gradient">
//           <p className="text-white/40 text-sm mb-4">
//             <Link href="/" className="hover:text-gold transition">
//               Home
//             </Link>{" "}
//             / Customer Spotlight
//           </p>

//           <h1 className="font-heading text-5xl md:text-6xl text-white mb-6 tracking-tight">
//             Customer <span className="text-gold">Spotlight</span>
//           </h1>

//           <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto"></div>

//           <p className="text-white/50 max-w-2xl mx-auto mt-6 text-lg font-light">
//             Real moments. Real confidence. Discover how our community wears
//             Rhemar Signature.
//           </p>
//         </section>

//         {/* Image Grid */}
//         <section className="px-6 pb-20">
//           <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {customers.map((item) => (
//               <div
//                 key={item.id}
//                 className="relative group overflow-hidden rounded-md border border-white/5 hover:border-gold/30 transition duration-500"
//               >
//                 <Image
//                   src={item.src}
//                   alt="Customer Spotlight"
//                   width={500}
//                   height={600}
//                   className="object-cover w-full h-[400px] group-hover:scale-110 transition duration-700"
//                 />

//                 {/* Hover Overlay */}
//                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center">
//                   <span className="text-gold uppercase tracking-widest text-sm">
//                     Rhemar Signature
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Bottom CTA */}
//         <section className="text-center pb-20">
//           <h2 className="font-heading text-3xl text-white mb-4">
//             Want to be Featured?
//           </h2>
//           <p className="text-white/50 mb-6">
//             Tag us on Instagram or send your photos.
//           </p>
//           <Link
//             href="/contact"
//             className="px-8 py-3 border border-gold/30 text-gold uppercase tracking-wider text-sm hover:bg-gold hover:text-primary transition"
//           >
//             Submit Your Look
//           </Link>
//         </section>

//         {/* Brand Signature */}
//         <div className="text-center pb-16">
//           <p className="font-serif text-white/30 text-lg italic">
//             Not flawless. Not loud. Just real.
//           </p>
//           <p className="text-white/20 text-xs tracking-[0.3em] uppercase mt-2">
//             RHEMAR SIGNATURE · DHAKA
//           </p>
//         </div>
//       </div>{" "}
//       <div className="min-h-screen bg-primary text-white font-sans">
//         {/* Header Section */}
//         <section className="pt-32 pb-16 text-center px-6 luxury-gradient">
//           <p className="text-white/40 text-sm mb-4">
//             <Link href="/" className="hover:text-gold transition">
//               Home
//             </Link>{" "}
//             / Customer Spotlight
//           </p>

//           <h1 className="font-heading text-5xl md:text-6xl text-white mb-6 tracking-tight">
//             Customer <span className="text-gold">Spotlight</span>
//           </h1>

//           <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto"></div>

//           <p className="text-white/50 max-w-2xl mx-auto mt-6 text-lg font-light">
//             Real moments. Real confidence. Discover how our community wears
//             Rhemar Signature.
//           </p>
//         </section>

//         {/* Image Grid */}
//         <section className="px-6 pb-20">
//           <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {customers.map((item) => (
//               <div
//                 key={item.id}
//                 className="relative group overflow-hidden rounded-md border border-white/5 hover:border-gold/30 transition duration-500"
//               >
//                 <Image
//                   src={item.src}
//                   alt="Customer Spotlight"
//                   width={500}
//                   height={600}
//                   className="object-cover w-full h-[400px] group-hover:scale-110 transition duration-700"
//                 />

//                 {/* Hover Overlay */}
//                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center">
//                   <span className="text-gold uppercase tracking-widest text-sm">
//                     Rhemar Signature
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Bottom CTA */}
//         <section className="text-center pb-20">
//           <h2 className="font-heading text-3xl text-white mb-4">
//             Want to be Featured?
//           </h2>
//           <p className="text-white/50 mb-6">
//             Tag us on Instagram or send your photos.
//           </p>
//           <Link
//             href="/contact"
//             className="px-8 py-3 border border-gold/30 text-gold uppercase tracking-wider text-sm hover:bg-gold hover:text-primary transition"
//           >
//             Submit Your Look
//           </Link>
//         </section>

//         {/* Brand Signature */}
//         <div className="text-center pb-16">
//           <p className="font-serif text-white/30 text-lg italic">
//             Not flawless. Not loud. Just real.
//           </p>
//           <p className="text-white/20 text-xs tracking-[0.3em] uppercase mt-2">
//             RHEMAR SIGNATURE · DHAKA
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import React from "react";
import Link from "next/link";

export default function ComingSoon() {
  return (
    <div className="min-h-screen mt-20 bg-primary text-white font-sans relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gold/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gold/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12">
        {/* Logo/Brand Mark */}
        <div className="mb-8 animate-fadeIn">
          <div className="w-20 h-20 border-2 border-gold/30 rounded-full flex items-center justify-center mx-auto">
            {/* <div className="w-12 h-12 bg-gradient-to-br from-gold to-gold/60 rounded-full"></div> */}
            <img src="/logo.png" alt="" />
          </div>
        </div>

        {/* Coming Soon Badge */}
        <div className="mb-6 animate-slideDown">
          <span className="px-4 py-2 border border-gold/30 text-gold text-sm tracking-[0.3em] uppercase">
            Coming Soon
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="font-heading text-5xl md:text-7xl text-center text-white mb-6 tracking-tight animate-slideUp">
          Something
          <span className="block text-gold mt-2">Extraordinary</span>
        </h1>

        {/* Decorative Line */}
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto my-8 animate-width"></div>

        {/* Description */}
        <p className="text-white/60 max-w-2xl mx-auto text-center text-lg md:text-xl font-light mb-12 animate-fadeIn delay-300">
          We're meticulously crafting something special for you. Prepare to
          experience luxury redefined.
        </p>

        {/* Launch Countdown (Optional - can be removed if not needed) */}
        <div className="grid grid-cols-4 gap-4 max-w-md mx-auto mb-16 animate-fadeIn delay-500">
          {[
            { value: "30", label: "Days" },
            { value: "12", label: "Hours" },
            { value: "45", label: "Minutes" },
            { value: "22", label: "Seconds" },
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-heading text-gold mb-2">
                {item.value}
              </div>
              <div className="text-white/40 text-xs tracking-wider uppercase">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Notify Form */}
        <div className="w-full max-w-md mx-auto mb-16 animate-fadeIn delay-700">
          <p className="text-white/50 text-center mb-4 text-sm">
            Be the first to know when we launch
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 bg-white/5 border border-white/10 rounded-md text-white placeholder:text-white/30 focus:outline-none focus:border-gold/50 transition"
            />
            <button className="px-8 py-3 bg-gold text-primary font-medium uppercase tracking-wider text-sm hover:bg-gold/90 transition whitespace-nowrap rounded-md">
              Notify Me
            </button>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex gap-6 mb-12 animate-fadeIn delay-1000">
          {["Instagram", "Facebook", "Twitter"].map((social) => (
            <Link
              key={social}
              href="#"
              className="text-white/40 hover:text-gold transition text-sm tracking-wider uppercase"
            >
              {social}
            </Link>
          ))}
        </div>

        {/* Brand Signature */}
        <div className="text-center animate-fadeIn delay-1000">
          <p className="font-serif text-white/20 text-lg italic">
            Not flawless. Not loud. Just real.
          </p>
          <p className="text-white/10 text-xs tracking-[0.3em] uppercase mt-2">
            RHEMAR SIGNATURE · DHAKA
          </p>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes width {
          from {
            width: 0;
            opacity: 0;
          }
          to {
            width: 6rem;
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
          opacity: 0;
        }

        .animate-slideDown {
          animation: slideDown 0.8s ease-out forwards;
        }

        .animate-slideUp {
          animation: slideUp 0.8s ease-out forwards;
        }

        .animate-width {
          animation: width 1s ease-out forwards;
        }

        .delay-300 {
          animation-delay: 300ms;
        }

        .delay-500 {
          animation-delay: 500ms;
        }

        .delay-700 {
          animation-delay: 700ms;
        }

        .delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </div>
  );
}
