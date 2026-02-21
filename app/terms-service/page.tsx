import React from "react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Rhemar Signature",
  description:
    "Terms of Service for Rhemar Signature - Understanding the agreement between you and our brand.",
};

const TermsOfServicePage = () => {
  const lastUpdated = "February 21, 2026";
  const effectiveDate = "February 21, 2026";

  return (
    <div className="min-h-screen bg-primary text-white/90 font-sans">
      <main className="pt-32 pb-20 px-6 luxury-gradient">
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16">
            <span className="text-gold/80 text-sm uppercase tracking-[0.3em] font-medium font-serif">
              RHEMAR SIGNATURE · DHAKA
            </span>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-white mt-4 mb-6 tracking-tight">
              Terms of <span className="text-gold">Service</span>
            </h1>

            <p className="text-white/50 max-w-2xl mx-auto text-lg font-light">
              Please read these terms carefully before using our website or
              purchasing from Rhemar Signature.
            </p>

            <div className="mt-6 text-sm text-white/40">
              Last Updated: {lastUpdated} | Effective: {effectiveDate}
            </div>
          </div>

          {/* Section */}
          <div className="space-y-10">
            {/* Acceptance */}
            <section className="bg-charcoal/80 border border-white/5 p-8">
              <h2 className="font-heading text-2xl text-white mb-4">
                Acceptance of Terms
              </h2>
              <p className="text-white/50 leading-relaxed">
                By accessing our website, placing an order, or using our
                services, you agree to be bound by these Terms of Service. If
                you do not agree, please do not use our services.
              </p>
            </section>

            {/* Eligibility */}
            <section className="bg-charcoal/80 border border-white/5 p-8">
              <h2 className="font-heading text-2xl text-white mb-4">
                Eligibility
              </h2>
              <p className="text-white/50 leading-relaxed">
                You must be at least 18 years old or using the website under
                parental supervision. You agree that all information provided
                during checkout is accurate and complete.
              </p>
            </section>

            {/* Orders & Payments */}
            <section className="bg-charcoal/80 border border-white/5 p-8">
              <h2 className="font-heading text-2xl text-white mb-4">
                Orders & Payments
              </h2>
              <ul className="space-y-3 text-white/50 text-sm">
                <li>• All prices are listed in BDT (৳).</li>
                <li>
                  • We accept bKash, Nagad, Rocket, Bank Transfer & Cash on
                  Delivery.
                </li>
                <li>
                  • Orders are confirmed after successful payment or COD
                  confirmation.
                </li>
                <li>
                  • We reserve the right to cancel any suspicious or fraudulent
                  order.
                </li>
              </ul>
            </section>

            {/* Shipping */}
            <section className="bg-charcoal/80 border border-white/5 p-8">
              <h2 className="font-heading text-2xl text-white mb-4">
                Shipping & Delivery
              </h2>
              <ul className="space-y-3 text-white/50 text-sm">
                <li>• Inside Dhaka: 1–2 working days (৳70 delivery charge).</li>
                <li>
                  • Outside Dhaka: 2–3 working days (৳130 delivery charge).
                </li>
                <li>
                  • Delivery times may vary due to courier or weather issues.
                </li>
              </ul>
            </section>

            {/* Returns */}
            <section className="bg-charcoal/80 border border-white/5 p-8">
              <h2 className="font-heading text-2xl text-white mb-4">
                Returns & Refunds
              </h2>
              <ul className="space-y-3 text-white/50 text-sm">
                <li>• Returns accepted within 7 days of delivery.</li>
                <li>• Items must be unused and in original condition.</li>
                <li>• Delivery charges are non-refundable.</li>
                <li>
                  • Refunds processed within 3–5 working days after approval.
                </li>
              </ul>
            </section>

            {/* Intellectual Property */}
            <section className="bg-charcoal/80 border border-white/5 p-8">
              <h2 className="font-heading text-2xl text-white mb-4">
                Intellectual Property
              </h2>
              <p className="text-white/50 leading-relaxed">
                All content including logos, designs, images, and text are the
                property of Rhemar Signature. Unauthorized use, reproduction, or
                distribution is strictly prohibited.
              </p>
            </section>

            {/* Limitation of Liability */}
            <section className="bg-charcoal/80 border border-white/5 p-8">
              <h2 className="font-heading text-2xl text-white mb-4">
                Limitation of Liability
              </h2>
              <p className="text-white/50 leading-relaxed">
                Rhemar Signature shall not be liable for indirect or incidental
                damages resulting from the use of our products or website,
                except as required by applicable law in Bangladesh.
              </p>
            </section>

            {/* Governing Law */}
            <section className="bg-charcoal/80 border border-white/5 p-8">
              <h2 className="font-heading text-2xl text-white mb-4">
                Governing Law
              </h2>
              <p className="text-white/50 leading-relaxed">
                These Terms are governed by the laws of Bangladesh. Any disputes
                shall be resolved under the jurisdiction of the courts of Dhaka,
                Bangladesh.
              </p>
            </section>

            {/* Contact */}
            <section className="bg-charcoal/80 border border-white/5 p-8">
              <h2 className="font-heading text-2xl text-white mb-4">
                Contact Information
              </h2>
              <div className="text-white/50 text-sm space-y-2">
                <p>📍 Dhanmondi, Dhaka, Bangladesh, 1209</p>
                <p>📞 +880 1931-003290</p>
                <p>📧 rhemarsignature@gmail.com</p>
              </div>
            </section>
          </div>

          {/* Bottom Navigation */}
          <div className="mt-12 text-center space-x-6 text-xs uppercase tracking-wider">
            <Link
              href="/privacy"
              className="text-white/30 hover:text-gold transition"
            >
              Privacy Policy
            </Link>
            <span className="text-white/10">|</span>
            <Link
              href="/shipping-returns"
              className="text-white/30 hover:text-gold transition"
            >
              Shipping & Returns
            </Link>
          </div>

          {/* Signature */}
          <div className="text-center mt-16 space-y-3">
            <p className="font-serif text-white/30 text-lg italic">
              Not flawless. Not loud. Just real.
            </p>
            <p className="text-white/20 text-xs tracking-[0.3em] uppercase">
              RHEMAR SIGNATURE
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TermsOfServicePage;
