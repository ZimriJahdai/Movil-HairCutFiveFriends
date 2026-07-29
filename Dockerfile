FROM node:22-alpine
RUN apk add --no-cache tini
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app
COPY package*.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
EXPOSE 8081 19000 19001 19002
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["npx", "expo", "start", "--web"]
