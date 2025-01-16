FROM node:23
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .env .env
EXPOSE 8080
CMD ["node", "index.js"]
