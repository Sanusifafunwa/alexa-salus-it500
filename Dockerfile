FROM node:8.15.1-alpine

WORKDIR /usr/app

RUN apk update && apk add bash zip

ADD package.json .
RUN npm install --quiet

COPY . .