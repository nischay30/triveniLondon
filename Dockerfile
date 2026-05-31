# syntax=docker/dockerfile:1

FROM node:22-alpine AS build
WORKDIR /app

RUN corepack enable

COPY package.json pnpm-workspace.yaml ./
COPY apps/web/package.json apps/web/package.json
COPY apps/server/package.json apps/server/package.json
RUN pnpm install --frozen-lockfile=false

COPY apps apps
RUN pnpm build

FROM node:22-alpine AS runtime
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080
ENV STATIC_DIR=/app/apps/web/dist

RUN corepack enable

COPY package.json pnpm-workspace.yaml ./
COPY apps/server/package.json apps/server/package.json
RUN pnpm install --prod --frozen-lockfile=false --filter @trivenilondon/server

COPY --from=build /app/apps/server/dist apps/server/dist
COPY --from=build /app/apps/web/dist apps/web/dist

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1:8080/healthz || exit 1

CMD ["node", "apps/server/dist/server.js"]
