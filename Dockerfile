# =========================================================
# STAGE 1: Build Environment & Security Verification Gating
# =========================================================
FROM node:20-alpine AS build
WORKDIR /app

# Optimize layer caching by moving dependency listings first
COPY package*.json ./
RUN npm ci

# Copy remaining source workspace assets
COPY . .

# Run automated verification gates internally
RUN npm run lint && npm test && npm run build

# =========================================================
# STAGE 2: Micro-Sized Production Asset Hosting
# =========================================================
FROM nginx:alpine AS production

# Select ONLY the finalized build folder from Stage 1 workspace
COPY --from=build /app/dist /usr/share/nginx/html

# Expose default HTTP connection point 
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]