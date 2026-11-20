FROM node:24-bookworm-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY index.js ./
USER node
EXPOSE 5000
CMD ["node", "index.js"]
