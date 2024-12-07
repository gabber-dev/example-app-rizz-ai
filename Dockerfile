# Base image
FROM node:18-alpine AS base

# Builder stage
FROM base AS builder 
ENV NEXT_TELEMETRY_DISABLED 1

# Install necessary build tools
RUN apk add --no-cache libc6-compat python3 make g++ bash autoconf automake 

WORKDIR /app

# Copy dependency files and install dependencies
COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile

# Copy application files
COPY . .

# Temporarily modify next.config.js to enable standalone build output
RUN echo "module.exports = { ...require('./next.config.js'), output: 'standalone' };" > next.config.js

# Build the application
RUN pnpm run build

# Runner stage
FROM node:18-alpine AS runner

# Set working directory and environment
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Add necessary system users
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy standalone build and public assets from the builder stage
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Run as nextjs user
USER nextjs

# Expose port and run the standalone server
EXPOSE 3000
CMD ["node", "server.js"]
