# ============================================
# STAGE 1: Build the React Application
# ============================================
# We use a "multi-stage" build for efficiency
# Stage 1 builds the app, Stage 2 serves it

FROM node:20-alpine AS builder

# Set working directory inside the container
WORKDIR /app

# Copy package files first (for better caching)
# Docker caches layers - if package.json doesn't change,
# it won't re-run npm install on subsequent builds
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the production-ready static files
# This creates an optimized build in /app/build folder
RUN npm run build

# ============================================
# STAGE 2: Serve with Nginx
# ============================================
# We use nginx (a fast web server) to serve the static files
# The final image is much smaller (~25MB vs ~1GB with node)

FROM nginx:alpine

# Copy custom nginx config for React Router support
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built files from Stage 1
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80 (standard HTTP port)
EXPOSE 80

# Start nginx in foreground (not as daemon)
CMD ["nginx", "-g", "daemon off;"]
