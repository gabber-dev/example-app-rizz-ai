# Base image
FROM node:18-alpine AS base

# Builder stage
FROM base AS builder 
ENV NEXT_TELEMETRY_DISABLED 1

RUN apk add --no-cache libc6-compat python3 make g++ bash autoconf automake 

COPY package.json package.json
COPY pnpm-lock.yaml pnpm-lock.yaml

RUN corepack enable pnpm && pnpm install --frozen-lockfile

COPY . .

# We set standalone output in next.config.js here but not in the actual next.config.js file
# because this repo is an example and others may not want to use standalone output
RUN echo "module.exports = { ...require('./next.config.js'), output: 'standalone' };" > next.config.js

RUN pnpm run build

# Runner stage
FROM base AS runner
WORKDIR /app
ARG APP
ARG PORT

RUN apk add --no-cache bash

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --chown=nextjs:nodejs next.config.js .
COPY --chown=nextjs:nodejs next-logger.config.js .
COPY --from=builder --chown=nextjs:nodejs ./public ./public
COPY --from=builder --chown=nextjs:nodejs .next/standalone ./
COPY --from=builder --chown=nextjs:nodejs .next .next

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

ENV NODE_ENV production
# Directly use ENTRYPOINT to run the server
CMD node ./server.js