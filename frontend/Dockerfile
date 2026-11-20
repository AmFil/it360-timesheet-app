FROM node:24-bookworm-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY --chown=node:node . .
RUN mkdir -p node_modules/.cache && chown node:node node_modules/.cache
ENV HOST=0.0.0.0
ENV BROWSER=none
USER node
EXPOSE 3000
CMD ["npm", "start"]
