/* eslint-disable react/no-unescaped-entities */
import React from "react";

const BrandStory: React.FC = () => {
  return (
    <section className="py-24 bg-[#0F0F0F] px-6 overflow-hidden">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="relative z-10 grayscale hover:grayscale-0 transition-all duration-1000">
              <img
                src="/images/home/brand.png"
                alt="Brand Lifestyle"
                className="w-full aspect-[4/5] object-cover"
              />
            </div>
            {/* Design accents */}
            <div className="absolute -top-10 -left-10 w-full h-full border border-accent/20 z-0"></div>
            <div className="absolute -bottom-6 -right-6 flex flex-col items-end opacity-20">
              <span className="text-8xl font-heading text-accent/10">1998</span>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <span className="text-accent tracking-[0.5em] uppercase text-xs mb-6 block">
              Our Signature Philosophy
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading text-white mb-8 leading-tight">
              Crafting <span className="italic">Confidence</span> <br /> Through
              Elegance
            </h2>

            <div className="w-20 h-[1px] bg-accent mb-8"></div>

            <p className="text-gray-400 text-lg leading-relaxed mb-8 font-light italic">
              "RHEMAR Signature represents timeless elegance and modern
              masculinity. Every piece is thoughtfully designed using premium
              fabrics, precise tailoring, and a refined aesthetic that defines
              confidence."
            </p>

            <p className="text-gray-500 mb-10 leading-relaxed">
              Based in the heart of Dhaka with a global vision, we believe that
              luxury isn't about excess—it's about the perfect alignment of
              quality and style. Our mission is to provide the modern gentleman
              with a wardrobe that speaks before he does.
            </p>

            <div className="flex items-center space-x-6">
              <a
                href="#"
                className="group flex items-center text-accent tracking-widest uppercase text-sm font-bold transition-all"
              >
                <span>Learn Our Story</span>
                <svg
                  className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
