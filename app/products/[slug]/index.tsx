"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Truck,
  RotateCcw,
  ShieldCheck,
  Heart,
  Share2,
  Plus,
  Minus,
} from "lucide-react";
import { CartItem, SizeStock } from "@/types/types";
import { useCart } from "@/context/CartContext";

export default function ProductDetailPage(props: any) {
  const { product } = props;
  const router = useRouter();
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState<
    "S" | "M" | "L" | "XL" | null
  >(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(
    product?.images?.[0]?.url || product?.images?.[0] || "",
  );

  if (!product) {
    return (
      <div className="py-40 text-center font-serif-luxury italic text-3xl">
        Signature item not found
      </div>
    );
  }

  const currentSizeStock =
    product.sizes.find((s) => s.size === selectedSize)?.stock || 0;
  const isOutOfStock = product.sizes.every((s) => s.stock === 0);

  const handleAddToCart = () => {
    if (!selectedSize) return;

    addToCart({
      ...product,
      selectedSize,
      quantity,
    });

    router.push("/cart");
  };

  const handleBuyNow = () => {
    if (!selectedSize) return;

    addToCart({
      ...product,
      selectedSize,
      quantity,
    });

    router.push("/checkout");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-42">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Left: Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-white shadow-sm ring-1 ring-black/5">
            <img
              src={activeImage}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {product.images.map((img, idx) => {
              const src = typeof img === "string" ? img : img?.url;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveImage(src)}
                  className={`w-24 h-32 shrink-0 rounded-xl overflow-hidden border-2 transition-all ${activeImage === src ? "border-[#d4af37]" : "border-transparent"}`}
                >
                  <img
                    src={src}
                    alt={`${product.name} ${idx}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Info */}
        <div className="flex flex-col">
          <div className="mb-2">
            <span className="text-sm font-bold text-[#d4af37] uppercase tracking-widest">
              {product.category}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {product.name}
          </h1>

          <div className="flex items-center gap-4 mb-8">
            {product.discountPrice ? (
              <>
                <span className="text-3xl font-bold text-gray-900">
                  ৳{product.discountPrice.toLocaleString()}
                </span>
                <span className="text-xl text-gray-400 line-through">
                  ৳{product.price.toLocaleString()}
                </span>
                <span className="bg-[#800000] text-white text-xs font-bold px-2 py-1 rounded">
                  Save{" "}
                  {Math.round(
                    ((product.price - product.discountPrice) / product.price) *
                      100,
                  )}
                  %
                </span>
              </>
            ) : (
              <span className="text-3xl font-bold text-gray-900">
                ৳{product.price.toLocaleString()}
              </span>
            )}
          </div>

          <p className="text-gray-600 leading-relaxed mb-8">
            {product.description}
          </p>

          {/* Size Selection */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <label className="font-bold text-gray-900 uppercase tracking-widest text-sm">
                Select Size
              </label>
              <button className="text-[#d4af37] text-xs font-bold hover:underline">
                Size Guide
              </button>
            </div>
            <div className="flex gap-3">
              {product.sizes.map((s: SizeStock) => (
                <button
                  key={s.size}
                  disabled={s.stock === 0}
                  onClick={() => {
                    setSelectedSize(s.size);
                    setQuantity(1);
                  }}
                  className={`w-14 h-14 rounded-full flex items-center justify-center font-bold transition-all border-2
                    ${
                      s.stock === 0
                        ? "bg-gray-100 border-gray-100 text-gray-300 cursor-not-allowed"
                        : selectedSize === s.size
                          ? "bg-[#d4af37] border-[#d4af37] text-white shadow-lg"
                          : "bg-white border-gray-200 text-gray-900 hover:border-[#d4af37]"
                    }
                  `}
                >
                  {s.size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-10">
            <label className="block font-bold text-gray-900 uppercase tracking-widest text-sm mb-4">
              Quantity
            </label>
            <div className="flex items-center gap-6">
              <div className="flex items-center border-2 border-gray-200 rounded-full overflow-hidden h-12">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-4 hover:bg-gray-100 h-full transition-colors"
                >
                  <Minus size={18} />
                </button>
                <span className="w-12 text-center font-bold">{quantity}</span>
                <button
                  onClick={() =>
                    setQuantity((q) => Math.min(currentSizeStock || 10, q + 1))
                  }
                  className="px-4 hover:bg-gray-100 h-full transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Redesigned CTA Area */}
          <div className="space-y-4 mb-8">
            {/* Primary CTA: Buy Now */}
            <button
              onClick={handleBuyNow}
              disabled={!selectedSize || currentSizeStock === 0}
              className={`w-full py-5 rounded-2xl font-bold uppercase tracking-[0.2em] transition-premium shadow-lg active:scale-[0.98] animate-fade-up
                ${
                  !selectedSize || currentSizeStock === 0
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed opacity-60 shadow-none"
                    : "bg-gold text-black hover:bg-[#c5a02d] hover:shadow-xl shadow-[0_10px_20px_rgba(212,175,55,0.25)]"
                }
              `}
              style={{ animationDelay: "100ms" }}
            >
              BUY NOW
            </button>

            {/* Secondary CTA: Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize || currentSizeStock === 0}
              className={`w-full py-5 rounded-2xl font-bold uppercase tracking-[0.2em] transition-premium border-2 active:scale-[0.98] animate-fade-up
                ${
                  !selectedSize || currentSizeStock === 0
                    ? "border-gray-200 text-gray-300 cursor-not-allowed opacity-60"
                    : "border-[#c5a02d] text-gold hover:bg-gold hover:text-black shadow-sm"
                }
              `}
              style={{ animationDelay: "200ms" }}
            >
              ADD TO CART
            </button>

            {/* Status Feedback */}
            <div className="min-h-[24px] text-center pt-2">
              {!selectedSize && !isOutOfStock && (
                <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-medium">
                  Please select a size to proceed
                </p>
              )}
              {selectedSize && currentSizeStock === 0 && (
                <p className="text-[10px] uppercase tracking-[0.3em] text-red-500 font-bold">
                  Out of stock for selected size
                </p>
              )}
              {selectedSize && currentSizeStock > 0 && currentSizeStock < 5 && (
                <p className="text-[10px] uppercase tracking-[0.3em] text-orange-500 font-bold animate-pulse">
                  Only {currentSizeStock} left in stock
                </p>
              )}
              {isOutOfStock && (
                <p className="text-[10px] uppercase tracking-[0.3em] text-red-600 font-bold">
                  Currently unavailable in all sizes
                </p>
              )}
            </div>
          </div>

          {/* Secondary Actions */}
          <div className="flex gap-4 mb-10">
            <button className="flex-1 bg-white text-black border border-gray-100 py-4 rounded-2xl hover:bg-gray-50 transition-all flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest group">
              <Heart
                size={18}
                className="group-hover:fill-red-500 group-hover:text-red-500 transition-colors"
              />{" "}
              Add to Wishlist
            </button>
            <button className="flex-1 bg-white text-black border border-gray-100 py-4 rounded-2xl hover:bg-gray-50 transition-all flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest">
              <Share2 size={18} /> Share Product
            </button>
          </div>

          {/* Value Props */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-8 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <Truck size={20} className="text-[#d4af37]" />
              <div className="text-xs">
                <p className="font-bold">Fast Delivery</p>
                <p className="text-gray-500">2-3 days delivery</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <RotateCcw size={20} className="text-[#d4af37]" />
              <div className="text-xs">
                <p className="font-bold">7-Day Returns</p>
                <p className="text-gray-500">Easy exchange</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck size={20} className="text-[#d4af37]" />
              <div className="text-xs">
                <p className="font-bold">100% Authentic</p>
                <p className="text-gray-500">Premium quality</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
