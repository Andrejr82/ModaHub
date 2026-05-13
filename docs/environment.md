# Ambiente e solução de problemas de instalação

## Objetivo
Este projeto depende de pacotes npm públicos (`next`, `react`, `vitest`, Testing Library, ESLint e tipos). Para que o harness seja confiável, o ambiente precisa conseguir acessar o registry npm e gerar/usar `package-lock.json`.

## Instalação padrão
Execute a partir da raiz do repositório:

```bash
npm install
npm run lint
npm run typecheck
npm run test
npm run build
```

## Requisitos de rede
- O registry configurado do projeto é `https://registry.npmjs.org/`.
- Proxies corporativos precisam permitir `CONNECT`/HTTPS para `registry.npmjs.org`.
- Se o ambiente definir `HTTP_PROXY`, `HTTPS_PROXY`, `npm_config_http_proxy` ou `npm_config_https_proxy`, esses proxies precisam permitir download de pacotes npm públicos, inclusive pacotes escopados como `@eslint/eslintrc`, `@testing-library/react` e `@types/node`.

## Diagnóstico rápido
Use estes comandos quando `npm install` falhar:

```bash
npm config list
curl -I https://registry.npmjs.org/react
curl -I https://registry.npmjs.org/@eslint%2feslintrc
```

Resultados esperados:
- `curl` deve retornar HTTP 200/304 ou redirecionamento válido, não `403 Forbidden`.
- `npm config list` deve mostrar o registry público ou um mirror interno autorizado.

## Erro conhecido: `403 Forbidden` no registry
Se o erro for semelhante a:

```text
npm ERR! 403 Forbidden - GET https://registry.npmjs.org/@eslint%2feslintrc
```

isso indica bloqueio de rede/proxy antes da instalação das dependências. O código do projeto não consegue corrigir esse bloqueio sozinho. A correção deve ser feita no ambiente:

1. liberar acesso ao registry npm no proxy;
2. configurar um registry interno autorizado com todos os pacotes públicos necessários; ou
3. executar em ambiente com DNS e HTTPS liberados para o npm registry.

Após resolver a rede, rode novamente `npm install` e depois o harness completo.

## Lockfile
O arquivo `.npmrc` do projeto força `package-lock=true` para evitar que configurações globais do usuário desabilitem lockfiles. Sempre commite `package-lock.json` quando ele for gerado em um ambiente com acesso ao registry.
