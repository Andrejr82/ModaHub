# 04 — Data Contract

## Tipos TypeScript
Os contratos oficiais vivem em `/types/product.ts`.

## Product
Campos obrigatórios: `id`, `name`, `brand`, `category`, `subcategory`, `description`, `price`, `rating`, `reviewCount`, `sizes`, `colors`, `tags`, `image`, `isNew`, `isBestSeller`, `hasDiscount`, `stock`, `releaseDate`, `salesCount` e `palette`. `oldPrice` é opcional, mas obrigatório quando `hasDiscount` for verdadeiro.

## Category
Categoria possui `id`, `name`, `description` e `accent`.

## Brand
Marca possui `id`, `name`, `description` e `featured`.

## CartItem
Carrinho armazena `productId`, `quantity` e snapshot mínimo `product` para renderização/subtotal.

## FilterState
Filtros: `query`, `categories`, `brands`, `priceRange`, `discountOnly`, `minRating`, `sizes`, `newOnly`, `bestSellerOnly`.

## Dados mockados obrigatórios
- Pelo menos 16 produtos.
- Pelo menos um produto novo.
- Pelo menos um best-seller.
- Pelo menos um produto com desconto.
- Produtos distribuídos entre feminino, masculino, unissex, calçados, bolsas, relógios, óculos e acessórios.
