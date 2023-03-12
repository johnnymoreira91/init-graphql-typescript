FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./

COPY tsconfig*.json ./

COPY src ./src

COPY pm2.config.js ./

RUN npm install

RUN npm run build

EXPOSE 4000

CMD [ "npm", "prod" ]
