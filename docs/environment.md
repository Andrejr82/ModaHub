# Ambiente e solução de problemas de instalação

## Objetivo

Este projeto depende de pacotes npm públicos (`next`, `react`, `vitest`, Testing Library, ESLint, Tailwind e tipos). Para que o harness seja confiável, o ambiente precisa conseguir acessar o registry npm e instalar dependências com npm.

## Instalação padrão

Execute a partir da raiz do repositório:

```bash
npm install
npm run lint
npm run typecheck
npm run test
npm run build
```

Também é possível usar:

```bash
npm run verify
```

## Requisitos de runtime

- Node.js `>=20.11.0`.
- npm compatível com o `packageManager` declarado em `package.json`.
- Acesso HTTPS ao registry npm público ou a um mirror interno equivalente.
- `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` configurados.
- Em produção, defina `NEXT_PUBLIC_SITE_URL` com a origem pública do site, por exemplo `https://sua-loja.com`. Essa mesma origem precisa estar liberada no Supabase Auth em **URL Configuration > Redirect URLs**, incluindo o callback `/auth/callback`.

## Recuperação de senha

O fluxo usa `supabase.auth.resetPasswordForEmail` e redireciona o usuário pelo callback:

```text
{NEXT_PUBLIC_SITE_URL}/auth/callback?next=/atualizar-senha
```

Se `NEXT_PUBLIC_SITE_URL` não estiver definido, a aplicação tenta montar a origem a partir dos headers da requisição. Em deploys com proxy/CDN, mantenha `NEXT_PUBLIC_SITE_URL` definido para evitar links com domínio incorreto. Se a aplicação mostrar sucesso mas o e-mail não chegar, confira também:

- se o e-mail digitado existe no Supabase Auth;
- spam, promoções e bloqueios do provedor de e-mail;
- limites/rate limit do e-mail padrão do Supabase;
- configuração SMTP do Supabase para produção;
- Redirect URLs permitidas no painel do Supabase.

## Requisitos de rede

- O registry esperado é `https://registry.npmjs.org/`.
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

O repositório possui `.npmrc` local com `package-lock=true` para evitar que configurações globais desabilitem lockfiles. Se `npm install` gerar ou atualizar `package-lock.json`, revise o diff e faça commit do lockfile junto com alterações reais de dependência. Não adicione ou remova dependências sem necessidade clara.
