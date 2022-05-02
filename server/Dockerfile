FROM node:12.19.0-alpine3.9 AS development
WORKDIR /app
COPY package*.json ./app
RUN npm install glob rimraf
RUN npm install --only=development
COPY . .
RUN npm run build

FROM node:12.19.0-alpine3.9 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app
COPY package*.json /app
RUN npm install --only=production
COPY . .
COPY --from=development /app/dist /app/dist
CMD ["node", "/usr/src/app/dist"]
