import React from "react";

const LifestyleBanner: React.FC = () => {
  return (
    <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/images/home/LifestyleBanner.png"
          className="w-full h-full object-cover grayscale opacity-60"
        />
        <div className="absolute inset-0 bg-primary/40 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <h2 className="text-4xl md:text-6xl font-heading text-white mb-8 leading-tight tracking-tight">
          Designed for Every Day. <br /> Styled for{" "}
          <span className="italic text-accent">Excellence</span>.
        </h2>
        <div className="flex justify-center space-x-6">
          <button className="bg-transparent border border-accent text-accent px-10 py-4 font-bold tracking-widest uppercase text-xs hover:bg-accent hover:text-primary transition-all duration-300">
            Explore Lookbook
          </button>
        </div>
      </div>
    </section>
  );
};

export default LifestyleBanner;
