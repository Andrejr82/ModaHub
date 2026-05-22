import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { products } from '@/data/products';

export async function GET() {
  const supabase = await createClient();

  // Vamos iterar sobre os produtos locais e inserir no banco
  let inserted = 0;
  let errors = [];

  for (const product of products) {
    const { error } = await supabase
      .from('products')
      .upsert({
        id: product.id,
        name: product.name,
        brand: product.brand,
        category: product.category,
        subcategory: product.subcategory,
        description: product.description,
        price: product.price,
        old_price: product.oldPrice || null,
        rating: product.rating,
        review_count: product.reviewCount,
        image: product.image,
        image_alt: product.imageAlt || product.name,
        in_stock: product.stock > 0,
        stock: product.stock,
        free_shipping: product.freeShipping || false,
        is_new: product.isNew || false,
        is_best_seller: product.isBestSeller || false,
        has_discount: product.hasDiscount || false,
        is_featured: product.isFeatured || false,
        is_launch: product.isLaunch || false,
        sizes: product.sizes || [],
        colors: product.colors || [],
        tags: product.tags || [],
        release_date: product.releaseDate,
        sales_count: product.salesCount,
        palette: product.palette,
        installments: product.installments,
        collection: product.collection
      }, { onConflict: 'id' });

    if (error) {
      console.error(`Erro ao inserir ${product.id}:`, error);
      errors.push(error);
    } else {
      inserted++;
    }
  }

  return NextResponse.json({
    message: 'Migração concluída!',
    totalProdutos: products.length,
    inseridos: inserted,
    erros: errors
  });
}
