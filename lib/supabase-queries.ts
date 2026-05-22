import { createClient } from '@/utils/supabase/server';
import type { Product } from '@/types/product';

export async function getProducts(): Promise<Product[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }
  
  return data.map(mapToProduct);
}

export async function getProductById(id: string): Promise<Product | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
  
  if (error || !data) {
    return null;
  }
  
  return mapToProduct(data);
}

// Convert from snake_case db columns to camelCase TS types
function mapToProduct(dbProduct: any): Product {
  return {
    id: dbProduct.id,
    name: dbProduct.name,
    price: Number(dbProduct.price),
    oldPrice: dbProduct.old_price ? Number(dbProduct.old_price) : undefined,
    image: dbProduct.image,
    imageAlt: dbProduct.image_alt,
    category: dbProduct.category,
    subcategory: dbProduct.subcategory,
    brand: dbProduct.brand,
    description: dbProduct.description,
    sizes: dbProduct.sizes || [],
    colors: dbProduct.colors || [],
    stock: dbProduct.stock,
    rating: Number(dbProduct.rating),
    reviewCount: dbProduct.review_count,
    installments: dbProduct.installments,
    isNew: dbProduct.is_new,
    isLaunch: dbProduct.is_launch,
    isBestSeller: dbProduct.is_best_seller || false,
    hasDiscount: dbProduct.has_discount || Boolean(dbProduct.old_price),
    releaseDate: dbProduct.release_date || new Date().toISOString(),
    salesCount: dbProduct.sales_count || 0,
    palette: dbProduct.palette || "from-stone-200 via-neutral-100 to-zinc-200",
    isFeatured: dbProduct.is_featured || false,
    tags: dbProduct.tags || [],
    freeShipping: dbProduct.free_shipping || false,
    collection: dbProduct.collection
  };
}
