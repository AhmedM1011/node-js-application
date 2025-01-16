FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy all files, including the .env file if it exists
COPY . .

# Expose the application port
EXPOSE 8080

# Start the application
CMD ["node", "index.js"]
