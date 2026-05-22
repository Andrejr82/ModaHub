import { HomePageClient } from "@/components/HomePageClient";
import { getProducts } from "@/lib/supabase-queries";
import { categories } from "@/data/products";

export default async function Home() {
  const products = await getProducts();
  
  return <HomePageClient products={products} categories={categories} />;
}
