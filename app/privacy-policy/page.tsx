import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Rhemar Signature",
  description:
    "Privacy Policy for Rhemar Signature - Learn how we collect, use and protect your information.",
};

const PrivacyPolicyPage = () => {
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
              Privacy <span className="text-gold">Policy</span>
            </h1>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto"></div>
          </div>

          {/* Content Card */}
          <div className="bg-charcoal/90 backdrop-blur-sm rounded-sm border border-white/5 shadow-2xl overflow-hidden">
            <div className="p-8 md:p-12 lg:p-16">
              <p className="text-sm text-white/40 mb-8 border-b border-white/10 pb-4 font-light tracking-wide">
                LAST UPDATED — FEBRUARY 2026
              </p>

              {/* Introduction */}
              <section className="mb-14">
                <h2 className="font-heading text-3xl text-white mb-8 flex items-center">
                  <span className="w-1 h-7 bg-gold inline-block mr-4"></span>
                  Introduction
                </h2>
                <p className="text-white/60 leading-relaxed pl-6 md:pl-10 border-l border-white/10">
                  At Rhemar Signature, we respect your privacy and are committed
                  to protecting your personal information. This Privacy Policy
                  explains how we collect, use, and safeguard your data when you
                  visit or make a purchase from our website.
                </p>
              </section>

              {/* Information We Collect */}
              <section className="mb-14">
                <h2 className="font-heading text-3xl text-white mb-8 flex items-center">
                  <span className="w-1 h-7 bg-gold inline-block mr-4"></span>
                  Information We Collect
                </h2>
                <div className="space-y-6 pl-6 md:pl-10 text-white/60 border-l border-white/10">
                  <p>• Name, phone number, email address</p>
                  <p>• Shipping and billing address</p>
                  <p>• Order and payment information</p>
                  <p>• Device information (IP address, browser type)</p>
                </div>
              </section>

              {/* How We Use Information */}
              <section className="mb-14">
                <h2 className="font-heading text-3xl text-white mb-8 flex items-center">
                  <span className="w-1 h-7 bg-gold inline-block mr-4"></span>
                  How We Use Your Information
                </h2>
                <div className="space-y-6 pl-6 md:pl-10 text-white/60 border-l border-white/10">
                  <p>• To process and deliver your orders</p>
                  <p>• To communicate order updates</p>
                  <p>• To improve our website and services</p>
                  <p>• To prevent fraud and enhance security</p>
                </div>
              </section>

              {/* Data Protection */}
              <section className="mb-14">
                <h2 className="font-heading text-3xl text-white mb-8 flex items-center">
                  <span className="w-1 h-7 bg-gold inline-block mr-4"></span>
                  Data Protection
                </h2>
                <p className="text-white/60 leading-relaxed pl-6 md:pl-10 border-l border-white/10">
                  We implement appropriate security measures to protect your
                  personal information. Your payment details are processed
                  securely through trusted payment providers.
                </p>
              </section>

              {/* Cookies */}
              <section className="mb-14">
                <h2 className="font-heading text-3xl text-white mb-8 flex items-center">
                  <span className="w-1 h-7 bg-gold inline-block mr-4"></span>
                  Cookies
                </h2>
                <p className="text-white/60 leading-relaxed pl-6 md:pl-10 border-l border-white/10">
                  We use cookies to enhance your browsing experience, analyze
                  website traffic, and improve our services. You may disable
                  cookies in your browser settings.
                </p>
              </section>

              {/* Customer Rights */}
              <section className="mb-14">
                <h2 className="font-heading text-3xl text-white mb-8 flex items-center">
                  <span className="w-1 h-7 bg-gold inline-block mr-4"></span>
                  Your Rights
                </h2>
                <p className="text-white/60 leading-relaxed pl-6 md:pl-10 border-l border-white/10">
                  You have the right to access, correct, or request deletion of
                  your personal data. For any privacy-related concerns, please
                  contact us.
                </p>
              </section>

              {/* Contact */}
              <section className="mb-12">
                <h2 className="font-heading text-3xl text-white mb-8 flex items-center">
                  <span className="w-1 h-7 bg-gold inline-block mr-4"></span>
                  Contact Us
                </h2>
                <div className="pl-6 md:pl-10 text-white/60 space-y-3">
                  <p>📍 Dhanmondi, Dhaka, Bangladesh, 1209</p>
                  <p>📞 +880 1931-003290</p>
                  <p>📧 rhemarsignature@gmail.com</p>
                </div>
              </section>

              {/* CTA */}
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

export default PrivacyPolicyPage;
