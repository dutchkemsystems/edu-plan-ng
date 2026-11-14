# Multi-stage production Dockerfile for EduPlan NG
FROM node:25-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:25-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public
COPY --from=builder /app/src ./src
COPY --from=builder /app/scripts ./scripts
COPY --from=builder /app/data ./data
COPY --from=builder /app/curriculum-data ./curriculum-data
COPY --from=builder /app/server.ts ./server.ts
COPY --from=builder /app/tsconfig.json ./tsconfig.json
COPY --from=builder /app/metadata.json ./metadata.json

EXPOSE 3000

CMD ["node", "server.ts"]
