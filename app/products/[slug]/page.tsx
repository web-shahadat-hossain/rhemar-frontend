import { api } from "@/lib/services/api";
import { notFound } from "next/navigation";
import ProductDetailPage from ".";

export default async function Page({
  params,
}: {
  params: { slug: string } | Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let product;
  try {
    product = await api(`/products/${slug}`);
  } catch (err: any) {
    console.error("Product fetch error:", err?.message || err);
    return notFound();
  }
  console.log(product);

  return (
    <div className="bg-[#fdfdfd] text-[#1a1a1a]">
      <ProductDetailPage product={product} />
    </div>
  );
}
