FROM node:22-alpine
RUN apk add --no-cache tini
WORKDIR /app
COPY package*.json ./
RUN npm ci && npm cache clean --force
COPY . .
EXPOSE 8081 19000 19001 19002
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["npx", "expo", "start", "--web"]
