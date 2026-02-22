/* eslint-disable react/no-unescaped-entities */
// import Link from "next/link";
// import React from "react";

// const Hero: React.FC = () => {
//   return (
//     <section className="relative h-screen w-full overflow-hidden luxury-gradient flex items-center">
//       {/* Background Image / Overlay */}
//       <div className="absolute inset-0 z-0">
//         <img
//           src="/images/home/hero.png"
//           alt="Luxury Fashion Model"
//           className="w-full h-full object-cover opacity-40 animate-soft-zoom"
//         />
//         <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/60 to-transparent"></div>

//         {/* Subtle Gold Pattern Overlay (SVG) */}
//         <div
//           className="absolute inset-0 opacity-10 pointer-events-none"
//           style={{
//             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30-30-30z' fill='%23C5A059' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
//           }}
//         ></div>
//       </div>

//       <div className="container mx-auto px-6 relative z-10">
//         <div className="max-w-2xl">
//           <div className="overflow-hidden mb-2">
//             <p
//               className="text-accent tracking-[0.4em] uppercase text-sm mb-4 animate-slide-in-right opacity-0"
//               style={{ animationDelay: "0.2s" }}
//             >
//               Established Perfection
//             </p>
//           </div>

//           <h2
//             className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white leading-tight mb-8 animate-fade-in-up opacity-0"
//             style={{ animationDelay: "0.5s" }}
//           >
//             Redefining <br />
//             <span className="text-accent italic font-serif font-light">
//               Men’s Luxury
//             </span>{" "}
//             Wear
//           </h2>

//           <p
//             className="text-gray-400 text-lg md:text-xl font-light mb-10 max-w-lg leading-relaxed animate-fade-in-up opacity-0"
//             style={{ animationDelay: "0.8s" }}
//           >
//             Signature styles crafted for confidence, comfort, and class.
//             Experience the pinnacle of modern craftsmanship.
//           </p>

//           <div
//             className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 animate-fade-in-up opacity-0"
//             style={{ animationDelay: "1.1s" }}
//           >
//             <Link
//               href={"/products"}
//               className="bg-accent text-primary px-10 py-4 font-bold tracking-widest uppercase text-sm hover:bg-white transition-all duration-300 transform hover:-translate-y-1"
//             >
//               Shop Collection
//             </Link>
//             <Link
//               href={"/philosophy"}
//               className="border border-white/30 text-white px-10 py-4 font-bold tracking-widest uppercase text-sm hover:border-accent hover:text-accent transition-all duration-300 transform hover:-translate-y-1"
//             >
//               Explore Signature
//             </Link>
//           </div>
//         </div>
//       </div>

//       <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
//         <svg
//           className="w-6 h-6 text-accent/50"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//             d="M19 14l-7 7m0 0l-7-7m7 7V3"
//           ></path>
//         </svg>
//       </div>
//     </section>
//   );
// };

// export default Hero;
import Link from "next/link";
import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center bg-black">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/bg-video.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Collection Label */}
          <p className="text-accent tracking-[0.4em] uppercase text-xs md:text-sm mb-6">
            EID-UL-FITR'26 COLLECTION
          </p>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white leading-tight mb-6">
            Confidence in Simplicity
          </h1>

          {/* Sub Line */}
          <p className="text-gray-300 tracking-widest uppercase text-sm md:text-base mb-10">
            NOT LOUD. JUST REAL.
          </p>

          {/* Button */}
          <Link
            href="/products"
            className="inline-block bg-accent text-primary px-12 py-4 rounded-full font-semibold tracking-widest uppercase text-sm hover:bg-white transition-all duration-300 transform hover:-translate-y-1"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
