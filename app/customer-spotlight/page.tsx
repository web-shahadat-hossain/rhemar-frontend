import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Customer Spotlight | Rhemar Signature",
  description:
    "Real customers. Real style. Discover how Rhemar Signature is worn with confidence.",
};

const customers = [
  { id: 1, src: "/spotlight/1.jpg" },
  { id: 2, src: "/spotlight/2.jpg" },
  { id: 3, src: "/spotlight/3.jpg" },
  { id: 4, src: "/spotlight/4.jpg" },
  { id: 5, src: "/spotlight/5.jpg" },
  { id: 6, src: "/spotlight/6.jpg" },
  { id: 7, src: "/spotlight/7.jpg" },
  { id: 8, src: "/spotlight/8.jpg" },
];

export default function page() {
  return (
    <div>
      <div className="min-h-screen bg-primary text-white font-sans">
        {/* Header Section */}
        <section className="pt-32 pb-16 text-center px-6 luxury-gradient">
          <p className="text-white/40 text-sm mb-4">
            <Link href="/" className="hover:text-gold transition">
              Home
            </Link>{" "}
            / Customer Spotlight
          </p>

          <h1 className="font-heading text-5xl md:text-6xl text-white mb-6 tracking-tight">
            Customer <span className="text-gold">Spotlight</span>
          </h1>

          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto"></div>

          <p className="text-white/50 max-w-2xl mx-auto mt-6 text-lg font-light">
            Real moments. Real confidence. Discover how our community wears
            Rhemar Signature.
          </p>
        </section>

        {/* Image Grid */}
        <section className="px-6 pb-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {customers.map((item) => (
              <div
                key={item.id}
                className="relative group overflow-hidden rounded-md border border-white/5 hover:border-gold/30 transition duration-500"
              >
                <Image
                  src={item.src}
                  alt="Customer Spotlight"
                  width={500}
                  height={600}
                  className="object-cover w-full h-[400px] group-hover:scale-110 transition duration-700"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center">
                  <span className="text-gold uppercase tracking-widest text-sm">
                    Rhemar Signature
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="text-center pb-20">
          <h2 className="font-heading text-3xl text-white mb-4">
            Want to be Featured?
          </h2>
          <p className="text-white/50 mb-6">
            Tag us on Instagram or send your photos.
          </p>
          <Link
            href="/contact"
            className="px-8 py-3 border border-gold/30 text-gold uppercase tracking-wider text-sm hover:bg-gold hover:text-primary transition"
          >
            Submit Your Look
          </Link>
        </section>

        {/* Brand Signature */}
        <div className="text-center pb-16">
          <p className="font-serif text-white/30 text-lg italic">
            Not flawless. Not loud. Just real.
          </p>
          <p className="text-white/20 text-xs tracking-[0.3em] uppercase mt-2">
            RHEMAR SIGNATURE · DHAKA
          </p>
        </div>
      </div>{" "}
      <div className="min-h-screen bg-primary text-white font-sans">
        {/* Header Section */}
        <section className="pt-32 pb-16 text-center px-6 luxury-gradient">
          <p className="text-white/40 text-sm mb-4">
            <Link href="/" className="hover:text-gold transition">
              Home
            </Link>{" "}
            / Customer Spotlight
          </p>

          <h1 className="font-heading text-5xl md:text-6xl text-white mb-6 tracking-tight">
            Customer <span className="text-gold">Spotlight</span>
          </h1>

          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto"></div>

          <p className="text-white/50 max-w-2xl mx-auto mt-6 text-lg font-light">
            Real moments. Real confidence. Discover how our community wears
            Rhemar Signature.
          </p>
        </section>

        {/* Image Grid */}
        <section className="px-6 pb-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {customers.map((item) => (
              <div
                key={item.id}
                className="relative group overflow-hidden rounded-md border border-white/5 hover:border-gold/30 transition duration-500"
              >
                <Image
                  src={item.src}
                  alt="Customer Spotlight"
                  width={500}
                  height={600}
                  className="object-cover w-full h-[400px] group-hover:scale-110 transition duration-700"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center">
                  <span className="text-gold uppercase tracking-widest text-sm">
                    Rhemar Signature
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="text-center pb-20">
          <h2 className="font-heading text-3xl text-white mb-4">
            Want to be Featured?
          </h2>
          <p className="text-white/50 mb-6">
            Tag us on Instagram or send your photos.
          </p>
          <Link
            href="/contact"
            className="px-8 py-3 border border-gold/30 text-gold uppercase tracking-wider text-sm hover:bg-gold hover:text-primary transition"
          >
            Submit Your Look
          </Link>
        </section>

        {/* Brand Signature */}
        <div className="text-center pb-16">
          <p className="font-serif text-white/30 text-lg italic">
            Not flawless. Not loud. Just real.
          </p>
          <p className="text-white/20 text-xs tracking-[0.3em] uppercase mt-2">
            RHEMAR SIGNATURE · DHAKA
          </p>
        </div>
      </div>
    </div>
  );
}
