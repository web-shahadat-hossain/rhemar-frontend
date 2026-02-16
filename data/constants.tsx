import React from "react";
import { Product } from "@/types/types";
import { Collection, Benefit } from "./types";
import { Category } from "@/types/types";

export const COLLECTIONS: Collection[] = [
  {
    id: "1",
    title: "Panjabi",
    image: "https://picsum.photos/seed/panjabi/800/1000",
    slug: "panjabi",
  },
  {
    id: "2",
    title: "Polo",
    image: "https://picsum.photos/seed/polo/800/1000",
    slug: "polo",
  },
  {
    id: "3",
    title: "T-Shirt",
    image: "https://picsum.photos/seed/tshirt/800/1000",
    slug: "t-shirt",
  },
  {
    id: "4",
    title: "Jacket",
    image: "https://picsum.photos/seed/jacket/800/1000",
    slug: "jacket",
  },
  {
    id: "5",
    title: "Pant & Trouser",
    image: "https://picsum.photos/seed/pant/800/1000",
    slug: "pant-trouser",
  },
  {
    id: "6",
    title: "Sneakers",
    image: "https://picsum.photos/seed/sneaker/800/1000",
    slug: "sneakers",
  },
  {
    id: "7",
    title: "Combo",
    image: "https://picsum.photos/seed/combo/800/1000",
    slug: "combo",
  },
];
export const PRODUCTS: Product[] = [
  {
    _id: "1",
    name: "Premium Silk Panjabi - Royal Navy",
    slug: "premium-silk-panjabi-royal-navy",
    createdAt: "2024-01-01T00:00:00Z",
    category: "Panjabi",
    price: 4500,
    discountPrice: 3800,
    description:
      "A masterpiece of craftsmanship, this royal navy silk panjabi features intricate embroidery on the collar and cuffs. Perfect for Eid and weddings.",
    images: [
      { url: "https://picsum.photos/seed/panjabi1/800/1000" },
      { url: "https://picsum.photos/seed/panjabi1-2/800/1000" },
    ],
    sizes: [
      { size: "S", stock: 5 },
      { size: "M", stock: 12 },
      { size: "L", stock: 0 },
      { size: "XL", stock: 3 },
    ],
    isFeatured: true,
  },
  {
    _id: "2",
    name: "Essential White Cotton Polo",
    slug: "essential-white-cotton-polo",
    createdAt: "2024-01-01T00:00:00Z",
    category: "Polo",
    price: 1800,
    discountPrice: 1550,
    description:
      "Breathes comfort. Our classic polo is made from high-grade Pima cotton, offering durability and a premium feel.",
    images: [{ url: "https://picsum.photos/seed/polo1/800/1000" }],
    sizes: [
      { size: "S", stock: 20 },
      { size: "M", stock: 15 },
      { size: "L", stock: 10 },
      { size: "XL", stock: 8 },
    ],
    isFeatured: true,
  },
  {
    _id: "3",
    name: "Urban Slim-Fit Chinos - Charcoal",
    slug: "urban-slim-fit-chinos-charcoal",
    createdAt: "2024-01-01T00:00:00Z",
    category: "Pant & Trouser",
    price: 2500,
    description:
      "Versatile chinos that transition from office to evening. Features a slightly tapered fit and premium stretch fabric.",
    images: [{ url: "https://picsum.photos/seed/pant1/800/1000" }],
    sizes: [
      { size: "S", stock: 5 },
      { size: "M", stock: 10 },
      { size: "L", stock: 12 },
      { size: "XL", stock: 4 },
    ],
    isFeatured: true,
  },
  {
    _id: "4",
    name: "Midnight Black Bomber Jacket",
    slug: "midnight-black-bomber-jacket",
    createdAt: "2024-01-01T00:00:00Z",
    category: "Jacket",
    price: 5500,
    discountPrice: 4200,
    description:
      "A winter essential. Water-resistant outer shell with a soft quilted interior. Clean, minimalist aesthetic.",
    images: [{ url: "https://picsum.photos/seed/jacket1/800/1000" }],
    sizes: [
      { size: "S", stock: 2 },
      { size: "M", stock: 5 },
      { size: "L", stock: 1 },
      { size: "XL", stock: 0 },
    ],
    isFeatured: true,
  },
  {
    _id: "5",
    name: "Classic White Sneakers",
    slug: "classic-white-sneakers",
    createdAt: "2024-01-01T00:00:00Z",
    category: "Sneakers",
    price: 3200,
    description:
      "Handcrafted leather sneakers with a cushioned sole for all-day comfort. The ultimate versatile footwear.",
    images: [{ url: "https://picsum.photos/seed/sneaker1/800/1000" }],
    sizes: [
      { size: "S", stock: 8 },
      { size: "M", stock: 6 },
      { size: "L", stock: 4 },
      { size: "XL", stock: 10 },
    ],
    isFeatured: true,
  },
  {
    _id: "6",
    name: "Signature Logo T-Shirt",
    slug: "signature-logo-t-shirt",
    createdAt: "2024-01-01T00:00:00Z",
    category: "T-Shirt",
    price: 1200,
    discountPrice: 950,
    description:
      "Simple, iconic, and comfortable. Our signature logo tee is a staple for every wardrobe.",
    images: [{ url: "https://picsum.photos/seed/tshirt1/800/1000" }],
    sizes: [
      { size: "S", stock: 50 },
      { size: "M", stock: 40 },
      { size: "L", stock: 30 },
      { size: "XL", stock: 20 },
    ],
    isFeatured: true,
  },
];

export const FEATURED_PRODUCTS: Product[] = [
  {
    _id: "p1",
    name: "Signature Silk Panjabi",
    slug: "signature-silk-panjabi",
    createdAt: "2024-01-01T00:00:00Z",
    price: 12500,
    category: "Panjabi",
    images: [
      {
        url: "https://img.drz.lazcdn.com/g/kf/S83554d0744f547d88167d400b274c2e8C.jpg_720x720q80.jpg",
      },
    ],
    isFeatured: true,
  },
  {
    _id: "p2",
    name: "Royal Pique Polo",
    slug: "royal-pique-polo",
    createdAt: "2024-01-01T00:00:00Z",
    price: 3200,
    category: "Polo",
    images: [
      {
        url: "https://i0.wp.com/peallifestyle.com/wp-content/uploads/2024/03/whtie-kcp-3.jpg?fit=2001%2C3000&ssl=1",
      },
    ],
  },
  {
    _id: "p3",
    name: "Midnight Slim Trousers",
    slug: "midnight-slim-trousers",
    createdAt: "2024-01-01T00:00:00Z",
    price: 4500,
    category: "Pant",
    images: [
      { url: "https://aaron.clothing/wp-content/uploads/2024/03/merp1205.jpg" },
    ],
  },
  {
    _id: "p4",
    name: "Artisan Suede Jacket",
    slug: "artisan-suede-jacket",
    createdAt: "2024-01-01T00:00:00Z",
    price: 18900,
    category: "Jacket",
    images: [
      {
        url: "https://blucheez.fashion/cdn/shop/files/126_ef2c4ebc-b9d6-46f6-8701-3f61b7925c9b.webp?v=1748774586&width=600",
      },
    ],
    isFeatured: true,
  },
];

export const ICONS = {
  Fabric: () => (
    <svg
      className="w-10 h-10 text-accent"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
      />
    </svg>
  ),
  Fit: () => (
    <svg
      className="w-10 h-10 text-accent"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
        d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758L6.242 12l2.879-2.879"
      />
    </svg>
  ),
  Craft: () => (
    <svg
      className="w-10 h-10 text-accent"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
      />
    </svg>
  ),
  Quality: () => (
    <svg
      className="w-10 h-10 text-accent"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
      />
    </svg>
  ),
};

export const BENEFITS: Benefit[] = [
  {
    title: "Premium Fabric",
    description: "Sourced from the finest mills worldwide.",
    icon: <ICONS.Fabric />,
  },
  {
    title: "Perfect Fit",
    description: "Precision tailoring for the modern man.",
    icon: <ICONS.Fit />,
  },
  {
    title: "Modern Craftsmanship",
    description: "Tradition meets contemporary design.",
    icon: <ICONS.Craft />,
  },
  {
    title: "Trusted Quality",
    description: "A legacy of excellence in every stitch.",
    icon: <ICONS.Quality />,
  },
];

export const INSTAGRAM_IMAGES = [
  "https://picsum.photos/seed/ig1/600/600",
  "https://picsum.photos/seed/ig2/600/600",
  "https://picsum.photos/seed/ig3/600/600",
  "https://picsum.photos/seed/ig4/600/600",
  "https://picsum.photos/seed/ig5/600/600",
  "https://picsum.photos/seed/ig6/600/600",
];

export const CATEGORIES: Category[] = [
  "Panjabi",
  "T-Shirt",
  "Pant & Trouser",
  "Jacket",
  "Sneakers",
  "Polo",
  "Combo",
];
