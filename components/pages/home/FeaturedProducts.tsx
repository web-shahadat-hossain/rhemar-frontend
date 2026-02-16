"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  discountPrice?: number;
  images: { url: string }[];
  featured?: boolean;
  createdAt: string;
}

const FeaturedProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/products");
      const data = await res.json();

      // 🔥 Sort latest first and take last 4
      const latestFour = data
        .sort(
          (a: Product, b: Product) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        .slice(0, 4);

      setProducts(latestFour);
    } catch (err) {
      console.error("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section className="py-24 bg-secondary text-primary px-6">
      <div className="container mx-auto">
        <div className="text-center mb-20">
          <span className="text-accent tracking-[0.4em] uppercase text-xs mb-4 block font-bold">
            Curated Selection
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Best Sellers
          </h2>
          <div className="h-1 w-20 bg-accent mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {products.map((product) => (
            <div key={product._id} className="group flex flex-col">
              <div className="relative overflow-hidden bg-white aspect-[3/4]">
                {product.featured && (
                  <div className="absolute top-4 left-4 z-10 bg-accent text-white px-3 py-1 text-[10px] uppercase tracking-widest font-bold">
                    Signature Pick
                  </div>
                )}

                <img
                  src={product.images?.[0]?.url}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Hover Actions */}
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out flex gap-2">
                  <button className="flex-1 bg-primary text-white py-3 text-xs uppercase tracking-widest font-bold hover:bg-accent transition-colors">
                    Add To Cart
                  </button>

                  <Link
                    href={`/products/${product.slug}`}
                    className="w-12 bg-white text-primary flex items-center justify-center hover:text-accent transition-colors border border-gray-100"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </Link>
                </div>
              </div>

              <Link
                href={`/products/${product.slug}`}
                className="mt-6 text-center"
              >
                <p className="text-gray-400 text-[10px] uppercase tracking-[0.2em] mb-1">
                  {product.category}
                </p>

                <h3 className="text-lg font-heading group-hover:text-accent transition-colors mb-2">
                  {product.name}
                </h3>

                <p className="font-sans font-semibold text-accent">
                  ৳{(product.discountPrice || product.price).toLocaleString()}
                </p>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <Link
            href="/products"
            className="inline-block border-b-2 border-accent pb-2 text-primary tracking-widest uppercase text-xs font-bold hover:text-accent transition-colors"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
