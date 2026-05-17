# 06 — Test Harness

## Objetivo
Criar uma barreira de qualidade executável, objetiva e repetível para validar que a ModaHub Multimarcas atende aos contratos de produto, UX, dados, interações de compra e qualidade técnica antes de ser considerada pronta.

## Comandos obrigatórios
Executar sempre nesta ordem:

1. `npm run lint`
2. `npm run typecheck`
3. `npm run test`
4. `npm run build`

A entrega só é aprovada quando os quatro comandos passam no mesmo estado de código.

## Arquivos do harness
- `tests/product-filter.test.ts`: dados mockados, busca, filtros combináveis, categorias comerciais derivadas e ordenação.
- `tests/cart-utils.test.ts`: helpers puros do carrinho, subtotal, quantidade e persistência em `localStorage`.
- `tests/cart-drawer.test.tsx`: estado vazio do drawer, renderização de itens, controle de quantidade e remoção.
- `tests/wishlist.test.ts`: persistência de wishlist em `localStorage` e estado vazio de storage.
- `tests/format.test.ts`: moeda, desconto, parcelamento, estoque e progresso de frete grátis.
- `tests/home-render.test.tsx`: renderização da home, header, hero, menu responsivo e seções obrigatórias e footer.
- `tests/home-interactions.test.tsx`: fluxo de adicionar/remover carrinho, alterar quantidade, favoritar/remover favorito e estado visual.

## Cenários obrigatórios por área

### Renderização
- A home renderiza sem erro.
- Header existe e expõe busca, wishlist e carrinho.
- Hero existe com headline e CTAs.
- Compra rápida, lançamentos, mais vendidos, promoções, kits, catálogo, benefícios, prova social, newsletter e footer existem.
- O drawer de carrinho renderiza estado vazio quando não há itens.

### Dados
- Existem pelo menos 16 produtos mockados.
- Cada produto tem campos obrigatórios do contrato `Product`.
- Existem produtos best-sellers.
- Existem produtos novos.
- Existem produtos com desconto e `oldPrice` válido.
- Existem marcas e categorias fictícias suficientes para filtros.

### Busca
- Busca por nome funciona.
- Busca por marca funciona.
- Busca por categoria funciona.
- Busca por tag funciona.
- Busca inexistente retorna lista vazia/estado vazio.
- Busca deve combinar com filtros e ordenação sem sobrescrever critérios.

### Filtros
- Categoria filtra corretamente.
- Marca filtra corretamente.
- Faixa de preço filtra corretamente.
- Tamanho filtra corretamente.
- Desconto, novidade, best-seller e avaliação mínima filtram corretamente.
- Filtros combinados retornam apenas produtos que atendem a todos os critérios ativos.

### Ordenação
- Menor preço ordena crescente.
- Maior preço ordena decrescente.
- Mais vendidos ordena por `salesCount` decrescente.
- Novidades ordena por `releaseDate` mais recente.
- Melhor avaliação ordena por `rating` e usa `reviewCount` como desempate.
- Relevância prioriza best-sellers e volume de vendas.

### Carrinho
- Adicionar item funciona via helper e via UI da home.
- Adicionar item repetido incrementa quantidade respeitando estoque.
- Remover item funciona.
- Alterar quantidade funciona.
- Quantidade zero remove item.
- Subtotal é calculado corretamente.
- Carrinho persiste em `localStorage`.
- Drawer mostra estado vazio quando não há itens.
- CTA de checkout é visual/fictício, sem backend ou pagamento real.

### Wishlist
- Favoritar item funciona via UI.
- Remover favorito funciona via UI.
- Wishlist persiste em `localStorage`.
- Estado visual de favorito muda por `aria-pressed` e texto acessível do botão.
- Storage vazio retorna lista vazia.

### Qualidade técnica
- `npm run lint` passa.
- `npm run typecheck` passa.
- `npm run test` passa.
- `npm run build` passa.
- Não há `any` desnecessário.
- Não há dependência de backend real, pagamento real ou credenciais.

## Regras de execução
- Rodar o harness completo antes de finalizar qualquer alteração relevante.
- Se um teste falhar, ler a mensagem, identificar a menor causa provável e corrigir a menor superfície possível.
- Após correção, rodar novamente o comando que falhou; depois rodar o harness completo.
- Não atualizar snapshots ou relaxar asserts para esconder regressões.
- Não considerar a tarefa pronta com testes pulados, `it.skip`, `describe.skip` ou checks parcialmente executados.

## Feedback loop de autocorreção
1. Reproduzir a falha localmente com o comando exato.
2. Classificar a falha: configuração, tipo, lógica, renderização, acessibilidade ou ambiente.
3. Corrigir o menor trecho de código/spec/test relacionado.
4. Reexecutar o comando que falhou.
5. Reexecutar `npm run lint`, `npm run typecheck`, `npm run test` e `npm run build`.
6. Revisar `git diff --check` e o diff final.
7. Documentar qualquer limitação real no resumo final.

## Proteções contra alterações fora do escopo
- Não alterar arquivos fora do workspace.
- Não executar comandos destrutivos.
- Não remover arquivos em massa.
- Não usar credenciais.
- Não integrar checkout, backend ou pagamento real.
- Não adicionar dependências sem necessidade clara para o harness ou a aplicação.

## Checklist final de qualidade
- [ ] Specs existem e refletem o produto.
- [ ] AGENTS.md existe e orienta agentes futuros.
- [ ] Dados mockados atendem ao contrato.
- [ ] Home renderiza todas as seções obrigatórias.
- [ ] Busca, filtros e ordenação funcionam em conjunto.
- [ ] Carrinho adiciona, remove, altera quantidade, calcula subtotal e persiste.
- [ ] Wishlist favorita, remove, persiste e sinaliza estado visual.
- [ ] Estados vazios de busca/carrinho/storage estão cobertos.
- [ ] `git diff --check` passa.
- [ ] `npm run lint`, `npm run typecheck`, `npm run test` e `npm run build` passam.
