FROM node:lts-alpine
WORKDIR '/app'

EXPOSE 10002

RUN apk --update add git curl openssh nano

RUN npm install -g npm@latest

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]

