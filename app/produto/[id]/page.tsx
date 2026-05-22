import { notFound } from "next/navigation";
import { ProductDetailClient } from "@/components/ProductDetailClient";
import { getProductById } from "@/lib/supabase-queries";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
