FROM node:14.4.0-alpine

COPY ./package-lock.json /app/
COPY ./package.json /app/

WORKDIR /app/

RUN npm ci
