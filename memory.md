# TriveniLondon Memory

## Project

- Repository: `nischay30/triveniLondon`
- Local path: `/Users/home/projects/triveniLondon`
- Public brand spelling: `TriveniLondon`
- Domain: `trivenilondon.co.uk`
- Workflow rule: never push directly to `main`; use branches, push branches, and open PRs for review.

## Current MVP Direction

- React and TypeScript frontend in `apps/web`.
- Express server in `apps/server`.
- Docker image starts the Express app with `pnpm app`.
- GitHub Pages is being used as a temporary/static hosting path before final container hosting.
- Container hosting is still planned for the fuller Express deployment later.

## Cloudflare State

- Cloudflare zone: `trivenilondon.co.uk`
- Zone status: active.
- Nameservers: `grace.ns.cloudflare.com`, `yahir.ns.cloudflare.com`.
- Removed old Worker custom domain attachment for `yellow-sun-560d`.
- Deleted old Worker script `yellow-sun-560d`.
- DNS points to GitHub Pages:
  - `A trivenilondon.co.uk 185.199.108.153`
  - `A trivenilondon.co.uk 185.199.109.153`
  - `A trivenilondon.co.uk 185.199.110.153`
  - `A trivenilondon.co.uk 185.199.111.153`
  - `CNAME www.trivenilondon.co.uk nischay30.github.io`
- GitHub Pages DNS records are DNS-only in Cloudflare while GitHub manages Pages HTTPS.

## GitHub Pages Setup

- `apps/web/public/CNAME` contains `trivenilondon.co.uk`.
- Production Pages build must use base path `/`.
- Repository preview build can use `/triveniLondon/`, but must not deploy over the production Pages site.
- GitHub Pages has only one public deployment per repository. Do not deploy feature branch previews to the production `github-pages` environment.

## 2026-06-15 Website Incident

- Symptom: `https://trivenilondon.co.uk` returned HTML but the website appeared broken/blank.
- DNS was not the root cause; GitHub Pages answered the domain.
- Live `index.html` referenced assets under `/feat-oauth-cart-checkout/assets/...`.
- Those prefixed asset URLs returned `404`.
- Root assets such as `/assets/...` existed and returned `200`.
- Cause: the `feat/oauth-cart-checkout` branch had a Pages workflow that deployed a feature-branch preview artifact to the real GitHub Pages site.
- Required restore action: rerun the GitHub Pages workflow from `main`, or merge a main-only workflow fix and let `main` deploy.
- Safety fix: production deploy jobs should include `if: github.ref == 'refs/heads/main'`.
