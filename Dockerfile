# ============================
# 1. Base image (prod deps)
# ============================
FROM node:22-alpine AS base

WORKDIR /usr/src/app
ENV NODE_ENV=production

# Install ONLY production dependencies
COPY package*.json ./
RUN npm ci --omit=dev


# ============================
# 2. Development image
# ============================
FROM node:22-alpine AS dev

WORKDIR /usr/src/app
ENV NODE_ENV=development

COPY package*.json ./
RUN npm ci   # more reliable than npm install

COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev"]


# ============================
# 3. Production runtime image
# ============================
FROM node:22-alpine AS prod

WORKDIR /usr/src/app
ENV NODE_ENV=production

# Copy production node_modules from the base stage
COPY --from=base /usr/src/app/node_modules ./node_modules

# Copy the full app source
COPY . .

EXPOSE 3000

CMD ["npm", "start"]
