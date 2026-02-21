import React from "react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shipping & Returns | Rhemar Signature",
  description:
    "Shipping information and return policy for Rhemar Signature - Not flawless. Not loud. Just real.",
};

const ShippingReturnsPage = () => {
  return (
    <div className="min-h-screen bg-primary text-white/90 font-sans">
      <main className="pt-32 pb-20 px-6 luxury-gradient">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in-up">
            <span className="text-gold/80 text-sm uppercase tracking-[0.3em] font-medium font-serif">
              RHEMAR SIGNATURE · DHAKA
            </span>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-white mt-4 mb-6 tracking-tight">
              Shipping <span className="text-gold">&</span> Returns
            </h1>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto"></div>
          </div>

          {/* Content Card */}
          <div className="bg-charcoal/90 backdrop-blur-sm rounded-sm border border-white/5 shadow-2xl overflow-hidden">
            <div className="p-8 md:p-12 lg:p-16">
              <p className="text-sm text-white/40 mb-8 border-b border-white/10 pb-4 font-light tracking-wide">
                LAST UPDATED — FEBRUARY 2026
              </p>

              {/* Shipping */}
              <section className="mb-14">
                <h2 className="font-heading text-3xl text-white mb-8 flex items-center">
                  <span className="w-1 h-7 bg-gold inline-block mr-4"></span>
                  Shipping
                </h2>

                <div className="space-y-8 pl-6 md:pl-10">
                  <div>
                    <h3 className="font-heading text-xl text-white/90 mb-3">
                      Processing Time
                    </h3>
                    <p className="text-white/60 leading-relaxed border-l border-white/10 pl-7">
                      All orders are processed within{" "}
                      <span className="text-gold font-medium">12–24 hours</span>
                      . Orders placed late at night or on public holidays will
                      be processed the next working day.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-heading text-xl text-white/90 mb-3">
                      Inside Dhaka
                    </h3>
                    <p className="text-white/60 leading-relaxed border-l border-white/10 pl-7">
                      Delivery time:{" "}
                      <span className="text-gold">1–2 working days</span>.
                      Delivery charge: <span className="text-gold">৳70</span>.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-heading text-xl text-white/90 mb-3">
                      Outside Dhaka
                    </h3>
                    <p className="text-white/60 leading-relaxed border-l border-white/10 pl-7">
                      Delivery time:{" "}
                      <span className="text-gold">2–3 working days</span>.
                      Delivery charge: <span className="text-gold">৳130</span>.
                    </p>
                  </div>

                  <div className="bg-primary/60 p-6 border border-white/5 rounded-sm relative">
                    <div className="absolute top-0 left-0 w-1 h-full bg-gold"></div>
                    <p className="text-sm text-white/50 italic pl-4">
                      Delivery time may vary slightly due to courier or weather
                      conditions.
                    </p>
                  </div>
                </div>
              </section>

              {/* Returns */}
              <section className="mb-14">
                <h2 className="font-heading text-3xl text-white mb-8 flex items-center">
                  <span className="w-1 h-7 bg-gold inline-block mr-4"></span>
                  Returns & Exchanges
                </h2>

                <div className="space-y-8 pl-6 md:pl-10">
                  <div>
                    <h3 className="font-heading text-xl text-white/90 mb-3">
                      Our Promise
                    </h3>
                    <p className="text-white/60 leading-relaxed border-l border-white/10 pl-7">
                      Items can be returned within{" "}
                      <span className="text-gold">7 days</span> of delivery,
                      provided they are unused, unwashed, and in original
                      condition with tags attached.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-heading text-xl text-white/90 mb-3">
                      How to Return
                    </h3>
                    <p className="text-white/60 leading-relaxed border-l border-white/10 pl-7">
                      Contact us with your order number at{" "}
                      <span className="text-gold">
                        rhemarsignature@gmail.com
                      </span>{" "}
                      or call{" "}
                      <span className="text-gold">+880 1931-003290</span>.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-heading text-xl text-white/90 mb-3">
                      Refunds
                    </h3>
                    <p className="text-white/60 leading-relaxed border-l border-white/10 pl-7">
                      Approved refunds are processed within{" "}
                      <span className="text-gold">3–5 working days</span>.
                      Delivery charges are non-refundable.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-heading text-xl text-white/90 mb-3">
                      Exchanges
                    </h3>
                    <p className="text-white/60 leading-relaxed border-l border-white/10 pl-7">
                      Exchanges are processed after we receive the returned
                      product, subject to availability.
                    </p>
                  </div>
                </div>
              </section>

              {/* Contact */}
              <section className="mb-12">
                <h2 className="font-heading text-3xl text-white mb-8 flex items-center">
                  <span className="w-1 h-7 bg-gold inline-block mr-4"></span>
                  Contact Information
                </h2>

                <div className="pl-6 md:pl-10 text-white/60 space-y-3">
                  <p>📍 Dhanmondi, Dhaka, Bangladesh, 1209</p>
                  <p>📞 +880 1931-003290</p>
                  <p>📧 rhemarsignature@gmail.com</p>
                </div>
              </section>

              <div className="mt-12 pt-8 border-t border-white/10 text-center">
                <Link
                  href="/contact"
                  className="inline-block px-10 py-4 bg-transparent text-gold text-sm uppercase tracking-[0.2em] border border-gold/30 hover:bg-gold hover:text-primary transition-premium font-medium"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </div>

          {/* Brand Signature */}
          <div className="text-center mt-16 space-y-3">
            <p className="font-serif text-white/30 text-lg italic">
              Not flawless. Not loud. Just real.
            </p>
            <p className="text-white/20 text-xs tracking-[0.3em] uppercase">
              Chosen by those who lead with character.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ShippingReturnsPage;
