import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Care Guide | RHEMAR",
  description:
    "Expert guidance on preserving your RHEMAR pieces. Learn how to care for premium fabrics and maintain the integrity of your investment.",
};

const CareGuidePage = () => {
  const careCategories = [
    {
      id: "fabric-care",
      title: "Fabric Care",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M9.53 16.93a3.75 3.75 0 01-2.427-.657l-4.19-3.196a2.25 2.25 0 00-2.513-.004m15.78 5.277a3.75 3.75 0 01-3.744.016l-3.64-2.403a3.75 3.75 0 00-1.765-.507M21 11.887a3 3 0 00-2.406-2.934L12 7.5M15 7.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      items: [
        {
          title: "Wool & Cashmere",
          description:
            "Hand wash cold or dry clean only. Use mild detergent specifically designed for delicates. Lay flat to dry away from direct sunlight.",
          symbols: ["🧼", "💧", "🧺"],
        },
        {
          title: "Cotton & Linen",
          description:
            "Machine wash cold with like colors. Tumble dry low or line dry. Warm iron if needed. Avoid bleach to preserve fabric integrity.",
          symbols: ["🌀", "☀️", "🔥"],
        },
        {
          title: "Silk & Delicates",
          description:
            "Dry clean recommended. If hand washing, use cold water and silk-specific detergent. Never wring or twist. Iron on low inside out.",
          symbols: ["✨", "🧴", "🚫"],
        },
        {
          title: "Leather & Suede",
          description:
            "Professional cleaning only. Store in dust bag away from humidity. Condition leather every 3-6 months with approved products.",
          symbols: ["👞", "💼", "🧴"],
        },
      ],
    },
    {
      id: "storage",
      title: "Storage Wisdom",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M20 7.5l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7.5m8 4v10M4 7.5v10l8 4"
          />
        </svg>
      ),
      items: [
        {
          title: "Hanging vs. Folding",
          description:
            "Heavy items like coats and jackets should be hung on wide, padded hangers. Knits and delicates should be folded to maintain shape.",
          tips: [
            "Use cedar hangers for natural moth repellent",
            "Avoid wire hangers that distort shoulders",
          ],
        },
        {
          title: "Climate Control",
          description:
            "Store in a cool, dry place away from direct sunlight. Ideal humidity: 40-50%. Use silica gel packets in storage areas.",
          tips: [
            "Avoid attics and basements",
            "Use breathable garment bags, never plastic",
          ],
        },
        {
          title: "Seasonal Rotation",
          description:
            "Clean items before storing for season change. Use acid-free tissue paper for folding. Check periodically for any issues.",
          tips: ["Rotate every 3 months", "Keep moth deterrents natural"],
        },
      ],
    },
    {
      id: "maintenance",
      title: "Daily Maintenance",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233l.484-.454.38-.46"
          />
        </svg>
      ),
      items: [
        {
          title: "Pilling Prevention",
          description:
            "Use a fabric comb or electric shaver gently. Hand wash pilling-prone items inside out. Air dry completely.",
          frequency: "As needed",
        },
        {
          title: "Wrinkle Management",
          description:
            "Steam rather than iron when possible. Hang items in bathroom during hot showers. Use wrinkle-release spray for quick fixes.",
          frequency: "Before each wear",
        },
        {
          title: "Spot Cleaning",
          description:
            "Blot stains immediately with clean cloth. Use cold water and mild soap. Never rub. Seek professional help for stubborn stains.",
          frequency: "Immediate attention",
        },
      ],
    },
  ];

  const faqs = [
    {
      question: "How often should I dry clean my RHEMAR pieces?",
      answer:
        "We recommend dry cleaning only when necessary. Over-cleaning can reduce fabric life. For wool and cashmere, airing out between wears is often sufficient. For silks, clean after 3-4 wears or when soiled.",
    },
    {
      question: "Can I machine wash any RHEMAR items?",
      answer:
        "Only cotton and linen pieces labeled machine washable. Always use cold water, gentle cycle, and place items in mesh laundry bags. Never machine wash wool, cashmere, silk, or leather.",
    },
    {
      question: "How do I remove wrinkles without ironing?",
      answer:
        "Steaming is the preferred method. Hold steamer at least 2 inches from fabric. For quick fixes, hang items in bathroom while showering or use a wrinkle-release spray.",
    },
    {
      question: "What's the best way to store for long periods?",
      answer:
        "Clean items thoroughly before storage. Use breathable garment bags for hanging items, fold knits with acid-free tissue paper. Add natural cedar blocks or lavender sachets for moth protection.",
    },
  ];

  return (
    <div className="min-h-screen bg-primary text-white/90 font-sans">
      {/* Main Content */}
      <main className="pt-32 pb-20 px-6 luxury-gradient">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in-up">
            <span className="text-gold/80 text-sm uppercase tracking-[0.3em] font-medium font-serif">
              PRESERVING EXCELLENCE
            </span>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-white mt-4 mb-6 tracking-tight">
              Care <span className="text-gold">&</span> Keeping
            </h1>
            <p className="text-white/50 max-w-2xl mx-auto text-lg font-light leading-relaxed">
              Your RHEMAR pieces are investments in self-expression. Proper care
              ensures they remain timeless companions on your journey.
            </p>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-8"></div>
          </div>

          {/* Philosophy Section */}
          <div className="grid md:grid-cols-2 gap-12 mb-20 items-center">
            <div className="space-y-6">
              <h2 className="font-heading text-3xl text-white flex items-center">
                <span className="w-1 h-8 bg-gold inline-block mr-4"></span>
                The Philosophy of Care
              </h2>
              <p className="text-white/50 leading-relaxed">
                At RHEMAR, we believe that how you care for your clothing
                reflects how you care for yourself. Each piece is crafted with
                intention, using materials that develop character over time.
                Proper maintenance isn't just about preservation—it's about
                honoring the relationship between garment and wearer.
              </p>
              <p className="text-white/40 italic font-light border-l-2 border-gold/30 pl-4">
                "Not flawless. Not loud. Just real—and well-maintained."
              </p>
            </div>
            <div className="bg-charcoal/90 p-8 border border-white/5 rounded-sm">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4">
                  <div className="text-3xl mb-2">🧵</div>
                  <div className="text-white/70 font-heading text-lg">
                    Quality First
                  </div>
                  <div className="text-white/30 text-xs mt-1">
                    Premium materials deserve premium care
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-3xl mb-2">⏳</div>
                  <div className="text-white/70 font-heading text-lg">
                    Longevity
                  </div>
                  <div className="text-white/30 text-xs mt-1">
                    Designed to last generations
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-3xl mb-2">🤲</div>
                  <div className="text-white/70 font-heading text-lg">
                    Mindful
                  </div>
                  <div className="text-white/30 text-xs mt-1">
                    Intentional maintenance rituals
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-3xl mb-2">♻️</div>
                  <div className="text-white/70 font-heading text-lg">
                    Sustainable
                  </div>
                  <div className="text-white/30 text-xs mt-1">
                    Reduce waste through proper care
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Care Categories */}
          {careCategories.map((category, idx) => (
            <section key={category.id} className="mb-20">
              <div className="flex items-center mb-10">
                <div className="p-3 bg-gold/10 border border-gold/20 rounded-sm text-gold mr-4">
                  {category.icon}
                </div>
                <h2 className="font-heading text-3xl text-white">
                  {category.title}
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.items.map((item, index) => (
                  <div
                    key={index}
                    className="bg-charcoal/80 backdrop-blur-sm border border-white/5 p-6 hover:border-gold/30 transition-premium group"
                  >
                    <h3 className="font-heading text-xl text-white/90 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-white/40 text-sm leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {"symbols" in item && (
                      <div className="flex space-x-3 text-xl">
                        {item.symbols.map((symbol, i) => (
                          <span
                            key={i}
                            className="opacity-50 group-hover:opacity-100 transition"
                          >
                            {symbol}
                          </span>
                        ))}
                      </div>
                    )}

                    {"tips" in item && (
                      <ul className="space-y-2 mt-3">
                        {item.tips.map((tip, i) => (
                          <li
                            key={i}
                            className="text-white/30 text-xs flex items-start"
                          >
                            <span className="text-gold mr-2">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    )}

                    {"frequency" in item && (
                      <div className="mt-4 pt-3 border-t border-white/10">
                        <span className="text-gold/70 text-xs uppercase tracking-wider">
                          Frequency
                        </span>
                        <p className="text-white/50 text-sm">
                          {item.frequency}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* Pro Tips Section */}
          <section className="mb-20">
            <div className="bg-gradient-to-r from-charcoal to-primary border border-white/5 p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <h2 className="font-heading text-3xl text-white mb-8 flex items-center">
                  <span className="w-1 h-8 bg-gold inline-block mr-4"></span>
                  RHEMAR Pro Tips
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                  <div>
                    <div className="text-4xl mb-4">✨</div>
                    <h3 className="font-heading text-lg text-white/90 mb-2">
                      Between Wears
                    </h3>
                    <p className="text-white/40 text-sm">
                      Air out garments for 24 hours before returning to closet.
                      Use fabric brush to remove surface dust and lint.
                    </p>
                  </div>
                  <div>
                    <div className="text-4xl mb-4">🧹</div>
                    <h3 className="font-heading text-lg text-white/90 mb-2">
                      Lint & Pilling
                    </h3>
                    <p className="text-white/40 text-sm">
                      Use a soft fabric comb for pilling, never a razor. Keep a
                      lint roller in your closet for quick touch-ups.
                    </p>
                  </div>
                  <div>
                    <div className="text-4xl mb-4">🌿</div>
                    <h3 className="font-heading text-lg text-white/90 mb-2">
                      Natural Freshening
                    </h3>
                    <p className="text-white/40 text-sm">
                      Place lavender sachets or cedar blocks in your closet.
                      Avoid chemical mothballs that can damage fabrics.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-20">
            <h2 className="font-heading text-3xl text-white mb-10 flex items-center">
              <span className="w-1 h-8 bg-gold inline-block mr-4"></span>
              Frequently Asked Questions
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-charcoal/60 border border-white/5 p-6 hover:border-gold/20 transition-premium"
                >
                  <h3 className="font-heading text-lg text-white/90 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Emergency Care Card */}
          <section className="mb-16">
            <div className="border border-gold/20 bg-gold/5 p-10 text-center relative">
              <div className="absolute inset-0 bg-gold/5"></div>
              <div className="relative z-10">
                <span className="text-gold text-sm uppercase tracking-[0.2em]">
                  URGENT CARE
                </span>
                <h2 className="font-heading text-3xl text-white mt-4 mb-6">
                  Stain Emergency?
                </h2>
                <p className="text-white/50 max-w-2xl mx-auto mb-8">
                  For immediate assistance with stains or damage, our care
                  specialists are here to help.
                </p>
                <div className="flex justify-center space-x-6">
                  <Link
                    href="/contact"
                    className="px-8 py-3 bg-gold text-primary text-sm uppercase tracking-wider hover:bg-transparent hover:text-gold border border-gold transition-premium"
                  >
                    Contact Support
                  </Link>
                  <a
                    href="mailto:care@rhemar.com"
                    className="px-8 py-3 border border-white/10 text-white/70 text-sm uppercase tracking-wider hover:border-gold/50 hover:text-gold transition-premium"
                  >
                    care@rhemar.com
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Brand Signature */}
          <div className="text-center mt-16 space-y-3">
            <p className="font-serif text-white/30 text-lg italic">
              Preserve what matters.
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

export default CareGuidePage;
