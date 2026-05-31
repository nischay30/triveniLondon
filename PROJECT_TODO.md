# triveniLondon Project TODO

This roadmap treats the repository like an open source project: each substantial checkbox can become a GitHub issue, and each phase can become a milestone.

## Project Goal

Build `triveniLondon`, a modern ecommerce website for fragrances and jewellery, using Node.js and React.js, deployed under `trivenilondon.co.uk` through Cloudflare, with GitHub Actions for CI.

## Working Assumptions

- Frontend: React with TypeScript.
- Build tool: Vite.
- Styling: Tailwind CSS or a small component system decided during Phase 1.
- Backend/API: Node.js with either Express/Fastify or a full-stack framework if needed.
- Payments: Stripe, unless a different provider is required.
- Domain/DNS/CDN: Cloudflare for `trivenilondon.co.uk`.
- Source control: GitHub issues, milestones, branches, pull requests, and GitHub Actions.

## Repository Workflow Rules

- Never push directly to `main`.
- Create a branch for every task or group of related tasks.
- Push completed work to the task branch.
- Open a pull request for review before merging.
- Keep pull requests focused and tied to a GitHub issue when practical.
- Use clear branch names, such as `chore/project-roadmap`, `feat/product-catalogue`, or `ci/github-actions`.

## What We Still Need To Decide

- Product catalogue source: static seed data, admin-managed database, Shopify/Stripe products, CMS, or custom backend.
- Checkout model: Stripe Checkout, embedded checkout, or external ecommerce platform.
- Inventory model: simple stock count, variants, low-stock thresholds, backorders, or no inventory tracking at first.
- Admin needs: product management, order management, customer messages, discount codes.
- Authentication: guest checkout only, customer accounts, admin accounts.
- Shipping/tax: UK-only or international, shipping bands, VAT handling.
- Content needs: home page copy, brand story, legal pages, product photos, fragrance notes, jewellery materials.
- Email provider: order confirmations, contact form, abandoned checkout, newsletter.
- Hosting target: Cloudflare Pages, Cloudflare Workers, VPS, or another Node-capable host.

## Phase 0: Repository Setup

- [ ] Update `README.md` with project overview, local setup, scripts, and contribution notes.
- [ ] Add `LICENSE`.
- [ ] Add `.editorconfig`.
- [ ] Add Node version management file such as `.nvmrc`.
- [ ] Add issue templates for bugs, features, and tasks.
- [ ] Add pull request template.
- [ ] Add `CODE_OF_CONDUCT.md` if this will accept public contributions.
- [ ] Add `CONTRIBUTING.md` with branch and PR workflow.
- [ ] Create GitHub labels such as `phase-0`, `frontend`, `backend`, `ci`, `cloudflare`, `design`, `commerce`, `docs`.

## Phase 1: Product And Architecture Decisions

- [ ] Confirm MVP scope.
- [ ] Confirm tech stack.
- [ ] Choose data model for products, categories, variants, carts, orders, users, and content pages.
- [ ] Choose payment provider and checkout flow.
- [ ] Choose hosting/deployment architecture.
- [ ] Define environment variables needed for local, preview, and production.
- [ ] Decide whether to use a database immediately or begin with static/seed data.
- [ ] Create architecture decision records for major choices.

## Phase 2: App Scaffolding

- [ ] Scaffold React app with TypeScript.
- [ ] Add Node.js backend or API layer if required by the chosen architecture.
- [ ] Add package manager lockfile.
- [ ] Add scripts for `dev`, `build`, `test`, `lint`, `format`, and `typecheck`.
- [ ] Configure ESLint.
- [ ] Configure Prettier.
- [ ] Configure TypeScript.
- [ ] Configure Tailwind CSS or selected styling system.
- [ ] Add basic folder structure.
- [ ] Add initial test framework.

## Phase 3: Brand And Design Foundation

- [ ] Define brand colors, typography, spacing, and component style.
- [ ] Create responsive layout shell.
- [ ] Add navigation and footer.
- [ ] Design home page structure.
- [ ] Design product listing page.
- [ ] Design product detail page.
- [ ] Design cart page.
- [ ] Design checkout handoff page or checkout state.
- [ ] Design legal and support pages.
- [ ] Add accessible focus states and keyboard navigation basics.

## Phase 4: Catalogue MVP

- [ ] Create product model for fragrances and jewellery.
- [ ] Add product categories.
- [ ] Add product variant support if required.
- [ ] Add product image handling.
- [ ] Add product cards.
- [ ] Add product listing page.
- [ ] Add product detail page.
- [ ] Add filters for category, price, scent family/material, and availability.
- [ ] Add sorting.
- [ ] Add empty states and loading states.

## Phase 5: Cart And Checkout MVP

- [ ] Add cart state management.
- [ ] Add add-to-cart flow.
- [ ] Add cart quantity updates.
- [ ] Add remove-from-cart flow.
- [ ] Persist cart locally.
- [ ] Add cart totals.
- [ ] Integrate Stripe Checkout or chosen payment provider.
- [ ] Create order success page.
- [ ] Create order cancelled/failure page.
- [ ] Add server-side validation for cart and pricing.

## Phase 6: Backend, Data, And Admin

- [ ] Choose database or product/content backend.
- [ ] Add database schema if using a custom backend.
- [ ] Add seed data for demo products.
- [ ] Add API endpoints for products.
- [ ] Add API endpoint for checkout session creation.
- [ ] Add webhook handling for payment events.
- [ ] Add admin authentication if required.
- [ ] Add product admin screens if required.
- [ ] Add order admin screens if required.

## Phase 7: Content, Trust, And Legal

- [ ] Add About page.
- [ ] Add Contact page.
- [ ] Add FAQ page.
- [ ] Add Shipping page.
- [ ] Add Returns and Refunds page.
- [ ] Add Privacy Policy.
- [ ] Add Terms and Conditions.
- [ ] Add Cookie Policy if tracking/cookies are used.
- [ ] Add newsletter signup if needed.
- [ ] Add structured data for products and organization.

## Phase 8: Quality, Accessibility, And SEO

- [ ] Add unit tests for core utilities.
- [ ] Add component tests for key UI components.
- [ ] Add integration tests for cart and checkout flow.
- [ ] Add accessibility checks.
- [ ] Add Lighthouse checks or performance budget.
- [ ] Add metadata for pages.
- [ ] Add sitemap generation.
- [ ] Add robots.txt.
- [ ] Add Open Graph images/meta.
- [ ] Verify mobile and desktop layouts.

## Phase 9: GitHub Actions CI

- [ ] Add CI workflow on pull requests and pushes to `main`.
- [ ] Run install with cache.
- [ ] Run lint.
- [ ] Run typecheck.
- [ ] Run tests.
- [ ] Run build.
- [ ] Upload build artifacts if useful.
- [ ] Add branch protection expectations.
- [ ] Add Dependabot or Renovate for dependency updates.
- [ ] Add secret scanning and dependency audit workflow if appropriate.

## Phase 10: Cloudflare And Deployment

- [ ] Confirm `trivenilondon.co.uk` is active in Cloudflare.
- [ ] Configure DNS records.
- [ ] Choose deployment target: Cloudflare Pages, Workers, or external hosting behind Cloudflare.
- [ ] Configure preview deployments for pull requests.
- [ ] Configure production deployment from `main`.
- [ ] Add production environment variables.
- [ ] Add custom domain binding.
- [ ] Verify SSL/TLS mode.
- [ ] Configure redirects from `www` to apex or apex to `www`.
- [ ] Configure cache rules.
- [ ] Configure security headers.

## Phase 11: Launch Preparation

- [ ] Add real product data.
- [ ] Add real product images.
- [ ] Test checkout with test payments.
- [ ] Test payment webhook delivery.
- [ ] Test order confirmation emails.
- [ ] Verify legal pages.
- [ ] Verify analytics and cookie consent if used.
- [ ] Verify Cloudflare DNS and SSL.
- [ ] Run full production build.
- [ ] Run final accessibility and mobile checks.
- [ ] Create launch checklist issue.

## Phase 12: Post-Launch

- [ ] Monitor errors and performance.
- [ ] Add analytics dashboard.
- [ ] Add abandoned cart or newsletter workflows if needed.
- [ ] Add customer accounts if deferred.
- [ ] Add discount codes if deferred.
- [ ] Add reviews or wishlist if useful.
- [ ] Improve search and filters.
- [ ] Add blog/editorial content for SEO.

## Suggested GitHub Milestones

- `M0 Repository Setup`
- `M1 Architecture And MVP Scope`
- `M2 App Scaffold`
- `M3 Catalogue MVP`
- `M4 Cart And Checkout`
- `M5 CI And Deployment`
- `M6 Launch`

## Suggested Issue Format

```md
## Summary

Describe the task and why it matters.

## Acceptance Criteria

- [ ] Clear measurable outcome
- [ ] Tests or verification included
- [ ] Documentation updated if needed

## Notes

Links, decisions, screenshots, or implementation hints.
```

## First Recommended Tasks

- [ ] Decide stack details: Vite React app only, or full-stack Node API from day one.
- [ ] Decide ecommerce engine: custom cart plus Stripe Checkout, or external ecommerce provider.
- [ ] Create GitHub issue templates and PR template.
- [ ] Scaffold the app.
- [ ] Add CI for install, lint, typecheck, test, and build.
- [ ] Connect Cloudflare only after the first successful production build exists.
