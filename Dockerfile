# PPSI – Node backend (clean URLs, API, admin) – runs full site
FROM node:20-bookworm-slim

WORKDIR /app

# Copy project (server + static site)
COPY . /app

# Install server dependencies
WORKDIR /app/server
RUN npm install --production

WORKDIR /app
EXPOSE 3000

# data/ and data/uploads/ created at runtime (use volume for persistence)
ENV NODE_ENV=production
CMD ["node", "server/server.js"]
