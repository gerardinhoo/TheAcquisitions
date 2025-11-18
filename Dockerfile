# ============================
# 1. Base image
# ============================
FROM node:22-alpine AS base

WORKDIR /usr/src/app

ENV NODE_ENV=production

# Install dependencies first (better layer caching)
COPY package*.json ./
RUN npm ci --omit=dev

# Copy app source
COPY . .

# ============================
# 2. Development image
# ============================
FROM node:22-alpine AS dev

WORKDIR /usr/src/app

ENV NODE_ENV=development

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

# Default dev command (overridable in docker-compose)
CMD ["npm", "run", "dev"]

# ============================
# 3. Production runtime image
# ============================
FROM node:22-alpine AS prod

WORKDIR /usr/src/app

ENV NODE_ENV=production

# Only copy node_modules from base (prod deps only)
COPY --from=base /usr/src/app/node_modules ./node_modules
COPY . .

EXPOSE 3000

CMD ["npm", "start"]
