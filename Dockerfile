# Use official Node.js image as base
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the app
COPY . .

COPY firebase_config.json ./

RUN echo "export const firebaseConfig = " > firebase_config.ts \
    && cat firebase_config.json >> firebase_config.ts \
    && echo ";" >> firebase_config.ts

# Generate .env file inside the container
RUN touch .env && echo "NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL" >> .env

# Build the Next.js application
RUN npm run build

# Production image
FROM node:18-alpine

WORKDIR /app

# Copy the built application from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/public ./public

# Expose port 3000
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "start"]