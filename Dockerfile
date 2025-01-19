# NOTE: Runs tests in docker container

FROM node:22-alpine
RUN apk update
RUN apk add --no-cache libc6-compat
# Adds pnpm
RUN corepack enable
RUN corepack prepare pnpm@9.0.0 --activate

WORKDIR /app
COPY . .
RUN pnpm install --frozen-lockfile

CMD pnpm run test:watch