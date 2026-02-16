"use client";

import React from "react";
import Image from "next/image";
import { Eye } from "lucide-react";
import { Product } from "@/types/types";

interface ProductCardProps {
  product: Product;
  onClick: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const hasDiscount =
    product.discountPrice && product.discountPrice < product.price;

  const discountPercent = hasDiscount
    ? Math.round(
        ((product.price - (product.discountPrice || 0)) / product.price) * 100,
      )
    : 0;

  const imageUrl =
    product.images?.length > 0 ? product.images[0].url : "/placeholder.png"; // public folder এ রাখবা

  return (
    <div
      className="group relative bg-white transition-all duration-500 cursor-pointer"
      onClick={() => onClick(product.slug)}
    >
      {/* Discount Badge */}
      {hasDiscount && (
        <span className="absolute text-[#c5a059] top-6 left-6 z-10 bg-black/90 backdrop-blur-sm text-[9px] font-bold px-4 py-2 tracking-tighter rounded-full uppercase border border-[#c5a059]/20">
          -{discountPercent}%
        </span>
      )}

      {/* Image Container */}
      <div className="aspect-[3/4] overflow-hidden relative rounded-[1.5rem] bg-gray-50 border border-black/5">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover transition-all duration-1000 group-hover:scale-110"
          priority={false}
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col items-center justify-center gap-6">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClick(product.slug);
            }}
            className="bg-white text-black w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transform translate-y-8 group-hover:translate-y-0 transition-all duration-700 delay-75 hover:bg-[#c5a059] hover:text-white"
          >
            <Eye size={20} strokeWidth={1.5} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log("Quick Add clicked");
            }}
            className="bg-[#c5a059] text-black px-10 py-4 rounded-full text-[9px] font-bold uppercase tracking-[0.3em] shadow-2xl transform translate-y-8 group-hover:translate-y-0 transition-all duration-700 delay-150 hover:bg-white transition-colors"
          >
            Quick Add
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="pt-10 pb-4 text-center">
        <p className="text-[9px] uppercase tracking-[0.4em] text-[#c5a059]/60 mb-3 font-bold">
          {product.category}
        </p>

        <h3 className="text-sm font-medium text-gray-900 mb-4 group-hover:text-[#c5a059] transition-colors duration-500 tracking-tight leading-relaxed">
          {product.name}
        </h3>

        <div className="flex items-center justify-center gap-4">
          {hasDiscount ? (
            <>
              <span className="text-base font-bold text-black tracking-tight">
                ৳{product.discountPrice?.toLocaleString()}
              </span>

              <span className="text-xs text-gray-400 line-through tracking-tighter">
                ৳{product.price.toLocaleString()}
              </span>
            </>
          ) : (
            <span className="text-base font-bold text-black tracking-tight">
              ৳{product.price.toLocaleString()}
            </span>
          )}
        </div>
      </div>

      {/* Hover Bottom Line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-[#c5a059] group-hover:w-1/3 transition-all duration-700 ease-out"></div>
    </div>
  );
};

export default ProductCard;
