import { Suspense } from "react";
import { CatalogPageClient } from "@/components/CatalogPageClient";
import { getProducts } from "@/lib/supabase-queries";

interface CatalogPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const products = await getProducts();

  return (
    <Suspense fallback={null}>
      <CatalogPageClient searchParams={resolvedSearchParams} products={products} />
    </Suspense>
  );
}
