# Stage 1: Build the NestJS application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install bash to use it in production stage for running multiple commands
RUN apk add --no-cache bash

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the NestJS application
RUN npm run build

# Stage 2: Create a lightweight production image
FROM node:18-alpine AS production

# Set working directory
WORKDIR /app

# Install bash
RUN apk add --no-cache bash

# Copy the package.json and package-lock.json to the production image
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy the build output from the builder stage
COPY --from=builder /app/dist ./dist

# Copy Prisma schema and migrations
COPY --from=builder /app/prisma ./prisma

# Copy the generated Prisma client
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

COPY public ./public

# Expose the port the app runs on
EXPOSE 3000

# Set the NODE_ENV to production
ENV NODE_ENV=production

# Command to run Prisma migrations and start the application
CMD ["bash", "-c", "npx prisma migrate deploy && node dist/main"]
