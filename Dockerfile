# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Runtime stage
FROM node:20-alpine

WORKDIR /app

# Install nginx
RUN apk add --no-cache nginx

# Set environment variables
ENV NODE_ENV=production
ENV HOST=127.0.0.1
ENV PORT=3000

# Copy node_modules and source from builder
COPY --from=builder /app/node_modules ./node_modules

# Copy application code
COPY package*.json ./
COPY index.js ./
COPY src ./src

# Create nginx directories
RUN mkdir -p /var/log/nginx /var/run/nginx /etc/nginx/conf.d

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy startup script
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

# Expose nginx port
EXPOSE 80

# Start both services
CMD ["/app/start.sh"]
