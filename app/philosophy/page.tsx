import React from "react";

interface PhilosophyViewProps {
  onBack: () => void;
}

const PhilosophyView: React.FC<PhilosophyViewProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-primary animate-fade-in text-white">
      {/* Editorial Header */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden border-b border-accent/10">
        <div className="absolute inset-0 grayscale opacity-40">
          <img
            src="https://images.unsplash.com/photo-1558227108-83a15ddbbb15?auto=format&fit=crop&q=80&w=1920"
            alt="Artisan Craftsmanship"
            className="w-full h-full object-cover animate-soft-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent"></div>
        </div>

        <div className="relative z-10 text-center px-6">
          <button
            onClick={onBack}
            className="mb-12 inline-flex items-center space-x-3 text-accent/60 hover:text-accent transition-colors uppercase tracking-[0.3em] text-[10px]"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              ></path>
            </svg>
            <span>Back to Boutique</span>
          </button>
          <h1 className="text-5xl md:text-8xl font-heading mb-6 tracking-tight">
            The <span className="italic text-accent">Essence</span> of RHEMAR
          </h1>
          <p className="text-accent/80 tracking-[0.5em] uppercase text-xs md:text-sm font-light">
            Crafted Excellence Since 1998
          </p>
        </div>
      </section>

      {/* The Vision Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10 order-2 lg:order-1">
              <div className="inline-block border-l-2 border-accent pl-6">
                <h2 className="text-4xl md:text-5xl font-heading mb-4">
                  A Vision of Modernity
                </h2>
                <p className="text-accent/60 tracking-widest uppercase text-xs font-bold">
                  The Aesthetic of Confidence
                </p>
              </div>
              <p className="text-gray-400 text-lg leading-relaxed font-light">
                At RHEMAR Signature, we believe luxury is not merely an
                ornament—it is a language. Our philosophy is rooted in the
                belief that the modern gentleman deserves a wardrobe that
                mirrors his ambition, his integrity, and his respect for
                tradition.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-accent font-heading text-xl mb-2">
                    Timelessness
                  </h4>
                  <p className="text-gray-500 text-sm">
                    Pieces designed to transcend seasons and fleeting trends.
                  </p>
                </div>
                <div>
                  <h4 className="text-accent font-heading text-xl mb-2">
                    Precision
                  </h4>
                  <p className="text-gray-500 text-sm">
                    Tailoring that respects the geometry of the masculine form.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative order-1 lg:order-2">
              <img
                src="https://images.unsplash.com/photo-1594932224828-b4b059b6ff0f?auto=format&fit=crop&q=80&w=800"
                alt="Suit Detail"
                className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl"
              />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 border border-accent/20 hidden md:block"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Fabric & Origin Banner */}
      <section className="bg-charcoal py-24 px-6 border-y border-accent/5">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-heading mb-12">
            The Material Truth
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="text-accent text-3xl font-serif">01</div>
              <h3 className="text-xl uppercase tracking-widest text-white/90">
                Noble Fibers
              </h3>
              <p className="text-gray-500 text-sm">
                We exclusively source Grade-A mulberry silks, Egyptian cottons,
                and Italian suedes.
              </p>
            </div>
            <div className="space-y-4">
              <div className="text-accent text-3xl font-serif">02</div>
              <h3 className="text-xl uppercase tracking-widest text-white/90">
                Sartorial Hand
              </h3>
              <p className="text-gray-500 text-sm">
                Every button, stitch, and lining is finished by masters with
                decades of heritage skill.
              </p>
            </div>
            <div className="space-y-4">
              <div className="text-accent text-3xl font-serif">03</div>
              <h3 className="text-xl uppercase tracking-widest text-white/90">
                Ethical Soul
              </h3>
              <p className="text-gray-500 text-sm">
                Fair wages and sustainable production are not options—they are
                our standard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founders Letter Concept */}
      <section className="py-32 px-6">
        <div className="container mx-auto max-w-3xl text-center italic font-light">
          <svg
            className="w-12 h-12 text-accent/20 mx-auto mb-10"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 7.10457 14.017 6V5C14.017 3.89543 14.9124 3 16.017 3H19.017C21.2261 3 23.017 4.79086 23.017 7V15C23.017 18.3137 20.3307 21 17.017 21H14.017ZM1.017 21L1.017 18C1.017 16.8954 1.91243 16 3.017 16H6.017C6.56928 16 7.017 15.5523 7.017 15V9C7.017 8.44772 6.56928 8 6.017 8H3.017C1.91243 8 1.017 7.10457 1.017 6V5C1.017 3.89543 1.91243 3 3.017 3H6.017C8.22614 3 10.017 4.79086 10.017 7V15C10.017 18.3137 7.33071 21 4.017 21H1.017Z" />
          </svg>
          <p className="text-2xl md:text-3xl text-gray-300 leading-relaxed mb-12">
            "Luxury isn't about excess—it's about the silent alignment of
            quality and intent. When you wear RHEMAR, you aren't just dressed;
            you are empowered."
          </p>
          <div className="h-px w-20 bg-accent mx-auto mb-6"></div>
          <p className="text-accent uppercase tracking-[0.4em] text-xs font-bold not-italic">
            The Signature Board
          </p>
        </div>
      </section>
    </div>
  );
};

export default PhilosophyView;
