import React from "react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | RHEMAR",
  description:
    "RHEMAR terms of service - Understanding the agreement between you and RHEMAR as you engage with our luxury brand.",
};

const TermsOfServicePage = () => {
  const lastUpdated = "February 19, 2026";
  const effectiveDate = "March 1, 2026";

  const termsSections = [
    {
      id: "acceptance",
      title: "Acceptance of Terms",
      content:
        "By accessing or using the RHEMAR website, purchasing our products, or engaging with our services, you agree to be bound by these Terms of Service. If you do not agree to all terms and conditions, please do not use our services.",
      highlights: [
        "These terms form a binding legal agreement",
        "Additional terms may apply to specific promotions or events",
        "We may modify these terms with notice",
      ],
    },
    {
      id: "eligibility",
      title: "Eligibility & Account",
      content:
        "To use our services, you must be at least 18 years old or the age of majority in your jurisdiction. By creating an account, you represent that:",
      requirements: [
        {
          rule: "Age Requirement",
          detail: "You are at least 18 years of age or have parental consent",
        },
        {
          rule: "Accurate Information",
          detail:
            "All information you provide is accurate, current, and complete",
        },
        {
          rule: "Account Security",
          detail: "You are responsible for maintaining account confidentiality",
        },
        {
          rule: "One Account",
          detail:
            "You may maintain only one active account unless authorized otherwise",
        },
      ],
    },
    {
      id: "purchases",
      title: "Purchases & Payments",
      content:
        "When you make a purchase from RHEMAR, you agree to the following terms:",
      terms: [
        {
          title: "Pricing",
          description:
            "All prices are in USD and exclude applicable taxes unless stated otherwise. We reserve the right to adjust prices at any time.",
        },
        {
          title: "Payment Methods",
          description:
            "We accept major credit cards, debit cards, and select digital payment methods. Payment must be received before order processing.",
        },
        {
          title: "Order Acceptance",
          description:
            "We reserve the right to refuse or cancel any order for reasons including inaccuracies, fraud, or inventory limitations.",
        },
        {
          title: "Authorization",
          description:
            "By placing an order, you authorize us to charge your payment method for the total amount.",
        },
      ],
    },
    {
      id: "products",
      title: "Products & Availability",
      content:
        "RHEMAR products are crafted in limited quantities to maintain exclusivity and quality.",
      policies: [
        {
          icon: "🎨",
          title: "Artisanal Craft",
          description:
            "Each piece is carefully crafted, which may result in slight variations that make your item unique.",
        },
        {
          icon: "📦",
          title: "Limited Editions",
          description:
            "Many collections are produced in limited runs. Once sold out, they may not be restocked.",
        },
        {
          icon: "🎯",
          title: "Product Accuracy",
          description:
            "We strive to display products accurately, but colors and textures may vary slightly from digital representations.",
        },
        {
          icon: "⚠️",
          title: "Pre-Orders",
          description:
            "Pre-ordered items have estimated delivery dates that may change. You'll be notified of any significant delays.",
        },
      ],
    },
    {
      id: "intellectual-property",
      title: "Intellectual Property",
      content:
        "All content on the RHEMAR website—including designs, logos, text, graphics, and images—is the exclusive property of RHEMAR and is protected by international copyright and trademark laws.",
      rights: [
        "You may not reproduce, distribute, or create derivative works without written consent",
        "The RHEMAR name and logo are registered trademarks",
        "Product designs are protected under design patents and trade dress",
        "User-generated content shared with us grants RHEMAR a license to feature on our platforms",
      ],
    },
    {
      id: "returns-refunds",
      title: "Returns & Refunds",
      content:
        "Our return policy is detailed in our Shipping & Returns page. Key terms include:",
      returnTerms: [
        "Returns accepted within 14 days of delivery for unworn items in original condition",
        "Final sale items cannot be returned or exchanged",
        "Refunds are processed to the original payment method within 5-7 business days of inspection",
        "Shipping costs are non-refundable except for defective items",
      ],
      note: "For complete details, please review our separate Shipping & Returns policy.",
    },
    {
      id: "user-conduct",
      title: "User Conduct",
      content: "When interacting with RHEMAR platforms, you agree not to:",
      prohibited: [
        "Violate any applicable laws or regulations",
        "Infringe upon intellectual property rights",
        "Transmit harmful code or interfere with website functionality",
        "Impersonate any person or entity",
        "Attempt to gain unauthorized access to our systems",
        "Engage in any activity that disrupts the user experience",
      ],
    },
    {
      id: "disclaimers",
      title: "Warranty Disclaimers",
      content:
        "RHEMAR products and services are provided 'as is' without warranties of any kind, either express or implied.",
      disclaimers: [
        {
          type: "Product Warranty",
          text: "We stand by our craftsmanship but do not warrant that products will meet every expectation or be completely free from minor imperfections inherent in artisanal production.",
        },
        {
          type: "Service Availability",
          text: "We strive for uninterrupted service but do not guarantee that our website will be error-free, secure, or available at all times.",
        },
        {
          type: "Third-Party Links",
          text: "Our site may contain links to third-party websites. We are not responsible for their content or practices.",
        },
      ],
    },
    {
      id: "liability",
      title: "Limitation of Liability",
      content:
        "To the maximum extent permitted by law, RHEMAR shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including lost profits, arising from your use of our products or services.",
      caps: [
        "Total liability limited to the amount paid for the product giving rise to the claim",
        "Not applicable in jurisdictions that prohibit such limitations",
        "Does not affect statutory rights that cannot be waived",
      ],
    },
    {
      id: "indemnification",
      title: "Indemnification",
      content:
        "You agree to indemnify and hold harmless RHEMAR, its affiliates, officers, and employees from any claims, damages, or expenses arising from your violation of these terms or your use of our services.",
    },
    {
      id: "governing-law",
      title: "Governing Law",
      content:
        "These Terms shall be governed by and construed in accordance with the laws of the State of New York, without regard to its conflict of law provisions. Any legal action shall be brought exclusively in the courts of New York County.",
    },
    {
      id: "disputes",
      title: "Dispute Resolution",
      content:
        "We value our relationship with you and prefer to resolve differences amicably. Any disputes shall first be attempted to be resolved through informal negotiation. If unsuccessful, disputes will be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.",
      arbitrationDetails: {
        process: "Binding arbitration in New York, NY",
        exceptions: [
          "Small claims court actions",
          "Claims of intellectual property infringement",
          "Emergency injunctive relief",
        ],
      },
    },
    {
      id: "termination",
      title: "Termination",
      content:
        "We reserve the right to suspend or terminate your access to our services at our sole discretion, without notice, for conduct that we believe violates these terms or is harmful to other users or the brand.",
    },
    {
      id: "severability",
      title: "Severability",
      content:
        "If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.",
    },
    {
      id: "entire-agreement",
      title: "Entire Agreement",
      content:
        "These Terms constitute the entire agreement between you and RHEMAR regarding your use of our services, superseding any prior agreements or understandings.",
    },
  ];

  return (
    <div className="min-h-screen bg-primary text-white/90 font-sans">
      {/* Main Content */}
      <main className="pt-32 pb-20 px-6 luxury-gradient">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in-up">
            <span className="text-gold/80 text-sm uppercase tracking-[0.3em] font-medium font-serif">
              AGREEMENT · RESPECT · CLARITY
            </span>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-white mt-4 mb-6 tracking-tight">
              Terms of <span className="text-gold">Service</span>
            </h1>
            <p className="text-white/50 max-w-2xl mx-auto text-lg font-light leading-relaxed">
              Our terms are designed with respect—for you, for our craft, and
              for the integrity of the RHEMAR experience. Please read them
              carefully.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              <div className="flex items-center">
                <div className="w-12 h-px bg-gold/50"></div>
                <span className="text-white/30 text-sm mx-3">
                  Last updated: {lastUpdated}
                </span>
                <div className="w-12 h-px bg-gold/50"></div>
              </div>
              <div className="flex items-center">
                <span className="text-gold/60 text-sm">
                  Effective: {effectiveDate}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Reference */}
          <div className="bg-charcoal/90 border border-white/5 p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <h2 className="font-heading text-2xl text-white mb-6 flex items-center">
                <span className="w-1 h-6 bg-gold inline-block mr-3"></span>
                Quick Reference
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-gold text-2xl mb-2">📜</div>
                  <div className="text-white/60 text-xs uppercase tracking-wider">
                    Binding Agreement
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-gold text-2xl mb-2">⚖️</div>
                  <div className="text-white/60 text-xs uppercase tracking-wider">
                    NY Law
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-gold text-2xl mb-2">🛡️</div>
                  <div className="text-white/60 text-xs uppercase tracking-wider">
                    IP Protection
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-gold text-2xl mb-2">🤝</div>
                  <div className="text-white/60 text-xs uppercase tracking-wider">
                    Arbitration
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Terms Sections */}
          <div className="space-y-6">
            {termsSections.map((section) => (
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

                {/* Highlights */}
                {"highlights" in section && section.highlights && (
                  <div className="bg-primary/40 p-4 border-l-2 border-gold mb-4">
                    <ul className="space-y-2">
                      {section.highlights.map((highlight, idx) => (
                        <li
                          key={idx}
                          className="text-white/40 text-sm flex items-start"
                        >
                          <span className="text-gold mr-2 text-xs">●</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Requirements */}
                {"requirements" in section && section.requirements && (
                  <div className="grid gap-4 mt-4">
                    {section.requirements.map((req, idx) => (
                      <div
                        key={idx}
                        className="flex border-b border-white/5 pb-3 last:border-0"
                      >
                        <span className="text-gold text-sm font-medium w-32">
                          {req.rule}
                        </span>
                        <span className="text-white/40 text-sm flex-1">
                          {req.detail}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Purchase Terms */}
                {"terms" in section && section.terms && (
                  <div className="space-y-4 mt-4">
                    {section.terms.map((term, idx) => (
                      <div key={idx} className="bg-primary/30 p-4">
                        <h3 className="font-heading text-white/80 text-lg mb-2">
                          {term.title}
                        </h3>
                        <p className="text-white/40 text-sm">
                          {term.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Product Policies with Icons */}
                {"policies" in section && section.policies && (
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    {section.policies.map((policy, idx) => (
                      <div
                        key={idx}
                        className="bg-primary/40 p-4 flex items-start space-x-3"
                      >
                        <span className="text-2xl">{policy.icon}</span>
                        <div>
                          <h3 className="font-heading text-white/80 text-sm mb-1">
                            {policy.title}
                          </h3>
                          <p className="text-white/40 text-xs">
                            {policy.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* IP Rights */}
                {"rights" in section && section.rights && (
                  <ul className="space-y-3 mt-4">
                    {section.rights.map((right, idx) => (
                      <li
                        key={idx}
                        className="text-white/40 text-sm flex items-start"
                      >
                        <span className="text-gold mr-2 text-xs">◆</span>
                        {right}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Return Terms */}
                {"returnTerms" in section && section.returnTerms && (
                  <div className="space-y-3 mt-4">
                    {section.returnTerms.map((term, idx) => (
                      <div
                        key={idx}
                        className="text-white/40 text-sm flex items-start"
                      >
                        <span className="text-gold mr-2 text-xs">●</span>
                        {term}
                      </div>
                    ))}
                    {"note" in section && (
                      <p className="text-gold/60 text-xs italic mt-3 pl-4">
                        {section.note}
                      </p>
                    )}
                  </div>
                )}

                {/* Prohibited Conduct */}
                {"prohibited" in section && section.prohibited && (
                  <div className="grid md:grid-cols-2 gap-3 mt-4">
                    {section.prohibited.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-primary/40 p-3 text-white/40 text-sm flex items-start"
                      >
                        <span className="text-gold mr-2 text-xs">✕</span>
                        {item}
                      </div>
                    ))}
                  </div>
                )}

                {/* Disclaimers */}
                {"disclaimers" in section && section.disclaimers && (
                  <div className="space-y-4 mt-4">
                    {section.disclaimers.map((disclaimer, idx) => (
                      <div
                        key={idx}
                        className="border-l-2 border-white/10 pl-4"
                      >
                        <h3 className="text-gold text-sm font-medium mb-1">
                          {disclaimer.type}
                        </h3>
                        <p className="text-white/40 text-xs">
                          {disclaimer.text}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Liability Caps */}
                {"caps" in section && section.caps && (
                  <ul className="space-y-2 mt-4">
                    {section.caps.map((cap, idx) => (
                      <li
                        key={idx}
                        className="text-white/40 text-sm flex items-start"
                      >
                        <span className="text-gold mr-2 text-xs">•</span>
                        {cap}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Arbitration Details */}
                {"arbitrationDetails" in section &&
                  section.arbitrationDetails && (
                    <div className="mt-4 bg-primary/40 p-4">
                      <p className="text-white/50 text-sm mb-2">
                        Process: {section.arbitrationDetails.process}
                      </p>
                      <p className="text-white/30 text-xs mb-2">Exceptions:</p>
                      <ul className="space-y-1">
                        {section.arbitrationDetails.exceptions.map(
                          (ex, idx) => (
                            <li
                              key={idx}
                              className="text-white/40 text-xs flex items-start"
                            >
                              <span className="text-gold mr-2">-</span>
                              {ex}
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  )}
              </div>
            ))}
          </div>

          {/* Acknowledgment Section */}
          <div className="mt-16 bg-gradient-to-r from-gold/5 to-transparent border border-gold/10 p-10 text-center">
            <h2 className="font-heading text-2xl text-white mb-4">
              Acknowledgment of Terms
            </h2>
            <p className="text-white/40 text-sm max-w-2xl mx-auto mb-6">
              By using RHEMAR services, you acknowledge that you have read,
              understood, and agree to be bound by these Terms of Service. If
              you have questions, our team is here to provide clarity.
            </p>
            <div className="flex justify-center space-x-6">
              <Link
                href="/contact"
                className="px-6 py-3 bg-transparent border border-gold/30 text-gold text-sm uppercase tracking-wider hover:bg-gold hover:text-primary transition-premium"
              >
                Questions? Contact Us
              </Link>
              <Link
                href="/privacy"
                className="px-6 py-3 border border-white/10 text-white/40 text-sm uppercase tracking-wider hover:border-gold/30 hover:text-gold transition-premium"
              >
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="mt-12 text-center">
            <p className="text-white/20 text-xs mb-4">RELATED POLICIES</p>
            <div className="flex justify-center space-x-6">
              <Link
                href="/privacy"
                className="text-white/30 hover:text-gold text-xs uppercase tracking-wider transition"
              >
                Privacy Policy
              </Link>
              <span className="text-white/10">|</span>
              <Link
                href="/shipping-returns"
                className="text-white/30 hover:text-gold text-xs uppercase tracking-wider transition"
              >
                Shipping & Returns
              </Link>
              <span className="text-white/10">|</span>
              <Link
                href="/care-guide"
                className="text-white/30 hover:text-gold text-xs uppercase tracking-wider transition"
              >
                Care Guide
              </Link>
            </div>
          </div>

          {/* Brand Signature */}
          <div className="text-center mt-16 space-y-3">
            <p className="font-serif text-white/30 text-lg italic">
              Clarity in every clause.
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

export default TermsOfServicePage;
