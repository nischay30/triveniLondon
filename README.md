# triveniLondon

Static MVP for `triveniLondon`, an ecommerce storefront for fragrances and jewellery served by an Express server.

The first delivery target is a React application built into static assets, served by Express, and packaged as a Docker image. The image can be deployed to any container platform, while Cloudflare manages DNS for `trivenilondon.co.uk`.

## Stack

- React
- TypeScript
- Vite
- Express
- pnpm workspaces
- Docker
- GitHub Actions CI

## Repository Workflow

- Do not push directly to `main`.
- Create a branch for each task.
- Push the branch to GitHub.
- Open a pull request for review before merge.

## Project Structure

```text
apps/web        Static React storefront
apps/server     Express server that serves the built storefront
Dockerfile      Production container image
```

## Local Development

Enable pnpm through Corepack, then install dependencies:

```sh
corepack enable
pnpm install
pnpm dev
```

The web app runs from `apps/web`. To run the Express server locally after building:

```sh
pnpm build
pnpm app
```

If you prefer npm scripts, `npm run app` also works after dependencies are installed and Corepack has enabled pnpm.

## Quality Checks

```sh
pnpm lint
pnpm typecheck
pnpm build
```

## Docker

Build the static production image:

```sh
docker build -t trivenilondon:local .
```

Run it locally:

```sh
docker run --rm -p 8080:8080 trivenilondon:local
```

Then open `http://localhost:8080`.

## CI

GitHub Actions runs on pull requests and pushes to `main`:

- install dependencies
- lint
- typecheck
- build
- Docker image build

Deployment will be added after the first container build is reviewed and merged.
