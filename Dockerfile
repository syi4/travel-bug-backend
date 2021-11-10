FROM node:16-buster-slim

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn

COPY . .

EXPOSE 1337

CMD ["yarn", "start"]