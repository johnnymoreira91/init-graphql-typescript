FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./

COPY tsconfig*.json ./

COPY src ./src

COPY prisma ./prisma/

COPY .env ./

COPY pm2.config.js ./

RUN npm install

RUN npm install pm2 -g

RUN npm run build

RUN npx prisma generate

EXPOSE 4000

CMD npm run pm2 && tail -f /dev/null
