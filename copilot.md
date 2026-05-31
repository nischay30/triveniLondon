# Copilot Project Summary

## Overview
`triveniLondon` is a monorepo for a static MVP ecommerce storefront for TriveniLondon. It contains:

- `apps/web`: React + TypeScript + Vite frontend.
- `apps/server`: Express server that serves the built frontend assets.
- `Dockerfile`: Production container image for the static storefront.
- `README.md`: project documentation and workflows.

The application target is a production-ready static storefront served from an Express backend and deployable as a Docker image.

## Key Technologies

- React 19
- TypeScript 5
- Vite
- Express
- pnpm workspaces
- Docker
- GitHub Actions CI

## Important Scripts

From the repository root:

- `pnpm install` — install workspace dependencies.
- `pnpm dev` — run the web app in development mode.
- `pnpm dev:server` — run the Express server in development mode.
- `pnpm build` — build both frontend and server output.
- `pnpm app` — run the built server.
- `pnpm lint` — run ESLint across all workspaces.
- `pnpm typecheck` — run TypeScript type checks.

From `apps/web`:

- `pnpm build` — compile and build the React app.
- `pnpm build:pages` — build for GitHub Pages.
- `pnpm build:pages:repo` — build for repository preview under `/triveniLondon/`.
- `pnpm preview` — preview the production build locally.

From `apps/server`:

- `pnpm build` — compile the Express server.
- `pnpm dev` — run the server with `tsx watch`.
- `pnpm start` — start the compiled server.

## Notes for Copilot

- The frontend is a static React app built with Vite and served by the Express backend.
- Docker and GitHub Pages are both supported, but the main deployment flow is container-based.
- The repo expects Node 22+ and uses `pnpm` via Corepack.
- Local development can be done either by running the web app separately or by building and then running the Express server.

## Architecture Principles

- **Separate your logic layers**: keep web routes/controllers, business services, and data access separate. The backend should follow a 3-layer architecture to make the app easier to maintain and test.
- **Organize by feature, not file type**: group related controllers, services, and data access files under feature folders such as `/users`, `/products`, `/cart`, `/checkout` rather than splitting by generic directories.
- **Decouple server execution**: keep Express configuration separate from network listener startup. `app.js` or equivalent should export the app, while `server.js` should only start the listener.

## Current Feature Implementation

- Backend now includes feature folders for `auth`, `products`, and `checkout` under `apps/server/src/features`.
- Express configuration is separated into `apps/server/src/app.ts`, with the listener in `apps/server/src/server.ts`.
- A new API route set is mounted under `/api`, including `/api/products`, `/api/auth/google`, and `/api/checkout`.
- Frontend cart state persists locally, supports quantity updates, removal, and checkout form submission.
- Google OAuth is wired through the Google Identity Services script and verified server-side via `google-auth-library`.

## Useful Paths

- `apps/web/src` — frontend source code.
- `apps/web/index.html` — frontend entry point.
- `apps/server/src/server.ts` — Express server source.
- `apps/server/dist` — compiled server output after build.

## Recommended First Tasks

- Review the current frontend route and UI in `apps/web/src/App.tsx`.
- Check the Express server routing to confirm how it serves built assets.
- Verify GitHub Actions configuration if CI changes are needed.
