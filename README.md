# ModaHub — Streetwear Premium Multimarcas

ModaHub é uma aplicação demo de e-commerce de moda streetwear premium multimarcas. O projeto simula uma loja online em operação, com foco em conversão, navegação comercial, catálogo filtrável, produto, preço, estoque, tamanho, frete, parcelamento, wishlist e carrinho.

> Loja fictícia para demonstração. Não há backend real, pagamento real, checkout real, coleta real de dados pessoais ou integração com transportadoras/WhatsApp APIs.

## Visão geral do produto

A home foi reposicionada para comunicar uma loja de streetwear premium multimarcas, priorizando:

- nova coleção 2026;
- promoções;
- kits e conjuntos;
- compra rápida;
- frete grátis acima de R$299;
- primeira troca grátis;
- atendimento via WhatsApp fictício;
- catálogo com filtros;
- carrinho com cupom, CEP e frete mockados.

## Principais seções da home

1. Topbar promocional.
2. Header com logo, busca, wishlist, WhatsApp, carrinho e menu responsivo.
3. Hero comercial da nova coleção.
4. Blocos rápidos: Nova Coleção, Promoções e Kits/Conjuntos.
5. Lançamentos.
6. Destaques / Mais vendidos.
7. Promoções até 50% off.
8. Kits e conjuntos.
9. Catálogo com filtros.
10. Benefícios comerciais.
11. Social proof / Instagram simulado.
12. Newsletter.
13. Footer completo.
14. Cart Drawer.

## Funcionalidades

### Catálogo e produtos

- Produtos fictícios com marcas fictícias premium.
- Categorias comerciais: Nova Coleção, Promoções, Kits/Conjuntos, Camisas, Bermudas, Calças, Calçados, Bonés e Acessórios.
- Cards com preço atual, preço antigo, desconto, estoque, tamanhos, avaliação, parcelamento, frete grátis, best-seller, novidade e últimas unidades.
- Placeholder visual premium com gradientes próprios, sem assets externos protegidos.

### Busca, filtros e ordenação

- Busca por nome, marca, categoria, subcategoria, descrição e tags.
- Filtros por categoria, marca, preço, tamanho, desconto, novidade, best-seller e avaliação mínima.
- Ordenação por relevância, menor preço, maior preço, mais vendidos, novidades e avaliação.
- Categorias derivadas como `Promoções`, `Nova Coleção` e `Kits/Conjuntos` usam flags e tags comerciais além de `product.category`.

### Carrinho e wishlist

- Wishlist persistida em `localStorage`.
- Carrinho persistido em `localStorage`.
- Quantidade editável e remoção de itens.
- Subtotal, cupom mockado, CEP mockado, frete simulado, desconto mockado, total e parcelamento estimado.
- Barra de progresso para frete grátis acima de R$299.

## Stack

- Next.js com App Router.
- React.
- TypeScript estrito.
- Tailwind CSS.
- Vitest.
- Testing Library.
- jsdom.
- ESLint.
- npm.

## Estrutura do projeto

```text
app/                    Layout, página principal e CSS global.
components/             Componentes de UI, seções e overlays.
data/products.ts        Categorias, marcas e produtos fictícios.
hooks/                  Hooks client-side de carrinho e wishlist.
lib/                    Funções puras de filtro, carrinho, storage e formatação.
specs/                  Especificações, critérios de aceite e auditoria.
tests/                  Testes unitários e de interação.
types/product.ts        Contratos TypeScript do domínio de produto.
```

## Como rodar localmente

Requisito: Node.js `>=20.11.0`.

```bash
npm install
npm run dev
```

A aplicação ficará disponível no endereço informado pelo Next.js, normalmente `http://localhost:3000`.

## Scripts disponíveis

```bash
npm run dev        # inicia o ambiente local
npm run lint       # executa ESLint
npm run typecheck  # executa TypeScript sem emitir arquivos
npm run test       # executa Vitest
npm run build      # gera build de produção
npm run verify     # executa lint, typecheck, test e build em sequência
```

## Validação recomendada

Antes de considerar uma alteração pronta, rode:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

O harness cobre dados de produtos, busca, filtros, ordenação, utilitários comerciais, carrinho, wishlist e renderização/interações da home.

## Regras importantes do MVP

- Não usar marcas reais protegidas nos dados mockados.
- Não copiar textos, imagens, identidade visual ou assets de terceiros.
- Não implementar backend real.
- Não implementar checkout ou pagamento real.
- Não coletar dados pessoais reais.
- Manter lógica crítica em funções puras testáveis sempre que possível.
- Usar HTML semântico, labels, `aria-label` quando necessário e foco visível.

## Documentação complementar

- `specs/01-product-spec.md` — especificação do produto.
- `specs/02-ux-ui-spec.md` — especificação de UX/UI.
- `specs/03-technical-spec.md` — arquitetura técnica.
- `specs/04-data-contract.md` — contrato dos dados.
- `specs/05-acceptance-criteria.md` — critérios de aceite.
- `specs/06-test-harness.md` — harness de validação.
- `specs/07-implementation-audit.md` — auditoria da implementação atual.
- `docs/environment.md` — instalação e troubleshooting de ambiente.
