FROM node:18.20.0-bullseye-slim

# Set environment for production
ENV NODE_ENV=production

WORKDIR /app

# Install only production dependencies (leverage Docker cache)
COPY package*.json ./
RUN npm ci --only=production

# Copy app sources
COPY . .

# Ensure non-root user (node) owns the app directory
RUN chown -R node:node /app

USER node

# Application port (can be overridden at runtime)
ARG PORT=5000
ENV PORT=${PORT}
EXPOSE ${PORT}

# Start the application
CMD ["node", "src/index.js"]
