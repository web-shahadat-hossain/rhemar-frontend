"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Shop from "@/components/pages/products";

interface Category {
  _id: string;
  name: string;
  status: string;
}

interface Product {
  _id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  discountPrice?: number;
  images: { url: string }[];
  createdAt: string;
}

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [categories, setCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const initialCategory = searchParams.get("category") || "All";
  const initialSearch = searchParams.get("search") || "";

  useEffect(() => {
    const fetchData = async () => {
      const catRes = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/categories",
      );
      const catData = await catRes.json();

      const activeCats = catData
        .filter((c: Category) => c.status === "active")
        .map((c: Category) => c.name);

      setCategories(activeCats);

      const productRes = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/products",
      );
      const productData = await productRes.json();
      setProducts(productData);
    };

    fetchData();
  }, []);

  const handleProductClick = (slug: string) => {
    router.push(`/products/${slug}`);
  };

  return (
    <div className="min-h-screen bg-[#fdfdfd] text-[#1a1a1a]">
      <Shop
        onProductClick={handleProductClick}
        initialCategory={initialCategory}
        initialSearch={initialSearch}
        categories={categories}
        products={products}
      />
    </div>
  );
}
