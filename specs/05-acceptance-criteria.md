# 05 — Acceptance Criteria

## Done when
- Specs existem e estão alinhadas à implementação.
- Home representa uma loja multimarcas de moda e acessórios.
- Todas as 13 seções obrigatórias existem.
- Busca, filtros e ordenação funcionam em conjunto.
- Carrinho e wishlist persistem em localStorage.
- lint, typecheck, testes e build passam.

## Comportamentos esperados
- Busca encontra por nome, marca, categoria e tag.
- Busca inexistente mostra estado vazio.
- Filtros combinados reduzem resultados corretamente.
- Ordenação altera a ordem de resultados conforme critério.
- Carrinho permite adicionar, remover, alterar quantidade e calcular subtotal.
- Wishlist alterna estado visual e persiste.

## Responsividade
- Mobile, tablet e desktop sem layout quebrado.
- Header mobile navegável.
- Cards alinhados e legíveis.
- CTAs visíveis.

## Acessibilidade
- Inputs com labels.
- Botões iconográficos com aria-label.
- Foco visível.
- HTML semântico.
- Contraste adequado.

## Qualidade técnica
- TypeScript estrito sem erros.
- Sem `any` desnecessário.
- Componentização clara.
- Funções puras testadas.
- Sem dependências supérfluas.
