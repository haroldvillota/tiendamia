FROM node:lts-alpine
WORKDIR '/app'

EXPOSE 10001

RUN apk --update add git curl openssh nano

RUN npm install -g npm@latest

COPY package*.json ./

RUN npm install

COPY . .

RUN node populateProducts.js

CMD ["npm", "run", "dev"]

