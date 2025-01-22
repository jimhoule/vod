FROM node:22-alpine AS base

# BUILDER PAHSE
FROM base AS builder
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app
# Copies everything from root
COPY . .
# Prunes hono-server app
RUN npm i -g turbo@^2
RUN turbo prune hono-server --docker

# INSTALLER PHASE
FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
# Adds pnpm
RUN corepack enable
RUN corepack prepare pnpm@9.0.0 --activate
WORKDIR /app
# Installs dependencies first (as they change less often)
COPY --from=builder /app/out/json/ .
RUN pnpm install --frozen-lockfile
# Builds project and its dependencies
COPY --from=builder /app/out/full/ .
RUN pnpm run build


# RUNNER PHASE
FROM base AS runner
WORKDIR /app
# Creates user to run app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 hono
USER hono
# Copies everything from installer phase
COPY --from=installer /app .
# Executes entrypoint executable
COPY --chmod=0755 ./apps/hono-server/docker-entrypoint.sh /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]
# Exposes port for external use
EXPOSE 3002
# Starts app
CMD node apps/hono-server/dist/index.js