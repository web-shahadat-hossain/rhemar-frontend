import React from "react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | RHEMAR",
  description:
    "RHEMAR privacy policy - Learn how we collect, use, and protect your personal information with the utmost respect and confidentiality.",
};

const PrivacyPolicyPage = () => {
  const lastUpdated = "February 19, 2026";

  const policySections = [
    {
      id: "information-we-collect",
      title: "Information We Collect",
      content:
        "We collect information to provide better services to our customers. The information we collect falls into two categories:",
      subsections: [
        {
          title: "Information You Provide",
          items: [
            "Contact details (name, email address, phone number, shipping/billing address)",
            "Payment information (processed securely through PCI-compliant partners)",
            "Account credentials (if you create an account)",
            "Communication preferences and purchase history",
            "Customer service interactions and feedback",
          ],
        },
        {
          title: "Information Collected Automatically",
          items: [
            "Device information (IP address, browser type, operating system)",
            "Usage data (pages visited, time spent, click patterns)",
            "Location information (general geographic location)",
            "Cookies and similar tracking technologies",
          ],
        },
      ],
    },
    {
      id: "how-we-use",
      title: "How We Use Your Information",
      content:
        "Your information helps us create a personalized, efficient experience. We use data to:",
      points: [
        "Process and fulfill your orders, including shipping and returns",
        "Communicate about your order status, updates, and promotions (with consent)",
        "Improve and personalize our website and product offerings",
        "Detect and prevent fraud or unauthorized activities",
        "Comply with legal obligations and enforce our terms",
        "Analyze trends and customer behavior to enhance your experience",
      ],
    },
    {
      id: "data-sharing",
      title: "Information Sharing & Disclosure",
      content:
        "We respect your privacy. We do not sell your personal information. We may share data only with:",
      partners: [
        {
          name: "Service Providers",
          description:
            "Trusted partners who help operate our business (payment processing, shipping, marketing platforms). They agree to strict confidentiality obligations.",
        },
        {
          name: "Legal Requirements",
          description:
            "When required by law, regulation, or legal process, or to protect rights, property, or safety.",
        },
        {
          name: "Business Transfers",
          description:
            "In connection with a merger, acquisition, or sale of assets—with notice and choice where possible.",
        },
      ],
    },
    {
      id: "cookies",
      title: "Cookies & Tracking",
      content:
        "We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookies through your browser settings.",
      cookieTypes: [
        {
          type: "Essential",
          description:
            "Required for basic site functionality, including secure login and cart management.",
          duration: "Session",
        },
        {
          type: "Analytics",
          description:
            "Help us understand how visitors interact with our site to improve performance.",
          duration: "Up to 2 years",
        },
        {
          type: "Marketing",
          description:
            "Used to deliver relevant advertisements and track campaign effectiveness.",
          duration: "Up to 90 days",
        },
      ],
    },
    {
      id: "data-security",
      title: "Data Security",
      content:
        "We implement industry-standard security measures to protect your information:",
      measures: [
        "256-bit SSL encryption for all transactions",
        "Regular security audits and penetration testing",
        "Limited employee access to personal data",
        "PCI-DSS compliant payment processing",
        "Secure data centers with 24/7 monitoring",
      ],
    },
    {
      id: "your-rights",
      title: "Your Privacy Rights",
      content:
        "Depending on your location, you may have certain rights regarding your personal information:",
      rights: [
        {
          right: "Access",
          description:
            "Request a copy of the personal information we hold about you",
        },
        {
          right: "Correction",
          description: "Update or correct inaccurate information",
        },
        {
          right: "Deletion",
          description:
            "Request deletion of your personal information (subject to legal obligations)",
        },
        {
          right: "Opt-Out",
          description:
            "Opt out of marketing communications or certain data uses",
        },
        {
          right: "Data Portability",
          description:
            "Receive your data in a structured, commonly used format",
        },
      ],
    },
    {
      id: "children",
      title: "Children's Privacy",
      content:
        "RHEMAR is not intended for individuals under the age of 16. We do not knowingly collect information from children. If you believe a child has provided us with personal information, please contact us immediately.",
    },
    {
      id: "international",
      title: "International Data Transfers",
      content:
        "As a global brand, your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place through standard contractual clauses and data protection agreements.",
    },
    {
      id: "changes",
      title: "Changes to This Policy",
      content:
        "We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. We'll notify you of material changes through our website or via email. Your continued use of our services constitutes acceptance of the updated policy.",
    },
  ];

  return (
    <div className=" bg-primary text-white/90 font-sans">
      {/* Main Content */}
      <main className="pt-32 pb-20 px-6 luxury-gradient">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in-up">
            <span className="text-gold/80 text-sm uppercase tracking-[0.3em] font-medium font-serif">
              YOUR TRUST · OUR COMMITMENT
            </span>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-white mt-4 mb-6 tracking-tight">
              Privacy <span className="text-gold">Policy</span>
            </h1>
            <p className="text-white/50 max-w-2xl mx-auto text-lg font-light leading-relaxed">
              At RHEMAR, we treat your personal information with the same care
              and respect as our finest garments. Transparency isn't just a
              policy—it's a promise.
            </p>
            <div className="flex items-center justify-center space-x-4 mt-8">
              <div className="w-16 h-px bg-gold/50"></div>
              <span className="text-white/30 text-sm">
                Last updated: {lastUpdated}
              </span>
              <div className="w-16 h-px bg-gold/50"></div>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="bg-charcoal/90 border border-white/5 p-8 mb-12 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-2xl"></div>
            <div className="relative z-10">
              <h2 className="font-heading text-2xl text-white mb-4 flex items-center">
                <span className="w-1 h-6 bg-gold inline-block mr-3"></span>
                Our Promise in Plain Language
              </h2>
              <p className="text-white/50 leading-relaxed mb-4">
                We collect only what's necessary to serve you better. We never
                sell your data. You have control over your information. We
                protect it like our own.
              </p>
              <div className="grid grid-cols-3 gap-4 mt-6 text-center">
                <div className="border-r border-white/10 pr-4">
                  <div className="text-gold text-2xl mb-1">🔒</div>
                  <div className="text-white/40 text-xs">Never Sold</div>
                </div>
                <div className="border-r border-white/10 pr-4">
                  <div className="text-gold text-2xl mb-1">🛡️</div>
                  <div className="text-white/40 text-xs">Always Protected</div>
                </div>
                <div>
                  <div className="text-gold text-2xl mb-1">⚖️</div>
                  <div className="text-white/40 text-xs">Your Rights</div>
                </div>
              </div>
            </div>
          </div>

          {/* Policy Sections */}
          <div className="space-y-10">
            {policySections.map((section) => (
              <div
                key={section.id}
                id={section.id}
                className="bg-charcoal/80 backdrop-blur-sm border border-white/5 p-8 hover:border-white/10 transition-premium scroll-mt-32"
              >
                <h2 className="font-heading text-2xl text-white mb-6 flex items-center">
                  <span className="w-1 h-6 bg-gold inline-block mr-3"></span>
                  {section.title}
                </h2>

                <p className="text-white/50 leading-relaxed mb-6">
                  {section.content}
                </p>

                {/* Subsections (for complex sections) */}
                {"subsections" in section && section.subsections && (
                  <div className="space-y-6 mt-4">
                    {section.subsections.map((sub, idx) => (
                      <div key={idx} className="pl-4 border-l border-white/10">
                        <h3 className="font-heading text-lg text-white/80 mb-3">
                          {sub.title}
                        </h3>
                        <ul className="space-y-2">
                          {sub.items.map((item, i) => (
                            <li
                              key={i}
                              className="text-white/40 text-sm flex items-start"
                            >
                              <span className="text-gold mr-2 text-xs">●</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {/* Points lists */}
                {"points" in section && section.points && (
                  <ul className="space-y-3 mt-4">
                    {section.points.map((point, idx) => (
                      <li
                        key={idx}
                        className="text-white/40 text-sm flex items-start"
                      >
                        <span className="text-gold mr-2 text-xs">●</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Partners */}
                {"partners" in section && section.partners && (
                  <div className="grid gap-4 mt-4">
                    {section.partners.map((partner, idx) => (
                      <div
                        key={idx}
                        className="bg-primary/40 p-4 border border-white/5"
                      >
                        <h3 className="font-heading text-white/80 mb-2">
                          {partner.name}
                        </h3>
                        <p className="text-white/40 text-sm">
                          {partner.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Cookie Types */}
                {"cookieTypes" in section && section.cookieTypes && (
                  <div className="overflow-x-auto mt-4">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left py-3 text-white/60 font-normal">
                            Type
                          </th>
                          <th className="text-left py-3 text-white/60 font-normal">
                            Purpose
                          </th>
                          <th className="text-left py-3 text-white/60 font-normal">
                            Duration
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {section.cookieTypes.map((cookie, idx) => (
                          <tr key={idx} className="border-b border-white/5">
                            <td className="py-3 text-white/80">
                              {cookie.type}
                            </td>
                            <td className="py-3 text-white/40">
                              {cookie.description}
                            </td>
                            <td className="py-3 text-white/40">
                              {cookie.duration}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Security Measures */}
                {"measures" in section && section.measures && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                    {section.measures.map((measure, idx) => (
                      <div
                        key={idx}
                        className="bg-primary/40 p-3 text-center border border-white/5"
                      >
                        <span className="text-white/40 text-xs">{measure}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Rights */}
                {"rights" in section && section.rights && (
                  <div className="space-y-3 mt-4">
                    {section.rights.map((right, idx) => (
                      <div
                        key={idx}
                        className="flex items-start border-l-2 border-gold/30 pl-4"
                      >
                        <div>
                          <span className="text-gold text-sm font-medium block mb-1">
                            {right.right}
                          </span>
                          <span className="text-white/40 text-xs">
                            {right.description}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-16 bg-gradient-to-r from-gold/10 to-transparent border border-gold/20 p-10">
            <div className="max-w-2xl">
              <h2 className="font-heading text-2xl text-white mb-4">
                Privacy Questions?
              </h2>
              <p className="text-white/50 text-sm leading-relaxed mb-6">
                Our Data Protection Officer is here to address any concerns
                about your personal information. We aim to respond to all
                inquiries within 48 hours.
              </p>
              <div className="space-y-3">
                <div className="flex items-center text-white/40 text-sm">
                  <span className="text-gold mr-3">✉️</span>
                  <a
                    href="mailto:privacy@rhemar.com"
                    className="hover:text-gold transition"
                  >
                    privacy@rhemar.com
                  </a>
                </div>
                <div className="flex items-center text-white/40 text-sm">
                  <span className="text-gold mr-3">📍</span>
                  <span>
                    RHEMAR Privacy · 123 Luxury Lane · New York, NY 10001
                  </span>
                </div>
                <div className="flex items-center text-white/40 text-sm">
                  <span className="text-gold mr-3">📞</span>
                  <span>+1 (212) 555-0123 (Mon-Fri, 9AM-6PM EST)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Consent Acknowledgement */}
          <div className="mt-12 text-center">
            <p className="text-white/30 text-xs">
              By continuing to use our services, you acknowledge that you have
              read and understood this Privacy Policy.
            </p>
            <div className="flex justify-center space-x-4 mt-6">
              <Link
                href="/terms"
                className="text-white/20 hover:text-gold text-xs uppercase tracking-wider transition"
              >
                Terms of Service
              </Link>
              <span className="text-white/10">|</span>
              <Link
                href="/shipping-returns"
                className="text-white/20 hover:text-gold text-xs uppercase tracking-wider transition"
              >
                Shipping & Returns
              </Link>
            </div>
          </div>

          {/* Brand Signature */}
          <div className="text-center mt-16 space-y-3">
            <p className="font-serif text-white/30 text-lg italic">
              Your privacy, honored.
            </p>
            <p className="text-white/20 text-xs tracking-[0.3em] uppercase">
              RHEMAR · A STATEMENT OF SELF
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicyPage;
