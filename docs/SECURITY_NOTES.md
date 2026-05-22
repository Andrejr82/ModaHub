# Security Notes

Last reviewed: 2026-05-17

## Summary

ModaHub was upgraded from `next@15.5.6` to `next@16.2.6` to remediate the critical and high severity advisories reported by `npm audit` against the previous Next.js release line. `postcss` was also upgraded directly from `8.5.6` to `8.5.14`.

The remaining `npm audit` findings are two moderate findings caused by `postcss@8.4.31` bundled as a private nested dependency of `next@16.2.6`:

- `postcss`: `GHSA-qx2v-qp2m-jg93`, XSS via unescaped `</style>` in CSS stringify output, affected range `<8.5.10`
- `next`: reported only because it depends on that nested `postcss`

The application-level `postcss` dependency is already patched at `8.5.14`.

## Decision

Do not vendorize or patch `node_modules/next` locally.

Reasoning:

- `next@16.2.6` is the current stable security release in use by this project.
- The vulnerable `postcss@8.4.31` is a private nested dependency of `next`.
- A package override was evaluated and left the dependency tree invalid instead of producing a clean supported install.
- Vendoring Next.js would move the project off the supported vendor update path and make future security updates harder to apply safely.

The accepted risk is limited to the vendor-bundled moderate advisory until Vercel publishes a stable Next.js release that updates its nested `postcss` dependency to `>=8.5.10`.

## Project Impact

Current ModaHub scope reduces practical exposure:

- Static demo storefront.
- No backend, checkout, payment flow, API route, or real user data collection.
- No user-controlled CSS authoring surface.
- No external CSS processing service exposed to users.

This is a risk assessment for this repository only. It should be revisited if the app adds CMS-driven styling, user-authored CSS, a backend, server actions that process untrusted style content, or any production data collection.

## Required Checks

Run the normal project validation:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

Run the security gate for severe regressions:

```bash
npm run audit:security
```

`npm run audit:security` uses `npm audit --audit-level=high`, so it blocks high and critical vulnerabilities while the current supplier-owned moderate advisory remains tracked here.

## Monitoring

Track upstream fix status:

- https://github.com/vercel/next.js/issues/93234
- https://github.com/vercel/next.js/issues/93604
- https://github.com/advisories/GHSA-qx2v-qp2m-jg93

When a stable Next.js release updates the nested `postcss` dependency, upgrade `next` and `eslint-config-next` together, then rerun:

```bash
npm install
npm audit
npm run verify
```
