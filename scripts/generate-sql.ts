import { products } from '../data/products';
import * as fs from 'fs';

const PROJECT_URL = 'https://sevdfqhcxujantoulaeb.supabase.co';

let sql = `INSERT INTO products (id, name, price, old_price, image, image_alt, category, subcategory, brand, description, sizes, colors, stock, rating, review_count, installments, is_new, is_launch, free_shipping, collection) VALUES\n`;

const values = products.map((p, index) => {
  const oldPrice = p.oldPrice ? p.oldPrice : 'NULL';
  const isNew = p.isNew ? 'true' : 'false';
  const isLaunch = p.isLaunch ? 'true' : 'false';
  const freeShipping = p.freeShipping ? 'true' : 'false';
  
  // Format sizes and colors for PostgreSQL array syntax
  const sizes = `'{${p.sizes.map(s => `"${s}"`).join(',')}}'`;
  const colors = `'{${p.colors.map(c => `"${c}"`).join(',')}}'`;
  
  const imageName = p.image.split('/').pop();
  const imageUrl = `${PROJECT_URL}/storage/v1/object/public/products/${imageName}`;

  // Escape quotes
  const escapeString = (str: string) => str.replace(/'/g, "''");

  return `('${p.id}', '${escapeString(p.name)}', ${p.price}, ${oldPrice}, '${imageUrl}', '${escapeString(p.imageAlt)}', '${escapeString(p.category)}', '${escapeString(p.subcategory)}', '${escapeString(p.brand)}', '${escapeString(p.description)}', ${sizes}, ${colors}, ${p.stock}, ${p.rating}, ${p.reviewCount}, ${p.installments}, ${isNew}, ${isLaunch}, ${freeShipping}, '${escapeString(p.collection)}')`;
});

sql += values.join(',\n') + ';';

fs.writeFileSync('docs/seed_data.sql', sql);
console.log('SQL generated!');
