# TriveniLondon

Static MVP for `TriveniLondon`, an ecommerce storefront for fragrances and jewellery served by an Express server.

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

## GitHub Pages Preview

The project can publish the static storefront to GitHub Pages while the container deployment is being prepared.

The default Pages build targets the custom domain `trivenilondon.co.uk` and uses the normal `/` base path:

```sh
pnpm build:pages
```

For a temporary repository URL preview at `https://nischay30.github.io/triveniLondon/`, use:

```sh
pnpm --filter @trivenilondon/web build:pages:repo
```

The Docker and Express build also keeps the normal `/` base path:

```sh
pnpm build
```

After the GitHub Pages workflow is merged to `main`, enable Pages in GitHub repository settings and select GitHub Actions as the source. The custom domain should be:

```text
https://trivenilondon.co.uk/
```

If the workflow fails with `Get Pages site failed`, Pages has not been enabled for the repository yet. Fix it in GitHub:

1. Open repository settings.
2. Go to Pages.
3. Set Build and deployment source to GitHub Actions.
4. Re-run the GitHub Pages workflow.

The `actions/configure-pages` action has an `enablement` option, but GitHub requires a token other than the default `GITHUB_TOKEN` for first-time enablement. We are keeping the workflow secret-free for now and doing the one-time enablement through repository settings.

When the container deployment is live, remove `.github/workflows/pages.yml`, remove `apps/web/public/CNAME`, and remove the `build:pages` scripts.

## CI

GitHub Actions runs on pull requests and pushes to `main`:

- install dependencies
- lint
- typecheck
- build
- Docker image build

Deployment will be added after the first container build is reviewed and merged.
