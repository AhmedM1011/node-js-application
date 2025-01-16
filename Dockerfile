FROM node:23
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
RUN mkdir -p public/temp
COPY . .
EXPOSE 8080
CMD ["node", "index.js"]
