# Use official Node.js image as base
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all source files
COPY . .

# Ensure Firebase config is available inside the container
COPY firebase_config.json ./

# Convert JSON to TypeScript (fixes the Next.js import issue)
RUN echo "export const firebaseConfig = " > firebase_config.ts \
    && cat firebase_config.json >> firebase_config.ts \
    && echo ";" >> firebase_config.ts

# Ensure .env is set
RUN touch .env && echo "NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL" >> .env

# Build the Next.js application
RUN npm run build

# Production image
FROM node:18-alpine

WORKDIR /app

# Copy built application from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
COPY --from=builder /app/firebase_config.ts ./firebase_config.ts

# Expose port 3000
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "start"]