"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  // 🔥 Live Search
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/products?search=${query}`,
        );
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-primary/95 backdrop-blur-xl animate-fade-in flex flex-col items-center justify-start pt-32 px-6">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-10 right-10 text-white hover:text-accent transition-colors"
      >
        ✕
      </button>

      <div className="w-full max-w-3xl transform animate-fade-in-up">
        {/* Input */}
        <p className="text-accent tracking-[0.4em] uppercase text-[10px] mb-8 text-center">
          What are you looking for?
        </p>

        <div className="relative border-b border-accent/30 group">
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="SEARCH RHEMAR SIGNATURE..."
            className="w-full bg-transparent py-6 text-2xl md:text-4xl font-heading text-white placeholder-white/20 outline-none uppercase tracking-widest"
          />
          <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent transition-all duration-700 group-focus-within:w-full"></div>
        </div>

        {/* 🔥 Search Results */}
        {query && (
          <div className="mt-12 max-h-[400px] overflow-y-auto">
            {loading && (
              <p className="text-white/40 text-center text-sm">Searching...</p>
            )}

            {!loading && results.length === 0 && (
              <p className="text-white/40 text-center text-sm">
                No results found
              </p>
            )}

            <div className="space-y-4">
              {results.map((product) => (
                <div
                  key={product._id}
                  onClick={() => {
                    router.push(`/products/${product.slug}`);
                    onClose();
                  }}
                  className="flex items-center gap-4 p-4 border border-accent/10 hover:bg-accent/10 cursor-pointer transition-all"
                >
                  <img
                    src={product.images?.[0]?.url}
                    className="w-16 h-20 object-cover"
                  />
                  <div>
                    <p className="text-white font-bold text-sm uppercase tracking-wide">
                      {product.name}
                    </p>
                    <p className="text-accent text-xs mt-1">৳{product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Trending */}
        {!query && (
          <div className="mt-16">
            <p className="text-white/40 tracking-widest text-xs mb-6 uppercase">
              Trending Now
            </p>

            <div className="flex flex-wrap gap-4">
              {[
                "Silk Panjabi",
                "Suede Jackets",
                "Royal Polo",
                "Premium Sneakers",
                "Trousers",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => setQuery(item)}
                  className="px-6 py-2 border border-accent/20 text-accent/60 text-xs tracking-widest uppercase hover:bg-accent hover:text-primary hover:border-accent transition-all duration-300"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchOverlay;
