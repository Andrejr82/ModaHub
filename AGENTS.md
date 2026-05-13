# ModaHub Multimarcas — Instruções para agentes

## Visão geral
ModaHub Multimarcas é uma aplicação demo de e-commerce de moda e acessórios, construída com foco em UX/UI premium, conversão, acessibilidade, performance e validação automatizada.

## Stack usada
- Next.js com App Router
- React + TypeScript estrito
- Tailwind CSS
- Vitest + Testing Library + jsdom
- ESLint

## Comandos principais
- `npm install` — instala dependências.
- `npm run dev` — executa o ambiente local.
- `npm run lint` — executa lint.
- `npm run typecheck` — executa TypeScript sem emitir arquivos.
- `npm run test` — executa o harness de testes.
- `npm run build` — gera build de produção.
- `npm run verify` — executa lint, typecheck, testes e build em sequência.

## Regras de código
- Não usar `any` sem justificativa explícita.
- Não colocar `try/catch` ao redor de imports.
- Separar UI, dados, hooks, tipos e utils.
- Manter lógica de busca, filtros, ordenação e carrinho em funções puras testáveis.
- Usar HTML semântico, labels, aria-labels e foco visível.
- Não integrar backend, pagamento real ou coleta real de dados pessoais neste MVP.

## Regras de teste
- Toda regra crítica de produto, carrinho, wishlist, dados e renderização deve estar coberta por testes.
- O harness mínimo é: lint, typecheck, test e build.
- Se qualquer check falhar, corrigir o menor trecho possível e executar novamente.
- Se `npm install` falhar com 403 no registry, consultar `docs/environment.md` e tratar como bloqueio de rede/proxy antes de alterar código.

## Critérios de pronto
- Specs em `/specs` atualizadas.
- Página com todas as seções obrigatórias.
- Busca, filtros, ordenação, carrinho e wishlist funcionais.
- Persistência via localStorage tratada apenas no cliente.
- `npm run lint`, `npm run typecheck`, `npm run test` e `npm run build` passando.

## Restrições de segurança
- Não executar comandos destrutivos.
- Não remover arquivos em massa.
- Não alterar arquivos fora do workspace.
- Não usar credenciais.
- Não criar checkout real, pagamento real ou backend real neste MVP.
