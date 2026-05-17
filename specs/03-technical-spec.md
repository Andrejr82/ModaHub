# 03 — Technical Spec

## Stack
Next.js App Router, React, TypeScript estrito, Tailwind CSS, ESLint, Vitest, Testing Library e jsdom.

## Arquitetura
- `/app`: layout, page e estilos globais.
- `/components`: componentes reutilizáveis de UI e seções.
- `/data`: dados mockados controlados.
- `/hooks`: hooks de estado client-side.
- `/lib`: funções puras e utilitários.
- `/types`: contratos TypeScript.
- `/tests`: harness automatizado.
- `/specs`: fonte da verdade.

## Padrões de componentes
- Componentes pequenos e tipados.
- Componentes client-side apenas quando houver interação.
- Props explícitas e sem `any`.
- Ações em botões semânticos.

## Hooks
- `useCart`: carrinho, localStorage, subtotal e quantidades.
- `useWishlist`: favoritos, localStorage e toggle.
- Estado de filtros pode ser local na Home, com lógica pura em `/lib`.

## Utils
- `formatCurrency`, `calculateDiscountPercentage`, `calculateInstallmentValue`, `getStockLabel` e `getFreeShippingProgress` para apresentação comercial.
- `filterProducts`, `searchProducts`, `sortProducts`, `getVisibleProducts` e categorias derivadas via flags/tags comerciais.
- `calculateCartSubtotal`, `addCartItem`, `updateCartItemQuantity`, `removeCartItem`.

## Performance
- Dados mockados estáticos.
- Sem dependências desnecessárias.
- Imagens não são requisito para funcionamento; cards usam gradientes estáveis.
- Evitar reprocessamento excessivo com funções puras e `useMemo` onde fizer sentido.

## Categorias comerciais derivadas
- `Promoções` deve considerar produtos com desconto ou tag promocional.
- `Nova Coleção` deve considerar `isNew`, `isLaunch`, categoria direta ou tag de nova coleção.
- `Kits/Conjuntos` deve considerar categoria direta ou tags de kit/conjunto.

## Restrições técnicas
- Não implementar backend real.
- Não usar credenciais.
- localStorage apenas em componentes/hooks client-side.
- TypeScript sem emissão no typecheck.
