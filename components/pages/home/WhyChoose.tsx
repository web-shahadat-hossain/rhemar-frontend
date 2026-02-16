import { BENEFITS } from "@/data/constants";
import React from "react";

const WhyChoose: React.FC = () => {
  return (
    <section className="py-24 bg-primary px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {BENEFITS.map((benefit, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center group"
            >
              <div className="mb-6 p-6 rounded-full border border-accent/20 group-hover:border-accent group-hover:bg-accent/5 transition-all duration-500 transform group-hover:-translate-y-2">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-heading text-white mb-3 tracking-wide">
                {benefit.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-[200px]">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
