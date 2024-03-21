FROM node:12.22.6-alpine

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install --legacy-peer-deps

COPY ./ ./

CMD ["npm","run","start"]
