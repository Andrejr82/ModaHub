# ModaHub — Instruções para agentes

## Visão geral atual

ModaHub é uma aplicação demo de e-commerce de streetwear premium multimarcas. A experiência deve parecer uma loja online real em operação, com navegação comercial, foco em produto, preço, estoque, tamanho, frete, parcelamento, wishlist, carrinho e confiança.

O projeto é fictício e não deve usar marcas reais protegidas, imagens externas protegidas, textos copiados de outras lojas, backend real, checkout real, pagamento real ou coleta real de dados pessoais.

## Stack usada

- Next.js com App Router.
- React.
- TypeScript estrito.
- Tailwind CSS.
- Vitest + Testing Library + jsdom.
- ESLint.
- npm.

## Comandos principais

- `npm install` — instala dependências.
- `npm run dev` — executa o ambiente local.
- `npm run lint` — executa lint.
- `npm run typecheck` — executa TypeScript sem emitir arquivos.
- `npm run test` — executa o harness de testes.
- `npm run build` — gera build de produção.
- `npm run verify` — executa lint, typecheck, testes e build em sequência.

## Arquitetura e arquivos importantes

- `app/page.tsx` — composição da home e estado de filtros/carrinho/wishlist.
- `components/Header.tsx` — topbar, logo, busca desktop/mobile, wishlist, WhatsApp, carrinho e menu responsivo.
- `components/Hero.tsx` — hero comercial da nova coleção.
- `components/ProductCard.tsx` — card comercial com preço, estoque, tamanho, frete, desconto e parcelamento.
- `components/CartDrawer.tsx` — carrinho lateral com cupom, CEP mockado, frete grátis progressivo e totais.
- `components/Filters.tsx` — UI dos filtros e ordenação do catálogo.
- `components/Footer.tsx` — rodapé institucional/comercial.
- `data/products.ts` — produtos, categorias e marcas fictícias.
- `types/product.ts` — contratos TypeScript do domínio.
- `lib/filter-products.ts` — busca, filtros e ordenação em funções puras.
- `lib/format.ts` — moeda, desconto, parcelamento, estoque e frete grátis.
- `lib/cart-utils.ts` — funções puras do carrinho.
- `hooks/use-cart.ts` e `hooks/use-wishlist.ts` — persistência client-side em `localStorage`.
- `tests/` — testes unitários e de interação.
- `specs/` — especificações e auditoria do produto.

## Regras de código

- Não usar `any` sem justificativa explícita.
- Não colocar `try/catch` ao redor de imports.
- Separar UI, dados, hooks, tipos e utils.
- Manter busca, filtros, ordenação, carrinho e cálculos comerciais em funções puras testáveis.
- Usar Tailwind CSS e preservar responsividade mobile/desktop.
- Usar HTML semântico, labels, `aria-label` quando necessário e foco visível.
- Botões devem ter `type="button"` quando não enviarem formulário.
- Não criar componentes duplicados quando for possível refatorar os existentes.
- Não adicionar dependências sem necessidade clara.

## Regras de domínio e UX

- Posicionamento: streetwear premium multimarcas.
- Categorias comerciais: Nova Coleção, Promoções, Kits/Conjuntos, Camisas, Bermudas, Calças, Calçados, Bonés e Acessórios.
- Produtos devem continuar fictícios e conter metadados comerciais como preço, preço antigo, estoque, tamanhos, cores, desconto, frete grátis, parcelamento, coleção, lançamento e best-seller.
- `Promoções`, `Nova Coleção` e `Kits/Conjuntos` podem ser categorias derivadas de flags/tags comerciais; não assuma que dependem apenas de `product.category`.
- Frete, cupom, CEP e parcelamento são simulações locais e não devem chamar APIs externas.
- Wishlist e carrinho persistem apenas no cliente via `localStorage`.

## Regras de teste

- Toda regra crítica de produto, filtros, carrinho, wishlist, dados e renderização deve estar coberta por testes.
- O harness mínimo é: `npm run lint`, `npm run typecheck`, `npm run test` e `npm run build`.
- Se qualquer check falhar, corrija a menor superfície possível e execute novamente.
- Não use `it.skip`, `describe.skip` ou relaxamento de asserts para esconder regressões.
- Se `npm install` falhar com 403 no registry, consulte `docs/environment.md` e trate como bloqueio de rede/proxy antes de alterar código.

## Critérios de pronto

- Specs em `specs/` atualizadas quando a alteração mudar produto, UX, dados, arquitetura ou critérios de aceite.
- README e AGENTS atualizados quando a descrição do projeto ou fluxo de trabalho mudar.
- Página com todas as seções obrigatórias e sem seções vazias.
- Busca, filtros, ordenação, carrinho e wishlist funcionais.
- `npm run lint`, `npm run typecheck`, `npm run test` e `npm run build` passando.
- `git diff --check` sem erros.

## Restrições de segurança

- Não executar comandos destrutivos.
- Não remover arquivos em massa.
- Não alterar arquivos fora do workspace.
- Não usar credenciais.
- Não criar checkout real, pagamento real, backend real ou integração real com transportadora/WhatsApp neste MVP.
