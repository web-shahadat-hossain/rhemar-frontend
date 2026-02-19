import React from "react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shipping & Returns | RHEMAR",
  description:
    "Shipping information and return policy for RHEMAR - where character meets style.",
};

const ShippingReturnsPage = () => {
  return (
    <div className="min-h-screen bg-primary text-white/90 font-sans">
      {/* Main Content - Pure Dark Mode with Elegant Black Cards */}
      <main className="pt-32 pb-20 px-6 luxury-gradient">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12 animate-fade-in-up">
            <span className="text-gold/80 text-sm uppercase tracking-[0.3em] font-medium font-serif">
              RHEMAR · EST 2026
            </span>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-white mt-4 mb-6 tracking-tight">
              Shipping <span className="text-gold">&</span> Returns
            </h1>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto"></div>
          </div>

          {/* Dark Content Card - Black on Black Elegance */}
          <div className="bg-charcoal/90 backdrop-blur-sm rounded-sm border border-white/5 shadow-2xl overflow-hidden">
            {/* Inner content with dark theme */}
            <div className="p-8 md:p-12 lg:p-16">
              {/* Last updated - subtle */}
              <p className="text-sm text-white/40 mb-8 border-b border-white/10 pb-4 font-light tracking-wide">
                LAST UPDATED — FEBRUARY 2026
              </p>

              {/* Shipping Section */}
              <section className="mb-14">
                <h2 className="font-heading text-3xl text-white mb-8 flex items-center">
                  <span className="w-1 h-7 bg-gold inline-block mr-4"></span>
                  Shipping
                </h2>
                <div className="space-y-8 pl-6 md:pl-10">
                  <div className="group hover:translate-x-2 transition-premium">
                    <h3 className="font-heading text-xl text-white/90 mb-3 flex items-center">
                      <span className="w-2 h-2 bg-gold rounded-full mr-3"></span>
                      Processing Time
                    </h3>
                    <p className="text-white/60 leading-relaxed pl-7 border-l border-white/10">
                      All orders are processed within{" "}
                      <span className="text-gold font-medium">
                        1-2 business days
                      </span>
                      . Orders placed after 12 PM EST or on weekends/holidays
                      will begin processing the next business day. You'll
                      receive a confirmation email with tracking information
                      once your order ships.
                    </p>
                  </div>

                  <div className="group hover:translate-x-2 transition-premium">
                    <h3 className="font-heading text-xl text-white/90 mb-3 flex items-center">
                      <span className="w-2 h-2 bg-gold rounded-full mr-3"></span>
                      Domestic Shipping (USA)
                    </h3>
                    <p className="text-white/60 leading-relaxed pl-7 border-l border-white/10">
                      Complimentary standard shipping on all US orders over{" "}
                      <span className="text-gold">$250</span>. For orders under
                      $250, standard shipping is a flat rate of{" "}
                      <span className="text-gold">$8.50</span> (3-5 business
                      days). Express shipping (2-3 business days) is available
                      for <span className="text-gold">$15.00</span>.
                    </p>
                  </div>

                  <div className="group hover:translate-x-2 transition-premium">
                    <h3 className="font-heading text-xl text-white/90 mb-3 flex items-center">
                      <span className="w-2 h-2 bg-gold rounded-full mr-3"></span>
                      International Shipping
                    </h3>
                    <p className="text-white/60 leading-relaxed pl-7 border-l border-white/10">
                      RHEMAR ships worldwide. Rates calculated at checkout.
                      Delivery typically takes{" "}
                      <span className="text-gold">6-12 business days</span>.
                      Customs fees, duties, and taxes are the responsibility of
                      the customer.
                    </p>
                  </div>

                  {/* Dark elevated note */}
                  <div className="bg-primary/60 p-6 border border-white/5 rounded-sm relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-gold"></div>
                    <p className="text-sm text-white/50 italic pl-4">
                      <span className="text-gold font-semibold not-italic">
                        Note:
                      </span>{" "}
                      Shipping times are estimates. Once your package leaves our
                      facility, we partner with trusted carriers but cannot be
                      responsible for carrier delays.
                    </p>
                  </div>
                </div>
              </section>

              {/* Returns Section */}
              <section className="mb-14">
                <h2 className="font-heading text-3xl text-white mb-8 flex items-center">
                  <span className="w-1 h-7 bg-gold inline-block mr-4"></span>
                  Returns & Exchanges
                </h2>
                <div className="space-y-8 pl-6 md:pl-10">
                  <div className="group hover:translate-x-2 transition-premium">
                    <h3 className="font-heading text-xl text-white/90 mb-3 flex items-center">
                      <span className="w-2 h-2 bg-gold rounded-full mr-3"></span>
                      Our Promise
                    </h3>
                    <p className="text-white/60 leading-relaxed pl-7 border-l border-white/10">
                      Items can be returned within{" "}
                      <span className="text-gold">14 days</span> of delivery for
                      a full refund or exchange, provided they are unworn,
                      unwashed, and in original condition with all tags
                      attached.
                    </p>
                  </div>

                  <div className="group hover:translate-x-2 transition-premium">
                    <h3 className="font-heading text-xl text-white/90 mb-3 flex items-center">
                      <span className="w-2 h-2 bg-gold rounded-full mr-3"></span>
                      How to Return
                    </h3>
                    <p className="text-white/60 leading-relaxed pl-7 border-l border-white/10">
                      Email{" "}
                      <span className="text-gold border-b border-gold/30">
                        returns@rhemar.com
                      </span>{" "}
                      with your order number. We'll provide a prepaid shipping
                      label (cost deducted from refund for domestic returns).
                      International returns must be arranged by the customer.
                    </p>
                  </div>

                  <div className="group hover:translate-x-2 transition-premium">
                    <h3 className="font-heading text-xl text-white/90 mb-3 flex items-center">
                      <span className="w-2 h-2 bg-gold rounded-full mr-3"></span>
                      Refunds
                    </h3>
                    <p className="text-white/60 leading-relaxed pl-7 border-l border-white/10">
                      Approved refunds are processed to the original payment
                      method within{" "}
                      <span className="text-gold">5-7 business days</span>.
                      Original shipping costs are non-refundable.
                    </p>
                  </div>

                  <div className="group hover:translate-x-2 transition-premium">
                    <h3 className="font-heading text-xl text-white/90 mb-3 flex items-center">
                      <span className="w-2 h-2 bg-gold rounded-full mr-3"></span>
                      Exchanges
                    </h3>
                    <p className="text-white/60 leading-relaxed pl-7 border-l border-white/10">
                      Follow the return process and note desired item. Exchanges
                      are processed once the returned item is received, subject
                      to availability.
                    </p>
                  </div>

                  {/* Dark elevated note */}
                  <div className="bg-primary/60 p-6 border border-white/5 rounded-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-gold"></div>
                    <p className="text-sm text-white/50 italic pl-4">
                      <span className="text-gold font-semibold not-italic">
                        Final Sale:
                      </span>{" "}
                      Gift cards, face masks, and items marked "final sale"
                      cannot be returned or exchanged.
                    </p>
                  </div>
                </div>
              </section>

              {/* Quick Questions - Dark Grid */}
              <section className="mb-12">
                <h2 className="font-heading text-3xl text-white mb-8 flex items-center">
                  <span className="w-1 h-7 bg-gold inline-block mr-4"></span>
                  Quick Questions
                </h2>
                <div className="grid md:grid-cols-2 gap-6 pl-6 md:pl-10">
                  <div className="bg-primary/40 p-6 border border-white/5 hover:border-gold/30 transition-premium group">
                    <h4 className="font-heading text-lg text-white/90 mb-3">
                      Damaged item?
                    </h4>
                    <p className="text-white/50 text-sm leading-relaxed">
                      Contact us within 48 hours at{" "}
                      <span className="text-gold">care@rhemar.com</span> with
                      photos.
                    </p>
                  </div>
                  <div className="bg-primary/40 p-6 border border-white/5 hover:border-gold/30 transition-premium group">
                    <h4 className="font-heading text-lg text-white/90 mb-3">
                      Change order?
                    </h4>
                    <p className="text-white/50 text-sm leading-relaxed">
                      Within 2 hours of placement email{" "}
                      <span className="text-gold">orders@rhemar.com</span>.
                    </p>
                  </div>
                </div>
              </section>

              {/* Contact CTA - Dark with Gold */}
              <div className="mt-12 pt-8 border-t border-white/10 text-center">
                <p className="text-white/40 mb-6 font-light tracking-wide">
                  STILL HAVE QUESTIONS? WE'RE HERE TO HELP.
                </p>
                <Link
                  href="/contact"
                  className="inline-block px-10 py-4 bg-transparent text-gold text-sm uppercase tracking-[0.2em] border border-gold/30 hover:bg-gold hover:text-primary transition-premium font-medium"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </div>

          {/* Brand Signature - Dark Elegant */}
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
