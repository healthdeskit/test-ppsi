# PPSI — Node server + static site (production)
FROM node:20-bookworm-slim

WORKDIR /app

COPY . .

RUN cd server && npm ci --omit=dev && npm cache clean --force \
  && chown -R node:node /app

USER node

ENV NODE_ENV=production
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=25s --retries=3 \
  CMD node -e "require('http').get('http://127.0.0.1:'+(process.env.PORT||3000)+'/',r=>process.exit(r.statusCode===200?0:1)).on('error',()=>process.exit(1))"

CMD ["node", "server/server.js"]
